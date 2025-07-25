import axios from 'axios';
import WebSocket from 'ws';

const PTERODACTYL_CONFIG = {
  PANEL_URL: 'https://panel.skyultraplus.com',
  SERVER_ID: '1a39799b-aaf2-4c6c-ac53-15a72f34ebd0',
  API_KEY: 'ptlc_AC9ttaVgCmwmDs8DhE9ejPy9ffa7eGunbyDERnqJTqU'
};

// Configuración WebSocket
let socketConnection = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 3;
const RECONNECT_DELAY = 5000; // 5 segundos

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
      const commandToSend = args.slice(1).join(' ');
      
      try {
        // Intentar con WebSocket primero
        if (!socketConnection) await connectWebSocket();
        const wsResponse = await sendCommandViaWebSocket(commandToSend);
        return await conn.reply(m.chat, `📝 *Comando ejecutado (WebSocket):*\n${commandToSend}\n\n📋 *Respuesta:*\n${wsResponse}`, m);
      } catch (wsError) {
        console.error('Error WebSocket, usando fallback HTTP:', wsError);
        // Fallback a HTTP si WebSocket falla
        await sendConsoleCommand(commandToSend);
        const logs = await getConsoleOutput();
        return await conn.reply(m.chat, `📝 *Comando ejecutado (HTTP Fallback):*\n${commandToSend}\n\n📋 *Últimos logs:*\n${logs.slice(0, 500)}`, m);
      }
    }

    return await conn.reply(m.chat, `❌ Comando no válido. Usa:\n${usedPrefix}ptero <start|stop|restart|status|connect>\n${usedPrefix}ptero cmd <comando>`, m);

  } catch (error) {
    console.error('Error:', error);
    return await conn.reply(m.chat, `❌ Error: ${error.message}`, m);
  }
};

// Conexión WebSocket mejorada
async function connectWebSocket() {
  return new Promise((resolve, reject) => {
    if (socketConnection && socketConnection.readyState === WebSocket.OPEN) {
      return resolve();
    }

    // Cerrar conexión existente si hay alguna
    if (socketConnection) {
      socketConnection.removeAllListeners();
      socketConnection.close();
    }

    // Configurar URL WebSocket (alternativas)
    const wsUrls = [
      PTERODACTYL_CONFIG.PANEL_URL.replace('https', 'wss') + 
        `/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/ws`,
      PTERODACTYL_CONFIG.PANEL_URL.replace('https', 'wss') + 
        `/api/servers/${PTERODACTYL_CONFIG.SERVER_ID}/ws`
    ];

    let currentUrlIndex = 0;
    let lastError = null;

    const tryConnect = (urlIndex) => {
      if (urlIndex >= wsUrls.length) {
        reject(lastError || new Error('Todas las URLs WebSocket fallaron'));
        return;
      }

      const wsUrl = wsUrls[urlIndex];
      console.log(`Intentando conectar a WebSocket: ${wsUrl}`);

      socketConnection = new WebSocket(wsUrl, {
        headers: {
          'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`
        },
        rejectUnauthorized: false // Solo si tienes problemas con SSL
      });

      socketConnection.on('open', () => {
        console.log('Conexión WebSocket establecida');
        reconnectAttempts = 0;
        resolve();
      });

      socketConnection.on('error', (error) => {
        console.error(`Error WebSocket (${wsUrl}):`, error);
        lastError = error;
        
        // Intentar con la siguiente URL
        setTimeout(() => tryConnect(urlIndex + 1), 1000);
      });

      socketConnection.on('close', () => {
        console.log('Conexión WebSocket cerrada');
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts++;
          console.log(`Reintentando conexión (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
          setTimeout(() => tryConnect(0), RECONNECT_DELAY);
        }
      });
    };

    tryConnect(0);
  });
}

// Envío de comandos via WebSocket
async function sendCommandViaWebSocket(command) {
  if (!socketConnection || socketConnection.readyState !== WebSocket.OPEN) {
    throw new Error('Conexión WebSocket no disponible');
  }

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Tiempo de espera agotado (15 segundos)'));
    }, 15000);

    const listener = (data) => {
      try {
        const message = JSON.parse(data.toString());
        if (message.event === 'console output') {
          clearTimeout(timeout);
          socketConnection.removeListener('message', listener);
          resolve(message.args[0]);
        }
      } catch (e) {
        console.error('Error procesando mensaje WebSocket:', e);
      }
    };

    socketConnection.on('message', listener);
    socketConnection.send(JSON.stringify({
      event: 'send command',
      args: [command]
    }));
  });
}

// Fallback HTTP para obtener logs
async function getConsoleOutput(lines = 50) {
  const response = await axios.get(
    `${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/logs`,
    {
      headers: {
        'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`,
        'Accept': 'application/json'
      },
      params: { lines },
      timeout: 8000
    }
  );
  return response.data;
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

handler.command = /^(ptero|server|consola)$/i;
handler.help = ['ptero <start|stop|restart|status|connect>', 'ptero cmd <comando>  // Ejecuta comando y muestra respuesta'];

handler.owner = true;

process.on('exit', () => {
  if (socketConnection) {
    socketConnection.close();
  }
});

export default handler;