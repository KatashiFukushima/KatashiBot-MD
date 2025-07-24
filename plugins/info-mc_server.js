import fetch from 'node-fetch';
import axios from 'axios';
//
const handler = async (m, { conn, text, usedPrefix, command }) => {

  //  if (!text) return conn.reply(m.chat, `✳️ Uso correcto: *${usedPrefix}mc <servidor:puerto> <tipo>*\nEjemplo: *${usedPrefix}mc it-node1.skyultraplus.com:2046 bedrock*`, m);
    
  /*  const args = text.split(' ');
    if (args.length < 2) return conn.reply(m.chat, `❌ Formato incorrecto. Necesitas especificar servidor y tipo.\nEjemplo: *${usedPrefix}mc it-node1.skyultraplus.com:2046 bedrock*`, m);

    const [server, tipo] = args;
    const validTypes = ['bedrock', 'java'];
    
    if (!validTypes.includes(tipo.toLowerCase())) {
        return conn.reply(m.chat, `❌ Tipo de servidor inválido. Usa *bedrock* o *java*`, m);
    }*/

    try {
        // Indicar que el bot está escribiendo
        await conn.sendPresenceUpdate('composing', m.chat);
        
        const server = 'it-node1.skyultraplus.com:2046';
        const tipo = 'bedrock';
        // Consultar la API
        const serverInfo = await checkMinecraftServer(server, tipo);
        const response = formatServerResponse(serverInfo);
        
        // Enviar respuesta con formato
        await conn.reply(m.chat, response, m);
        
    } catch (error) {
        console.error('Error:', error);
        let errorMessage = '❌ Error al verificar el servidor';
        if (error.response?.status === 404) {
            errorMessage = '🔍 Servidor no encontrado o no responde';
        } else if (error.message.includes('ECONNREFUSED')) {
            errorMessage = '📛 No se pudo conectar al servidor (tiempo de espera agotado)';
        }
        await conn.reply(m.chat, `${errorMessage}\nDetalles: ${error.message}`, m);
    }
};

async function checkMinecraftServer(server, tipo) {
    const url = `https://api.dorratz.com/v3/mc-server?server=it-node1.skyultraplus.com:2046&tipo=bedrock`;
    const response = await axios.get(url, {
        timeout: 10000 // 10 segundos de timeout
    });
    return response.data;
}

// Formateador de respuesta (mejorado)
function formatServerResponse(data) {
    const statusEmoji = data.status === 'online' ? '🟢' : '🔴';
    const playerList = data.players.list?.length > 0 ? 
        `\n  👥 Jugadores conectados:\n  ${data.players.list.map(p => `▸ ${p}`).join('\n  ')}` : '';
    
    return `*⎔ Minecraft Server Status ⎔*
    
${statusEmoji} *Estado:* ${data.status.toUpperCase()}

🌐 *Tipo:* ${data.serverType}
🔌 *Servidor:* ${data.host}:${data.port}
📝 *Descripción:* ${data.description || 'N/A'}
🛠 *Versión:* ${data.version || 'Desconocida'}
🎮 *Modo de juego:* ${data.gamemode || 'N/A'}
🗺 *Mapa:* ${data.map || 'N/A'}

👤 *Jugadores:* ${data.players.online}/${data.players.max}${playerList}

⚡ *Consultado con:* ${data.queriedWith}
✨ _SoIz1_`;
}

// Asignación de comandos (adaptar según tu sistema)
handler.command = /^(mc|minecraft|serverstatus)$/i;
handler.help = ['mc <servidor:puerto> <bedrock|java>', 'minecraft <servidor> <tipo>'];
handler.tags = ['games'];
handler.limit = true; // Puedes ajustar esto

export default handler
