import axios from 'axios';
import WebSocket from 'ws';

const PTERODACTYL_CONFIG = {
  PANEL_URL: 'https://panel.skyultraplus.com',
  SERVER_ID: '1a39799b-aaf2-4c6c-ac53-15a72f34ebd0',
  API_KEY: 'ptlc_AC9ttaVgCmwmDs8DhE9ejPy9ffa7eGunbyDERnqJTqU'
};

// Variables para manejar el WebSocket
let socket = null;
let lastCommand = '';
let responseHandler = null;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const args = text.split(' ');
  const action = args[0]?.toLowerCase() || 'status';
  const validActions = ['start', 'stop', 'restart', 'status', 'cmd'];

  try {
    await conn.sendPresenceUpdate('composing', m.chat);

    if (action === 'status') {
      const { data } = await getServerStatus();
      const status = formatServerStatus(data);
      return await conn.reply(m.chat, status, m);
    }

    if (['start', 'stop', 'restart'].includes(action)) {
      await sendPowerAction(action);
      const emoji = { start: '🟢', stop: '🔴', restart: '🔄' };
      return await conn.reply(m.chat, `${emoji[action]} *Servidor ${action.toUpperCase()} exitoso*`, m);
    }

    if (action === 'cmd' && args.length > 1) {
      const commandToSend = args.slice(1).join(' ');
      lastCommand = commandToSend;
      
      // Conectar WebSocket si no está conectado
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        await connectWebSocket(m.chat, conn);
      }
      
      // Enviar comando
      await sendConsoleCommand(commandToSend);
      
      // Esperar respuesta (con timeout de 15 segundos)
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          conn.reply(m.chat, '⌛ No se recibió respuesta en 15 segundos', m);
          resolve();
        }, 15000);
        
        responseHandler = (response) => {
          clearTimeout(timeout);
          conn.reply(m.chat, `📝 *Comando:* ${commandToSend}\n📋 *Respuesta:*\n${response}`, m);
          resolve();
        };
      });
    }

    return await conn.reply(m.chat, 
      `❌ Comando no válido. Usa:\n${usedPrefix}ptero <start|stop|restart|status>\n${usedPrefix}ptero cmd <comando>`, 
      m
    );

  } catch (error) {
    console.error('Error:', error);
    let errorMsg = '❌ Error: ';
    errorMsg += error.response ? `API (${error.response.status})` : error.message;
    return await conn.reply(m.chat, errorMsg, m);
  }
};

// Función para conectar WebSocket
async function connectWebSocket(chatId, conn) {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. Obtener token de WebSocket
      const { data } = await axios.get(
        `${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/websocket`,
        {
          headers: {
            'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`
          }
        }
      );

      // 2. Crear conexión WebSocket
      const wsUrl = PTERODACTYL_CONFIG.PANEL_URL.replace('https', 'wss') + 
                   `/api/servers/${PTERODACTYL_CONFIG.SERVER_ID}/ws`;
      
      socket = new WebSocket(wsUrl, {
        headers: {
          'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`
        }
      });

      socket.on('open', () => {
        console.log('✅ WebSocket conectado');
        resolve();
      });

      socket.on('message', (data) => {
        const message = JSON.parse(data);
        
        if (message.event === 'console output') {
          const output = message.args[0];
          
          // Filtrar respuesta del último comando
          if (output.includes(lastCommand) && responseHandler) {
            responseHandler(output);
            responseHandler = null;
          }
        }
      });

      socket.on('error', (error) => {
        console.error('WebSocket error:', error);
        conn.reply(chatId, '❌ Error en conexión WebSocket', m);
        reject(error);
      });

      socket.on('close', () => {
        console.log('WebSocket cerrado');
      });

    } catch (error) {
      console.error('Error al conectar WebSocket:', error);
      reject(error);
    }
  });
}

// Función modificada para enviar comandos
async function sendConsoleCommand(command) {
  return axios.post(
    `${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/command`,
    { command },
    {
      headers: {
        'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
}


/* ------------- */
async function getServerStatus() {
  return axios.get(`${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/resources`, {
    headers: {
      'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`,
      'Accept': 'application/json'
    },
    timeout: 8000
  });
}


async function sendPowerAction(signal) {
  return axios.post(
    `${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/power`,
    { signal },
    {
      headers: {
        'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 15000
    }
  );
}

//
function formatServerStatus(data) {
  const stateMap = {
    offline: '🔴 OFFLINE',
    running: '🟢 ONLINE',
    starting: '🟡 INICIANDO',
    stopping: '🟠 DETENIENDO'
  };

  const state = stateMap[data.attributes.current_state] || data.attributes.current_state;
  const uptime = data.attributes.resources.uptime > 0 ? 
    formatUptime(data.attributes.resources.uptime) : '0 segundos';

  return `📊 *Estado del Servidor*\n\n` +
    `▸ Estado: ${state}\n` +
    `▸ CPU: ${data.attributes.resources.cpu_absolute?.toFixed(2) || '0'}%\n` +
    `▸ RAM: ${(data.attributes.resources.memory_bytes / 1024 / 1024).toFixed(2)} MB\n` +
    `▸ Uptime: ${uptime}\n` +
    `▸ Red: ▼${formatBytes(data.attributes.resources.network_rx_bytes)} ▲${formatBytes(data.attributes.resources.network_tx_bytes)}`;
}

function formatUptime(ms) {
  const seconds = Math.floor(ms / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

handler.command = /^(ptero|server|console)$/i;
handler.help = ['ptero <start|stop|restart|status>', 'ptero cmd <comando>'];

handler.owner = true;

export default handler;
