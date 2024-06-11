import { createHash } from 'crypto' 
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix }) => {
let pp = 'https://telegra.ph/file/d8ef67ebf82d35afc66c3.jpg'
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
`︴ 𝑁𝑂𝑀𝐵𝑅𝐸 ${conn.getName(m.sender)} ${user.registered === true ? 'ͧͧͧͦꙶͣͤ✓ᚲᴳᴮ' : ''}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝑁𝑈𝑀𝐸𝑅𝑂 ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝐶𝐻𝐴𝑇 wa.me/${who.split`@`[0]}${registered ?'\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ 𝐸𝐷𝐴𝐷 ' + age + '' : ''}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝑀𝐴𝑋𝐼𝑀𝑂 *${limit}* 𝑢𝑠𝑜𝑠
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ¿𝑅𝐸𝐺𝐼𝑆𝑇𝑅𝐴𝐷𝑂?(𝐴) ${registered ? '✅': '❎'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝑃𝑅𝐸𝑀𝐼𝑈𝑀 ${prem ? '✅' : '❎'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝐼𝐷
┃ _*${sn}*_`.trim()
    conn.sendFile(m.chat, pp, 'pp.jpg', str, fkontak, false, { contextInfo: { mentionedJid }}) 
  }
}
handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^perfil|profile?$/i
export default handler
