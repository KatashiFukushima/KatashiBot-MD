import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        await conn.sendPresenceUpdate('composing', m.chat);
        
        const serverAddress = 'it-node1.skyultraplus.com:2046';
        const serverInfo = await checkMinecraftServer(serverAddress);
        const response = formatServerResponse(serverInfo);
        
        await conn.reply(m.chat, response, m);
        
    } catch (error) {
        console.error('Error:', error);
        let errorMessage = '❌ Error al verificar el servidor';
        if (error.message.includes('fetch failed')) {
            errorMessage = '🌐 No se pudo conectar al servicio de monitoreo';
        }
        await conn.reply(m.chat, `${errorMessage}\nDetalles: ${error.message}`, m);
    }
};

async function checkMinecraftServer(address) {
    const url = `https://api.mcsrvstat.us/bedrock/3/${address}`;
    const response = await fetch(url, {
        timeout: 10000 // 10 segundos de timeout
    });
    
    if (!response.ok) {
        throw new Error(`API respondió con estado ${response.status}`);
    }
    
    return await response.json();
}

function formatServerResponse(data) {
    if (!data.online) {
        return `*🔴 SERVIDOR OFFLINE*\n\n` +
               `▸ IP: ${data.ip || 'N/A'}\n` +
               `▸ Puerto: ${data.port || 'N/A'}\n` +
               `▸ Última consulta: ${new Date().toLocaleTimeString()}`;
    }

    const playerList = data.players?.list?.length > 0 ? 
        `\n👥 *Jugadores conectados:*\n` +
        data.players.list.map(p => `▸ ${p.name}`).join('\n') : 
        '\n👤 *No hay jugadores conectados*';

    return `*🟢 SERVIDOR ONLINE*\n\n` +
           `🌐 *IP:* ${data.ip}:${data.port}\n` +
           (data.hostname ? `🔗 *Hostname:* ${data.hostname}\n` : '') +
           `🛠 *Versión:* ${data.version || 'Desconocida'}\n` +
           `🎮 *Modo de juego:* ${data.gamemode || 'N/A'}\n` +
           (data.map ? `🗺 *Mapa:* ${data.map.clean || data.map.raw}\n` : '') +
           (data.software ? `⚙️ *Software:* ${data.software}\n` : '') +
           `\n👤 *Jugadores:* ${data.players?.online || 0}/${data.players?.max || '?'}` +
           playerList +
           `\n\n⏰ *Última consulta:* ${new Date().toLocaleTimeString()}` +
           `\n✨ *API:* mcsrvstat.us`;
}

handler.command = /^(mc|minecraft|serverstatus)$/i;
handler.help = ['mc', 'minecraft', 'serverstatus'];
handler.tags = ['games'];
handler.limit = true;

export default handler