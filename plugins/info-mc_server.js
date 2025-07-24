import fetch from 'node-fetch';

let lastRequestTime = 0;
let cachedResponse = null;

const handler = async (m, { conn }) => {
    try {
        await conn.sendPresenceUpdate('composing', m.chat);
        
        const serverAddress = 'it-node1.skyultraplus.com:2046';
        const forceRefresh = m.text.includes('!refresh'); // Comando secreto para forzar actualización
        
        const serverInfo = await checkMinecraftServer(serverAddress, forceRefresh);
        const response = formatServerResponse(serverInfo);
        
        await conn.reply(m.chat, response, m);
        
    } catch (error) {
        console.error('Error:', error);
        await conn.reply(m.chat, `❌ Error: ${error.message}`, m);
    }
};

async function checkMinecraftServer(address, forceRefresh = false) {
    const now = Date.now();
    

    if (!forceRefresh && cachedResponse && (now - lastRequestTime < 60000)) {
        return cachedResponse;
    }

    const url = `https://api.mcsrvstat.us/bedrock/3/${address}?_=${now}`;
    
    const response = await fetch(url, {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        },
        timeout: 10000
    });
    
    if (!response.ok) throw new Error(`API no disponible (${response.status})`);
    
    const data = await response.json();
    lastRequestTime = now;
    cachedResponse = data;
    
    return data;
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