const fs = require("fs");
const path = require("path");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

  const quotedInfo = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!quotedInfo) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ *Error:* Debes responder a un mensaje de *ver una sola vez* (imagen, video o audio) para poder verlo nuevamente."
    }, { quoted: msg });
  }

  let mediaType, mediaMessage;
  if (quotedInfo.imageMessage?.viewOnce) {
    mediaType = "image";
    mediaMessage = quotedInfo.imageMessage;
  } else if (quotedInfo.videoMessage?.viewOnce) {
    mediaType = "video";
    mediaMessage = quotedInfo.videoMessage;
  } else if (quotedInfo.audioMessage?.viewOnce) {
    mediaType = "audio";
    mediaMessage = quotedInfo.audioMessage;
  } else {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ *Error:* Solo puedes usar este comando en mensajes de *ver una sola vez*."
    }, { quoted: msg });
  }

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "⏳", key: msg.key }
  });

  const mediaStream = await new Promise(async (resolve, reject) => {
    try {
      const stream = await downloadContentFromMessage(mediaMessage, mediaType);
      let buffer = Buffer.alloc(0);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
      resolve(buffer);
    } catch {
      reject(null);
    }
  });

  if (!mediaStream || mediaStream.length === 0) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ *Error:* No se pudo descargar el archivo. Intenta de nuevo."
    }, { quoted: msg });
  }

  let messageOptions = { mimetype: mediaMessage.mimetype };
  if (mediaType === "image") messageOptions.image = mediaStream;
  if (mediaType === "video") messageOptions.video = mediaStream;
  if (mediaType === "audio") messageOptions.audio = mediaStream;

  await conn.sendMessage(msg.key.remoteJid, messageOptions, { quoted: msg });

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "✅", key: msg.key }
  });
};

handler.command = ["ver"];
export default handler;
