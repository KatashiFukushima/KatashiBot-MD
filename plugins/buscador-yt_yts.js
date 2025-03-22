import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
if (!text) return m.reply(`Ingrese texto o responda a un mensaje con el texto que desea buscar en YouTube.\nEjemplo de uso:\n*${usedPrefix + command} GataBot*`)
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

//await conn.sendCarousel(m.chat, `${htki} *𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎* ${htka}\n`, htki + "YouTube Search" + htka, messages, m);
}
};
handler.command = /^playlist|ytbuscar|yts(earch)?$/i
export default handler
