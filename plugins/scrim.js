let handler = async (m, { conn, command, usedPrefix }) => {
let ff = `https://telegra.ph/file/0ea56fa1fba7bdbb619ae.jpg`
let scrimstxt = `
╭──────⚔──────╮
ㅤ𝐒𝐂𝐑𝐈𝐌𝐒 𝐂𝐎𝐌𝐏𝐄𝐓𝐈𝐓𝐈𝐕𝐎
╰──────⚔──────╯
╭──────────────╮
│ㅤ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎 
│ㅤ🇲🇽 𝐌𝐄𝐗 : 
│ㅤ🇨🇴 𝐂𝐎𝐋 : 
│➥ 𝐓𝐎𝐓𝐀𝐋 𝐒𝐀𝐋𝐀𝐒:
│➥ 𝐂𝐀𝐒𝐈𝐋𝐋𝐀:
│➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:
│
│     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 
│
│👑 ➤ 
│🥷🏻 ➤  
│🥷🏻 ➤ 
│🥷🏻 ➤ 
│
│ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
│🥷🏻 ➤  
│🥷🏻 ➤
╰─────────────╯
  
` //Aquí arriba cambiar el texto sin borrar las comillas
await conn.sendFile(m.chat, 'https://telegra.ph/file/0ea56fa1fba7bdbb619ae.jpg', 'fantasy.jpg', scrimstxt.trim(),
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
handler.command = /^(12vs12|scrims)$/i
export default handler
