const handler = async (m, { conn }) => {
  let txt = '';
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"
} 
const toPnJid = (value = '') => {
const digits = String(value).replace(/\D/g, '')
return digits ? `${digits}@s.whatsapp.net` : ''
}

const normalize = (jid = '') => {
if (!jid || typeof jid !== 'string') return ''
return conn.decodeJid(jid)
}

const selfIds = new Set([
normalize(conn.user?.id || ''),
normalize(conn.user?.jid || ''),
normalize(conn.user?.lid || ''),
toPnJid(conn.user?.phoneNumber || '')
].filter(Boolean))

const lidMap = conn?.signalRepository?.lidMapping
try {
if (lidMap && typeof lidMap.getPNForLID === 'function') {
for (const id of Array.from(selfIds)) {
if (!id.endsWith('@lid')) continue
const pn = await lidMap.getPNForLID(id)
const pnJid = normalize(pn || '')
if (pnJid) selfIds.add(pnJid)
}
}
} catch {}

const participantMatchesBot = (participant = {}) => {
const candidates = [
normalize(participant?.id || ''),
normalize(participant?.jid || ''),
normalize(participant?.lid || ''),
normalize(participant?.phoneNumber ? toPnJid(participant.phoneNumber) : '')
].filter(Boolean)
return candidates.some(id => selfIds.has(id))
}

try {    
const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
const totalGroups = groups.length;
for (let i = 0; i < groups.length; i++) {
const [jid, chat] = groups[i];
const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
const participants = groupMetadata.participants || [];
const bot = participants.find((u) => participantMatchesBot(u)) || {};
const isBotAdmin = bot?.admin || false;
const isParticipant = participants.some((u) => participantMatchesBot(u));
const participantStatus = isParticipant ? '✅ *ESTOY AQUÍ | YES*' : '❌ *NO ESTA AQUÍ | NO*';
const totalParticipants = participants.length;
txt += `╭═══〘卐 _Katashi bot MD_ 卐〙═══⊷❍
🥷 *${i + 1}*
${lenguajeGB.smsLisC()} ${await conn.getName(jid)} ${participantStatus}
${lenguajeGB.smsLisD()} ${jid}
${lenguajeGB.smsLisF()} ${isBotAdmin ? '✅' : '❌'}
${lenguajeGB.smsLisE()}  ${totalParticipants}
${lenguajeGB.smsLisG()} ${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || 'Error'}` : 'NO SOY ADMINISTRADOR'}\n\n`;
}
m.reply(`${packname} ${lenguajeGB.smsLisA()}
${lenguajeGB.smsLisB()} ${totalGroups}\n\n${txt}`.trim());
} catch {
const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
const totalGroups = groups.length;
for (let i = 0; i < groups.length; i++) {
const [jid, chat] = groups[i];
const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
const participants = groupMetadata.participants || [];
const bot = participants.find((u) => participantMatchesBot(u)) || {};
const isBotAdmin = bot?.admin || false;
const isParticipant = participants.some((u) => participantMatchesBot(u));
const participantStatus = isParticipant ? '✅ *ESTOY AQUÍ | YES*' : '❌ *NO ESTA AQUÍ | NO*';
const totalParticipants = participants.length;    
    txt += `🥷 ${i + 1}
${lenguajeGB.smsLisC()} ${await conn.getName(jid)} ${participantStatus}
${lenguajeGB.smsLisD()} ${jid}
${lenguajeGB.smsLisF()} ${isBotAdmin ? '✅' : '❌'}
${lenguajeGB.smsLisE()} ${totalParticipants}
${lenguajeGB.smsLisG()} ${isBotAdmin ? 'Error' : 'NO SOY ADMINISTRADOR'}\n\n`
}
m.reply(`${packname} ${lenguajeGB.smsLisA()}
${lenguajeGB.smsLisB()} ${totalGroups}\n\n${txt}`.trim());
}}
handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos|listadegrupos|grupolista|listagrupo)$/i
handler.exp = 5
handler.register = true
export default handler
