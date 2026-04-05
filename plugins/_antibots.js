let handler = m => m

handler.before = async function (m, { conn, isAdmin, isOwner, isROwner, isBotAdmin }) {
if (!m.isGroup) return !0
if (m.fromMe) return !0
if (isAdmin || isOwner || isROwner) return !0
if (!isBotAdmin) return !0
if (!m.isBaileys) return !0

const chat = global.db.data.chats[m.chat] || {}
if (!chat.antibots) return !0

const sender = typeof m.sender === 'string' ? m.sender : ''
if (!sender) return !0
if (sender.endsWith('@newsletter')) return !0

const normalize = (jid = '') => (typeof jid === 'string' ? conn.decodeJid(jid) : '')
const senderNorm = normalize(sender)

const botJid = typeof conn.user?.jid === 'string' ? conn.user.jid : ''
const botLidRaw = typeof conn.user?.lid === 'string' ? conn.user.lid : ''
const botLid = botLidRaw ? `${botLidRaw.replace(/:.*/, '')}@lid` : ''
if (sender === botJid || (botLid && sender === botLid)) return !0

const selfIds = new Set([
normalize(conn.user?.id || ''),
normalize(conn.user?.jid || ''),
normalize(conn.user?.lid || '')
].filter(Boolean))
if (senderNorm && selfIds.has(senderNorm)) return !0

const mainIds = new Set([
normalize(global.conn?.user?.id || ''),
normalize(global.conn?.user?.jid || ''),
normalize(global.conn?.user?.lid || '')
].filter(Boolean))
if (senderNorm && mainIds.has(senderNorm)) return !0

const primaryBotNorm = normalize(chat.primaryBot || '')
if (primaryBotNorm && senderNorm === primaryBotNorm) return !0

const msgId = typeof m.id === 'string' ? m.id : (typeof m.key?.id === 'string' ? m.key.id : '')
const participant = typeof m.key?.participant === 'string' ? m.key.participant : sender

await conn.sendMessage(m.chat, {
delete: {
remoteJid: m.chat,
fromMe: false,
id: msgId,
participant,
},
}).catch(() => null)

const mention = `@${sender.split('@')[0]}`
const textoDeteccion = `${mid.mAdvertencia}✋ *¡El usuario ${mention} no esta permitido en este grupo!*\n\n` +
`*Motivo:* _Cliente automatizado no autorizado_`

await conn.reply(
m.chat,
textoDeteccion,
m,
{ mentions: [sender] },
)

await conn.groupParticipantsUpdate(m.chat, [sender], 'remove').catch(() => null)
return !0
}

export default handler
