let handler = async (m, { conn, command, usedPrefix }) => {
let ff = `https://telegra.ph/file/0ea56fa1fba7bdbb619ae.jpg`
let vs8txt = `
╭──────⚔──────╮
ㅤㅤㅤ8 𝐕𝐄𝐑𝐒𝐔𝐒 8
╰──────⚔──────╯
╭──────────────╮
│ㅤ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎  
│ㅤ🇲🇽 𝐌𝐄𝐗 : 
│ㅤ🇨🇴 𝐂𝐎𝐋 : 
│➥ 𝐂𝐎𝐋𝐎𝐑 𝐃𝐄 𝐑𝐎𝐏𝐀: 
│➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:
│
│     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
│
│👑 ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│⚜️ ➤ 
│     
│    𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2
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
await conn.sendFile(m.chat, 'https://telegra.ph/file/0ea56fa1fba7bdbb619ae.jpg', 'fantasy.jpg', vs8txt.trim(),
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
handler.command = /^(8vs8|vs8)$/i
export default handler
