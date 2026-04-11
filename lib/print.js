import {WAMessageStubType} from '@whiskeysockets/baileys';
import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import { watchFile } from 'fs'
import '../config.js'

const terminalImage = global.opts['img'] ? require('terminal-image') : ''
const urlRegex = (await import('url-regex-safe')).default({ strict: false })

function normalizeStubParticipant(input) {
let value = input

if (typeof value === 'string' && value.trim().startsWith('{')) {
try {
value = JSON.parse(value)
} catch {}
}

if (value && typeof value === 'object') {
const phone = typeof value.phoneNumber === 'string' ? value.phoneNumber : ''
const id = typeof value.id === 'string' ? value.id : ''
const jid = typeof value.jid === 'string' ? value.jid : ''
return phone || id || jid || ''
}

return typeof value === 'string' ? value : ''
}

export default async function (m, conn = { user: {} }) {

if (!m || typeof m !== 'object' || Array.isArray(m)) return

let name_user
const senderJid = typeof m?.sender === 'string' ? m.sender : '0@s.whatsapp.net'
const chatJid = typeof m?.chat === 'string' ? m.chat : 'status@broadcast'
const cachedUserName = global.db?.data?.users?.[senderJid]?.name || ''
let _name = cachedUserName || await conn.getName(senderJid) || 'Anónimo'
const senderNumber = senderJid.replace(/@.+$/, '')
const senderIntl = PhoneNumber('+' + senderNumber).getNumber('international')
let sender = senderIntl === undefined ? `+${senderNumber}` + (_name ? ` ~${_name}` : '') : senderIntl + (_name == senderIntl ? '' : ' ~' + _name)
let chat = ''
if (chatJid.includes('@g.us') || chatJid.includes('@newsletter')) {
chat = await conn.getName(chatJid)
}
let img
try {
if (global.opts['img'])
img = /sticker|image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false
} catch (e) {
console.error(e)
}
let filesize = (m.msg ?
m.msg.vcard ?
m.msg.vcard.length :
m.msg.fileLength ?
m.msg.fileLength.low || m.msg.fileLength :
m.msg.axolotlSenderKeyDistributionMessage ?
m.msg.axolotlSenderKeyDistributionMessage.length :
m.text ?
m.text.length :
0
: m.text ? m.text.length : 0) || 0
let user = global.db.data.users[senderJid] || {}
const userRole = typeof user.role === 'string' ? user.role : '*NOVATO(A)* 🪤'
let me = PhoneNumber('+' + (conn.user?.jid).replace('@s.whatsapp.net', '')).getNumber('international')

const stubParticipants = Array.isArray(m.messageStubParameters) ? m.messageStubParameters : []
name_user = stubParticipants.map((participant) => {
const normalized = normalizeStubParticipant(participant)
const decoded = normalized ? conn.decodeJid(normalized) : ''
const name_info = decoded ? conn.getName(decoded) : ''
return chalk.bold(`${name_info ? name_info : (decoded || (mid.idioma_code === 'es' ? 'Alguien' : 'Someone'))}`)
}).join(', ')

console.log(`
╭━━━━━━━━━━━━━━𖡼
┃ ❖ ${chalk.white.bold('Bot:')} ${chalk.cyan.bold('%s')} 
┃ ❖ ${chalk.white.bold(mid.idioma_code === 'es' ? 'Horario:' : 'Schedule:')} ${chalk.black.bgGreen('%s')}
┃ ❖ ${chalk.white.bold(mid.idioma_code === 'es' ? 'Acción:' : 'Action:')} ${mid.idioma_code === 'es' ? await formatMessageStubType(m.messageStubType, name_user) : await formaTxtStub(WAMessageStubType[m.messageStubType])}
┃ ❖ ${chalk.white.bold(mid.idioma_code === 'es' ? 'Usuario:' : 'User:')} ${chalk.white('%s')} / ${chalk.bgMagentaBright.bold(userRole.replace(/\*/g, ''))} / Premium » ${user?.premiumTime > 0 ? '✅' : '❌'}
┃ ❖ ${chalk.white.bold(mid.idioma_code === 'es' ? 'Recursos:' : 'Resources:')} ${chalk.yellow('%s%s')}
┃ ❖ %s
┃ ❖ ${chalk.white.bold(mid.idioma_code === 'es' ? 'Peso del mensaje:' : 'Message weight:')} ${chalk.red('%s (%s %sB)')}
┃ ❖ ${chalk.white.bold(mid.idioma_code === 'es' ? 'Tipo de mensaje:' : 'Type of message')} ${chalk.bgBlueBright.bold('[%s]')}\n%s
╰━━━━━━━━━━━━━━𖡼`.trim(),
          
me + (conn.user.name == undefined ? '' : ' ~' + conn.user.name) + `${conn.user.jid == global.conn.user.jid ? '' : ' 【𝗚𝗕 - 𝗦𝗨𝗕 𝗕𝗢𝗧】'}`,
(m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date).toTimeString(),
sender,
m ? '' : '',
`🆙 ${user.level} / ❇️ ${user.exp} / 💎 ${user.limit} / 🐱 ${user.money}`,
m.chat.includes('@s.whatsapp.net') 
? `${chalk.white.bold(mid.idioma_code === 'es' ? 'Privado:' : 'Private')} ${chalk.greenBright(`${m.sender} ~${user.name || _name}`)}`
: m.chat.includes('@g.us') 
? `${chalk.white.bold(mid.idioma_code === 'es' ? 'Grupo:' : 'Group:')} ${chalk.magentaBright(`${m.chat} ~${chat}`)}`
: m.chat.includes('@newsletter') 
? `${chalk.white.bold(mid.idioma_code === 'es' ? 'Canal:' : 'Channel:')} ${chalk.yellowBright(`${m.chat} ~${chat}`)}`
: '',
filesize,
filesize === 0 ? 0 : (filesize / 1009 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1),
['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || '',
mid.idioma_code === 'es' ? await formatMessageTypes(m.mtype) : await formaTxt(m.mtype) || 'Not specified', //m.mtype ? m.mtype : 'No especificado'  //? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
m.message?.extendedTextMessage?.contextInfo?.quotedMessage ? (m.message?.extendedTextMessage?.contextInfo?.participant == m.sender ? '┃ ❖ ' + chalk.bold(`${conn.getName(m.sender) ?? user.name ?? 'Este usuario'}`) + ' respondió a su propio mensaje.' :
'┃ ❖ ' + chalk.bold(`${conn.getName(m.sender) ?? user.name ?? 'Este usuario'}`) 
+ (!m.message?.extendedTextMessage?.contextInfo?.participant.includes("newsletter") 
? ' respondió a ' + chalk.bold(`${conn.getName(m.message?.extendedTextMessage?.contextInfo?.participant) ?? m.message?.extendedTextMessage?.contextInfo?.participant ?? 'Usuario desconocido'}`) 
: ' envío mensaje en el canal'))
: ''
)

if (img) console.log(img.trimEnd())
if (typeof m.text === 'string' && m.text) {
let log = m.text.replace(/\u200e+/g, '')

let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~`])(?!`)(.+?)\1|```((?:.|[\n\r])+?)```|`([^`]+?)`)(?=\S?(?:[\s\n]|$))/g
let mdFormat = (depth = 4) => (_, type, text, monospace) => {
let types = {
'_': 'italic',
'*': 'bold',
'~': 'strikethrough',
'`': 'bgGray'
}
text = text || monospace
let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(/`/g, '').replace(mdRegex, mdFormat(depth - 1)))
return formatted
}               
log = log.replace(mdRegex, mdFormat(4))
log = log.split('\n').map(line => {
if (line.trim().startsWith('>')) {
return chalk.bgGray.dim(line.replace(/^>/, '┃'))
} else if (/^([1-9]|[1-9][0-9])\./.test(line.trim())) {
return line.replace(/^(\d+)\./, (match, number) => {
const padding = number.length === 1 ? '  ' : ' '
return padding + number + '.'
})
} else if (/^[-*]\s/.test(line.trim())) {
return line.replace(/^[*-]/, '  •')
}
return line
}).join('\n')
if (log.length < 1024)
log = log.replace(urlRegex, (url, i, text) => {
let end = url.length + i
return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url
})
log = log.replace(mdRegex, mdFormat(4))
if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' +await conn.getName(user)))
console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log)
}
  
if (stubParticipants.length) {
console.log(stubParticipants.map((participant) => {
const normalized = normalizeStubParticipant(participant)
if (!normalized) return ''
const jid = conn.decodeJid(normalized)
if (!jid) return ''
let name = conn.getName(jid)
const phoneRaw = jid.replace(/@.+$/, '')
const phoneNumber = /^\d+$/.test(phoneRaw) ? PhoneNumber('+' + phoneRaw).getNumber('international') : ''
return name ? chalk.gray(`${phoneNumber || jid} (${name})`) : chalk.gray(jid)
}).filter(Boolean).join(', '))
}
  
if (/document/i.test(m.mtype)) console.log(`🗂️ ${m.msg.fileName || m.msg.displayName || 'Document'}`)
else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${' ' || ''}`)
else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg.displayName || ''}`)
else if (/audio/i.test(m.mtype)) {
const duration = m.msg.seconds
console.log(`${m.msg.ptt ? '🎤ㅤ(PTT ' : '🎵ㅤ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`)
}
console.log()
}
let file = global.__filename(import.meta.url)
watchFile(file, () => {
console.log(chalk.redBright("Update 'lib/print.j'"))})

async function formatMessageStubType(messageStubType, name_user) {
if (messageStubType == null) {
return 'Sin acción'
}
switch (messageStubType) {
case 0:
return 'Desconocido'
case 1:
return 'Revocado'
case 2:
return 'Texto cifrado'
case 20:
return 'Se ha creado un grupo'
case 21:
return 'Nombre del grupo modificado'
case 22:
return 'Se cambió la imagen del grupo'
case 23:
return 'Nuevo enlace del grupo'
case 24:
return 'Nueva descripción del grupo'
case 25:
return 'Restricciones del grupo cambiada'
case 26:
return 'Se configuró quien puede enviar mensajes en el grupo'
case 27:
return `${name_user} se ha unido al grupo`
case 28:
return `${name_user} ha sido eliminado del grupo`
case 29:
return `${name_user} es nuevo admin. del grupo`
case 30:
return `${name_user} dejó de ser admin. del grupo`
case 31:
return `Se ha invitado a ${name_user} al grupo`
case 32:
return `${name_user} ha salido del grupo`
case 145:
return `Se configuró "aprobar miembros nuevo" en el grupo`
case 171:
return `Se configuró "agregar a otros miembros" en el grupo`
default:
return messageStubType //'Ninguna'
}}

async function formatMessageTypes(messageStubType, mid) {
switch (messageStubType) {
case 'conversation':
return 'Conversación'
case 'imageMessage':
return 'Imagen'
case 'contactMessage':
return 'Contacto'
case 'locationMessage':
return 'Ubicación'
case 'extendedTextMessage':
return 'Texto'
case 'documentMessage':
return 'Documento'
case 'audioMessage':
return 'Audio'
case 'videoMessage':
return 'Video'
case 'call':
return 'Llamada'
case 'chat':
return 'Chat'
case 'protocolMessage':
return 'Cifrado'
case 'contactsArrayMessage':
return 'Lista de contactos'
case 'highlyStructuredMessage':
return 'Estructurado'
case 'fastRatchetKeySenderKeyDistributionMessage':
return 'Distribución de claves'
case 'sendPaymentMessage':
return 'Mensaje de pago'
case 'liveLocationMessage':
return 'Ubicación en vivo'
case 'requestPaymentMessage':
return 'Solicitar pago'
case 'declinePaymentRequestMessage':
return 'Rechazar solicitud de pago'
case 'cancelPaymentRequestMessage':
return 'Cancelar solicitud de pago'
case 'templateMessage':
return 'Mensaje de plantilla'
case 'stickerMessage':
return 'Sticker'
case 'groupInviteMessage':
return 'Invitación a grupo'
case 'templateButtonReplyMessage':
return 'Respuesta de botón de plantilla'
case 'productMessage':
return 'Producto'
case 'deviceSentMessage':
return 'Mensaje enviado por dispositivo'
case 'messageContextInfo':
return 'Contexto del mensaje'
case 'listMessage':
return 'Lista'
case 'viewOnceMessage':
return 'Mensaje de una sola vez'
case 'orderMessage':
return 'Pedido'
case 'listResponseMessage':
return 'Respuesta de lista'
case 'ephemeralMessage':
return 'Efímero'
case 'invoiceMessage':
return 'Factura'
case 'buttonsMessage':
return 'Botones'
case 'buttonsResponseMessage':
return 'Respuesta de botones'
case 'paymentInviteMessage':
return 'Invitación de pago'
case 'interactiveMessage':
return 'Interactivo'
case 'reactionMessage':
return 'Reacción';
case 'stickerSyncRmrMessage':
return 'Sincronización de sticker'
case 'interactiveResponseMessage':
return 'Respuesta interactiva'
case 'pollCreationMessage':
return 'Creación de encuesta'
case 'pollUpdateMessage':
return 'Actualización de encuesta'
case 'keepInChatMessage':
return 'Mensaje de mantener en chat'
case 'documentWithCaptionMessage':
return 'Documento con leyenda'
case 'requestPhoneNumberMessage':
return 'Solicitud de número de teléfono'
case 'viewOnceMessageV2':
return 'Mensaje de una sola vez v2'
case 'encReactionMessage':
return 'Reacción encriptada'
case 'editedMessage':
return 'Mensaje editado'
case 'viewOnceMessageV2Extension':
return 'Extensión de mensaje de una vista v2'
case 'pollCreationMessageV2':
return 'Creación de encuesta v2';
case 'scheduledCallCreationMessage':
return 'Llamada programada'
case 'groupMentionedMessage':
return 'Mención en grupo'
case 'pinInChatMessage':
return 'Mensaje fijado en chat'
case 'pollCreationMessageV3':
return 'Creación de encuesta v3'
case 'scheduledCallEditMessage':
return 'Edición de llamada programada'
case 'ptvMessage':
return 'Mensaje de PTV'
case 'botInvokeMessage':
return 'Invocación de bot'
case 'callLogMesssage':
return 'Registro de llamada'
case 'messageHistoryBundle':
return 'Paquete de historial de mensajes'
case 'encCommentMessage':
return 'Comentario encriptado'
case 'bcallMessage':
return 'Mensaje de llamada B'
case 'lottieStickerMessage':
return 'Mensaje de sticker Lottie'
case 'eventMessage':
return 'Evento'
case 'commentMessage':
return 'Comentario'
case 'newsletterAdminInviteMessage':
return 'Mensaje de invitación de administrador'
case 'extendedTextMessageWithParentKey':
return 'Mensaje de texto con clave principal'
case 'placeholderMessage':
return 'Marcador de posición'
case 'encEventUpdateMessage':
return 'Actualización de evento encriptado'
default:
return messageStubType || 'No especificado'
}}

async function formaTxtStub(messageType_) {
let words = messageType_.split('_')
let formattedMessage = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
formattedMessage = formattedMessage.join(' ')
return formattedMessage
}

async function formaTxt(messageType) {
let formattedMessage = messageType.charAt(0).toUpperCase() + messageType.slice(1)
formattedMessage = formattedMessage.replace(/([A-Z])/g, ' $1').trim()
return formattedMessage
}
