let handler = async (m, { conn, usedPrefix, text, command }) => {
const query = (text || '').trim()
const mentioned = Array.isArray(m.mentionedJid) && m.mentionedJid[0] ? conn.decodeJid(m.mentionedJid[0]) : ''
const quoted = m.quoted?.sender ? conn.decodeJid(m.quoted.sender) : ''
const rawDigits = query.replace(/[^0-9]/g, '')
const groupMetadata = await conn.groupMetadata(m.chat).catch(() => null)
const participants = groupMetadata?.participants || []

if (!query && !quoted && !mentioned) {
return conn.reply(m.chat, `${lenguajeGB['smsMalused3']()}\n*${usedPrefix + command} @${global.owner[0][0]}*`, fkontak, m)
}

let user = await resolveTargetJid(conn, participants, mentioned || quoted || (rawDigits ? `${rawDigits}@s.whatsapp.net` : ''))
if (!user) {
return conn.reply(m.chat, `${lenguajeGB['smsDemott']()}\n*${usedPrefix + command} @${global.owner[0][0]}*`, fkontak, m)
}

try {
await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
await conn.reply(m.chat, lenguajeGB['smsAvisoEG']() + lenguajeGB['smsDemott3'](), fkontak, m)
} catch (e) {
console.log(e)
await conn.reply(m.chat, `${lenguajeGB['smsDemott']()}\n*${usedPrefix + command} @${global.owner[0][0]}*`, fkontak, m)
}
}
handler.command = /^(demote|quitarpoder|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler

async function resolveTargetJid(conn, participants = [], initial = '') {
const normalize = (jid = '') => (jid && typeof jid === 'string' ? conn.decodeJid(jid) : '')
const toDigits = (v = '') => String(v).replace(/\D/g, '')
const normalizedInitial = normalize(initial)
const initialDigits = toDigits(normalizedInitial)
const lidMap = conn?.signalRepository?.lidMapping

if (!participants.length) return normalizedInitial

if (normalizedInitial) {
const exact = participants.find((p) => {
const ids = [p?.id, p?.jid, p?.lid].map(normalize).filter(Boolean)
return ids.includes(normalizedInitial)
})
if (exact) return normalize(exact.id || exact.jid || exact.lid || normalizedInitial)
}

if (!initialDigits) return normalizedInitial

for (const p of participants) {
const pid = normalize(p?.id || p?.jid || p?.lid || '')
const pDigits = toDigits(pid)
if (pDigits && pDigits === initialDigits) return pid

if (pid.endsWith('@lid') && lidMap && typeof lidMap.getPNForLID === 'function') {
try {
const pn = normalize(await lidMap.getPNForLID(pid))
if (toDigits(pn) === initialDigits) return pid
} catch {}
}
}

return normalizedInitial
}
