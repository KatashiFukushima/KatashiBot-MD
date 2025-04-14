import { downloadContentFromMessage } from "@whiskeysockets/baileys";

const handler = async (msg, conn) => {
  try {
    const quotedInfo = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quotedInfo) {
      return await conn.sendMessage(msg.key.remoteJid, {
        text: "❌ *Error:* Debes responder a un mensaje de *ver una sola vez* (imagen, video o audio) para poder verlo nuevamente."
      }, { quoted: msg });
    }

    // 
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "⏳", key: msg.key }
    });

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

    // 
    const stream = await downloadContentFromMessage(mediaMessage, mediaType);
    const bufferChunks = [];
    
    for await (const chunk of stream) {
      bufferChunks.push(chunk);
    }
    
    const mediaBuffer = Buffer.concat(bufferChunks);
    
    if (!mediaBuffer || mediaBuffer.length === 0) {
      throw new Error("Buffer vacío");
    }

    // Enviar el medio
    const messageOptions = { 
      [mediaType]: mediaBuffer,
      mimetype: mediaMessage.mimetype 
    };

    await conn.sendMessage(msg.key.remoteJid, messageOptions, { quoted: msg });

    // 
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (error) {
    console.error("Error en comando /ver:", error);
    
    //
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "❌", key: msg.key }
    });
    
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ *Error:* Ocurrió un problema al procesar el mensaje. Intenta de nuevo."
    }, { quoted: msg });
  }
};

handler.command = ["ver"];
export default handler;
