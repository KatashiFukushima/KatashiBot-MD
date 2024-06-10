var handler = async (m, { conn, participants, usedPrefix, command }) => {
if (!m.mentionedJid[0] && !m.quoted) {
return conn.reply(m.chat, `${lenguajeGB['smskick1']()}${usedPrefix + command} @0*`, m)}
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
const groupInfo = await conn.groupMetadata(m.chat);
const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
if (user === conn.user.jid) {
return conn.reply(m.chat, '🗣 No me puedo eliminar del grupo', m)}
if (user === ownerGroup) {
return conn.reply(m.chat, '💫 No puedo eliminar al creador del grupo', m)}
if (user === ownerBot) {
return conn.reply(m.chat, '👑 No puedo eliminar al owner del bot', m)}
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')}
handler.help = ['kick']
handler.tags = ['grupo']
handler.command = /^(kick|echar|hechar|sacar|ban)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler