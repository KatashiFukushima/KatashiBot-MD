let handler = async (m, { conn, command, usedPrefix }) => {
let pp = `https://telegra.ph/file/f5580f6fcacfe726d7cd4.jpg`
let stafftxt = `💫 *EQUIPO STAFF*
🥷 *Bot:* ${gt}
☁️ *Versión:* ${vs}

👑 *Propietario:*

• KatashiFukushima
☘️ *Rol:* Propietario
✨️ *Número:* ${nomorown}
🏆 *GitHub:* https://github.com/KatashiFukushima

💫 *Colaboradores:*

• Diego-YL-177
☘️ *Rol:* Developer
✨️ *Número:* Wa.me/573218138672
🏆 *GitHub:* https://github.com/Diego-YL-177

• GataNina-Li
☘️ *Rol:* Developer
✨️ *Número:* Wa.me/593968263524
🏆 *GitHub:* https://github.com/GataNina-Li

• elrebelde21
☘️ *Rol:* Developer
✨️ *Número:* Wa.me/573147616444
🏆 *GitHub:* https://github.com/elrebelde21

• AzamiJs
☘️ *Rol:* Developer
✨️ *Número:* Wa.me/5214434703586
🏆 *GitHub:* https://github.com/AzamiJs

• Alba070503
☘️ *Rol:* Developer
✨️ *Número:* Wa.me/59169082575
🏆 *GitHub:* https://github.com/Alba070503` //Aquí arriba cambiar el texto sin borrar las comillas
await conn.sendFile(m.chat, pp, 'cb.jpg', stafftxt.trim(),
//En esta imagen vas a poner el url de la imagen grande
 fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `🥷 Developer 👑`,
body: `💭 Staff Oficial`,
mediaType: 1,
sourceUrl: accountsgb,
thumbnailUrl: 'https://telegra.ph/file/ec5b3f141f1318dea620e.jpg'
//Aquí arriba vas a poner el url de la imagen que irá junto a tu link de tu red social.
}}
}, { mentions: m.sender })

}
handler.command = /^(staff|colaboradores)$/i
export default handler
