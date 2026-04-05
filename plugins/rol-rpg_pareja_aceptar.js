/* import fetch from 'node-fetch' 
//import { areJidsSameUser } from '@adiwajshing/baileys'
let { areJidsSameUser } = (await import(global.baileys)).default
let handler = async (m, { conn, text, participants, usedPrefix, groupMetadata }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let grupos = [grupo1, grupo2, grupo3, grupo4, grupo5, grupo6]
let gata = [img5, img6, img7, img8, img9]
let enlace = { contextInfo: { externalAdReply: {title: wm + ' 🐈', body: 'support group' , sourceUrl: grupos.getRandom(), thumbnail: await(await fetch('https://telegra.ph/file/bb6768e019760933dadc7.jpg')).buffer() }}}
let enlace2 = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: yt, mediaType: 'VIDEO', description: '', title: wm, body: '😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', thumbnailUrl: await(await fetch('https://telegra.ph/file/bb6768e019760933dadc7.jpg')).buffer(), sourceUrl: yt }}}
let dos = [enlace, enlace2]

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
var number = text.split`@`[1]

if(!text && !m.quoted) return await conn.reply(m.chat, `${mg}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘿𝙀 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙌𝙐𝙄𝙀𝙍𝙀 𝙌𝙐𝙀 𝙎𝙀𝘼 𝙎𝙐 𝙋𝘼𝙍𝙀𝙅𝘼\n\n𝙏𝘼𝙂 𝙊𝙍 𝙍𝙀𝙋𝙇𝙔 𝙏𝙊 𝙏𝙃𝙀 𝙈𝙀𝙎𝙎𝘼𝙂𝙀 𝙁𝙍𝙊𝙈 𝙏𝙃𝙀 𝙋𝙀𝙍𝙎𝙊𝙉 𝙔𝙊𝙐 𝙒𝘼𝙉𝙏 𝙏𝙊 𝘽𝙀 𝙔𝙊𝙐𝙍 𝙋𝘼𝙍𝙏𝙉𝙀𝙍`, fkontak, m)
try {
//await conn.sendButton(m.chat, `${mg}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘿𝙀 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙌𝙐𝙄𝙀𝙍𝙀 𝙌𝙐𝙀 𝙎𝙀𝘼 𝙎𝙐 𝙋𝘼𝙍𝙀𝙅𝘼\n\n𝙏𝘼𝙂 𝙊𝙍 𝙍𝙀𝙋𝙇𝙔 𝙏𝙊 𝙏𝙃𝙀 𝙈𝙀𝙎𝙎𝘼𝙂𝙀 𝙁𝙍𝙊𝙈 𝙏𝙃𝙀 𝙋𝙀𝙍𝙎𝙊𝙉 𝙔𝙊𝙐 𝙒𝘼𝙉𝙏 𝙏𝙊 𝘽𝙀 𝙔𝙊𝙐𝙍 𝙋𝘼𝙍𝙏𝙉𝙀𝙍`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m)
	
try {
if(text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = conn.getName(m.quoted.sender)
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
}  
} catch (e) {
} finally {
	
let users = m.isGroup ? participants.find(v => areJidsSameUser(v.jid == user)) : {}
let yo = conn.getName(m.sender)
let tu = conn.getName(who)

if(!users) return await conn.reply(m.chat, `${fg}𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝙊 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼, 𝘿𝙀𝘽𝙀 𝘿𝙀 𝙀𝙎𝙏𝘼𝙍 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n𝙏𝙃𝙀 𝙋𝙀𝙍𝙎𝙊𝙉 𝙒𝘼𝙎 𝙉𝙊𝙏 𝙁𝙊𝙐𝙉𝘿, 𝙏𝙃𝙀𝙔 𝙈𝙐𝙎𝙏 𝘽𝙀 𝙄𝙉 𝙏𝙃𝙄𝙎 𝙂𝙍𝙊𝙐𝙋`, fkontak, m)
//await conn.sendButton(m.chat, `${fg}𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝙊 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼, 𝘿𝙀𝘽𝙀 𝘿𝙀 𝙀𝙎𝙏𝘼𝙍 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n𝙏𝙃𝙀 𝙋𝙀𝙍𝙎𝙊𝙉 𝙒𝘼𝙎 𝙉𝙊𝙏 𝙁𝙊𝙐𝙉𝘿, 𝙏𝙃𝙀𝙔 𝙈𝙐𝙎𝙏 𝘽𝙀 𝙄𝙉 𝙏𝙃𝙄𝙎 𝙂𝙍𝙊𝙐𝙋`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m)
	
if(user === m.sender) return  await conn.reply(m.chat, `${fg}𝙐𝙎𝙏𝙀𝘿 𝙈𝙄𝙎𝙈𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙀 𝙎𝙀𝙍 𝙋𝘼𝙍𝙀𝙅𝘼\n\n𝙔𝙊𝙐 𝙔𝙊𝙐𝙍𝙎𝙀𝙇𝙁 𝘾𝘼𝙉𝙉𝙊𝙏 𝘽𝙀 𝘼 𝙋𝘼𝙍𝙏𝙉𝙀𝙍`, fkontak,  m)
//await conn.sendButton(m.chat, `${fg}𝙐𝙎𝙏𝙀𝘿 𝙈𝙄𝙎𝙈𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙀 𝙎𝙀𝙍 𝙋𝘼𝙍𝙀𝙅𝘼\n\n𝙔𝙊𝙐 𝙔𝙊𝙐𝙍𝙎𝙀𝙇𝙁 𝘾𝘼𝙉𝙉𝙊𝙏 𝘽𝙀 𝘼 𝙋𝘼𝙍𝙏𝙉𝙀𝙍`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m)
	
if(user === conn.user.jid) return await conn.reply(m.chat, `${fg}𝙔𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙊 𝙎𝙀𝙍 𝙎𝙐 𝙋𝘼𝙍𝙀𝙅𝘼 😹\n\n𝙒𝙄𝙏𝙃 𝙈𝙀 𝙔𝙊𝙐 𝘾𝘼𝙉𝙉𝙊𝙏 𝘽𝙀 𝘼 𝘾𝙊𝙐𝙋𝙇𝙀`, fkontak, m)
//await conn.sendButton(m.chat, `${fg}𝙔𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙊 𝙎𝙀𝙍 𝙎𝙐 𝙋𝘼𝙍𝙀𝙅𝘼 😹\n\n𝙒𝙄𝙏𝙃 𝙈𝙀 𝙔𝙊𝙐 𝘾𝘼𝙉𝙉𝙊𝙏 𝘽𝙀 𝘼 𝘾𝙊𝙐𝙋𝙇𝙀`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m)
    
if(global.db.data.users[user].pasangan != m.sender){ 
return await conn.reply(m.chat, `𝙉𝙊 𝙋𝙐𝙀𝘿𝙀𝙎 𝘼𝘾𝙀𝙋𝙏𝘼𝙍 𝙎𝙄 𝙉𝘼𝘿𝙄𝙀 𝙎𝙀 𝙃𝘼 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝘿𝙊, 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝙏𝙀 𝘾𝙊𝙉 *${tu}* 𝙋𝘼𝙍𝘼 𝙌𝙐𝙀 𝘿𝙄𝙂𝘼 𝙎𝙄 𝙏𝙀 𝘼𝘾𝙀𝙋𝙏𝘼 𝙊 𝙏𝙀 𝙍𝙀𝘾𝙃𝘼𝙕𝘼\n\n𝙔𝙊𝙐 𝘾𝘼𝙉𝙉𝙊𝙏 𝘼𝘾𝘾𝙀𝙋𝙏 𝙄𝙁 𝙉𝙊𝘽𝙊𝘿𝙔 𝙃𝘼𝙎 𝘿𝙀𝘾𝙇𝘼𝙍𝙀𝘿, 𝘿𝙀𝘾𝙇𝘼𝙍𝙀 𝙒𝙄𝙏𝙃 *${tu}* 𝙏𝙊 𝙎𝘼𝙔 𝙄𝙁 𝙔𝙊𝙐 𝘼𝘾𝘾𝙀𝙋𝙏 𝙊𝙍 𝙍𝙀𝙅𝙀𝘾𝙏 𝙔𝙊𝙐`, fkontak, m, { contextInfo: { mentionedJid: conn.parseMention(tu)}})	
//await conn.sendButton(m.chat, `𝙉𝙊 𝙋𝙐𝙀𝘿𝙀𝙎 𝘼𝘾𝙀𝙋𝙏𝘼𝙍 𝙎𝙄 𝙉𝘼𝘿𝙄𝙀 𝙎𝙀 𝙃𝘼 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝘿𝙊, 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝙏𝙀 𝘾𝙊𝙉 *${tu}* 𝙋𝘼𝙍𝘼 𝙌𝙐𝙀 𝘿𝙄𝙂𝘼 𝙎𝙄 𝙏𝙀 𝘼𝘾𝙀𝙋𝙏𝘼 𝙊 𝙏𝙀 𝙍𝙀𝘾𝙃𝘼𝙕𝘼\n\n𝙔𝙊𝙐 𝘾𝘼𝙉𝙉𝙊𝙏 𝘼𝘾𝘾𝙀𝙋𝙏 𝙄𝙁 𝙉𝙊𝘽𝙊𝘿𝙔 𝙃𝘼𝙎 𝘿𝙀𝘾𝙇𝘼𝙍𝙀𝘿, 𝘿𝙀𝘾𝙇𝘼𝙍𝙀 𝙒𝙄𝙏𝙃 *${tu}* 𝙏𝙊 𝙎𝘼𝙔 𝙄𝙁 𝙔𝙊𝙐 𝘼𝘾𝘾𝙀𝙋𝙏 𝙊𝙍 𝙍𝙀𝙅𝙀𝘾𝙏 𝙔𝙊𝙐`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m, { contextInfo: { mentionedJid: [user, tu]}})	
	
}else{
global.db.data.users[m.sender].pasangan = user
//let gata2 = [img5, img6, img7, img8, img9]
let gata5 = `🥳😻 𝙁𝙀𝙇𝙄𝘾𝙄𝙏𝘼𝘾𝙄𝙊𝙉𝙀𝙎!!! *${tu}*\n✅ 𝘿𝙀 𝙈𝘼𝙉𝙀𝙍𝘼 𝙊𝙁𝙄𝘾𝙄𝘼𝙇 𝙀𝙎𝙏𝘼𝙉 𝙀𝙉 𝙐𝙉𝘼 𝙍𝙀𝙇𝘼𝘾𝙄𝙊𝙉\n\n𝙌𝙐𝙀 𝘿𝙐𝙍𝙀 𝙋𝙊𝙍 𝙎𝙄𝙀𝙈𝙋𝙍𝙀 𝙎𝙐 𝘼𝙈𝙊𝙍 𝙔 𝙁𝙀𝙇𝙄𝘾𝙄𝘿𝘼𝘿 💖😁\n\n💝 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇𝙇𝙔 𝙏𝙃𝙀𝙔 𝘼𝙍𝙀 𝙄𝙉 𝘼 𝙍𝙀𝙇𝘼𝙏𝙄𝙊𝙉𝙎𝙃𝙄𝙋\n\n*${tu} 💞 ${yo}*\n`
return await conn.sendMessage(m.chat, {image: { url: "https://telegra.ph/file/bb6768e019760933dadc7.jpg", }, caption: gata5, contextInfo: {
  mentionedJid: [m.sender],
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: '120363178367665133@newsletter',
    newsletterName: "💫👁️‍🗨️ 【Katashi Fukushima】 🥷🏻🚀",
    serverMessageId: -1,
  },
  forwardingScore: 999,
  externalAdReply: {
    title: 'Pareja - aceptar ',
    body: global.gt,
    thumbnailUrl: "https://telegra.ph/file/bb6768e019760933dadc7.jpg",
    sourceUrl: 'https://github.com/GataNina-Li/GataBot-MD',
    mediaType: 1,
    renderLargerThumbnail: false,
  },
},
        }, 
   { quoted: m})

}}} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}
handler.command = /^(aceptar|acepto|accept)$/i
handler.group = true
export default handler

*/

import fetch from 'node-fetch' 
let { areJidsSameUser } = (await import(global.baileys)).default
let handler = async (m, { conn, text, participants, usedPrefix, groupMetadata }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let grupos = [grupo1, grupo2, grupo3, grupo4, grupo5, grupo6].getRandom()
let gata = [img6, img7, img8, img9].getRandom()
let enlace = { contextInfo: { externalAdReply: {title: wm + ' 🐈', body: 'support group' , sourceUrl: grupos, thumbnail: await(await fetch('https://telegra.ph/file/bb6768e019760933dadc7.jpg')).buffer() }}}
let enlace2 = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: yt, mediaType: 'VIDEO', description: '', title: wm, body: '😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', thumbnailUrl: await(await fetch('https://telegra.ph/file/bb6768e019760933dadc7.jpg')).buffer(), sourceUrl: yt }}}
let dos = [enlace, enlace2]

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
var number = text.split`@`[1]
if(!text && !m.quoted) return await conn.reply(m.chat, `${mg}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘿𝙀 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙌𝙐𝙄𝙀𝙍𝙀 𝙌𝙐𝙀 𝙎𝙀𝘼 𝙎𝙐 𝙋𝘼𝙍𝙀𝙅𝘼\n\n𝙏𝘼𝙂 𝙊𝙍 𝙍𝙀𝙋𝙇𝙔 𝙏𝙊 𝙏𝙃𝙀 𝙈𝙀𝙎𝙎𝘼𝙂𝙀 𝙁𝙍𝙊𝙈 𝙏𝙃𝙀 𝙋𝙀𝙍𝙎𝙊𝙉 𝙔𝙊𝙐 𝙒𝘼𝙉𝙏 𝙏𝙊 𝘽𝙀 𝙔𝙊𝙐𝙍 𝙋𝘼𝙍𝙏𝙉𝙀𝙍`, fkontak, m)
try {
	
try {
if(text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = conn.getName(m.quoted.sender)
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
}  
} catch (e) {
} finally {
	
let users = m.isGroup ? participants.find(v => areJidsSameUser(v.jid == user)) : {}
let yo = conn.getName(m.sender)
let tu = conn.getName(who)
if(!users) return await conn.reply(m.chat, `${fg}𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝙊 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼, 𝘿𝙀𝘽𝙀 𝘿𝙀 𝙀𝙎𝙏𝘼𝙍 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n𝙏𝙃𝙀 𝙋𝙀𝙍𝙎𝙊𝙉 𝙒𝘼𝙎 𝙉𝙊𝙏 𝙁𝙊𝙐𝙉𝘿, 𝙏𝙃𝙀𝙔 𝙈𝙐𝙎𝙏 𝘽𝙀 𝙄𝙉 𝙏𝙃𝙄𝙎 𝙂𝙍𝙊𝙐𝙋`, fkontak, m)
	
if(user === m.sender) return  await conn.reply(m.chat, `${fg}𝙐𝙎𝙏𝙀𝘿 𝙈𝙄𝙎𝙈𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙀 𝙎𝙀𝙍 𝙋𝘼𝙍𝙀𝙅𝘼\n\n𝙔𝙊𝙐 𝙔𝙊𝙐𝙍𝙎𝙀𝙇𝙁 𝘾𝘼𝙉𝙉𝙊𝙏 𝘽𝙀 𝘼 𝙋𝘼𝙍𝙏𝙉𝙀𝙍`, fkontak,  m)
	
if(user === conn.user.jid) return await conn.reply(m.chat, `${fg}𝙔𝙊 𝙉𝙊 𝙋𝙐𝙀𝘿𝙊 𝙎𝙀𝙍 𝙎𝙐 𝙋𝘼𝙍𝙀𝙅𝘼 😹\n\n𝙒𝙄𝙏𝙃 𝙈𝙀 𝙔𝙊𝙐 𝘾𝘼𝙉𝙉𝙊𝙏 𝘽𝙀 𝘼 𝘾𝙊𝙐𝙋𝙇𝙀`, fkontak, m)
    
if(global.db.data.users[user].pasangan != m.sender){ 
return await conn.reply(m.chat, `𝙉𝙊 𝙋𝙐𝙀𝘿𝙀𝙎 𝘼𝘾𝙀𝙋𝙏𝘼𝙍 𝙎𝙄 𝙉𝘼𝘿𝙄𝙀 𝙎𝙀 𝙃𝘼 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝘿𝙊, 𝘿𝙀𝘾𝙇𝘼𝙍𝘼𝙏𝙀 𝘾𝙊𝙉 *${tu}* 𝙋𝘼𝙍𝘼 𝙌𝙐𝙀 𝘿𝙄𝙂𝘼 𝙎𝙄 𝙏𝙀 𝘼𝘾𝙀𝙋𝙏𝘼 𝙊 𝙏𝙀 𝙍𝙀𝘾𝙃𝘼𝙕𝘼\n\n𝙔𝙊𝙐 𝘾𝘼𝙉𝙉𝙊𝙏 𝘼𝘾𝘾𝙀𝙋𝙏 𝙄𝙁 𝙉𝙊𝘽𝙊𝘿𝙔 𝙃𝘼𝙎 𝘿𝙀𝘾𝙇𝘼𝙍𝙀𝘿, 𝘿𝙀𝘾𝙇𝘼𝙍𝙀 𝙒𝙄𝙏𝙃 *${tu}* 𝙏𝙊 𝙎𝘼𝙔 𝙄𝙁 𝙔𝙊𝙐 𝘼𝘾𝘾𝙀𝙋𝙏 𝙊𝙍 𝙍𝙀𝙅𝙀𝘾𝙏 𝙔𝙊𝙐`, fkontak, m, { contextInfo: { mentionedJid: conn.parseMention(tu)}})	

}else{
global.db.data.users[m.sender].pasangan = user
let gata5 = `🥳😻 𝙁𝙀𝙇𝙄𝘾𝙄𝙏𝘼𝘾𝙄𝙊𝙉𝙀𝙎!!! *${tu}*\n✅ 𝘿𝙀 𝙈𝘼𝙉𝙀𝙍𝘼 𝙊𝙁𝙄𝘾𝙄𝘼𝙇 𝙀𝙎𝙏𝘼𝙉 𝙀𝙉 𝙐𝙉𝘼 𝙍𝙀𝙇𝘼𝘾𝙄𝙊𝙉\n\n𝙌𝙐𝙀 𝘿𝙐𝙍𝙀 𝙋𝙊𝙍 𝙎𝙄𝙀𝙈𝙋𝙍𝙀 𝙎𝙐 𝘼𝙈𝙊𝙍 𝙔 𝙁𝙀𝙇𝙄𝘾𝙄𝘿𝘼𝘿 💖😁\n\n💝 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇𝙇𝙔 𝙏𝙃𝙀𝙔 𝘼𝙍𝙀 𝙄𝙉 𝘼 𝙍𝙀𝙇𝘼𝙏𝙄𝙊𝙉𝙎𝙃𝙄𝙋\n\n*${tu} 💞 ${yo}*\n`
return await conn.sendMessage(m.chat, {image: { url: "https://telegra.ph/file/bb6768e019760933dadc7.jpg", }, caption: gata5, contextInfo: {
  mentionedJid: [m.sender],
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: '120363178367665133@newsletter',
    newsletterName: "💫👁️‍🗨️ 【Katashi Fukushima】 🥷🏻🚀",
    serverMessageId: -1,
  },
  forwardingScore: 999,
  externalAdReply: {
    title: 'Pareja - aceptar ',
    body: gt,
    thumbnail: await(await fetch('https://telegra.ph/file/bb6768e019760933dadc7.jpg')).buffer(),
    sourceUrl: md,
    mediaType: 1,
    renderLargerThumbnail: false,
  },
},
        }, 
   { quoted: m})
}}} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}
handler.command = /^(aceptar|acepto|accept)$/i
handler.group = true
export default handler
