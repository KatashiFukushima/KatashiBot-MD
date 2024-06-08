let handler = async (m, { conn, command, usedPrefix }) => {
let ff = `https://telegra.ph/file/0ea56fa1fba7bdbb619ae.jpg`
let infinitytxt = `
Ingrese texto que irá con el comando *.donarsala*
`
await conn.sendFile(m.chat, 'https://telegra.ph/file/0ea56fa1fba7bdbb619ae.jpg', 'fantasy.jpg', infinitytxt.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `Free Fire`,
body: `Donar Sala`,
mediaType: 1,
sourceUrl: accountsgb,
thumbnailUrl: 'https://telegra.ph/file/0ea56fa1fba7bdbb619ae.jpg'
}}
}, { mentions: m.sender })

}
handler.command = /^(pruebakatas|donarsala)$/i
export default handler
