import axios from 'axios';
import WebSocket from 'ws';

const PTERODACTYL_CONFIG = {
  PANEL_URL: 'https://panel.skyultraplus.com',
  SERVER_ID: '1a39799b-aaf2-4c6c-ac53-15a72f34ebd0',
  API_KEY: 'ptlc_AC9ttaVgCmwmDs8DhE9ejPy9ffa7eGunbyDERnqJTqU'
};

// Variable para almacenar la conexión WebSocket
let socketConnection = null;
let consoleBuffer = '';
let commandResponseResolver = null;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const args = text.split(' ');
  const action = args[0]?.toLowerCase() || 'status';
  const validActions = ['start', 'stop', 'restart', 'status', 'cmd', 'connect'];

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

    if (action === 'connect') {
      await connectWebSocket();
      return await conn.reply(m.chat, '🔌 *Conexión WebSocket establecida*', m);
    }

    if (action === 'cmd' && args.length > 1) {
      if (!socketConnection) {
        await connectWebSocket();
      }
      
      const commandToSend = args.slice(1).join(' ');
      await sendConsoleCommand(commandToSend);
      
      // Esperar respuesta de la consola (timeout de 15 segundos)
      const response = await new Promise((resolve, reject) => {
        commandResponseResolver = resolve;
        consoleBuffer = ''; // Limpiar buffer
        
        setTimeout(() => {
          reject(new Error('Tiempo de espera agotado (15 segundos)'));
        }, 15000);
      });
      
      return await conn.reply(m.chat, `📝 *Comando ejecutado:*\n${commandToSend}\n\n📋 *Respuesta:*\n${response || 'Sin respuesta'}`, m);
    }

    return await conn.reply(m.chat, `❌ Comando no válido. Usa:\n${usedPrefix}ptero <start|stop|restart|status|connect>\n${usedPrefix}ptero cmd <comando>`, m);

  } catch (error) {
    console.error('Error:', error);
    return await conn.reply(m.chat, `❌ Error: ${error.message}`, m);
  }
};

// Conexión WebSocket para la consola
async function connectWebSocket() {
  return new Promise((resolve, reject) => {
    if (socketConnection) {
      socketConnection.close();
    }

    const wsUrl = PTERODACTYL_CONFIG.PANEL_URL.replace('https', 'wss') + 
                 `/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/ws`;
    
    socketConnection = new WebSocket(wsUrl, {
      headers: {
        'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`
      }
    });

    socketConnection.on('open', () => {
      console.log('Conexión WebSocket establecida');
      resolve();
    });

    socketConnection.on('message', (data) => {
      const message = JSON.parse(data.toString());
      if (message.event === 'console output') {
        consoleBuffer += message.args[0] + '\n';
        
        // Si hay un comando esperando respuesta, resolver la promesa
        if (commandResponseResolver) {
          commandResponseResolver(consoleBuffer.trim());
          commandResponseResolver = null;
          consoleBuffer = '';
        }
      }
    });

    socketConnection.on('error', (error) => {
      console.error('Error WebSocket:', error);
      reject(error);
    });

    socketConnection.on('close', () => {
      console.log('Conexión WebSocket cerrada');
      socketConnection = null;
    });
  });
}

// Función para enviar comandos a la consola
async function sendConsoleCommand(command) {
  if (!socketConnection) {
    throw new Error('No hay conexión WebSocket activa');
  }
  
  socketConnection.send(JSON.stringify({
    event: 'send command',
    args: [command]
  }));
}



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

// Formateador mejorado
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

handler.command = /^(ptero|server|consola)$/i;
handler.help = ['ptero <start|stop|restart|status>','ptero cmd <comando>'];

handler.owner = true;

export default handler;