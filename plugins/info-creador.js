var handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let pp = gataImg.getRandom()	
const cat = `
╭ ❖ ── ✦ ── ✦ ── ❖ ──╗
│
│ ✥𝑲𝒂𝒕𝒂𝒔𝒉𝒊 𝑭𝒖𝒌𝒖𝒔𝒉𝒊𝒎𝒂✥ 
│ *Wa.me/51948705559*
│
│ 𝑖𝑍𝑖
│ *wa.me/527442363122*
│
│ シ︎𝑾𝒊𝒍𝖘𝒐𝒏シ︎
│ *wa.me/5492964650915*
│
│*GRUPO OFICIAL DE KATASHIBOT*
│*https://chat.whatsapp.com/GOMZkMih9onHg80KsQfIFA*
│
│𝙆𝘼𝙏𝘼𝙎𝙃𝙄 𝙁𝙐𝙆𝙐𝙎𝙃𝙄𝙈𝘼 - 𝘼𝙎𝙄𝙎𝙏𝙀𝙉𝘾𝙄𝘼
│*${asistencia}*
╰─ ❖ ── ✦ ── ✦ ── ❖ ──╝`

await conn.sendFile(m.chat, pp, 'gata.mp4', cat, fkontak)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|creator|propietario|dueño|dueña|propietaria|dueño|creadora|creador)$/i

export default handler
