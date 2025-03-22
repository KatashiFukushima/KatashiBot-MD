import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
if (!text) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝙐𝙉 𝙑𝙄𝘿𝙀𝙊 𝙊 𝘾𝘼𝙉𝘼𝙇 𝘿𝙀 𝙔𝙊𝙐𝙏𝙐𝘽𝙀\n\n𝙒𝙍𝙄𝙏𝙀 𝙏𝙃𝙀 𝙉𝘼𝙈𝙀 𝙊𝙁 𝘼 𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝙑𝙄𝘿𝙀𝙊 𝙊𝙍 𝘾𝙃𝘼𝙉𝙉𝙀𝙇`, fkontak,  m)
m.react('📀');
let result = await yts(text);
let ytres = result.videos;
if (!ytres.length) return m.reply('❌ No se encontraron resultados.');

if (m.isWABusiness) {
let textoo = `${htki} 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎 ${htka}  ${text}\n\n`;
for (let i = 0; i < Math.min(15, ytres.length); i++) { 
let v = ytres[i];
textoo += `❤️꙰༻ *TÍTULO:* ${v.title}\n⁖📆༻ *PUBLICADOS HACE:* ${v.ago}\n⁖👀༻ *VISTAS:* ${v.views}\n⁖⏰༻ *DURACIÓN:* ${v.timestamp}\n📎꙰༻ *LINK:* ${v.url}\n\n••••••••••••••••••••••••••••••••••••\n\n`;
}
await conn.sendFile(m.chat, ytres[0].image, 'thumbnail.jpg', textoo, m, null, fake);
} else {
let selectedResults = ytres.slice(0, 11);
let messages = selectedResults.map(v => [
``, 
`❤️꙰༻ *TÍTULO:* ${v.title}\n⁖📆༻ *PUBLICADOS HACE:* ${v.ago}\n⁖👀༻ *VISTAS:* ${v.views}\n⁖⏰༻ *DURACIÓN:* ${v.timestamp}`, 
v.image, 
[],
[["Copia para descargar", `.ytmp4 ${v.url}`]], 
[], 
[]]);

await conn.sendCarousel(m.chat, `${htki} *𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎* ${htka}\n`, htki + "YouTube Search" + htka, messages, m);
}
};
handler.help = ['playlist']
handler.tags = ['dl']
handler.command = /^playlist|ytbuscar|yts(earch)?$/i
handler.limit = 1
handler.level = 3
export default handler
