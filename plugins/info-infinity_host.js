let handler = async (m, { conn, command, usedPrefix }) => {
let infinitytxt = `
_Optimice la implementación de *GataBot* mediante la integración en un servicio de alojamiento de alto rendimiento._

*🥷 Compatible con KatashiBot*
Aprovecha la compatibilidad y comienza usar KatashiBot en servidores de alto rendimiento. El Staff de KatashiBot y InfinityHost hacen posible que puedas ejecutar las funciones que tanto te gusta usar sintiendo una experiencia fluida y de calidad.

🔵 \`\`\`Información del Host\`\`\`

✨ *Dashboard*
https://dashboard.infinitywa.xyz/

⚙️ *Panel*
https://store.panel-infinitywa.store/

📢 *Canal de WhatsApp*
https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A

💥 *Grupo de WhatsApp*
https://chat.whatsapp.com/J7DTlOOCuEhJS7CW6OSINJ

📧 *Correo*
katashifukushima23@gmail.com

🧑‍💻 *Contacto (Katashi Fukushima)*
https://wa.me/51948705559
`
await conn.sendFile(m.chat, 'https://telegra.ph/file/5bfb99ebc653ff9c24120.jpg', 'fantasy.jpg', infinitytxt.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `☁ INFINITY-HOST ☁`,
body: `✅ Hosting de Calidad`,
mediaType: 1,
sourceUrl: accountsgb,
thumbnailUrl: 'https://telegra.ph/file/5bfb99ebc653ff9c24120.jpg'
}}
}, { mentions: m.sender })

}
handler.command = /^(infinity|infinityhost|host|prueba38)$/i
export default handler
