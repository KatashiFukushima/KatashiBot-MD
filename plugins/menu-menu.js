import fs from 'fs'
import moment from 'moment-timezone'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let { money, joincount } = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
let pp = gataVidMenu.getRandom()
let pareja = global.db.data.users[m.sender].pasangan 
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
//let fsizedoc = '1'.repeat(10)
//let adReply = { fileLength: fsizedoc, seconds: fsizedoc, contextInfo: { forwardingScore: fsizedoc, externalAdReply: { showAdAttribution: true, title: wm, body: '👋 ' + username, mediaUrl: ig, description: 'Hola', previewType: 'PHOTO', thumbnail: await(await fetch(gataMenu.getRandom())).buffer(), sourceUrl: redesMenu.getRandom() }}}
const numberToEmoji = { "0": "0️⃣", "1": "1️⃣", "2": "2️⃣", "3": "3️⃣", "4": "4️⃣", "5": "5️⃣", "6": "6️⃣", "7": "7️⃣", "8": "8️⃣", "9": "9️⃣", }
let lvl = level
let emoji = Array.from(lvl.toString()).map((digit) => numberToEmoji[digit] || "❓").join("")

const lugarFecha = moment().tz('America/Lima')
const formatoFecha = {
weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
}
lugarFecha.locale('es', formatoFecha)
const horarioFecha = lugarFecha.format('dddd, DD [de] MMMM [del] YYYY || HH:mm A').replace(/^\w/, (c) => c.toUpperCase())

let menu = `╭═══〘☭ _Katashi bot MD_ ☭〙═══⊷❍
┃卐╭──────────────
┃卐│ 〘 👻 _ᴏᴡɴᴇʀs ᴏғᴄ_ 👻 〙
┃卐│ 
┃卐│ _ᴋᴀᴛᴀsʜɪ ғᴜᴋᴜsʜɪᴍᴀ 🥷🏻_
┃卐│ _ᴊᴇsᴜs ᴏғᴄ🍁_
┃卐│ _ɪᴢɪ 👻_
┃卐│ 
┃卐│        ▎▍▌▌▉▏▎▌▉▐▏▌▎
┃卐│        ▎▍▌▌▉▏▎▌▉▐▏▌▎
┃卐│ᴋᴀᴛᴀsʜɪ ʙᴏᴛ x ᴋᴀᴛᴀsʜɪ ғᴜᴋᴜsʜɪᴍᴀ
┃卐│ 
┃卐╰───────────────
╰═════════════════⊷

╭════〘👻 _INFO KATASHI BOT_ 👻〙════⊷❍
│
┃卐│ ᩭ✎ _Registrados »_ ${rtotalreg}/${totalreg}
┃卐│ ᩭ✎ _${lenguajeGB['smsUptime']()}_ ➣ _${uptime}_ 
┃卐│ ᩭ✎ _${lenguajeGB['smsVersion']()}_ ➢ _${vs}_
┃卐│ ᩭ✎ _${lenguajeGB['smsMode']()} ➣_ _${global.opts['self'] ? `${lenguajeGB['smsModePrivate']().charAt(0).toUpperCase() + lenguajeGB['smsModePrivate']().slice(1).toLowerCase()}` : `${lenguajeGB['smsModePublic']().charAt(0).toUpperCase() + lenguajeGB['smsModePublic']().slice(1).toLowerCase()}`}_
┃卐│ ᩭ✎ _${lenguajeGB['smsBanChats']()}_ ➣ _${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}_ 
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭════〘👻 _INFO DEL USER_ 👻〙════⊷❍

┃卐│ _Tipo de registro »_ ${user.registered === true ? `_${user.registroC === true ? 'Registro Completo 🗂️' : 'Registro Rápido 📑'}_` : '❌ _Sin registro_'}
┃卐│ _Estado »_ ${typeof user.miestado !== 'string' ? '❌ _' + usedPrefix + 'miestado_' : '_Me siento ' + user.miestado + '_'}
┃卐│ _Registrado »_ ${user.registered === true ? '✅' : '❌ _' + usedPrefix + 'verificar_'}
┃卐│ _${lenguajeGB['smsBotonM7']().charAt(0).toUpperCase() + lenguajeGB['smsBotonM7']().slice(1).toLowerCase()} »_ ${user.premiumTime > 0 ? '✅' : '❌ _' + usedPrefix + 'pase premium_'}
┃卐│ _${lenguajeGB['smsBotonM5']().charAt(0).toUpperCase() + lenguajeGB['smsBotonM5']().slice(1).toLowerCase()} »_ ${role}
┃卐│ _${lenguajeGB['smsBotonM6']().charAt(0).toUpperCase() + lenguajeGB['smsBotonM6']().slice(1).toLowerCase()} »_ ${emoji} || ${user.exp - min}/${xp}
┃卐│ _${lenguajeGB['smsPareja']()}* ${pareja ? `\n*»_ ${name} 💕 ${conn.getName(pareja)}` : `🛐 ${lenguajeGB['smsResultPareja']()}_`}
┃卐│ _Pasatiempo(s)* 🍁 ${user.pasatiempo === 0 ? '*Sin Registro*_' : user.pasatiempo + '\n'}
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭═══〘👻 _Recursos del user_ 👻〙═══⊷❍
┃卐╭──────────────
┃卐│ _Experiencia ➟_ ${exp} ×͜×
┃卐│ _Diamantes ➟_ ${limit} 💎
┃卐│ _KataCoins ➟_ ${money} ⫹⫺
┃卐│ _Tokens ➟_ ${joincount} ✧
┃卐╰───────────────
╰═════════════════⊷

${readMore}

╭═══〘👻 _I N F O - K A T A S H I_ 👻〙═══⊷❍
┃卐╭──────────────
┃卐│ _${usedPrefix}cuentaskatashi | cuentaskb_
┃卐│ _${usedPrefix}gruposkb | grupos | groupkb_
┃卐│ _${usedPrefix}donar | donate_
┃卐│ _${usedPrefix}listagrupos | grouplist_
┃卐│ _${usedPrefix}estado | heykata | status_
┃卐│ _${usedPrefix}infokata | infobot_
┃卐│ _${usedPrefix}instalarbot | installbot_
┃卐│ _${usedPrefix}creador | owner_      
┃卐│ _${usedPrefix}velocidad | ping_      
┃卐│ _términos y condiciones_
┃卐│ _Bot_ 
┃卐╰───────────────
╰═════════════════⊷

╭═══〘👻 _SUB BOT KATASHI_ 👻〙═══⊷❍
┃卐╭──────────────
┃卐│ _${usedPrefix}serbot | jadibot_
┃卐│ _${usedPrefix}bots | listjadibots_
┃卐│ _${usedPrefix}detener | stop_
┃卐╰───────────────
╰═══════════════════⊷

╭═══〘👻 _REPORTES_ 👻〙═══⊷❍
┃卐╭──────────────
┃卐│ _${usedPrefix}reporte *texto*_
┃卐│ _Haga un reporte_
┃卐│ _en caso de una falla_
┃卐│ _en algun comando_
┃卐╰───────────────
╰═════════════════⊷

╭═══〘👻 _User Premium_ 👻〙═══⊷❍
┃卐╭──────────────
┃卐│ _${usedPrefix}listapremium | listprem_
┃卐│ _${usedPrefix}pase premium_
┃卐│ _${usedPrefix}pass premium_
┃卐╰───────────────
╰═════════════════⊷

╭════〘👻 _ENTRETENIMIENTO_ 👻〙════⊷❍
│
┃卐│ _${usedPrefix}mates | matemáticas | math_
┃卐│ _${usedPrefix}ppt *piedra : papel : tijera*_
┃卐│ _${usedPrefix}lanzar *cara* | *cruz*_
┃卐│ _${usedPrefix}tictactoe | ttt *sala*_
┃卐│ _${usedPrefix}deltictactoe | delttt_
┃卐│ _${usedPrefix}topgays_
┃卐│ _${usedPrefix}topotakus_
┃卐│ _${usedPrefix}toppajer@s_
┃卐│ _${usedPrefix}topput@s_ 
┃卐│ _${usedPrefix}topintegrantes | topintegrante_
┃卐│ _${usedPrefix}toplagrasa | topgrasa_
┃卐│ _${usedPrefix}toppanafrescos | toppanafresco_
┃卐│ _${usedPrefix}topshiposters | topshipost_
┃卐│ _${usedPrefix}toplindos | toplind@s_ 
┃卐│ _${usedPrefix}topfamosos | topfamos@s_
┃卐│ _${usedPrefix}topparejas | top5parejas_ 
┃卐│ _${usedPrefix}gay | gay *@tag*_ 
┃卐│ _${usedPrefix}gay2 *nombre : @tag*_ 
┃卐│ _${usedPrefix}lesbiana *nombre : @tag*_ 
┃卐│ _${usedPrefix}manca *nombre : @tag*_
┃卐│ _${usedPrefix}manco *nombre : @tag*_
┃卐│ _${usedPrefix}pajero *nombre : @tag*_
┃卐│ _${usedPrefix}pajera *nombre : @tag*_
┃卐│ _${usedPrefix}puto *nombre : @tag*_
┃卐│ _${usedPrefix}puta *nombre : @tag*_
┃卐│ _${usedPrefix}rata *nombre : @tag*_
┃卐│ _${usedPrefix}love *nombre : @tag*_
┃卐│ _${usedPrefix}ship nombre1 nombre2*_
┃卐│ _${usedPrefix}doxear *nombre : @tag*_
┃卐│ _${usedPrefix}doxxeame_
┃卐│ _${usedPrefix}apostar | slot *cantidad*_
┃卐│ _${usedPrefix}pregunta *texto*_
┃卐│ _${usedPrefix}formarpareja_ 
┃卐│ _${usedPrefix}dado_
┃卐│ _${usedPrefix}verdad_
┃卐│ _${usedPrefix}reto_
┃卐│ _${usedPrefix}juegos_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭═══〘👻 _IA KATASHI_ 👻〙═══⊷❍
┃卐╭──────────────
┃卐│ _puedes buscar lo que deseas usando:_
┃卐│ _${usedPrefix}simi | ia *texto*_
┃卐│ _${usedPrefix}alexa | siri | cortana *texto*_ 
┃卐│ _${usedPrefix}simsimi | bixby *texto*_
┃卐╰───────────────
╰═════════════════⊷

╭════〘👻 AJUSTES EN CHATS/GRUPOS 👻〙════⊷❍
│ _Puedes mejorar tu grupo con Katashi bot_
┃卐│ _${usedPrefix}on *:* off *bienvenida | welcome*_
┃卐│ _${usedPrefix}on *:* off *avisos | detect*_
┃卐│ _${usedPrefix}on *:* off *autonivel | autolevelup*_
┃卐│ _${usedPrefix}on *:* off *restringir | restrict*_
┃卐│ _${usedPrefix}on *:* off *antillamar | anticall*_
┃卐│ _${usedPrefix}on *:* off *publico | public*_
┃卐│ _${usedPrefix}on *:* off *autovisto | autoread*_
┃卐│ _${usedPrefix}on *:* off *temporal*_
┃卐│ _${usedPrefix}on *:* off *stickers*_
┃卐│ _${usedPrefix}on *:* off *autosticker*_
┃卐│ _${usedPrefix}on *:* off *reacciones | reaction*_
┃卐│ _${usedPrefix}on *:* off *audios*_
┃卐│ _${usedPrefix}on *:* off *modocaliente | modohorny*_
┃卐│ _${usedPrefix}on *:* off *antitoxicos | antitoxic*_
┃卐│ _${usedPrefix}on *:* off *antiver | antiviewonce*_ 
┃卐│ _${usedPrefix}on *:* off *antieliminar | antidelete*_ 
┃卐│ _${usedPrefix}on *:* off *antinternacional | antifake*_
┃卐│ _${usedPrefix}on *:* off *antienlace | antilink*_
┃卐│ _${usedPrefix}on *:* off *antienlace2 | antilink2*_
┃卐│ _${usedPrefix}on *:* off *antitiktok | antitk*_
┃卐│ _${usedPrefix}on *:* off *antiyoutube | antiyt*_
┃卐│ _${usedPrefix}on *:* off *antitelegram | antitel*_
┃卐│ _${usedPrefix}on *:* off *antifacebook | antifb*_
┃卐│ _${usedPrefix}on *:* off *antinstagram | antig*_
┃卐│ _${usedPrefix}on *:* off *antitwitter | antitw*_
┃卐│ _${usedPrefix}on *:* off *soloprivados | pconly*_
┃卐│ _${usedPrefix}on *:* off *sologrupos | gconly*_
┃卐╰─────────────────❍
╰══════════════════════════⊷

╭════〘👻 _DESCARGAS_ 👻〙════⊷❍
│   │
┃卐│ _${usedPrefix}imagen | image *texto*_
┃卐│ _${usedPrefix}pinterest | dlpinterest *texto*_
┃卐│ _${usedPrefix}wallpaper|wp *texto*_
┃卐│ _${usedPrefix}play | play2 *texto o link*_
┃卐│ _${usedPrefix}play.1 *texto o link*_
┃卐│ _${usedPrefix}play.2 *texto o link*_ 
┃卐│ _${usedPrefix}ytmp3 | yta *link*_ 
┃卐│ _${usedPrefix}ytmp4 | ytv *link*_
┃卐│ _${usedPrefix}pdocaudio | ytadoc *link*_
┃卐│ _${usedPrefix}pdocvieo | ytvdoc *link*_
┃卐│ _${usedPrefix}tw |twdl | twitter *link*_
┃卐│ _${usedPrefix}facebook | fb *link*_
┃卐│ _${usedPrefix}instagram *link video o imagen*_
┃卐│ _${usedPrefix}verig | igstalk *usuario(a)*_
┃卐│ _${usedPrefix}ighistoria | igstory *usuario(a)*_
┃卐│ _${usedPrefix}tiktok *link*_
┃卐│ _${usedPrefix}tiktokimagen | ttimagen *link*_
┃卐│ _${usedPrefix}tiktokfoto | tiktokphoto *usuario(a)*_
┃卐│ _${usedPrefix}vertiktok | tiktokstalk *usuario(a)*_
┃卐│ _${usedPrefix}mediafire | dlmediafire *link*_
┃卐│ _${usedPrefix}clonarepo | gitclone *link*_
┃卐│ _${usedPrefix}clima *país ciudad*_
┃卐│ _${usedPrefix}consejo_
┃卐│ _${usedPrefix}morse codificar *texto*_
┃卐│ _${usedPrefix}morse decodificar *morse*_
┃卐│ _${usedPrefix}fraseromantica_
┃卐│ _${usedPrefix}historia_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭═══〘👻 _Chat Anonimo_ 👻〙═══⊷❍
┃ _podras enviar mensajes a otra
┃ _persona usando a Katashi bot_
┃
┃卐│ _${usedPrefix}chatanonimo | anonimochat_
┃卐│ _${usedPrefix}anonimoch_
┃卐│ _${usedPrefix}start_
┃卐│ _${usedPrefix}next_
┃卐│ _${usedPrefix}leave_
┃卐╰───────────────
╰═════════════════════⊷
 
╭════〘👻 _Grupos_ 👻〙════⊷❍
│卐
┃卐│ _${usedPrefix}add *numero*_
┃卐│ _${usedPrefix}sacar | ban | kick  *@tag*_
┃卐│ _${usedPrefix}grupo *abrir : cerrar*_
┃卐│ _${usedPrefix}group *open : close*_
┃卐│ _${usedPrefix}daradmin | promote *@tag*_
┃卐│ _${usedPrefix}quitar | demote *@tag*_
┃卐│ _${usedPrefix}banchat_
┃卐│ _${usedPrefix}unbanchat_
┃卐│ _${usedPrefix}banuser *@tag*_
┃卐│ _${usedPrefix}unbanuser *@tag*_
┃卐│ _${usedPrefix}admins *texto*_
┃卐│ _${usedPrefix}invocar *texto*_ 
┃卐│ _${usedPrefix}tagall *texto*_
┃卐│ _${usedPrefix}hidetag *texto*_
┃卐│ _${usedPrefix}infogrupo | infogroup_
┃卐│ _${usedPrefix}grupotiempo | grouptime *Cantidad*_ 
┃卐│ _${usedPrefix}advertencia *@tag*_ 
┃卐│ _${usedPrefix}deladvertencia *@tag*_
┃卐│ _${usedPrefix}delwarn *@tag*_
┃卐│ _${usedPrefix}crearvoto | startvoto *texto*_ 
┃卐│ _${usedPrefix}sivotar | upvote_
┃卐│ _${usedPrefix}novotar | devote_
┃卐│ _${usedPrefix}vervotos | cekvoto_
┃卐│ _${usedPrefix}delvoto | deletevoto_
┃卐│ _${usedPrefix}enlace | link_
┃卐│ _${usedPrefix}newnombre | nuevonombre *texto*_
┃卐│ _${usedPrefix}newdesc | descripcion *texto*_   
┃卐│ _${usedPrefix}setwelcome | bienvenida *texto*_   
┃卐│ _${usedPrefix}setbye | despedida *texto*_  
┃卐│ _${usedPrefix}nuevoenlace | resetlink_
┃卐│ _${usedPrefix}on_
┃卐│ _${usedPrefix}off_   
┃卐╰─────────────────❍
╰══════════════════⊷❍
 
╭════〘👻 _Parejas_ 👻〙════⊷❍
│
┃卐│ _${usedPrefix}listaparejas | listship_
┃卐│ _${usedPrefix}mipareja | mylove_
┃卐│ _${usedPrefix}pareja | couple *@tag*_
┃卐│ _${usedPrefix}aceptar | accept *@tag*_
┃卐│ _${usedPrefix}rechazar | decline *@tag*_
┃卐│ _${usedPrefix}terminar | finish *@tag*_
┃卐╰─────────────────❍
╰══════════════════⊷❍
 
╭════〘👻 _Votaciones en grupos_ 👻〙════⊷❍
│
┃卐│ _${usedPrefix}crearvoto | startvoto *texto*_ 
┃卐│ _${usedPrefix}sivotar | upvote_ 
┃卐│ _${usedPrefix}novotar | devote_ 
┃卐│ _${usedPrefix}vervotos | cekvoto_
┃卐│ _${usedPrefix}delvoto | deletevoto_ 
┃卐╰─────────────────❍
╰══════════════════⊷❍ 
 
╭════〘👻 _Comandos +18_ 👻〙════⊷❍
│  ╭──────────────❍
┃卐│ _${usedPrefix}hornymenu_ 
┃卐╰──────────────❍
╰══════════════════⊷❍
 
╭════〘👻 _Convertidores_ 👻〙════⊷❍
│
┃卐│ _${usedPrefix}toimg | img | jpg *sticker*_ 
┃卐│ _${usedPrefix}toanime | jadianime *foto*_
┃卐│ _${usedPrefix}tomp3 | mp3 *video o nota de voz*_
┃卐│ _${usedPrefix}tovn | vn *video o audio*_
┃卐│ _${usedPrefix}tovideo *audio*_
┃卐│ _${usedPrefix}tourl *video, imagen*_
┃卐│ _${usedPrefix}toenlace  *video, imagen o audio*_
┃卐│ _${usedPrefix}tts es *texto*_
┃卐╰─────────────────❍
╰══════════════════⊷❍ 
 
╭════〘👻 *_ᴏᴛʜᴇʀs_* 👻〙════⊷❍
│卐╭─────────────────
┃卐│ _${usedPrefix}logos *efecto texto*_
┃卐│ _${usedPrefix}menulogos2_
┃卐╰─────────────────
╰══════════════════⊷❍

╭════〘👻 *_ᴏᴛʜᴇʀs_* 👻〙════⊷❍
│卐╭─────────────────❍
┃卐│ _${usedPrefix}simpcard *@tag*_
┃卐│ _${usedPrefix}hornycard *@tag*_
┃卐│ _${usedPrefix}lolice *@tag*_
┃卐│ _${usedPrefix}ytcomment *texto*_
┃卐│ _${usedPrefix}itssostupid_
┃卐│ _${usedPrefix}pixelar_
┃卐│ _${usedPrefix}blur_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭════〘👻 _IMGNS ANIME Y MAS_ 👻〙════⊷❍
│
┃卐│ _${usedPrefix}chica_ 
┃卐│ _${usedPrefix}chico_
┃卐│ _${usedPrefix}cristianoronaldo_
┃卐│ _${usedPrefix}messi_
┃卐│ _${usedPrefix}meme_
┃卐│ _${usedPrefix}meme2_
┃卐│ _${usedPrefix}itzy_
┃卐│ _${usedPrefix}blackpink_
┃卐│ _${usedPrefix}kpop *blackpink : exo : bts*_
┃卐│ _${usedPrefix}lolivid_
┃卐│ _${usedPrefix}loli_
┃卐│ _${usedPrefix}navidad_
┃卐│ _${usedPrefix}ppcouple_
┃卐│ _${usedPrefix}neko_
┃卐│ _${usedPrefix}waifu_
┃卐│ _${usedPrefix}akira_
┃卐│ _${usedPrefix}akiyama_
┃卐│ _${usedPrefix}anna_
┃卐│ _${usedPrefix}asuna_
┃卐│ _${usedPrefix}ayuzawa_
┃卐│ _${usedPrefix}boruto_
┃卐│ _${usedPrefix}chiho_
┃卐│ _${usedPrefix}chitoge_
┃卐│ _${usedPrefix}deidara_
┃卐│ _${usedPrefix}erza_
┃卐│ _${usedPrefix}elaina_
┃卐│ _${usedPrefix}eba_
┃卐│ _${usedPrefix}emilia_
┃卐│ _${usedPrefix}hestia_
┃卐│ _${usedPrefix}hinata_
┃卐│ _${usedPrefix}inori_
┃卐│ _${usedPrefix}isuzu_
┃卐│ _${usedPrefix}itachi_
┃卐│ _${usedPrefix}itori_
┃卐│ _${usedPrefix}kaga_
┃卐│ _${usedPrefix}kagura_
┃卐│ _${usedPrefix}kaori_
┃卐│ _${usedPrefix}keneki_
┃卐│ _${usedPrefix}kotori_
┃卐│ _${usedPrefix}kurumi_
┃卐│ _${usedPrefix}madara_
┃卐│ _${usedPrefix}mikasa_
┃卐│ _${usedPrefix}miku_
┃卐│ _${usedPrefix}minato_
┃卐│ _${usedPrefix}naruto_
┃卐│ _${usedPrefix}nezuko_
┃卐│ _${usedPrefix}sagiri_
┃卐│ _${usedPrefix}sasuke_
┃卐│ _${usedPrefix}sakura_
┃卐│ _${usedPrefix}cosplay_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭════〘👻 _Modificar audios_ 👻〙════⊷❍
│卐╭──────────────❍
┃卐│ _${usedPrefix}bass_
┃卐│ _${usedPrefix}blown_
┃卐│ _${usedPrefix}deep_
┃卐│ _${usedPrefix}earrape_
┃卐│ _${usedPrefix}fat_
┃卐│ _${usedPrefix}fast_
┃卐│ _${usedPrefix}nightcore_
┃卐│ _${usedPrefix}reverse_
┃卐│ _${usedPrefix}robot_
┃卐│ _${usedPrefix}slow_
┃卐│ _${usedPrefix}smooth_
┃卐│ _${usedPrefix}tupai_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭════〘👻 _🍁Búsquedas 🍁_ 👻〙════⊷❍
│卐╭──────────────❍
┃卐│ _${usedPrefix}animeinfo *texto*_
┃卐│ _${usedPrefix}mangainfo *texto*_
┃卐│ _${usedPrefix}google *texto*_
┃卐│ _${usedPrefix}letra | lirik *texto*_
┃卐│ _${usedPrefix}ytsearch | yts *texto*_
┃卐│ _${usedPrefix}wiki | wikipedia *texto*_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭════〘👻 _Menu Audios_ 👻〙════⊷❍
│ _Solicita el menu de audios_
┃ _usando:_
┃卐│ _${usedPrefix}audios_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭════〘👻 _🍁Herramientas 🍁_ 👻〙════⊷❍
│卐╭──────────────❍
┃卐│ _${usedPrefix}afk *motivo*_
┃卐│ _${usedPrefix}acortar *url*_
┃卐│ _${usedPrefix}calc *operacion math*_
┃卐│ _${usedPrefix}del *respondre a mensaje del Bot*_
┃卐│ _${usedPrefix}qrcode *texto*_
┃卐│ _${usedPrefix}readmore *texto1|texto2*_
┃卐│ _${usedPrefix}spamwa *numero|texto|cantidad*_
┃卐│ _${usedPrefix}styletext *texto*_
┃卐│ _${usedPrefix}traducir *texto*_
┃卐│ _${usedPrefix}morse codificar *texto*_
┃卐│ _${usedPrefix}morse decodificar *morse*_
┃卐│ _${usedPrefix}encuesta | poll *Motivo*_
┃卐│ _${usedPrefix}horario_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭════〘👻 _RPG SUBIR DE NIVEL_ 👻〙════⊷❍
┃卐╭─────────────────────────❍
┃卐│ _${usedPrefix}botemporal *enlace* *cantidad*_
┃卐│ _${usedPrefix}addbot *enlace* *cantidad*_
┃卐│ _${usedPrefix}pase premium_
┃卐│ _${usedPrefix}pass premium_
┃卐│ _${usedPrefix}listapremium | listprem_
┃卐│ _${usedPrefix}transfer *tipo cantidad @tag*_
┃卐│ _${usedPrefix}dar *tipo cantidad @tag*_
┃卐│ _${usedPrefix}enviar *tipo cantidad @tag*_
┃卐│ _${usedPrefix}balance_
┃卐│ _${usedPrefix}cartera | wallet_ 
┃卐│ _${usedPrefix}experiencia | exp_
┃卐│ _${usedPrefix}top | lb | leaderboard_
┃卐│ _${usedPrefix}nivel | level | lvl_
┃卐│ _${usedPrefix}rol | rango_
┃卐│ _${usedPrefix}inventario | inventory_ 
┃卐│ _${usedPrefix}aventura | adventure_ 
┃卐│ _${usedPrefix}caza | cazar | hunt_
┃卐│ _${usedPrefix}pescar | fishing_
┃卐│ _${usedPrefix}animales_ 
┃卐│ _${usedPrefix}alimentos_
┃卐│ _${usedPrefix}curar | heal_
┃卐│ _${usedPrefix}buy_
┃卐│ _${usedPrefix}sell_
┃卐│ _${usedPrefix}verificar | registrar_
┃卐│ _${usedPrefix}perfil | profile_
┃卐│ _${usedPrefix}myns_
┃卐│ _${usedPrefix}unreg *numero de serie*_
┃卐│ _${usedPrefix}minardiamantes | minargemas_
┃卐│ _${usedPrefix}minargatacoins | minarcoins_
┃卐│ _${usedPrefix}minarexperiencia | minarexp_
┃卐│ _${usedPrefix}minar *:* minar2 *:* minar3_
┃卐│ _${usedPrefix}reclamar | regalo | claim_
┃卐│ _${usedPrefix}cadahora | hourly_
┃卐│ _${usedPrefix}cadasemana | semanal | weekly_
┃卐│ _${usedPrefix}cadames | mes | monthly_
┃卐│ _${usedPrefix}cofre | abrircofre | coffer_
┃卐│ _${usedPrefix}trabajar | work_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭══〘👻 _Tabla de clasificación_ 👻〙═⊷❍
┃卐╭─────────────────❍
┃卐│ _${usedPrefix}top | lb | leaderboard_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭════〘👻 _Stickers_ 👻〙════⊷❍
┃卐╭──────────────❍
┃卐│ _${usedPrefix}sticker | s *imagen o video*_
┃卐│ _${usedPrefix}sticker | s *url de tipo jpg*_
┃卐│ _${usedPrefix}emojimix *👻+😐*_
┃卐│ _${usedPrefix}scircle | círculo *imagen*_
┃卐│ _${usedPrefix}semoji | emoji *tipo emoji*_
┃卐│ _${usedPrefix}attp *texto*_
┃卐│ _${usedPrefix}attp2 *texto*_
┃卐│ _${usedPrefix}ttp *texto*_
┃卐│ _${usedPrefix}ttp2 *texto*_
┃卐│ _${usedPrefix}ttp3 *texto*_
┃卐│ _${usedPrefix}ttp4 *texto*_
┃卐│ _${usedPrefix}ttp5 *texto*_
┃卐│ _${usedPrefix}ttp6 *texto*_
┃卐│ _${usedPrefix}dado_
┃卐│ _${usedPrefix}stickermarker *efecto : responder a imagen*_ 
┃卐│ _${usedPrefix}stickerfilter *efecto : responder a imagen*_ 
┃卐│  _${usedPrefix}cs *:* cs2_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭══〘👻 _Editar Stickers_ 👻〙═══⊷❍
┃卐╭─────────────────❍
┃卐│ _${usedPrefix}wm *packname|author*_
┃卐│ _${usedPrefix}wm *texto1|texto2*_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭════〘👻 _Acciónes con stickers_ 👻〙════⊷❍
┃卐╭────────────────────❍
┃卐│ _${usedPrefix}palmaditas | pat *@tag*_
┃卐│ _${usedPrefix}bofetada | slap *@tag*_
┃卐│ _${usedPrefix}golpear *@tag*_
┃卐│ _${usedPrefix}besar | kiss *@tag*_ 
┃卐│ _${usedPrefix}alimentar | food *@tag*_
┃卐╰─────────────────❍
╰══════════════════⊷❍

╭════〘👻 _Para Propietarios/Owners_ 👻〙════⊷❍
┃卐╭─────────────────────────❍
┃卐│ _${usedPrefix}join *enlace*_
┃卐│ _${usedPrefix}unete *enlace*_
┃卐│ _${usedPrefix}dardiamantes *cantidad*_
┃卐│ _${usedPrefix}darxp *cantidad*_
┃卐│ _${usedPrefix}darkatacoins *cantidad*_ 
┃卐│ _${usedPrefix}addprem | userpremium *@tag* *cantidad*_
┃卐│ _${usedPrefix}addprem2 | userpremium2 *@tag* *cantidad*_
┃卐│ _${usedPrefix}addprem3 | userpremium3 *@tag* *cantidad*_
┃卐│ _${usedPrefix}addprem4 | userpremium4 *@tag* *cantidad*_
┃卐│ _${usedPrefix}idioma | language_
┃卐│ _${usedPrefix}cajafuerte_
┃卐│ _${usedPrefix}comunicar | broadcastall | bc *texto*_
┃卐│ _${usedPrefix}broadcastchats | bcc *texto*_
┃卐│ _${usedPrefix}comunicarpv *texto*_
┃卐│ _${usedPrefix}broadcastgc *texto*_ 
┃卐│ _${usedPrefix}comunicargrupos *texto*_
┃卐│ _${usedPrefix}borrartmp | cleartmp_
┃卐│ _${usedPrefix}delexp *@tag*_
┃卐│ _${usedPrefix}delgatacoins *@tag*_
┃卐│ _${usedPrefix}deldiamantes *@tag*_
┃卐│ _${usedPrefix}reiniciar | restart_
┃卐│ _${usedPrefix}ctualizar | update_
┃卐│ _${usedPrefix}addprem | +prem *@tag*_
┃卐│ _${usedPrefix}delprem | -prem *@tag*_
┃卐│ _${usedPrefix}listapremium | listprem_
┃卐│ _${usedPrefix}añadirdiamantes *@tag cantidad*_
┃卐│_${usedPrefix}añadirxp *@tag cantidad*_
┃卐│ _${usedPrefix}añadirkatacoins *@tag cantidad*_
┃卐╰─────────────────❍
╰══════════════════⊷❍`.trim()
await conn.sendFile(m.chat, gataVidMenu.getRandom(), 'gata.mp4', menu, fkontak)
	
} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command = /^(enu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|menucompleto|allmenu|allm|m|\?)$/i
//handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}  
