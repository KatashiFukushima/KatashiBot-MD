import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let pp = gataImg.getRandom()
//const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
let user = global.db.data.users[m.sender]
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
try {
pp = await conn.getProfilePicture(who)         //pp = await conn.getProfilePicture(who)
} catch (e) {

} finally {
let { name, limit, lastclaim, registered, regTime, age } = global.db.data.users[who]
//let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let str =
`┃ *NOMBRE* ${name} ${user.registered === true ? 'ͧͧͧͦꙶͣͤ✓ᚲᴷᴮ' : ''}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *NÚMERO* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *ENLACE* wa.me/${who.split`@`[0]}${registered ?'\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ 𝙀𝘿𝘼𝘿 ' + age + ' *años*' : ''}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *LÍMITES* *${limit}* 𝙙𝙚 𝙐𝙨𝙤𝙨
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *REGISTRADO* ${registered ? '✅': '❎'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *PREMIUM* ${prem ? '✅' : '❎'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *NÚMERO DE SERIE*
┃ *${sn}*`.trim()
    conn.sendFile(m.chat, pp, 'pp.jpg', str, fkontak, false, { contextInfo: { mentionedJid }}) 
  }
}
handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^perfil|profile?$/i
export default handler
