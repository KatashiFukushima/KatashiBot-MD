//by https://github.com/elrebelde21 

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
if (m.isBaileys && m.fromMe) return !0
if (m.isGroup) return !1
if (!m.message) return !0 
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let bot = global.db.data.settings[this.user.jid] || {}
if (bot.antiPrivate && !isOwner && !isROwner) {
await m.reply(`Hola *@${m.sender.split`@`[0]}*, NO PUEDE USAR ESTE BOT EN CHAT PRIVADO\n\nUnirte al Grupo oficial del bot para poder usar el bot\n${nn}`, false, { mentions: [m.sender] })
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'banchat')
return !1
}}
