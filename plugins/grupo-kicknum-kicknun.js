/*              Codigo Creado Por Bruno Sobrino 
      (https://github.com/BrunoSobrino/TheMystic-Bot-MD) 
*/

let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
if (!args[0]) return m.reply(`${lenguajeGB['smsAvisoMG']()}${mid.smsMalused7} ${usedPrefix + command} 593*`) 
if (isNaN(args[0])) return m.reply(`${lenguajeGB['smsAvisoMG']()}${mid.smsMalused7} ${usedPrefix + command} 593*`) 
let lol = args[0].replace(/[+]/g, '')
const normalize = (jid = '') => (typeof jid === 'string' ? conn.decodeJid(jid) : '')
const selfIds = new Set([
normalize(conn.user?.id || ''),
normalize(conn.user?.jid || ''),
normalize(conn.user?.lid || '')
].filter(Boolean))
let ps = participants
      .map(u => normalize(u.id || u.jid || u.lid || ''))
      .filter(v => v && !selfIds.has(v) && v.startsWith(lol || lol))
let bot = global.db.data.settings[conn.user.jid] || {}
if (ps == '') return m.reply(`${lenguajeGB['smsAvisoAG']()}𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊 𝙉𝙊 𝙃𝘼𝙔 𝙉𝙄𝙉𝙂𝙐𝙉 𝙉𝙐́𝙈𝙀𝙍𝙊 𝘾𝙊𝙉 𝙀𝙇 𝘼𝙍𝙀𝘼/𝙋𝙍𝙀𝙁𝙄𝙅𝙊 +${lol}*`)
let numeros = ps.map(v=> '➥ @' + v.replace(/@.+/, ''))
const delay = time => new Promise(res=>setTimeout(res,time));
switch (command) {
case "listanum": 
conn.reply(m.chat, `⚠️ 𝙇𝙄𝙎𝙏𝘼 𝘿𝙀 𝙉𝙐𝙈𝙀𝙍𝙊𝙎 𝘾𝙊𝙉 𝙀𝙇 𝙋𝙍𝙀𝙁𝙄𝙅𝙊 +${lol} 𝙌𝙐𝙀 𝙀𝙎𝙏𝘼𝙉 𝙀𝙉 𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 ⚠️\n\n` + numeros.join`\n`, m, { mentions: ps })
break   
case "kicknum":  
if (!bot.restrict) return m.reply(`${lenguajeGB['smsAvisoAG']()} ${lenguajeGB['smsSoloOwner']()}`) 
if (!isBotAdmin) return m.reply(`${lenguajeGB['smsAvisoAG']()} ${lenguajeGB['smsAllAdmin']()}`)          
conn.reply(m.chat, `${lenguajeGB['smsAvisoIIG']()}𝙄𝙉𝙄𝘾𝙄𝘼𝙉𝘿𝙊 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝘾𝙄𝙊́𝙉 𝘿𝙀 𝙉𝙐́𝙈𝙀𝙍𝙊 𝘾𝙊𝙉 𝙀𝙇 𝙋𝙍𝙀𝙁𝙄𝙅𝙊 +${lol}, 𝘾𝘼𝘿𝘼 10 𝙎𝙀𝙂𝙐𝙉𝘿𝙊𝙎 𝙎𝙀 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍𝘼 𝘼 𝙐𝙉 𝙐𝙎𝙐𝘼𝙍𝙄𝙊`, m)            
let ownerGroup = normalize(groupMetadata?.owner || m.chat.split`-`[0] + '@s.whatsapp.net')
let users = participants
      .filter(u => u.admin !== 'superadmin' && u.admin !== 'admin')
      .map(u => normalize(u.id || u.jid || u.lid || ''))
      .filter(v => v && !selfIds.has(v) && v.startsWith(lol || lol))
const ownerIds = new Set((global.owner || []).map(([n]) => `${String(n || '').replace(/\D/g, '')}@s.whatsapp.net`))
for (let user of users) {
let error = `@${user.split("@")[0]} 𝙔𝘼 𝙃𝘼 𝙎𝙄𝘿𝙊 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝘿𝙊 𝙊 𝙃𝘼 𝘼𝘽𝘼𝙉𝘿𝙊𝙉𝘼𝘿𝙊 𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 :v`    
if (user !== ownerGroup && !ownerIds.has(user) && user.startsWith(lol || lol) && isBotAdmin && bot.restrict) { 
await delay(2000)    
let responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
if (responseb[0].status === "404") m.reply(error, m.chat, { mentions: conn.parseMention(error)})  
await delay(10000)
} else return m.reply(`${lenguajeGB['smsAvisoFG']()}`)}
break            
}}
handler.command = /^(listanum|kicknum)$/i
handler.group = handler.botAdmin = handler.admin = true
handler.fail = null
export default handler
