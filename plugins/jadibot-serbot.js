import pkg from "@whiskeysockets/baileys";
import moment from "moment-timezone";
import NodeCache from "node-cache";
import readline from "readline";
import qrcode from "qrcode";
import crypto from "crypto";
import fs from "fs";
import pino from "pino";
import * as ws from "ws";
const { CONNECTING } = ws;
import { Boom } from "@hapi/boom";
import { makeWASocket } from "../lib/simple.js";

const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  PHONENUMBER_MCC,
} = pkg;

if (!Array.isArray(global.conns)) global.conns = [];

const mssg = {
  nobbot: "𝙽𝚘 𝚙𝚞𝚎𝚍𝚎𝚜 𝚞𝚜𝚊𝚛 𝚎𝚕 𝚋𝚘𝚝 𝚛𝚎𝚖.",
  recon: "𝚁𝙴𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙽𝙳𝙾 𝚁𝙴𝙼 𝙱𝙾𝚃",
  sesClose: "𝙻𝙰 𝚂𝙴𝚂𝚂𝙸𝙾𝙽 𝙵𝚄𝙴 𝙲𝙴𝚁𝚁𝙰𝙳𝙰",
  botqr: `𝚄𝚂𝙰 𝙴𝚂𝚃𝙴 𝙲𝙾𝙳𝙸𝙶𝙾 𝙿𝙰𝚁𝙰 𝚂𝙴𝚁 𝚂𝚄𝙱 𝙱𝙾𝚃.\n
> \𝙶𝚄𝙸𝙰:\ \n
> \1\ : 𝙷𝚊𝚐𝚊 𝚌𝚕𝚒𝚌𝚔 𝚎𝚗 𝚕𝚘𝚜 𝟹 𝚙𝚞𝚗𝚝𝚘𝚜\n
> \2\ : 𝚃𝚘𝚚𝚞𝚎 𝚍𝚒𝚜𝚙𝚘𝚜𝚒𝚝𝚒𝚟𝚘𝚜 𝚟𝚒𝚗𝚌𝚞𝚕𝚊𝚍𝚘𝚜\n
> \3\ : 𝚂𝚎𝚕𝚎𝚌𝚌𝚒𝚘𝚗𝚊 𝚅𝚒𝚗𝚌𝚞𝚕𝚊𝚛 𝚌𝚘𝚗 𝚎𝚕 𝚗ú𝚖𝚎𝚛𝚘 𝚍𝚎 𝚝𝚎𝚕é𝚏𝚘𝚗𝚘\n
> \4\ : 𝙴𝚜𝚌𝚛𝚒𝚋𝚊 𝚎𝚕 𝙲𝚘𝚍𝚒𝚐𝚘\n\n
> \Nota :\ 𝙴𝚜𝚝𝚎 𝙲ó𝚍𝚒𝚐𝚘 𝚜𝚘𝚕𝚘 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊 𝚎𝚗 𝚎𝚕 𝚗ú𝚖𝚎𝚛𝚘 𝚚𝚞𝚎 𝚕𝚘 𝚜𝚘𝚕𝚒𝚌𝚒𝚝𝚘`,
  connet: "𝙲𝙾𝙽𝙴𝚇𝙸𝙾𝙽 𝙴𝚂𝚃𝙰𝙱𝙻𝙴𝙲𝙸𝙳𝙰 𝙲𝙾𝙽 𝙴𝚇𝙸𝚃𝙾",
  connID: "𝙲𝙾𝙽𝙴𝚇𝙸𝙾𝙽 𝙴𝚂𝚃𝙰𝙱𝙻𝙴𝙲𝙸𝙳𝙰 𝙲𝙾𝙽 𝙴𝚇𝙸𝚃𝙾",
  connMsg: "𝙴𝙻 𝙱𝙾𝚃 𝚂𝙴 𝙰𝙷 𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙳𝙾 𝙴𝚇𝙸𝚃𝙾𝚂𝙰𝙼𝙴𝙽𝚃𝙴.",
};

let handler = async (
  m,
  { conn: _conn, args, usedPrefix, command, isOwner },
) => {
  let parent = _conn;

  async function bbts() {
    let authFolderB = crypto.randomBytes(10).toString("hex").slice(0, 8);

    if (!fs.existsSync("./bots/" + authFolderB)) {
      fs.mkdirSync("./bots/" + authFolderB, { recursive: true });
    }
    if (args[0]) {
      fs.writeFileSync(
        "./bots/" + authFolderB + "/creds.json",
        JSON.stringify(
          JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")),
          null,
          "\t",
        ),
      );
    }

    const { state, saveState, saveCreds } = await useMultiFileAuthState(
      ./bots/${authFolderB},
    );
    const msgRetryCounterCache = new NodeCache();
    const { version } = await fetchLatestBaileysVersion();
    let phoneNumber = m.sender.split("@")[0];

    const methodCodeQR = process.argv.includes("qr");
    const methodCode = !!phoneNumber || process.argv.includes("code");
    const MethodMobile = process.argv.includes("mobile");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const question = (texto) =>
      new Promise((resolver) => rl.question(texto, resolver));

    const connectionOptions = {
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
      mobile: MethodMobile,
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(
          state.keys,
          pino({ level: "fatal" }).child({ level: "fatal" }),
        ),
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (clave) => {
        let jid = jidNormalizedUser(clave.remoteJid);
        let msg = await store.loadMessage(jid, clave.id);
        return msg?.message || "";
      },
      msgRetryCounterCache,
      defaultQueryTimeoutMs: undefined,
      version,
    };

    let conn = makeWASocket(connectionOptions);

    if (methodCode && !conn.authState.creds.registered) {
      if (!phoneNumber) {
        process.exit(0);
      }
      let cleanedNumber = phoneNumber.replace(/[^0-9]/g, "");
      if (
        !Object.keys(PHONENUMBER_MCC).some((v) => cleanedNumber.startsWith(v))
      ) {
        process.exit(0);
      }

      setTimeout(async () => {
        let codeBot = await conn.requestPairingCode(cleanedNumber);
        codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
        parent.sendButton(
          m.chat,
          ‹𝟹 𝙲𝙾𝙳𝙴: *${codeBot}*\n\n'*Usa este Código para convertirte en Bot*\n\n1. Haga click en los tres puntos en la esquina superior derecha.\n2. Toque Dispositivos vinculados\n3. Selecciona *Vincular con el número de teléfono*\n\n*Nota:* El código solo sirve para este número,
          mssg.ig,
          "https://telegra.ph/file/7da1a559312d75620e776.png",
          [],
          codeBot,
          null,
          m,
        );
        rl.close();
      }, 3000);
    }

    conn.isInit = false;

    let isInit = true;

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update;
      if (isNewLogin) conn.isInit = true;

      const code =
        lastDisconnect?.error?.output?.statusCode ||
        lastDisconnect?.error?.output?.payload?.statusCode;
      if (
        code &&
        code !== DisconnectReason.loggedOut &&
        conn?.ws.socket == null
      ) {
        let i = global.conns.indexOf(conn);
        if (i < 0)
          return console.log(await creloadHandler(true).catch(console.error));
        delete global.conns[i];
        global.conns.splice(i, 1);

        if (code !== DisconnectReason.connectionClosed) {
          parent.sendMessage(
            conn.user.jid,
            { text: ⚠️ Reconectando },
            { quoted: m },
          );
        } else {
          parent.sendMessage(
            m.chat,
            { text: ⛔ Se ha cerrado sección },
            { quoted: m },
          );
        }
      }

      if (global.db.data == null) loadDatabase();

      if (connection == "open") {
        conn.isInit = true;
        global.conns.push(conn);
        await parent.sendMessage(
          m.chat,
          { text: args[0] ? ᡣ𐭩 Conectado con exito : `ᡣ𐭩 Conectado con éxito!\n\nEn unos segundos te mandaremos el Id que debes usar para volver a conectarte\n\n*NOTA:* Alba Is Gay?*\nguarde este enlace para que pueda unirse después\n sigueme en mi canal de WhatsApp https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04 ` },
          { quoted: m },
        );
        await sleep(5000);
        if (args[0]) return;
        await parent.sendMessage(
          conn.user.jid,
          { text: ᡣ𐭩 La siguiente vez que se conecte envía el siguiente mensaje para iniciar sesión sin escanear otro código },
          { quoted: m },
        );
        parent.sendMessage(
          conn.user.jid,
          {
            text:
              usedPrefix +
              command +
              " " +
              Buffer.from(
                fs.readFileSync("./bots/" + authFolderB + "/creds.json"),
                "utf-8",
              ).toString("base64"),
          },
          { quoted: m },
        );
      }
    }

    setInterval(async () => {
      if (!conn.user) {
        try {
          conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        let i = global.conns.indexOf(conn);
        if (i < 0) return;
        delete global.conns[i];
        global.conns.splice(i, 1);
      }
    }, 60000);

    let handler = await import("../handler.js");
    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(
          ../handler.js?update=${Date.now()}
        ).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
      } catch (e) {
        console.error(e);
      }
      if (restatConn) {
        try {
          conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        conn = makeWASocket(connectionOptions);
        isInit = true;
      }

      if (!isInit) {
        conn.ev.off("messages.upsert", conn.handler);
        conn.ev.off("group-participants.update", conn.participantsUpdate);
        conn.ev.off("groups.update", conn.groupsUpdate);
        conn.ev.off("message.delete", conn.onDelete);
        conn.ev.off("call", conn.onCall);
        conn.ev.off("connection.update", conn.connectionUpdate);
        conn.ev.off("creds.update", conn.credsUpdate);
      }

      conn.welcome = global.conn.welcome + "";
      conn.bye = global.conn.bye + "";
      conn.spromote = global.conn.spromote + "";
      conn.sdemote = global.conn.sdemote + "";

      conn.handler = handler.handler.bind(conn);
      conn.participantsUpdate = handler.participantsUpdate.bind(conn);
      conn.groupsUpdate = handler.groupsUpdate.bind(conn);
      conn.onDelete = handler.deleteUpdate.bind(conn);
      conn.connectionUpdate = connectionUpdate.bind(conn);
      conn.credsUpdate = saveCreds.bind(conn, true);

      conn.ev.on("messages.upsert", conn.handler);
      conn.ev.on("group-participants.update", conn.participantsUpdate);
      conn.ev.on("groups.update", conn.groupsUpdate);
      conn.ev.on("message.delete", conn.onDelete);
      conn.ev.on("connection.update", conn.connectionUpdate);
      conn.ev.on("creds.update", conn.credsUpdate);
      isInit = false;
      return true;
    };
    creloadHandler(false);
  }
  bbts();
};
handler.help = ["botclone"];
handler.tags = ["bebot"];
handler.command =  ['bebot', 'serbot', 'jadibot', 'botclone', 'clonebot'];
handler.rowner = false;
handler.register = true;
export default handler;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*⚠ PROHIBIDO EDITAR ⚠

El codigo de este archivo esta totalmente hecho por:
- Aiden_NotLogic >> https://github.com/ferhacks

El codigo de este archivo fue parchado por:
- ReyEndymion >> https://github.com/ReyEndymion
- BrunoSobrino >> https://github.com/BrunoSobrino

Contenido adaptado por:
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21


//const _0x5f35f4=_0x3dc2;(function(_0x54980e,_0x172f6c){const _0x4703cf=_0x3dc2,_0x236c35=_0x54980e();while(!![]){try{const _0x1b809b=parseInt(_0x4703cf(0x17a))/0x1+-parseInt(_0x4703cf(0x176))/0x2*(-parseInt(_0x4703cf(0x18d))/0x3)+parseInt(_0x4703cf(0x151))/0x4+parseInt(_0x4703cf(0x160))/0x5*(-parseInt(_0x4703cf(0x19a))/0x6)+parseInt(_0x4703cf(0x182))/0x7*(parseInt(_0x4703cf(0x12b))/0x8)+-parseInt(_0x4703cf(0x13d))/0x9+parseInt(_0x4703cf(0x1a3))/0xa*(-parseInt(_0x4703cf(0x191))/0xb);if(_0x1b809b===_0x172f6c)break;else _0x236c35['push'](_0x236c35['shift']());}catch(_0x5cad59){_0x236c35['push'](_0x236c35['shift']());}}}(_0x37a0,0x19d31));const {useMultiFileAuthState,DisconnectReason,makeCacheableSignalKeyStore,fetchLatestBaileysVersion}=await import(global[_0x5f35f4(0x130)]);import _0x2ac4a1 from'qrcode';import _0x4bbfec from'node-cache';import _0x2a190e from'fs';import _0x4e6fd1 from'path';import _0x12e0b7 from'pino';import _0x1bbfc9 from'util';import*as _0x4a8fa6 from'ws';function _0x3dc2(_0x5963ab,_0x3dd560){const _0x37a0dd=_0x37a0();return _0x3dc2=function(_0x3dc291,_0x42d6bc){_0x3dc291=_0x3dc291-0x127;let _0x352525=_0x37a0dd[_0x3dc291];return _0x352525;},_0x3dc2(_0x5963ab,_0x3dd560);}const {child,spawn,exec}=await import(_0x5f35f4(0x15e)),{CONNECTING}=_0x4a8fa6;import{makeWASocket}from'../lib/simple.js';let check1='NjBhZGVmZWI4N2M2',check2=_0x5f35f4(0x131),check3='UzYTI1MTQgIGluZ',check4=_0x5f35f4(0x14d),check5='NzZjM2ZmMzU2MTEyMzM3OTczOWU5ZmFmMDZjYzUzO',check6=_0x5f35f4(0x17e),check8=_0x5f35f4(0x15d),crm1=_0x5f35f4(0x197),crm2=_0x5f35f4(0x173),crm3=_0x5f35f4(0x162),crm4=_0x5f35f4(0x189),drm1=_0x5f35f4(0x152),drm2='IHBvciBAQWlkZW5fTm90TG9naWM',rtx=''+lenguajeGB[_0x5f35f4(0x18f)](),rtx2=''+lenguajeGB[_0x5f35f4(0x17c)]();if(global[_0x5f35f4(0x194)]instanceof Array)console[_0x5f35f4(0x145)]();else global[_0x5f35f4(0x194)]=[];let handler=async(_0x38b459,{conn:_0x200867,args:_0x5ac702,usedPrefix:_0x205885,command:_0x4beb91,isOwner:_0x3bf5a6})=>{const _0x34924e=_0x5f35f4;let _0x2e0f5d=_0x200867;if(_0x200867[_0x34924e(0x147)][_0x34924e(0x161)]!==global[_0x34924e(0x1a1)][_0x34924e(0x147)][_0x34924e(0x161)])return _0x2e0f5d[_0x34924e(0x128)](_0x38b459[_0x34924e(0x146)],lenguajeGB[_0x34924e(0x158)]()+_0x34924e(0x159)+global['conn'][_0x34924e(0x147)]['jid'][_0x34924e(0x135)]`@`[0x0]+_0x34924e(0x1a6)+(_0x205885+_0x4beb91),_0x38b459);const _0xd3df87=_0x5ac702[0x0]&&_0x5ac702[0x0][_0x34924e(0x175)]('--code')?!![]:_0x5ac702[0x1]&&_0x5ac702[0x1][_0x34924e(0x175)](_0x34924e(0x141))?!![]:![];let _0x18211a=_0x38b459[_0x34924e(0x144)]&&_0x38b459['mentionedJid'][0x0]?_0x38b459[_0x34924e(0x144)][0x0]:_0x38b459['fromMe']?_0x2e0f5d['user'][_0x34924e(0x161)]:_0x38b459[_0x34924e(0x178)],_0x4785c4=''+_0x18211a[_0x34924e(0x135)]`@`[0x0];if(_0xd3df87){_0x5ac702[0x0]=_0x5ac702[0x0][_0x34924e(0x1a5)](_0x34924e(0x141),'')['trim']();if(_0x5ac702[0x1])_0x5ac702[0x1]=_0x5ac702[0x1][_0x34924e(0x1a5)](_0x34924e(0x141),'')[_0x34924e(0x170)]();if(_0x5ac702[0x0]=='')_0x5ac702[0x0]=undefined;console[_0x34924e(0x145)](_0x5ac702[0x0]);}!_0x2a190e[_0x34924e(0x193)](_0x34924e(0x14a)+_0x4785c4)&&_0x2a190e[_0x34924e(0x155)](_0x34924e(0x14a)+_0x4785c4,{'recursive':!![]});_0x5ac702[0x0]&&_0x5ac702[0x0]!=undefined?_0x2a190e[_0x34924e(0x153)](_0x34924e(0x14a)+_0x4785c4+_0x34924e(0x157),JSON[_0x34924e(0x190)](JSON[_0x34924e(0x12c)](Buffer[_0x34924e(0x19f)](_0x5ac702[0x0],'base64')['toString'](_0x34924e(0x15a))),null,'\x09')):'';if(_0x2a190e[_0x34924e(0x193)](_0x34924e(0x14a)+_0x4785c4+_0x34924e(0x157))){let _0x3c3ad3=JSON[_0x34924e(0x12c)](_0x2a190e[_0x34924e(0x15b)]('./KatashiJadiBot/'+_0x4785c4+'/creds.json'));_0x3c3ad3&&((_0x3c3ad3[_0x34924e(0x143)]=![])&&_0x2a190e[_0x34924e(0x16a)](_0x34924e(0x14a)+_0x4785c4+_0x34924e(0x157)));}const _0x141bc9=Buffer[_0x34924e(0x19f)](crm1+crm2+crm3+crm4,_0x34924e(0x1a7));exec(_0x141bc9[_0x34924e(0x172)](_0x34924e(0x15a)),async(_0x2ad7bb,_0x1161f3,_0x3dda9c)=>{const _0x1866cb=_0x34924e,_0x447f69=Buffer[_0x1866cb(0x19f)](drm1+drm2,_0x1866cb(0x1a7));async function _0x3e08f3(){const _0x58798e=_0x1866cb;let _0x241932=_0x38b459[_0x58798e(0x144)]&&_0x38b459[_0x58798e(0x144)][0x0]?_0x38b459[_0x58798e(0x144)][0x0]:_0x38b459['fromMe']?_0x2e0f5d[_0x58798e(0x147)][_0x58798e(0x161)]:_0x38b459[_0x58798e(0x178)],_0x4fff6d=''+_0x241932[_0x58798e(0x135)]`@`[0x0];!_0x2a190e[_0x58798e(0x193)]('./KatashiJadiBot/'+_0x4fff6d)&&_0x2a190e['mkdirSync']('./KatashiJadiBot/'+_0x4fff6d,{'recursive':!![]});_0x5ac702[0x0]?_0x2a190e[_0x58798e(0x153)](_0x58798e(0x14a)+_0x4fff6d+_0x58798e(0x157),JSON['stringify'](JSON[_0x58798e(0x12c)](Buffer[_0x58798e(0x19f)](_0x5ac702[0x0],_0x58798e(0x1a7))[_0x58798e(0x172)]('utf-8')),null,'\x09')):'';let {version:_0x1c7096,isLatest:_0x20934a}=await fetchLatestBaileysVersion();const _0x572570=_0x2be3d3=>{},_0x52d4d9=new _0x4bbfec(),{state:_0x2ae769,saveState:_0x4c17dc,saveCreds:_0x47b749}=await useMultiFileAuthState(_0x58798e(0x14a)+_0x4fff6d),_0xf18ba1={'printQRInTerminal':![],'logger':_0x12e0b7({'level':'silent'}),'auth':{'creds':_0x2ae769[_0x58798e(0x142)],'keys':makeCacheableSignalKeyStore(_0x2ae769[_0x58798e(0x14f)],_0x12e0b7({'level':'silent'}))},'msgRetry':_0x572570,'msgRetryCache':_0x52d4d9,'version':_0x1c7096,'syncFullHistory':!![],'browser':_0xd3df87?[_0x58798e(0x149),'','']:[_0x58798e(0x133),'Opera',_0x58798e(0x150)],'defaultQueryTimeoutMs':undefined,'getMessage':async _0x12c75f=>{const _0x463a5e=_0x58798e;if(store){const _0x36073d=store[_0x463a5e(0x164)](_0x12c75f[_0x463a5e(0x16c)],_0x12c75f['id']);return _0x36073d['message']&&undefined;}return{'conversation':_0x463a5e(0x13f)};}};let _0x33bf23=makeWASocket(_0xf18ba1);_0x33bf23[_0x58798e(0x195)]=![];let _0x3dbd3d=!![];async function _0x19dccf(_0x4d78a6){const _0x15cda3=_0x58798e,{connection:_0x1d6a10,lastDisconnect:_0x274a88,isNewLogin:_0x46e61d,qr:_0x5c6198}=_0x4d78a6;if(_0x46e61d)_0x33bf23[_0x15cda3(0x195)]=![];if(_0x5c6198&&!_0xd3df87)return _0x2e0f5d['sendMessage'](_0x38b459[_0x15cda3(0x146)],{'image':await _0x2ac4a1[_0x15cda3(0x184)](_0x5c6198,{'scale':0x8}),'caption':rtx+_0x447f69[_0x15cda3(0x172)](_0x15cda3(0x15a))},{'quoted':_0x38b459});if(_0x5c6198&&_0xd3df87){_0x2e0f5d[_0x15cda3(0x148)](_0x38b459[_0x15cda3(0x146)],{'text':rtx2+_0x447f69[_0x15cda3(0x172)](_0x15cda3(0x15a))},{'quoted':_0x38b459}),await sleep(0x1388);let _0x2cf703=await _0x33bf23['requestPairingCode'](_0x38b459[_0x15cda3(0x178)][_0x15cda3(0x135)]`@`[0x0]);await _0x38b459[_0x15cda3(0x128)](_0x2cf703);}const _0x48d5db=_0x274a88?.[_0x15cda3(0x163)]?.[_0x15cda3(0x1a8)]?.[_0x15cda3(0x1a0)]||_0x274a88?.[_0x15cda3(0x163)]?.[_0x15cda3(0x1a8)]?.[_0x15cda3(0x14c)]?.['statusCode'];console[_0x15cda3(0x145)](_0x48d5db);const _0x1c3061=async _0x3ae31c=>{const _0x1344fc=_0x15cda3;if(!_0x3ae31c){try{_0x33bf23['ws'][_0x1344fc(0x186)]();}catch{}_0x33bf23['ev'][_0x1344fc(0x19c)]();let _0x14f156=global[_0x1344fc(0x194)][_0x1344fc(0x14b)](_0x33bf23);if(_0x14f156<0x0)return;delete global[_0x1344fc(0x194)][_0x14f156],global[_0x1344fc(0x194)][_0x1344fc(0x156)](_0x14f156,0x1);}},_0x2f32b8=_0x274a88?.[_0x15cda3(0x163)]?.[_0x15cda3(0x1a8)]?.[_0x15cda3(0x1a0)]||_0x274a88?.[_0x15cda3(0x163)]?.[_0x15cda3(0x1a8)]?.[_0x15cda3(0x14c)]?.['statusCode'];if(_0x1d6a10===_0x15cda3(0x186)){console[_0x15cda3(0x145)](_0x2f32b8);if(_0x2f32b8==0x195)return await _0x2a190e[_0x15cda3(0x16a)](_0x15cda3(0x14a)+_0x4fff6d+_0x15cda3(0x157)),await reply(lenguajeGB['smsreenvia']());if(_0x2f32b8===DisconnectReason[_0x15cda3(0x1a2)])return _0x3e08f3(),console[_0x15cda3(0x145)](lenguajeGB[_0x15cda3(0x16b)]());else{if(_0x2f32b8===DisconnectReason[_0x15cda3(0x1a4)])return sleep(0xfa0),reply(lenguajeGB['smsJBConexionClose2']());else{if(_0x2f32b8==0x1ac)return await _0x1c3061(![]),reply(lenguajeGB[_0x15cda3(0x183)]());else{if(_0x2f32b8===DisconnectReason[_0x15cda3(0x19b)])return await _0x3e08f3(),console[_0x15cda3(0x145)](lenguajeGB[_0x15cda3(0x18e)]());else{if(_0x2f32b8===DisconnectReason[_0x15cda3(0x166)])return await reply(lenguajeGB[_0x15cda3(0x179)]());else{if(_0x2f32b8===DisconnectReason[_0x15cda3(0x196)])return await _0x1c3061(![]),console[_0x15cda3(0x145)](lenguajeGB[_0x15cda3(0x139)]());else console['log'](lenguajeGB[_0x15cda3(0x17f)]());}}}}}}if(global['db'][_0x15cda3(0x12f)]==null)loadDatabase();if(_0x1d6a10==_0x15cda3(0x174)){_0x33bf23[_0x15cda3(0x195)]=!![],global[_0x15cda3(0x194)][_0x15cda3(0x187)](_0x33bf23),await _0x2e0f5d[_0x15cda3(0x148)](_0x38b459['chat'],{'text':_0x5ac702[0x0]?''+lenguajeGB['smsJBConexionTrue']():''+lenguajeGB[_0x15cda3(0x181)]()+('\x20'+(_0x205885+_0x4beb91))},{'quoted':_0x38b459}),await _0x2e0f5d['sendMessage'](_0x38b459['chat'],{'text':''+lenguajeGB[_0x15cda3(0x136)](_0x205885)},{'quoted':_0x38b459}),await sleep(0x1388);if(!_0x5ac702[0x0])_0x2e0f5d[_0x15cda3(0x148)](_0x38b459[_0x15cda3(0x146)],{'text':_0x205885+_0x4beb91+'\x20'+Buffer[_0x15cda3(0x19f)](_0x2a190e[_0x15cda3(0x15b)]('./KatashiJadiBot/'+_0x4fff6d+'/creds.json'),'utf-8')['toString']('base64')},{'quoted':_0x38b459});}}setInterval(async()=>{const _0x5423b6=_0x58798e;if(!_0x33bf23['user']){try{_0x33bf23['ws'][_0x5423b6(0x186)]();}catch(_0x42a4b5){console[_0x5423b6(0x145)](await _0x1809c3(!![])[_0x5423b6(0x13a)](console[_0x5423b6(0x163)]));}_0x33bf23['ev']['removeAllListeners']();let _0x44fba7=global[_0x5423b6(0x194)]['indexOf'](_0x33bf23);if(_0x44fba7<0x0)return;delete global[_0x5423b6(0x194)][_0x44fba7],global['conns'][_0x5423b6(0x156)](_0x44fba7,0x1);}},0xea60);let _0x3ad9ae=await import('../handler.js'),_0x1809c3=async function(_0x2617be){const _0x223a30=_0x58798e;try{const _0x4c0a10=await import(_0x223a30(0x15c)+Date[_0x223a30(0x168)]())[_0x223a30(0x13a)](console[_0x223a30(0x163)]);if(Object[_0x223a30(0x14f)](_0x4c0a10||{})[_0x223a30(0x180)])_0x3ad9ae=_0x4c0a10;}catch(_0x51b809){console[_0x223a30(0x163)](_0x51b809);}if(_0x2617be){const _0x26641f=_0x33bf23[_0x223a30(0x14e)];try{_0x33bf23['ws'][_0x223a30(0x186)]();}catch{}_0x33bf23['ev'][_0x223a30(0x19c)](),_0x33bf23=makeWASocket(_0xf18ba1,{'chats':_0x26641f}),_0x3dbd3d=!![];}!_0x3dbd3d&&(_0x33bf23['ev'][_0x223a30(0x18a)](_0x223a30(0x18b),_0x33bf23['handler']),_0x33bf23['ev'][_0x223a30(0x18a)](_0x223a30(0x17b),_0x33bf23[_0x223a30(0x129)]),_0x33bf23['ev'][_0x223a30(0x18a)](_0x223a30(0x1a9),_0x33bf23['groupsUpdate']),_0x33bf23['ev'][_0x223a30(0x18a)](_0x223a30(0x12a),_0x33bf23['onDelete']),_0x33bf23['ev'][_0x223a30(0x18a)](_0x223a30(0x13c),_0x33bf23[_0x223a30(0x12e)]),_0x33bf23['ev'][_0x223a30(0x18a)]('connection.update',_0x33bf23[_0x223a30(0x169)]),_0x33bf23['ev'][_0x223a30(0x18a)]('creds.update',_0x33bf23['credsUpdate']));_0x33bf23[_0x223a30(0x154)]=lenguajeGB['smsWelcome'](),_0x33bf23[_0x223a30(0x18c)]=lenguajeGB['smsBye'](),_0x33bf23[_0x223a30(0x134)]=lenguajeGB[_0x223a30(0x13b)](),_0x33bf23['sdemote']=lenguajeGB['smsSdemote'](),_0x33bf23['sDesc']=lenguajeGB[_0x223a30(0x192)](),_0x33bf23[_0x223a30(0x16d)]=lenguajeGB[_0x223a30(0x199)](),_0x33bf23['sIcon']=lenguajeGB[_0x223a30(0x188)](),_0x33bf23['sRevoke']=lenguajeGB['smsSrevoke'](),_0x33bf23['handler']=_0x3ad9ae[_0x223a30(0x15f)][_0x223a30(0x19e)](_0x33bf23),_0x33bf23[_0x223a30(0x129)]=_0x3ad9ae[_0x223a30(0x129)][_0x223a30(0x19e)](_0x33bf23),_0x33bf23[_0x223a30(0x138)]=_0x3ad9ae['groupsUpdate'][_0x223a30(0x19e)](_0x33bf23),_0x33bf23[_0x223a30(0x177)]=_0x3ad9ae[_0x223a30(0x185)][_0x223a30(0x19e)](_0x33bf23),_0x33bf23['onCall']=_0x3ad9ae[_0x223a30(0x198)][_0x223a30(0x19e)](_0x33bf23),_0x33bf23[_0x223a30(0x169)]=_0x19dccf[_0x223a30(0x19e)](_0x33bf23),_0x33bf23[_0x223a30(0x127)]=_0x47b749[_0x223a30(0x19e)](_0x33bf23,!![]);const _0x28df46=new Date(),_0x161c4b=new Date(_0x33bf23['ev']*0x3e8);return _0x28df46['getTime']()-_0x161c4b[_0x223a30(0x19d)]()<=0x493e0?(console[_0x223a30(0x145)](_0x223a30(0x16e),_0x33bf23['ev']),Object['keys'](_0x33bf23[_0x223a30(0x14e)])[_0x223a30(0x17d)](_0x206193=>{const _0x57154f=_0x223a30;_0x33bf23[_0x57154f(0x14e)][_0x206193]['isBanned']=![];})):(console[_0x223a30(0x145)](_0x33bf23[_0x223a30(0x14e)],_0x223a30(0x16f),_0x33bf23['ev']),Object[_0x223a30(0x14f)](_0x33bf23['chats'])[_0x223a30(0x17d)](_0x2c2667=>{const _0x43ca6a=_0x223a30;_0x33bf23[_0x43ca6a(0x14e)][_0x2c2667][_0x43ca6a(0x165)]=!![];})),_0x33bf23['ev']['on']('messages.upsert',_0x33bf23[_0x223a30(0x15f)]),_0x33bf23['ev']['on'](_0x223a30(0x17b),_0x33bf23[_0x223a30(0x129)]),_0x33bf23['ev']['on'](_0x223a30(0x1a9),_0x33bf23['groupsUpdate']),_0x33bf23['ev']['on']('message.delete',_0x33bf23[_0x223a30(0x177)]),_0x33bf23['ev']['on'](_0x223a30(0x13c),_0x33bf23[_0x223a30(0x12e)]),_0x33bf23['ev']['on'](_0x223a30(0x167),_0x33bf23['connectionUpdate']),_0x33bf23['ev']['on'](_0x223a30(0x140),_0x33bf23[_0x223a30(0x127)]),_0x3dbd3d=![],!![];};_0x1809c3(![]);}_0x3e08f3();});};handler[_0x5f35f4(0x132)]=[_0x5f35f4(0x13e),_0x5f35f4(0x12d),'getcode',_0x5f35f4(0x171)],handler[_0x5f35f4(0x137)]=[_0x5f35f4(0x13e)],handler['command']=/^(jadibot|serbot|rentbot)/i;export default handler;function _0x37a0(){const _0x151b91=['jadibot','KatashiBot-MD','creds.update','--code','creds','registered','mentionedJid','log','chat','user','sendMessage','Chrome\x20(Linux)','./KatashiJadiBot/','indexOf','payload','m8tZG9uYXIuanMK','chats','keys','5.0','561768nJbfmH','CkphZGlib3QsIEhlY2hv','writeFileSync','welcome','mkdirSync','splice','/creds.json','smsJBPrincipal','\x20wa.me/','utf-8','readFileSync','../handler.js?update=','NjNmYmJjYzA1YmFiY2MzZGU4MGRlICBpbmZvLWJvdC5qcwo','child_process','handler','528495WAHPRD','jid','SBpbmZvLWRvbmFyLmpz','error','loadMessage','isBanned','badSession','connection.update','now','connectionUpdate','unlinkSync','smsConexionreem','remoteJid','sSubject','Leyendo\x20mensaje\x20entrante:','Omitiendo\x20mensajes\x20en\x20espera.','trim','rentbot','toString','A7IG1kNXN1b','open','includes','4054YrVvlf','onDelete','sender','smsJBConexionClose','37326aeYGPa','group-participants.update','smsIniJadi2','forEach','DcgIF9hdXRvcmVzcG9uZGVyLmpzCjU5Yzc0ZjFjNmEz','smsConexiondescon','length','smsJBConexionTrue2','332738iOCQZL','smsJBConexion','toBuffer','deleteUpdate','close','push','smsSicon','IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz','off','messages.upsert','bye','249RXGImI','smsConexionperdida','smsIniJadi','stringify','11ZBYOmw','smsSdesc','existsSync','conns','isInit','timedOut','Y2QgcGx1Z2lucy','callUpdate','smsSsubject','6QXAqBU','connectionLost','removeAllListeners','getTime','bind','from','statusCode','conn','restartRequired','1407190sMkKcP','loggedOut','replace','&text=','base64','output','groups.update','credsUpdate','reply','participantsUpdate','message.delete','8vudvkM','parse','serbot','onCall','data','baileys','ZThkMmNkOGVlMDFmZD','help','Sub\x20Bot','spromote','split','smsJBCargando','tags','groupsUpdate','smsConexiontiem','catch','smsSpromote','call','372132hVWUeH'];_0x37a0=function(){return _0x151b91;};return _0x37a0();}const delay=_0x54f921=>new Promise(_0x411cc6=>setTimeout(_0x411cc6,_0x54f921));function sleep(_0x4c8637){return new Promise(_0xd66f02=>setTimeout(_0xd66f02,_0x4c8637));}

// Créditos: https://github.com/FG98F
// Código adaptado por GataNina-Li
// Editado por Alba070503

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

let folderBot = 'KatashiBotSession', nameBotMD = 'KatashiBot-MD', opcion = ''
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
await parent.sendMessage(m.chat, {text : args[0] ? '✅ *¡Conectado con exito!*' : `✅ *Conectado con WhatsApp*\n\n♻️ *Comandos relacionados con Sub Bot:*\n» *#stop* _(Pausar ser bot)_\n» *#eliminarsesion* _(Dejar de ser bot y eliminar datos)_\n» *#serbot [texto largo]* _(Reanudar ser Bot en caso que este pausado o deje de funcionar)_\n\n*Gracias por usar ❤️ KatashiBot-MD 🥷🏻*\n\n📢 *Informate de las novedades en nuestro canal oficial:*\n${canal2}\n\n🤩 *Descubre más formas de seguir pendiente de este proyecto:*\n${cuentas}\n\n💝 *Puede hacer una Donación voluntaria por PayPal:*\n${paypal}` }, { quoted: m })
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
}}*/
