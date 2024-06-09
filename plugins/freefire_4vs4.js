let handler = async (m, { conn, command, usedPrefix }) => {
let ff = `https://telegra.ph/file/0ea56fa1fba7bdbb619ae.jpg`
let vs4txt = `
╭──────⚔──────╮
ㅤㅤ4 𝐕𝐄𝐑𝐒𝐔𝐒 4
╰──────⚔──────╯
╭──────────────╮
🕓 𝗛𝗢𝗥𝗔: 
│➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: CLK
│
│     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 
│
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│
│ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
│⚜️ ➤ 
│⚜️ ➤ 
╰─────────────╯
                 
` //Aquí arriba cambiar el texto sin borrar las comillas
await conn.sendFile(m.chat, 'https://telegra.ph/file/0ea56fa1fba7bdbb619ae.jpg', 'fantasy.jpg', vs4txt.trim(),
//En esta imagen vas a poner el url de la imagen grande
 fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `Free Fire`,
body: `vs`,
mediaType: 1,
sourceUrl: 'https://www.instagram.com/ricardoookadm_',
thumbnailUrl: 'https://telegra.ph/file/0ea56fa1fba7bdbb619ae.jpg'
//Aquí arriba vas a poner el url de la imagen que irá junto a tu link de tu red social.
}}
}, { mentions: m.sender })

}
handler.command = /^(4vs4|vs4)$/i
export default handler
