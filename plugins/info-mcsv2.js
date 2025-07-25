import axios from 'axios';

const PTERODACTYL_CONFIG = {
  PANEL_URL: 'https://panel.skyultraplus.com',
  SERVER_ID: '1a39799b-aaf2-4c6c-ac53-15a72f34ebd0',
  API_KEY: 'ptlc_AC9ttaVgCmwmDs8DhE9ejPy9ffa7eGunbyDERnqJTqU'
};

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
      const commandResponse = await sendConsoleCommand(commandToSend);
      
      let responseMessage = `📝 *Comando ejecutado:* ${commandToSend}\n`;
      responseMessage += `📋 *Respuesta:*\n${commandResponse || 'No hubo salida visible'}`;
      
      return await conn.reply(m.chat, responseMessage, m);
    }

    return await conn.reply(m.chat, 
      `❌ Comando no válido. Usa:\n${usedPrefix}ptero <start|stop|restart|status>\n${usedPrefix}ptero cmd <comando>`, 
      m
    );

  } catch (error) {
    console.error('Error:', error);
    let errorMsg = '❌ Error: ';
    
    if (error.response) {
      errorMsg += `API (${error.response.status}): ${error.response.data?.errors?.[0]?.detail || 'Sin detalles'}`;
    } else {
      errorMsg += error.message;
    }
    
    return await conn.reply(m.chat, errorMsg, m);
  }
};

// Función modificada para usar el endpoint correcto
async function sendConsoleCommand(command) {
  try {
    // 1. Enviar el comando
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

    // 2. Obtener el websocket token (necesario para la conexión)
    const { data: wsToken } = await axios.get(
      `${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/websocket`,
      {
        headers: {
          'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`
        }
      }
    );

    // 3. Conectar al websocket para recibir la salida
    // Nota: Esto requiere implementación de WebSocket en tu entorno
    // Aquí deberías implementar la lógica de conexión WS
    
    return "⚠️ La función de captura de output requiere WebSockets. Implementación avanzada necesaria.";
    
  } catch (error) {
    console.error('Error en sendConsoleCommand:', error);
    throw new Error('No se pudo enviar el comando o capturar la respuesta');
  }
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
