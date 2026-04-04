//Script hecho por Edder ミ⁠●⁠﹏⁠☉⁠ミ

let handler = async (m, { conn,groupMetadata, participants, usedPrefix, command, isBotAdmin,isAdmin,isSuperAdmin }) => {
let bot = global.db.data.settings[conn.user.jid] || {}
if (!bot.restrict) return m.reply(`${lenguajeGB['smsAvisoAG']()} ${lenguajeGB['smsSoloOwner']()}`) 
if (!isBotAdmin) return m.reply(`${lenguajeGB['smsAvisoAG']()} ${lenguajeGB['smsAllAdmin']()}`)
if (!m.isGroup) return !1
let format = a => '@' + a.split('@')[0]
const normalize = (jid = '') => (typeof jid === 'string' ? conn.decodeJid(jid) : '')
const selfIds = new Set([
normalize(conn.user?.id || ''),
normalize(conn.user?.jid || ''),
normalize(conn.user?.lid || '')
].filter(Boolean))
let psmap = groupMetadata.participants.filter(v => !selfIds.has(normalize(v.id || v.jid || v.lid || '')))
psmap=psmap.filter(v => v.admin !=='superadmin')
psmap=psmap.filter(v => v.admin !=='admin')
psmap=psmap.map(v => v.id)
if (psmap == '') return m.reply(`*${lenguajeGB['smsAvisoAG']()}No se encontraron candidatos para la ruleta o todos son admintradores*`)
let user = psmap.getRandom()
m.reply(`*${format(user)} ☠️ Has sido elegido por la ruleta de la muerte*`,null,{mentions: [user]})	
await delay(2000)    
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
}

handler.command = /^(ruletadelban)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler

const delay = time => new Promise(res => setTimeout(res, time))


