/*⚠ PROHIBIDO EDITAR ⚠

El codigo de este archivo esta totalmente hecho por:
- Aiden_NotLogic >> https://github.com/ferhacks

El codigo de este archivo fue parchado por:
- ReyEndymion >> https://github.com/ReyEndymion
- BrunoSobrino >> https://github.com/BrunoSobrino

Contenido adaptado por:
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
*/
 
const {DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } = await import("@whiskeysockets/baileys");
import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'
import readline from 'readline'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import * as ws from 'ws'
const { CONNECTING } = ws
import { Boom } from '@hapi/boom'
import qrcode from 'qrcode';
import fs from 'fs';
import pino from 'pino';
import 'ws';
const { child, spawn, exec } = await import("child_process");
import { makeWASocket } from '../lib/simple.js';
import store from '../lib/store.js';
import NodeCache from 'node-cache';
let check1 = "NjBhZGVmZWI4N2M2"
let check2 = "ZThkMmNkOGVlMDFmZD"
let check3 = "UzYTI1MTQgIGluZ"
let check4 = "m8tZG9uYXIuanMK"
let check5 = "NzZjM2ZmMzU2MTEyMzM3OTczOWU5ZmFmMDZjYzUzO"
let check6 = "DcgIF9hdXRvcmVzcG9uZGVyLmpzCjU5Yzc0ZjFjNmEz"
let check8 = "NjNmYmJjYzA1YmFiY2MzZGU4MGRlICBpbmZvLWJvdC5qcwo"
//
let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = "CkphZGlib3QsIEhlY2hv"
let drm2 = "IHBvciBAQWlkZW5fTm90TG9naWM"

if (!(global.conns instanceof Array)) global.conns = [];
if (!(global.dataconst instanceof Array)) global.dataconst = [];
 
const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJsonPath = join(__dirname, '../package.json')
const { name, author, version: versionSB, description } = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
if (!global.db.data.settings[conn.user.jid].jadibotmd) return conn.sendMessage(m.chat, { text: `${lenguajeGB['smsSoloOwnerJB']()}` }, { quoted: m })
if (conn.user.jid !== global.conn.user.jid) return conn.reply(m.chat, `${lenguajeGB['smsJBPrincipal']()} wa.me/${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}`, m) 
  
const signatureBuffer = Buffer.from("CkphZGlib3QsIEhlY2hvIHBvciBAQWlkZW5fTm90TG9naWM", "base64");

async function initBot() {
let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
let mentionedNumber = '' + mentionedJid.split`@`[0];
let isCode = args[0] && args[0].includes("--code") ? true : !!(args[1] && args[1].includes("--code"));

      if (isCode) {
        args[0] = args[0].replace("--code", '').trim();
        if (args[1]) args[1] = args[1].replace("--code", '').trim();
        if (args[0] == '') args[0] = undefined;
      }

      if (!fs.existsSync('./KatashiJadiBot/' + mentionedNumber)) {
        fs.mkdirSync("./KatashiJadiBot/" + mentionedNumber, { recursive: true });
      }

      if (args[0]) {
        fs.writeFileSync("./KatashiJadiBot/" + mentionedNumber + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, "\t"));
      }

      if (fs.existsSync("./KatashiJadiBot/" + mentionedNumber + "/creds.json")) {
        let creds = JSON.parse(fs.readFileSync('./KatashiJadiBot/' + mentionedNumber + "/creds.json"));
        if (creds) {
          if (creds.registered = false) {
            fs.unlinkSync('./KatashiJadiBot/' + mentionedNumber + "/creds.json");
          }
        }
      }

      const { state, saveState, saveCreds } = await useMultiFileAuthState("./KatashiJadiBot/" + mentionedNumber);
      const msgRetryCounterMap = new NodeCache();
      const { version } = await fetchLatestBaileysVersion();
      const socketConfig = {
        printQRInTerminal: false,
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
        },
        logger: pino({ level: "silent" }),
        browser: isCode ? ['Ubuntu', "Chrome", "20.0.04"] : ["KatashiBot-MD (Sub-Bot)", "Safari", "2.0.0"],
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        getMessage: async key => {
          let user = jidNormalizedUser(key.remoteJid);
          let message = await store.loadMessage(user, key.id);
          return message?.message || '';
        },
        msgRetryCounterCache: msgRetryCounterMap,
        version
      };

      let socket = makeWASocket(socketConfig);
      socket.isInit = false;
      socket.uptime = Date.now();
      let reconnectAttempts = true;

      async function connectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin, qr } = update;

        if (isNewLogin) socket.isInit = false;
        if (qr && !isCode) {
          conn.sendMessage(m.chat, {
            image: await qrcode.toBuffer(qr, { scale: 8 }),
            caption: `*『 SER BOT CON CÓDIGO QR 』*\n✦ *Versión de ${name} »* *\`${versionSB}\`*\n✦ *Versión de JadiBot »* *\`${global.vsJB}\`*\n✦ *Descripción »* _${description}_\n*No sólo el diseño del mensaje se ha renovado. ✨ ¡Disfruta de ${name}!*\n> ➡️ *Usando otro celular o en la PC escanea este código QR para convertirte en Sub Bot de ${name} 🐈*\n\n*1️⃣ Diríjase a los tres puntos en la esquina superior derecha*\n*2️⃣ Ir a la opción "Dispositivos vinculados" y use el botón "Vincular un dispositivo"*\n*3️⃣ Escanee este codigo QR para iniciar sesión*\n\n> 📢 *¡Este código QR expira en 50 segundos!*\n⚠️ _*Como medida de seguridad y para no generar spam, este mensaje será eliminado en 50 segundos*_\n` + signatureBuffer.toString("utf-8")
          }, { quoted: m });
        }

        if (qr && isCode) {
          let senderNumber = m.sender.split`@`[0];
          if (senderNumber.startsWith('52')) senderNumber = "521" + senderNumber.slice(2);
          let pairingCode = await socket.requestPairingCode(senderNumber);
          conn.sendMessage(m.chat, {
            text: `*『 SER BOT CON CÓDIGO DE 8 DÍGITOS 』*\n✦ *Versión de ${name} »* *\`${versionSB}\`*\n✦ *Versión de JadiBot »* *\`${global.vsJB}\`*\n✦ *Descripción »* _${description}_\n\n*No sólo el diseño del mensaje se ha renovado. ✨ ¡Disfruta de ${name}!*\n> *Se enviará un código para ser Sub Bot*\n\n1️⃣ *Diríjase a los tres puntos en la esquina superior derecha*\n\n2️⃣ *Selecciona "Dispositivos vinculados" y use el botón "Vincular un dispositivo"*\n\n3️⃣ *Selecciona en la parte inferior "Vincular con el número de teléfono"*\n\n4️⃣ *Introduzca el código de 8 dígitos*\n\n*El código solo será válido únicamente para quien lo solicitó*\n⚠️ _*Como medida de seguridad y para no generar spam, este mensaje y el código será eliminado en 1 minuto*_\n` + signatureBuffer.toString('utf-8')
          }, { quoted: m });
          await delay(5000);
          conn.sendMessage(m.chat, { text: pairingCode }, { quoted: m });
        }

        const statusCode = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        if (connection === "close") {
          if (socket.user && dataconst[socket.user.id.split('@')] == 3) {
            return conn.sendMessage(m.chat, { text: "*⚠️ Se ha alcanzado el limite de reconexiones, por favor intente mas tarde.*" }, { quoted: m });
          }
          if (statusCode == 405 || statusCode == 404) {
            fs.unlinkSync('./KatashiJadiBot/' + mentionedNumber + '/creds.json');
            return initBot();
          }
          if (statusCode === DisconnectReason.badSession) {
            conn.sendMessage(m.chat, { text: "*⚠️ La sesión actual es inválida, Tendras que iniciar sesion de nuevo." }, { quoted: m });
            fs.rmdirSync("./KatashiJadiBot/" + mentionedNumber, { recursive: true });
          } else if (statusCode === DisconnectReason.connectionClosed) {
            if (socket.fstop) {
              return conn.sendMessage(m.chat, { text: "*⚠️ El bot se ha apagado correctamente!!*" }, { quoted: m });
            }
            if (!socket.fstop) {
              conn.sendMessage(m.chat, { text: "*⚠️ La conexión se cerró, se intentara reconectar automáticamente...*\n" + dataconst[socket.user.id.split('@')] + '/3' }, { quoted: m });
            }
            if (!socket.fstop) {
              await reloadHandler(true).catch(console.error);
            }
          } else if (statusCode === DisconnectReason.connectionLost) {
            conn.sendMessage(m.chat, { text: "*⚠️ La conexión se perdió, se intentara reconectar automáticamente...*\n" + dataconst[socket.user.id.split('@')] + '/3' }, { quoted: m });
            await reloadHandler(true).catch(console.error);
          } else if (statusCode === DisconnectReason.connectionReplaced) {
            conn.sendMessage(m.chat, { text: "*⚠️ La conexión se reemplazó, Su conexion se cerro*\n\n*Para volver a conectarte usa:*\n" + usedPrefix + command }, { quoted: m });
          } else if (statusCode === DisconnectReason.loggedOut) {
            conn.sendMessage(m.chat, { text: "*La conexión se cerró*, Tendrá que conectarse manualmente usando el comando #serbot*" }, { quoted: m });
            return fs.rmdirSync("./KatashiJadiBot/" + mentionedNumber, { recursive: true });
          } else if (statusCode === DisconnectReason.restartRequired) {
            await reloadHandler(true).catch(console.error);
          } else if (statusCode === DisconnectReason.timedOut) {
            conn.sendMessage(m.chat, { text: "*⚠️ La conexión se agotó, se intentara reconectar automáticamente...*\n" + dataconst[socket.user.id.split('@')] + '/3' }, { quoted: m });
            await reloadHandler(true).catch(console.error);
          } else {
            conn.sendMessage(m.chat, { text: "⚠️ Razón de desconexión desconocida. " + (statusCode || '') + ": " + (connection || '') + " Por favor reporte al desarollador." }, { quoted: m });
          }
          let index = global.conns.indexOf(socket);
          if (index < 0) return console.log("no se encontro");
          delete global.conns[index];
          global.conns.splice(index, 1);
        }

        if (global.db.data == null) loadDatabase();

        if (connection == 'open') {
          socket.isInit = true;
          global.conns.push(socket);
          await conn.sendMessage(m.chat, { text: args[0] ? "*✅ *¡Conectado con exito!*" : `✅ *Conectado con WhatsApp*\n\n♻️ *Comandos relacionados con Sub Bot:*\n» *#stop* _(Pausar ser bot)_\n» *#eliminarsesion* _(Dejar de ser bot y eliminar datos)_\n» *#serbot [texto largo]* _(Reanudar ser Bot en caso que este pausado o deje de funcionar)_\n\n*Gracias por usar ❤️${name} 🐈*\n\n📢 *Informate de las novedades en nuestro canal oficial:*\n${canal2}\n\n🤩 *Descubre más formas de seguir pendiente de este proyecto:*\n${cuentas}\n\n💝 *Puede hacer una Donación voluntaria por PayPal:*\n${paypal}` }, { quoted: m });
if (connection === "open") {
dataconst[socket.user.id.split('@')] = 1;
conn.sendMessage(m.chat, { text: `${lenguajeGB['smsAvisoIIG']()}⚪ *ESTÁ CONECTADO(A)!! POR FAVOR ESPERE SE ESTÁ CARGANDO LOS MENSAJES...*\n\n♻️ *OPCIONES DISPONIBLES:*\n*» #stop _(Detener la función Sub Bot)_*\n*» #eliminarsesion _(Borrar todo rastro de Sub Bot)_*\n*» #serbot _(Obtener nuevo código QR para ser Sub Bot)_*` }, { quoted: m });
return console.log(await reloadHandler(false).catch(console.error));
          }
          await sleep(5000);
if (!args[0]) {
await parent.sendMessage(conn.user.jid, {text : `${lenguajeGB['smsJBInfo1']()} ${lenguajeGB['smsJBInfo2']()}`}, { quoted: m })
conn.sendMessage(conn.user.jid, { text: usedPrefix + command + " " + Buffer.from(fs.readFileSync("./KatashiJadiBot/" + mentionedNumber + "/creds.json"), "utf-8").toString('base64') }, { quoted: m });
          }
        }
      }

      setInterval(async () => {
        if (!socket.user) {
          try { socket.ws.close(); } catch { }
          socket.ev.removeAllListeners();
          let index = global.conns.indexOf(socket);
          if (index < 0) return;
          delete global.conns[index];
          global.conns.splice(index, 1);
        }
      }, 60000);

      let handler = global.handler;
      let reloadHandler = async function (restart) {
        try {
          const newHandler = await import('../handler.js?update=' + Date.now()).catch(console.error);
          if (Object.keys(newHandler || {}).length) handler = newHandler;
        } catch (err) {
          console.error(err);
        }
        if (restart) {
          try { socket.ws.close(); } catch { }
          socket.ev.removeAllListeners();
          socket = makeWASocket(socketConfig);
          reconnectAttempts = true;
        }
        if (socket.user && socket.user.id && !dataconst[socket.user.id.split('@')]) {
          dataconst[socket.user.id.split('@')] = 0;
        }
        if (socket.user && socket.user.id && dataconst[socket.user.id.split('@')] && restart) {
          dataconst[socket.user.id.split('@')]++;
        }
        if (!reconnectAttempts) {
          socket.ev.off('messages.upsert', socket.handler);
          socket.ev.off("group-participants.update", socket.participantsUpdate);
          socket.ev.off("groups.update", socket.groupsUpdate);
          socket.ev.off("message.delete", socket.onDelete);
          socket.ev.off("call", socket.onCall);
          socket.ev.off("connection.update", socket.connectionUpdate);
          socket.ev.off("creds.update", socket.credsUpdate);
        }
        socket.handler = handler.handler.bind(socket);
        socket.participantsUpdate = handler.participantsUpdate.bind(socket);
        socket.groupsUpdate = handler.groupsUpdate.bind(socket);
        socket.onDelete = handler.deleteUpdate.bind(socket);
        socket.onCall = handler.callUpdate.bind(socket);
        socket.connectionUpdate = connectionUpdate.bind(socket);
        socket.credsUpdate = saveCreds.bind(socket, true);
        socket.ev.on("messages.upsert", socket.handler);
        socket.ev.on("group-participants.update", socket.participantsUpdate);
        socket.ev.on("groups.update", socket.groupsUpdate);
        socket.ev.on("message.delete", socket.onDelete);
        socket.ev.on("call", socket.onCall);
        socket.ev.on("connection.update", socket.connectionUpdate);
        socket.ev.on("creds.update", socket.credsUpdate);
        socket.subreloadHandler = reloadHandler;
        reconnectAttempts = false;
        return true;
      };

      reloadHandler(false);
    }

    initBot();
};
handler.help = ["jadibot", 'serbot', 'getcode', "rentbot"];
handler.tags = ['jadibot'];
handler.command = /^(jadibot|serbot|getcode|rentbot|code)$/i;

export default handler;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*// Créditos: https://github.com/FG98F
// Código adaptado por KatashiFukushima

const { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, MessageRetryMap, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC } = await import('@whiskeysockets/baileys')
import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'
import NodeCache from 'node-cache'
import readline from 'readline'
import qrcode from "qrcode"
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import fs from "fs"
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import pino from 'pino'
import * as ws from 'ws'
const { CONNECTING } = ws
import { Boom } from '@hapi/boom'
import { makeWASocket } from '../lib/simple.js'

if (global.conns instanceof Array) console.log()
else global.conns = []

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJsonPath = join(__dirname, '../package.json')
const { name, author, version: versionSB, description } = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

let folderBot = 'GataBotSession', nameBotMD = 'GataBot-MD', opcion = ''
let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner, text }) => {
if (!global.db.data.settings[conn.user.jid].jadibotmd) return _conn.sendMessage(m.chat, { text: `${lenguajeGB['smsSoloOwnerJB']()}` }, { quoted: m })
  
let parent = args[0] && args[0] == 'plz' ? _conn : await global.conn
text = (text ? text : (args[0] ? args[0] : '')).toLowerCase()

let message1 = `*Si desea convertirse en bot, diríjase al número principal*\n\nwa.me/${global.conn.user.jid.split('@')[0]}?text=${usedPrefix}serbot`
if (!((args[0] && args[0] == 'plz') || (await global.conn).user.jid == _conn.user.jid)) {
if (text.includes('qr')) {
return parent.sendMessage(m.chat, { text: message1 + '%20qr' }, { quoted: m })
} else if (text.includes('code')) {
return parent.sendMessage(m.chat, { text: message1 + '%20code' }, { quoted: m })
} else {
return parent.sendMessage(m.chat, { text: message1 + '%20code' }, { quoted: m })
}}
  
let authFolderB = crypto.randomBytes(10).toString('hex').slice(0, 8)
async function serbot() {
if (!fs.existsSync(`./${folderBot}/` + authFolderB)){
fs.mkdirSync(`./${folderBot}/` + authFolderB, { recursive: true })
}
args[0] ? fs.writeFileSync(`./${folderBot}/` + authFolderB + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""
  
const { state, saveState, saveCreds } = await useMultiFileAuthState(`./${folderBot}/${authFolderB}`)
const msgRetryCounterMap = (MessageRetryMap) => { }
const msgRetryCounterCache = new NodeCache()
const {version} = await fetchLatestBaileysVersion()
let phoneNumber = m.sender.split('@')[0]

const methodCodeQR = text.includes('qr') || false
const methodCode = text.includes('code') || true
const MethodMobile = process.argv.includes("mobile")

if (text.includes('qr')) {
opcion = '1'
} else if (text.includes('code')) {
opcion = '2'
} else {
opcion = '2'
}

const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
mobile: MethodMobile, 
browser: opcion == '1' ? [`${nameBotMD} (sub bot)`, 'Edge', '2.0.0'] : ['Ubuntu', 'Edge', '110.0.1587.56'], 
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })), },
markOnlineOnConnect: true, 
generateHighQualityLinkPreview: true, 
getMessage: async (clave) => {
let jid = jidNormalizedUser(clave.remoteJid)
let msg = await store.loadMessage(jid, clave.id)
return msg?.message || ""
},
msgRetryCounterCache,
msgRetryCounterMap,
defaultQueryTimeoutMs: undefined,   
version
}

let conn = makeWASocket(connectionOptions)
conn.isInit = false
let isInit = true

let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '')
  
let txt = ''
if (!fs.existsSync(`./${folderBot}/` + authFolderB + "/creds.json")){
if (opcion == '1') {
txt = `*『 SER BOT CON CÓDIGO QR 』*\n
✦ *Versión de ${name} »* *\`${versionSB}\`*
✦ *Versión de JadiBot »* *\`${global.vsJB}\`*
✦ *Descripción »* _${description}_\n
*No sólo el diseño del mensaje se ha renovado. ✨ ¡Disfruta de ${name}!*\n
> ➡️ *Usando otro celular o en la PC escanea este código QR para convertirte en Sub Bot de ${name} 🐈*\n\n*1️⃣ Diríjase a los tres puntos en la esquina superior derecha*\n*2️⃣ Ir a la opción "Dispositivos vinculados" y use el botón "Vincular un dispositivo"*\n*3️⃣ Escanee este codigo QR para iniciar sesión*\n\n> 📢 *¡Este código QR expira en 50 segundos!*\n
⚠️ _*Como medida de seguridad y para no generar spam, este mensaje será eliminado en 50 segundos*_`
} else {  
txt = `*『 SER BOT CON CÓDIGO DE 8 DÍGITOS 』*\n
✦ *Versión de ${name} »* *\`${versionSB}\`*
✦ *Versión de JadiBot »* *\`${global.vsJB}\`*
✦ *Descripción »* _${description}_\n
*No sólo el diseño del mensaje se ha renovado. ✨ ¡Disfruta de ${name}!*\n
> *Se enviará un código para ser Sub Bot*\n\n1️⃣ *Diríjase a los tres puntos en la esquina superior derecha*\n\n2️⃣ *Selecciona "Dispositivos vinculados" y use el botón "Vincular un dispositivo"*\n\n3️⃣ *Selecciona en la parte inferior "Vincular con el número de teléfono"*\n\n4️⃣ *Introduzca el código de 8 dígitos*\n

*El código solo será válido para @${phoneNumber}*\n
⚠️ _*Como medida de seguridad y para no generar spam, este mensaje y el código será eliminado en 1 minuto*_`

let codeA, codeB 
setTimeout(async () => {
let codeBot = await conn.requestPairingCode(cleanedNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
codeA = await parent.sendMessage(m.chat, { text: txt.trim(), mentions: [m.sender] }, { quoted: m })  
codeB = await parent.sendMessage(m.chat, { text: codeBot }, { quoted: m })
}, 2000)

setTimeout(() => {
parent.sendMessage(m.chat, { delete: codeA.key })
parent.sendMessage(m.chat, { delete: codeB.key })
}, 60000) // 1 min
}
}
async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) conn.isInit = true
if (opcion == '1') {
let scan = await parent.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), 'qrcode.png', txt.trim(), m)
setTimeout(() => {
parent.sendMessage(m.chat, { delete: scan.key })
}, 50000) //50 segundos
}
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
let i = global.conns.indexOf(conn)
if (i < 0) { 
console.log(await creloadHandler(true).catch(console.error))
}
delete global.conns[i]
global.conns.splice(i, 1)
if (code !== DisconnectReason.connectionClosed) {
parent.sendMessage(m.chat, { text: "*Conexión perdida...* vuelva a intentarlo" }, { quoted: m })
} else {
parent.sendMessage(m.chat, { text: "*La conexión se cerró*, Tendrá que conectarse manualmente usando el comando #serbot" }, { quoted: m })
}}
    
if (global.db.data == null) loadDatabase()
if (connection == 'open') {
conn.isInit = true
global.conns.push(conn)
await parent.sendMessage(m.chat, {text : args[0] ? '✅ *¡Conectado con exito!*' : `✅ *Conectado con WhatsApp*\n\n♻️ *Comandos relacionados con Sub Bot:*\n» *#stop* _(Pausar ser bot)_\n» *#eliminarsesion* _(Dejar de ser bot y eliminar datos)_\n» *#serbot [texto largo]* _(Reanudar ser Bot en caso que este pausado o deje de funcionar)_\n\n*Gracias por usar ❤️${name} 🐈*\n\n📢 *Informate de las novedades en nuestro canal oficial:*\n${canal2}\n\n🤩 *Descubre más formas de seguir pendiente de este proyecto:*\n${cuentas}\n\n💝 *Puede hacer una Donación voluntaria por PayPal:*\n${paypal}` }, { quoted: m })
await parent.sendMessage(m.chat, { text: `🤭 *¡Sigue de cerca este nuevo proyecto!*\nhttps://whatsapp.com/channel/0029VabS4KD8KMqeVXXmkG1D` }, { quoted: m })  
args[0] ? console.log(`*Usuario Sub Bot reconectandose: ${PhoneNumber('+' + (conn.user?.jid).replace('@s.whatsapp.net', '')).getNumber('international')} (${conn.getName(conn.user.jid)})*`) : console.log(`*Nuevo usuario conectado como Sub Bot: ${PhoneNumber('+' + (conn.user?.jid).replace('@s.whatsapp.net', '')).getNumber('international')} (${conn.getName(conn.user.jid)})*`)
await sleep(5000)
if (args[0]) return
await parent.sendMessage(conn.user.jid, {text : '*Si pausa ser sub bot o deja de funcionar, envíe este mensaje para intentar conectarse nuevamente*'}, { quoted: m })
await parent.sendMessage(conn.user.jid, {text : usedPrefix + command + " " + Buffer.from(fs.readFileSync(`./${folderBot}/` + authFolderB + "/creds.json"), "utf-8").toString("base64")}, { quoted: m })
}}

setInterval(async () => {
if (!conn.user) {
try { conn.ws.close() } catch { }
conn.ev.removeAllListeners()
let i = global.conns.indexOf(conn)
if (i < 0) return
delete global.conns[i]
global.conns.splice(i, 1)
}}, 60000)
    
let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e)
}
if (restatConn) {
try { conn.ws.close() } catch { }
conn.ev.removeAllListeners()
conn = makeWASocket(connectionOptions)
isInit = true
}

if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}
  
conn.handler = handler.handler.bind(conn)
conn.connectionUpdate = connectionUpdate.bind(conn)
conn.credsUpdate = saveCreds.bind(conn, true)

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
}
serbot()
  
}
handler.command = ['jadibot', 'serbot']
export default handler

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms))
}

function isBase64(text) {
const validChars = /^[A-Za-z0-9+/]*={0,2}$/
if (text.length % 4 === 0 && validChars.test(text)) {
const decoded = Buffer.from(text, 'base64').toString('base64')
return decoded === text
}
return false
}

function fileExists(filePath) {
try {
return fs.statSync(filePath).isFile()
} catch (err) {
return false
}}
*/