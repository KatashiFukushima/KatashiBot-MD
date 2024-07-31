let handler = async (m, { conn, command, usedPrefix }) => {
let pp = `https://telegra.ph/file/f5580f6fcacfe726d7cd4.jpg`
let stafftxt = `💫 *EQUIPO STAFF*
🥷 *Bot:* ${gt}
☁️ *Versión:* ${vs}

👑 『 *Propietario:* 』 👑

• *KatashiFukushima*
🔰 *Rol:* Propietario
📲 *Número:* ${nomorown}
🧲 *GitHub:* https://github.com/KatashiFukushima

💫 *Colaboradores:*

• Diego-YL-177
🔰 *Rol:* Developer
📲 *Número:* Wa.me/573218138672
🧲 *GitHub:* https://github.com/Diego-YL-177

• SoIz1
🔰 *Rol:* Developer
📲 *Número:* Wa.me/5217442363122
🧲 *GitHub:* https://github.com/SoIz1

• WilsonOFC
🔰 *Rol:* Developer
📲 *Número:* Wa.me/5492964650915
🧲 *GitHub:* https://github.com/WilsonOFC

• Alba070503
🔰 *Rol:* Developer
📲 *Número:* Wa.me/59169082575
🧲 *GitHub:* https://github.com/Alba070503

_*Todos nosotros somos parte de KatashiBot.*_ 
> Agradecemos el uso que le das al bot y puedes comunicarte con cualquiera de nosotros si necesitas ayuda o soporte sobre el bot o el servidor que usamos para hacer posible la activad de nuestro Bot.`
await conn.sendFile(m.chat, pp, 'cb.jpg', stafftxt.trim(), fkontak, true, {
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
}}
}, { mentions: m.sender })

}
handler.command = /^(staff|colaboradores)$/i
export default handler
