import axios from 'axios';

const handler = async (m, { conn }) => {
  const API_URL = 'https://panel.skyultraplus.com/api/client/servers/1a39799b-aaf2-4c6c-ac53-15a72f34ebd0/resources';
  const API_KEY = 'ptlc_AC9ttaVgCmwmDs8DhE9ejPy9ffa7eGunbyDERnqJTqU';

  try {
    // 1. Primero verifica conectividad básica
    await conn.reply(m.chat, '🔍 Probando conexión con el panel...', m);
    
    const ping = await axios.get('https://panel.skyultraplus.com', { timeout: 5000 });
    await conn.reply(m.chat, `✅ Panel accesible (Status: ${ping.status})`, m);

    // 2. Prueba la API con autenticación
    await conn.reply(m.chat, '🔑 Probando autenticación API...', m);
    
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      },
      timeout: 8000
    });

    // 3. Verifica estructura de respuesta
    if (response.data?.object === 'server') {
      await conn.reply(m.chat, '✅ Autenticación exitosa!\n\n' + 
        `🆔 Server: ${response.data.attributes.name}\n` +
        `🔌 Estado: ${response.data.attributes.status}`, m);
    } else {
      await conn.reply(m.chat, '⚠️ Respuesta inesperada:\n' + 
        JSON.stringify(response.data, null, 2), m);
    }

  } catch (error) {
    let errorMsg = '❌ Error crítico:\n';
    
    if (error.code === 'ECONNABORTED') {
      errorMsg += 'Timeout: El panel no respondió a tiempo';
    } else if (error.response) {
      // Detalles específicos del error HTTP
      errorMsg += `Status: ${error.response.status}\n`;
      errorMsg += `Error: ${error.response.data?.errors?.[0]?.code || 'Sin detalles'}\n`;
      errorMsg += `Mensaje: ${error.response.data?.errors?.[0]?.detail || error.message}`;
      
      // Sugerencias basadas en el código de estado
      if (error.response.status === 403) {
        errorMsg += '\n\n🔐 Posibles soluciones:';
        errorMsg += '\n1. Verifica que la API Key sea del tipo Client (ptlc_)';
        errorMsg += '\n2. Revisa los permisos de la API Key';
        errorMsg += '\n3. Comprueba si tu IP está bloqueada';
      }
    } else {
      errorMsg += error.message;
    }
    
    await conn.reply(m.chat, errorMsg, m);
  }
};

handler.command = /^testptero$/i;
export default handler;