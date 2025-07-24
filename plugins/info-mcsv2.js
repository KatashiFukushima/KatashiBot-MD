import axios from 'axios';
import { format } from 'util';

// Configuración de Pterodactyl
const PTERODACTYL_CONFIG = {
  PANEL_URL: 'https://panel.skyultraplus.com', // Reemplaza con tu URL del panel
  SERVER_ID: '1a39799b-aaf2-4c6c-ac53-15a72f34ebd0',
  API_KEY: 'ptlc_AC9ttaVgCmwmDs8DhE9ejPy9ffa7eGunbyDERnqJTqU'
};

const handler = async (m, { conn, text, usedPrefix, command }) => {

  const action = text.toLowerCase();
  const validActions = ['start', 'stop', 'restart', 'status', 'console'];

  if (!validActions.includes(action)) {
    const helpMessage = `⚡ *Comandos disponibles:*\n\n` +
      `▸ *${usedPrefix}ptero start* - Inicia el servidor\n` +
      `▸ *${usedPrefix}ptero stop* - Detiene el servidor\n` +
      `▸ *${usedPrefix}ptero restart* - Reinicia el servidor\n` +
      `▸ *${usedPrefix}ptero status* - Muestra el estado\n` +
      `▸ *${usedPrefix}ptero console* - Obtiene la consola (últimas 50 líneas)`;
    return conn.reply(m.chat, helpMessage, m);
  }

  try {
    await conn.sendPresenceUpdate('composing', m.chat);

    let response;
    switch (action) {
      case 'console':
        response = await getServerConsole();
        return conn.reply(m.chat, formatConsoleOutput(response.data), m);

      case 'status':
        response = await getServerStatus();
        return conn.reply(m.chat, formatStatus(response.data), m);

      default:
        await sendPowerAction(action);
        const actionEmoji = {
          start: '🟢',
          stop: '🔴',
          restart: '🔄'
        };
        return conn.reply(m.chat, `${actionEmoji[action]} *Servidor ${action.toUpperCase()} exitoso*`, m);
    }
  } catch (error) {
    console.error('Error en handler:', error);
    const errorDetail = error.response?.data?.errors?.[0]?.detail || error.message;
    return conn.reply(m.chat, `❌ Error al ejecutar *${action}*: ${errorDetail}`, m);
  }
};

// Funciones de la API
async function sendPowerAction(signal) {
  const url = `${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/power`;
  return axios.post(url, { signal }, {
    headers: {
      'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 15000
  });
}

async function getServerStatus() {
  const url = `${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/resources`;
  return axios.get(url, {
    headers: {
      'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`
    },
    timeout: 10000
  });
}

async function getServerConsole() {
  const url = `${PTERODACTYL_CONFIG.PANEL_URL}/api/client/servers/${PTERODACTYL_CONFIG.SERVER_ID}/websocket`;
  return axios.get(url, {
    headers: {
      'Authorization': `Bearer ${PTERODACTYL_CONFIG.API_KEY}`
    },
    params: {
      lines: 50 // Últimas 50 líneas de la consola
    },
    timeout: 10000
  });
}

// Formateadores de respuesta
function formatStatus(data) {
  const status = data.attributes.current_state === 'running' ? '🟢 EN LÍNEA' : '🔴 DETENIDO';
  return `📊 *Estado del Servidor*\n\n` +
    `▸ *Estado:* ${status}\n` +
    `▸ *Uso de CPU:* ${data.attributes.resources.cpu_absolute.toFixed(2)}%\n` +
    `▸ *Memoria:* ${(data.attributes.resources.memory_bytes / 1024 / 1024).toFixed(2)} MB\n` +
    `▸ *Uptime:* ${formatUptime(data.attributes.resources.uptime)}\n` +
    `▸ *Servidor:* ${PTERODACTYL_CONFIG.SERVER_ID.slice(0, 8)}...`;
}

function formatConsoleOutput(data) {
  return `📜 *Últimas líneas de la consola*\n\n` +
    `${data.data.trim().split('\n').slice(-10).join('\n') || 'No hay datos de consola'}`;
}

function formatUptime(ms) {
  if (ms < 1000) return '0 segundos';
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

// Configuración del comando
handler.command = /^(ptero|server|mcctl)$/i;
handler.help = ['ptero <start/stop/restart/status/console>'];
handler.tags = ['admin'];
handler.owner = true;

export default handler;