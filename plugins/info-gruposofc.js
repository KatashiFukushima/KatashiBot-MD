let media = 'https://telegra.ph/file/7f0318607ccfdb6bcb66d.mp4'
let handler = async (m, { conn, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let str = `💕 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊(𝘼) 𝘼 𝙇𝙊𝙎 𝙂𝙍𝙐𝙋𝙊𝙎 𝙊𝙁𝙄𝘾𝙄𝘼𝙇𝙀𝙎

💞 𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝙏𝙃𝙀 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇 𝙂𝙍𝙊𝙐𝙋𝙎
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙏𝙚 𝙞𝙣𝙫𝙞𝙩𝙤 𝙖 𝙦𝙪𝙚 𝙩𝙚 𝙪𝙣𝙖𝙨 𝙖 𝙡𝙖 𝘾𝙤𝙢𝙪𝙣𝙞𝙙𝙖𝙙 𝙆𝙖𝙩𝙖𝙨𝙝𝙞𝘽𝙤𝙩. ✨ 𝙏𝙚𝙣 𝙪𝙣 𝙗𝙪𝙚𝙣 𝙢𝙤𝙢𝙚𝙣𝙩𝙤 𝙚 𝙞𝙣𝙩𝙚𝙧𝙖𝙘𝙘𝙞𝙤𝙣𝙖 𝙘𝙤𝙣 𝙉𝙤𝙨𝙤𝙩𝙧𝙤𝙨. 👻
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𓃠 *Versión de ${gt}*
➥ ${vs}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
✅ 𝙂𝙍𝙐𝙋𝙊𝙎 𝙊𝙁𝙄𝘾𝙄𝘼𝙇𝙀𝙎 ${gt}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
✨ *Informate de las Novedades!!!*
𝐶𝑎𝑛𝑎𝑙𝑒𝑠 𝑑𝑒 𝐾𝑎𝑡𝑎𝑠ℎ𝑖𝐵𝑜𝑡 🥷🏻 *${channel1}*\n
*${nna}*\n
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
♥𝓚𝓪𝓽𝓪𝓼𝓱𝓲-𝓑𝓸𝓽♥ *${nna2}*\n
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
☆𝑨𝒏𝒊𝒎𝒆♡𝑨𝒎𝒊𝒔𝒕𝒂𝒅♡ *${nn}*\n
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*𝗣𝗮𝗽𝘂𝗖𝗶𝘁𝘆 👻* *${nnn}*\n
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*𝗣𝗮𝗽𝘂𝗚𝗮𝘆𝗺𝗲𝗿𝘀 ᕼᗪ* *${nnnt}*\n
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙷𝚎𝚗𝚝𝚊𝚒 𝚎𝚜 𝚕𝚒𝚝𝚎𝚛𝚊𝚝𝚞𝚛𝚊🚬 *${nnntt}*\n
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙰𝚗𝚎𝚡𝚊𝚍𝚘𝚜 𝚍𝚎𝚕 𝚒𝚗𝚏𝚒𝚎𝚛𝚗𝚘 *${nnnttt}*\n

*Por favor, no ingresar con números de Bots, y mantener el respeto.*\n
*Please, do not enter with Bot numbers, and maintain respect.*`

const vi = ['https://telegra.ph/file/7f0318607ccfdb6bcb66d.mp4',
'https://telegra.ph/file/a848eeb479e662f2e3fab.mp4',
'https://telegra.ph/file/117391db9016a51f73618.mp4']
//await conn.sendFile(m.chat, vi.getRandom(), 'gata.mp4', str, fkontak)}
//const vi = ['https://telegra.ph/file/7f0318607ccfdb6bcb66d.mp4',
//'https://telegra.ph/file/a848eeb479e662f2e3fab.mp4',
//'https://telegra.ph/file/117391db9016a51f73618.mp4']
await conn.sendMessage(m.chat, { video: { url: vi.getRandom() }, gifPlayback: true, caption: str, mentions: [m.sender, global.conn.user.jid] }, fkontak)}
/*conn.sendHydrated(m.chat, str, `𝙂𝘼𝙏𝘼 𝘿𝙄𝙊𝙎 - 𝘼𝙎𝙄𝙎𝙏𝙀𝙉𝘾𝙄𝘼\n${asistencia}\n\n` + wm, media, 'https://github.com/GataNina-Li/GataBot-MD', '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
['𝘾𝙪𝙚𝙣𝙩𝙖𝙨 𝙊𝙛𝙞𝙘𝙞𝙖𝙡𝙚𝙨 | 𝘼𝙘𝙘𝙤𝙪𝙣𝙩𝙨 ✅', '.cuentasgb'],
['🎁 𝘿𝙤𝙣𝙖𝙧 | 𝘿𝙤𝙣𝙖𝙩𝙚', '.donar'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
], m,)}*/

handler.command = /^linkgc|grupos|gruposkatashibot|gatabotgrupos|gruposkatashibot|groupofc|gruposkb|grupokb|groupkb$/i
handler.exp = 33

export default handler
