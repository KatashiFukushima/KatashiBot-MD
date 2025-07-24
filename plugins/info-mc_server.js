import fetch from 'node-fetch';

//
let lastRequestData = null;
let lastRequestTime = 0;

const handler = async (m, { conn }) => {
    try {
        await conn.sendPresenceUpdate('composing', m.chat);
        
        const serverAddress = 'it-node1.skyultraplus.com:2046';
        const forceRefresh = m.text.includes('!force'); // Comando secreto para forzar actualización
        
        const serverInfo = await checkMinecraftServer(serverAddress, forceRefresh);
        const response = formatServerResponse(serverInfo);
        
        await conn.reply(m.chat, response, m);
        
    } catch (error) {
        console.error('Error:', error);
        await conn.reply(m.chat, `❌ Error: ${error.message}\n\nPrueba con *${usedPrefix}mc!force* para forzar actualización`, m);
    }
};

async function checkMinecraftServer(address, forceRefresh = false) {
    // 
    const strategies = [
        async () => {
            // 
            const timestamp = Date.now();
            const url = `https://api.mcsrvstat.us/bedrock/3/${address}?_=${timestamp}&rand=${Math.random()}`;
            const response = await fetch(url, {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                },
                timeout: 8000
            });
            return await response.json();
        },
        async () => {
            // 
            const url = `https://api.mcsrvstat.us/2/${address}`;
            const response = await fetch(url);
            return await response.json();
        },
        async () => {
            //
            const url = `https://cors-anywhere.herokuapp.com/https://api.mcsrvstat.us/bedrock/3/${address}?bypass=${Date.now()}`;
            const response = await fetch(url);
            return await response.json();
        }
    ];

    //
    for (const strategy of strategies) {
        try {
            const data = await strategy();
            
            // Verificar si los datos son diferentes a los anteriores
            if (forceRefresh || JSON.stringify(data) !== JSON.stringify(lastRequestData)) {
                lastRequestData = data;
                lastRequestTime = Date.now();
                return data;
            }
        } catch (e) {
            console.log(`Estrategia fallida: ${e.message}`);
        }
    }
    
    throw new Error('No se pudo obtener datos actualizados');
}

function formatServerResponse(data) {
    const now = new Date();
    const lastUpdated = `\n\n🕒 Actualizado: ${now.toLocaleTimeString()}`;
    
    if (!data.online) {
        return `*🔴 SERVIDOR OFFLINE*${lastUpdated}\n` +
               `IP: ${data.ip || 'N/A'}:${data.port || 'N/A'}\n` +
               `Último chequeo: ${now.toLocaleString()}`;
    }

    const playerList = data.players?.list?.length > 0 ? 
        `\n👥 Jugadores (${data.players.online}/${data.players.max}):\n` +
        data.players.list.slice(0, 10).map(p => `▸ ${p.name}`).join('\n') +
        (data.players.online > 10 ? `\n... y ${data.players.online - 10} más` : '') : 
        '\n👤 No hay jugadores conectados';

    return `*🟢 SERVIDOR ONLINE*${lastUpdated}\n` +
           `🌐 ${data.hostname || data.ip}:${data.port}\n` +
           `🛠 ${data.version || 'Versión desconocida'}\n` +
           `🎮 Modo: ${data.gamemode || 'N/A'}\n` +
           (data.map ? `🗺 Mapa: ${data.map.clean || data.map.raw}\n` : '') +
           (data.software ? `⚙️ Software: ${data.software}\n` : '') +
           playerList;
}

handler.command = /^(mc|minecraft|serverstatus|mc!force)$/i;
handler.help = ['mc', 'minecraft', 'serverstatus', 'mc!force'];
handler.tags = ['games'];
export default handler;