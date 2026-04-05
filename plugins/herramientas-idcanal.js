let handler = async (m, { conn, usedPrefix, command }) => {
const hint = `${lenguajeGB['smsAvisoMG']()}Responde a un mensaje reenviado de un canal para obtener su ID.`

const quoted = m.quoted || null
if (!quoted && !(m.chat || '').endsWith('@newsletter')) throw hint

// If command is used directly in a channel chat, return current channel JID.
if ((m.chat || '').endsWith('@newsletter')) {
return conn.reply(m.chat, `*ID del canal:*\n${m.chat}`, m)
}

const info = extractForwardedNewsletterInfo(quoted)
if (!info.newsletterJid) {
throw `${lenguajeGB['smsAvisoMG']()}No encontre datos de canal en ese mensaje.\n\nTip: responde a una publicacion reenviada desde un canal.`
}

const channelName = info.newsletterName || 'Sin nombre'
const text = `*ID del canal:*\n${info.newsletterJid}\n\n*Nombre:*\n${channelName}`
return conn.reply(m.chat, text, m)
}

handler.help = ['idcanal']
handler.tags = ['tools']
handler.command = /^(idcanal|canalid|idchannel)$/i

export default handler

function extractForwardedNewsletterInfo(quoted) {
if (!quoted) return {}

try {
// Intenta acceder directamente a forwardedNewsletterMessageInfo
const direct = quoted?.forwardedNewsletterMessageInfo
if (direct?.newsletterJid) return direct

// Intenta acceder a través de diferentes estructuras de mensaje
const message = quoted?.message || quoted?.msg?.message || {}

// Búsqueda en contextInfo de diferentes tipos de mensajes
const checkContextInfo = (obj) => {
if (!obj) return null
const ctx = obj?.contextInfo || obj
if (ctx?.forwardedNewsletterMessageInfo?.newsletterJid) {
return ctx.forwardedNewsletterMessageInfo
}
return null
}


const messageTypes = [
message?.extendedTextMessage,
message?.imageMessage,
message?.videoMessage,
message?.documentMessage,
message?.audioMessage,
message?.stickerMessage,
message?.textMessage,
quoted?.contextInfo,
quoted?.msg?.contextInfo
]

for (const msgType of messageTypes) {
const result = checkContextInfo(msgType)
if (result) return result
}

// Búsqueda profunda en la estructura de quoted
const findNewsletterInfo = (obj, depth = 0) => {
if (depth > 5 || !obj || typeof obj !== 'object') return null

if (obj?.forwardedNewsletterMessageInfo?.newsletterJid) {
return obj.forwardedNewsletterMessageInfo
}

for (const key in obj) {
const result = findNewsletterInfo(obj[key], depth + 1)
if (result) return result
}
return null
}

const deepResult = findNewsletterInfo(quoted)
if (deepResult) return deepResult

} catch (error) {
console.error('Error extrayendo info de canal:', error)
}

return {}
}
