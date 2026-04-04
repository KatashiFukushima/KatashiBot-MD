import fetch from 'node-fetch'
import fs from 'fs' 
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner, text }) => { 
//try{
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let bot = global.db.data.settings[conn.user.jid] || {}
let toUser = `${m.sender.split("@")[0]}`
let aa = toUser + '@s.whatsapp.net'
let titulo = [ 
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.welcome ? '✅' : '❌' : lenguajeGB.smsNoGg()}`, 
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.detect ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,  
lenguajeGB.smsParaAdYOw() + ' ' + `${m.isGroup ? chat.autolevelup ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,   
lenguajeGB.smsParaOw() + ' ' + `${bot.restrict ? '✅' : '❌'}`,    
lenguajeGB.smsParaOw() + ' ' + `${bot.antiCall ? '✅' : '❌'}`,
lenguajeGB.smsParaOw() + ' ' + `${bot.antiSpam ? '✅' : '❌'}`,	
lenguajeGB.smsParaOw() + ' ' + `${global.opts['self'] ? '❌' : '✅'}`,    
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.modoadmin ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,  
lenguajeGB.smsParaOw() + ' ' + `${global.opts['autoread'] ? '✅' : '❌'}`, 
lenguajeGB.smsParaOw() + ' ' + `${bot.temporal ? '✅' : '❌'}`,      
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.stickers ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,   
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.autosticker ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,   
lenguajeGB.smsParaAdYOw() + ' ' + `${m.isGroup ? chat.reaction ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,    
lenguajeGB.smsParaAdYOw() + ' ' + `${m.isGroup ? chat.audios ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,  
lenguajeGB.smsParaAdYOw() + ' ' + `${m.isGroup ? chat.modohorny ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,   
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antitoxic ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,   
lenguajeGB.smsParaAdYOw() + ' ' + `${m.isGroup ? chat.antiver ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,  
lenguajeGB.smsParaAdYOw() + ' ' + `${m.isGroup ? chat.delete ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,  
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antifake ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,  
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antiLink ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,   
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antiLink2 ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,    
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antiTiktok ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,    
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antiYoutube ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,    
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antiTelegram ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,    
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antiFacebook ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,   
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antiInstagram ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,    
lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antiTwitter ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,    
lenguajeGB.smsParaOw() + ' ' + `${global.opts['pconly'] ? '✅' : '❌'}`,  
lenguajeGB.smsParaOw() + ' ' + `${global.opts['gconly'] ? '✅' : '❌'}`]
let nombre = [ lenguajeGB.smsWel1(), lenguajeGB.smsDete1(), lenguajeGB.smsANivel1(), lenguajeGB.smsRestri1(), lenguajeGB.smsLlamar1(), lenguajeGB.smsAntiSp1(), lenguajeGB.smsModP1(), lenguajeGB.smsModAd1(), lenguajeGB.smsLect1(), lenguajeGB.smsTempo1(), lenguajeGB.smsStik1(), lenguajeGB.smsStickA1(), lenguajeGB.smsReacc1(), lenguajeGB.smsAudi1(), lenguajeGB.smsModHor1(), lenguajeGB.smsAntitoc1(), lenguajeGB.smsModOb1(), lenguajeGB.smsAntiEli1(), lenguajeGB.smsAntiInt1(), lenguajeGB.smsAntiE1(), lenguajeGB.smsAntiEE1(), lenguajeGB.smsAntiTT1(), lenguajeGB.smsAntiYT1(), lenguajeGB.smsAntiTEL1(), lenguajeGB.smsAntiFB1(),
lenguajeGB.smsAntiIG1(), lenguajeGB.smsAntiTW1(), lenguajeGB.smsSOLOP1(), lenguajeGB.smsSOLOG1()]
let descripción = [ lenguajeGB.smsWel2(), lenguajeGB.smsDete2(), lenguajeGB.smsANivel2(), lenguajeGB.smsRestri2(), lenguajeGB.smsLlamar2(), lenguajeGB.smsAntiSp2(), lenguajeGB.smsModP2(), lenguajeGB.smsModAd2(), lenguajeGB.smsLect2(), lenguajeGB.smsTempo2(), lenguajeGB.smsStik2(), lenguajeGB.smsStickA2(), lenguajeGB.smsReacc2(), lenguajeGB.smsAudi2(), lenguajeGB.smsModHor2(), lenguajeGB.smsAntitoc2(), lenguajeGB.smsModOb2(), lenguajeGB.smsAntiEli2(), lenguajeGB.smsAntiInt2(), lenguajeGB.smsAntiE2(), lenguajeGB.smsAntiEE2(), lenguajeGB.smsAntiTT2(), lenguajeGB.smsAntiYT2(), lenguajeGB.smsAntiTEL2(), lenguajeGB.smsAntiFB2(),
lenguajeGB.smsAntiIG2(), lenguajeGB.smsAntiTW2(), lenguajeGB.smsSOLOP2(), lenguajeGB.smsSOLOG2()]
let comando = [ "welcome", "detect", "autolevelup", "restrict", "anticall", "antispam", "public", "modoadmin", "autoread", "temporal", "stickers", "autosticker", "reaction", "audios", "modohorny", "antitoxic", "antiviewonce", "antidelete", "antifake", "antilink", "antilink2", "antitiktok", "antiyoutube", "antitelegram", "antifacebook",
"antinstagram", "antitwitter", "pconly", "gconly"]
let sections = Object.keys(titulo, nombre, descripción, comando).map((v, index) => ({ title: `${titulo[v]}`,
rows: [{ title: `${nombre[v]} : ${command} ${comando[v]}`, description: `${1 + index}. ${descripción[v]}`, id: usedPrefix + command + ' ' + comando[v], }], }))
let name = await conn.getName(m.sender)
const listMessage = {
text: `${lenguajeGB.smsConfi10()}`,
footer: `╭━━━✦ *${lenguajeGB.smsConfi1()}* ✦━━━━⬣
┃
┃🌟 ${lenguajeGB.smsConfi2()} *${name}*
┃
${lenguajeGB.smsConfi3()}
${lenguajeGB.smsConfi4()}
┃
${lenguajeGB.smsConfi5()}
${lenguajeGB.smsConfi6()}
${lenguajeGB.smsConfi7()}
${lenguajeGB.smsConfi8()}
${m.isGroup ? `┃` : `┃\n${lenguajeGB.smsConfi9()}`}
╰━━━━━✦ *${vs}* ✦━━━━⬣
${wm}`,//`
title: null,
buttonText: `⚙️ ${lenguajeGB.smsConfi1()} ⚙️`,
sections }
let isEnable = /true|enable|(turn)?on|1/i.test(command)
let type = (args[0] || '').toLowerCase()
let isAll = false, isUser = false
switch (type) {
case 'welcome': case 'bienvenida':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.welcome = isEnable
break
    
case 'detect': case 'avisos':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.detect = isEnable
break
		
case 'antidelete': case 'antieliminar': case 'delete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.delete = isEnable
break
    
case 'public': case 'publico':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['self'] = !isEnable
break
    
case 'antilink': case 'antienlace':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink = isEnable
break
    
case 'antilink2': case 'antienlace2':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink2 = isEnable 
break
		
case 'antitiktok': case 'antitk': case 'antitik':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTiktok = isEnable 
break
		
case 'antiyoutube': case 'antiyt':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiYoutube = isEnable 
break
		
case 'antitelegram': case 'antitl': case 'antitele': case 'antitg': case 'antitel':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTelegram = isEnable 
break
		
case 'antifacebook': case 'antifb': case 'antifbook':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiFacebook = isEnable 
break
		
case 'antiinstagram': case 'antinstagram': case 'antiig': case 'antig': case 'antiinsta': case 'antinsta':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiInstagram = isEnable 
break
		
case 'antitwitter': case 'antitw': case 'antitwit': case 'antitwter': case 'antitwiter': case 'antix':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTwitter = isEnable 
break

case 'antidiscord':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiDiscord = isEnable 
break

case 'antithreads':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiThreads = isEnable 
break

case 'antitwitch':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTwitch = isEnable 
break
    
case 'modohorny': case 'modocaliente': case 'modehorny':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.modohorny = isEnable          
break
    
case 'stickers':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.stickers = isEnable          
break
    
case 'game': case 'juegos': case 'fun':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.game = isEnable          
break
    
case 'ruleta': case 'game2':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.game2 = isEnable          
break
    
case 'temporal':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.temporal = isEnable
break
		
case 'autolevelup': case 'autonivel': case 'nivelautomatico':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.autolevelup = isEnable          
break
    
case 'autosticker':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.autosticker = isEnable          
break
    
case 'reaction': case 'reaccion': case 'emojis': case 'antiemojis': case 'reacciones': case 'reaciones':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.reaction = isEnable          
break
		
case 'antitoxic': case 'antitoxicos': case 'antimalos':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antitoxic = isEnable
break
    
case 'audios':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.audios = isEnable          
break
    
case 'antiver': case 'modover': case 'modoobservar': case 'modobservar': case 'antiviewonce':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiver = isEnable 
break
		
case 'antiinternacional': case 'antinternacional': case 'antinternational': case 'antifake': case 'antifalsos': case 'antivirtuales': case 'antiextranjeros':		
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antifake = isEnable          
break
		
case 'jadibot': case 'modojadibot': case 'serbot': case 'modoserbot': 
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.jadibotmd = isEnable
break 
    
case 'restrict': case 'restringir':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.restrict = isEnable
break

case 'antiporn': case 'antiporno':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiPorn = isEnable          
break
    
case 'nyimak':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['nyimak'] = isEnable
break
    
case 'autoread': case 'autovisto':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.autoread2 = isEnable    
global.opts['autoread'] = isEnable  
break
    
case 'anticall': case 'antillamar':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.antiCall = isEnable
break
		
case 'antispam':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.antiSpam = isEnable
break

case 'antispam2':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.antiSpam2 = isEnable
break

case 'modoadmin': case 'soloadmin': case 'modeadmin':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.modoadmin = isEnable          
break    

case 'autorespond': case 'autoresponder':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.autorespond = isEnable 
break
   
case 'pconly': case 'privateonly': case 'soloprivados':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['pconly'] = isEnable
break
    
case 'gconly': case 'grouponly': case 'sologrupos':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['gconly'] = isEnable
break
case 'antiprivado': case 'antiprivate':
case 'privado':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.antiPrivate = isEnable
break
case 'anticommand': case 'antiarabe': case 'antiarabe2': case 'AntiCommand':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.anticommand = isEnable
break
case 'antitrabas': case 'antitraba': case 'antilag':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTraba = isEnable
break
case 'simi': case 'chatbot':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.simi = isEnable
break
case 'modoia': case 'chatgpt': case 'ia':
isAll = true;
if (!isOwner) {
global.dfail('owner', m, conn);
throw false;
}
bot.modoia = isEnable;      
break;      
      
case 'swonly': case 'statusonly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['swonly'] = isEnable
break
default:
if (!/[01]/.test(command)) return await conn.reply(m.chat, `\`${lenguajeGB.smsConfi10()}\`\n\n🌟 ${lenguajeGB.smsConfi2()} *@${toUser}*

> ${lenguajeGB.smsConfi3()}
> ${lenguajeGB.smsConfi4()}

${lenguajeGB.smsConfi5()}
${lenguajeGB.smsConfi6()}
${lenguajeGB.smsConfi7()}
${lenguajeGB.smsConfi8()}
${m.isGroup ? `` : `${lenguajeGB.smsConfi9()}`}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.welcome ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} welcome
✦ ${lenguajeGB.smsWel2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.detect ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} detec
✦ ${lenguajeGB.smsDete2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdYOw()} ${m.isGroup ? chat.autolevelup ? '✅' : '❌' : lenguajeGB.smsNoGg()} 
✦ ${usedPrefix + command} autolevelup
✦ ${lenguajeGB.smsANivel2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.game ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} juegos
✦ 👾 Activar / desactivar los Juegos

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.ruleta ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} game2
✦ 👽 Activar / desactivar la ruletas rusa 

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaOw()} ${bot.restrict ? '✅' : '❌'}
✦ ${usedPrefix + command} restrict
✦ ${lenguajeGB.smsRestri2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaOw()} ${bot.antiPrivate ? '✅' : '❌'}
✦ ${usedPrefix + command} antiprivado
✦ Prohibido usar el bot en privado

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaOw()} ${bot.antiCall ? '✅' : '❌'}
✦ ${usedPrefix + command} antiCall
✦ ${lenguajeGB.smsLlamar2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaOw()} ${bot.antiSpam ? '✅' : '❌'}
✦ ${usedPrefix + command} antiSpam
✦ ${lenguajeGB.smsAntiSp2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaOw()} ${global.opts['self'] ? '❌' : '✅'}
✦ ${usedPrefix + command} self
✦ ${lenguajeGB.smsModP2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.modoadmin ? '✅' : '❌' : lenguajeGB.smsNoGg()} 
✦ ${usedPrefix + command} modoadmin
✦ ${lenguajeGB.smsModAd2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaOw()} ${global.opts['autoread'] ? '✅' : '❌'}
✦ ${usedPrefix + command} autoread
✦ ${lenguajeGB.smsLect1()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaOw()} ${bot.temporal ? '✅' : '❌'}
✦ ${usedPrefix + command} temporal
✦ ${lenguajeGB.smsTempo2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.stickers ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} stickers
✦ ${lenguajeGB.smsStik1()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.autosticker ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} autosticker
✦ ${lenguajeGB.smsStickA2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdYOw()} ${m.isGroup ? chat.reaction ? '✅' : '❌' : lenguajeGB.smsNoGg()}    
✦ ${usedPrefix + command} reaction
✦ ${lenguajeGB.smsReacc2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdYOw()} ${m.isGroup ? chat.audios ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} audios
✦ ${lenguajeGB.smsAudi2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.modoia ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} chatgpt
✦ Se activa el modo "Inteligencia Artificial" con ChatGPT en todos los chats privados.

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.simi ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} chatbot
✦ El bot empezará interactúa con los usuarios del Grupo.

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antitoxic ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} antitoxic
✦ ${lenguajeGB.smsAntitoc2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdYOw()}  ${m.isGroup ? chat.modohorny ? '✅' : '❌' : lenguajeGB.smsNoGg()} 
✦ ${usedPrefix + command} modocaliente
✦ Activa o desactiva los comandos +18 en el grupo.

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdYOw()} ${m.isGroup ? chat.antiver ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} antiver
✦ ${lenguajeGB.smsModOb2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdYOw()} ${m.isGroup ? chat.delete ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} delete
✦ ${lenguajeGB.smsAntiEli2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antifake ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} antifake
✦ ${lenguajeGB.smsAntiInt2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antiTraba ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} antitraba
✦ El Bot detecta textos largos que podrian ser virus y causar lag en el chat y elimina al usuario.

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antiLink ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} antiLink
✦ ${lenguajeGB.smsAntiE2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antiLink2 ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} antiLink2
✦ ${lenguajeGB.smsAntiEE2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antiTiktok ? '✅' : '❌' : lenguajeGB.smsNoGg()} 
✦ ${usedPrefix + command} antiTiktok
✦ ${lenguajeGB.smsAntiTT2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antiYoutube ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} antiYoutube
✦ ${lenguajeGB.smsAntiYT2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antiTelegram ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} antiTelegram
✦ ${lenguajeGB.smsAntiTEL2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antiFacebook ? '✅' : '❌' : lenguajeGB.smsNoGg()} 
✦ ${usedPrefix + command} antiFacebook
✦ ${lenguajeGB.smsAntiFB2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antiInstagram ? '✅' : '❌' : lenguajeGB.smsNoGg()}
✦ ${usedPrefix + command} antiInstagram
✦ ${lenguajeGB.smsAntiIG2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaAdmins()} ${m.isGroup ? chat.antiTwitter ? '✅' : '❌' : lenguajeGB.smsNoGg()}   
✦ ${usedPrefix + command} antiTwitter
✦ ${lenguajeGB.smsAntiTW2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaOw()} ${global.opts['pconly'] ? '✅' : '❌'}
✦ ${usedPrefix + command} pconly
✦ ${lenguajeGB.smsSOLOP2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${lenguajeGB.smsParaOw()} ${global.opts['gconly'] ? '✅' : '❌'}
✦ ${usedPrefix + command} gconly
✦ ${lenguajeGB.smsSOLOG2()}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

${wm}`, fkontak, { mentions: [aa,] })//`
//conn.sendList(m.chat, `${listMessage.text}\n`, listMessage.footer, `${listMessage.buttonText}`, sections, null, null, fkontak);
throw false
}
await conn.reply(m.chat, `${lenguajeGB['smsAvisoRG']()}ღ *_${lenguajeGB['smsMens1']()}_* *|* ${type} 
ღ *_${lenguajeGB['smsMens2']()}_* *|* ${isEnable ? lenguajeGB.smsEncender() : lenguajeGB.smsApagar()} 
ღ *_${lenguajeGB['smsMens3']()}_* *|* ${isAll ? lenguajeGB.smsMens4() : isUser ? '' : lenguajeGB.smsMens5()}`, fkontak, m)
/*await conn.sendButton(m.chat, `${lenguajeGB['smsAvisoRG']()}ღ *_${lenguajeGB['smsMens1']()}_* *|* ${type} 
ღ *_${lenguajeGB['smsMens2']()}_* *|* ${isEnable ? lenguajeGB.smsEncender() : lenguajeGB.smsApagar()} 
ღ *_${lenguajeGB['smsMens3']()}_* *|* ${isAll ? lenguajeGB.smsMens4() : isUser ? '' : lenguajeGB.smsMens5()}`, wm, null, [[`${isEnable ? lenguajeGB.smsApagar() : lenguajeGB.smsEncender()}`, `${isEnable ? `.off ${type}` : `.on ${type}`}`], [lenguajeGB.smsConMenu(), '.menu']], null, null, fkontak)*/
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i
export default handler
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)