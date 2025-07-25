// plugins/minecraft/pteroControl.js
import axios from 'axios';
import WebSocket from 'ws';

const PTERODACTYL_CONFIG = {
  PANEL_URL: 'https://panel.skyultraplus.com',
  SERVER_ID: '1a39799b-aaf2-4c6c-ac53-15a72f34ebd0',
  API_KEY: 'ptlc_AC9ttaVgCmwmDs8DhE9ejPy9ffa7eGunbyDERnqJTqU'
};

// Variables globales para manejar WebSocket
let pteroSocket = null;
let commandResponseBuffer = '';
let currentChatId = null;

const connectPteroSocket = async (conn) => {
  try {
    // 1. Obtener token de WebSocket
    const { data: wsData } = await axios.get(
      `${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/websocket`,
      {
        headers: {
          'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`
        },
        timeout: 10000
      }
    );

    // 2. Configurar conexión WebSocket
    const wsUrl = PTERODACTYL_CONFIG.PANEL_URL.replace('https', 'wss') + 
                 `/api/servers/${PTERODACTYL_CONFIG.SERVER_ID}/ws`;
    
    pteroSocket = new WebSocket(wsUrl, {
      headers: {
        'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`
      }
    });

    pteroSocket.on('open', () => {
      console.log('✅ Conexión WebSocket establecida con Pterodactyl');
    });

    pteroSocket.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        if (message.event === 'console output') {
          commandResponseBuffer += message.args[0] + '\n';
          
          // Enviar actualizaciones en tiempo real
          if (currentChatId) {
            conn.sendMessage(currentChatId, { 
              text: `⚡ Output:\n${message.args[0]}` 
            });
          }
        }
      } catch (e) {
        console.error('Error procesando mensaje WebSocket:', e);
      }
    });

    pteroSocket.on('error', (error) => {
      console.error('WebSocket Error:', error);
      if (currentChatId) {
        conn.sendMessage(currentChatId, { 
          text: '❌ Error en conexión con la consola' 
        });
      }
    });

    pteroSocket.on('close', () => {
      console.log('WebSocket cerrado. Reconectando...');
      setTimeout(() => connectPteroSocket(conn), 5000);
    });

  } catch (error) {
    console.error('Error al conectar WebSocket:', error);
    throw error;
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const args = text.split(' ');
  const action = args[0]?.toLowerCase() || 'status';
  const validActions = ['start', 'stop', 'restart', 'status', 'cmd', 'console'];

  try {
    currentChatId = m.chat;
    await conn.sendPresenceUpdate('composing', m.chat);

    // Iniciar conexión WebSocket si no existe
    if (!pteroSocket || pteroSocket.readyState !== WebSocket.OPEN) {
      await connectPteroSocket(conn);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (action === 'status') {
      const { data } = await getServerStatus();
      return await conn.reply(m.chat, formatServerStatus(data), m);
    }

    if (['start', 'stop', 'restart'].includes(action)) {
      await sendPowerAction(action);
      const emoji = { start: '🟢', stop: '🔴', restart: '🔄' };
      return await conn.reply(m.chat, `${emoji[action]} *Servidor ${action.toUpperCase()} exitoso*`, m);
    }

    if (action === 'cmd' && args.length > 1) {
      const commandToSend = args.slice(1).join(' ');
      commandResponseBuffer = ''; // Resetear buffer
      
      await sendConsoleCommand(commandToSend);
      await conn.reply(m.chat, `📤 Comando enviado: ${commandToSend}`, m);

      // Esperar respuesta con timeout
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          conn.reply(m.chat, '⌛ No se recibió respuesta en 15 segundos', m);
          resolve();
        }, 15000);

        const checkResponse = setInterval(() => {
          if (commandResponseBuffer.includes(commandToSend)) {
            clearTimeout(timeout);
            clearInterval(checkResponse);
            const response = commandResponseBuffer
              .split('\n')
              .filter(line => line.trim() && !line.includes('[Pterodactyl]'))
              .join('\n');
            
            conn.reply(m.chat, `📝 *Respuesta:*\n${response.slice(0, 1000)}`, m);
            resolve();
          }
        }, 500);
      });
    }

    if (action === 'console') {
      return await conn.reply(m.chat, 
        '🔧 Modo consola activado. Enviando output en tiempo real...\n' +
        'Escribe "exit" para salir', 
        m
      );
    }

    return await conn.reply(m.chat, 
      `❌ Comando no válido. Usa:\n` +
      `${usedPrefix}ptero <start|stop|restart|status>\n` +
      `${usedPrefix}ptero cmd <comando>\n` +
      `${usedPrefix}ptero console`, 
      m
    );

  } catch (error) {
    console.error('Error en handler:', error);
    let errorMsg = '❌ Error: ' + (error.response?.data?.errors?.[0]?.detail || error.message);
    return await conn.reply(m.chat, errorMsg, m);
  }
};

async function sendConsoleCommand(command) {
  if (!pteroSocket || pteroSocket.readyState !== WebSocket.OPEN) {
    throw new Error('No hay conexión con la consola');
  }
  
  await axios.post(
    `${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/command`,
    { command },
    {
      headers: {
        'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000
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

handler.command = /^(ptero|server|mcctl)$/i;
handler.help = ['ptero <start|stop|restart|status>', 'ptero cmd <comando>  // Ejecuta comando y muestra respuesta', 'ptero console  // Modo consola en tiempo real'];

handler.owner = true;


export default handler;
