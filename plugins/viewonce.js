import { downloadContentFromMessage } from "@whiskeysockets/baileys";

const handler = async (m, { conn }) => {
  try {
    const quotedInfo = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quotedInfo) {
      return await conn.sendMessage(m.chat, {
        text: "❌ *Error:* Debes responder a un mensaje de *ver una sola vez* (imagen, video o audio) para poder verlo nuevamente."
      }, { quoted: m });
    }

    await conn.sendMessage(m.chat, {
      react: { text: "⏳", key: m.key }
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
      return await conn.sendMessage(m.chat, {
        text: "❌ *Error:* Solo puedes usar este comando en mensajes de *ver una sola vez*."
      }, { quoted: m });
    }

 
    const stream = await downloadContentFromMessage(mediaMessage, mediaType);
    const bufferChunks = [];
    
    for await (const chunk of stream) {
      bufferChunks.push(chunk);
    }
    
    const mediaBuffer = Buffer.concat(bufferChunks);
    
    if (!mediaBuffer || mediaBuffer.length === 0) {
      throw new Error("Buffer vacío");
    }

   
    const messageOptions = { 
      [mediaType]: mediaBuffer,
      mimetype: mediaMessage.mimetype 
    };

    await conn.sendMessage(m.chat, messageOptions, { quoted: m });


    await conn.sendMessage(m.chat, {
      react: { text: "✅", key: m.key }
    });

  } catch (error) {
    console.error("Error en comando /ver:", error);
    
    await conn.sendMessage(m.chat, {
      react: { text: "❌", key: m.key }
    });
    
    await conn.sendMessage(m.chat, {
      text: "❌ *Error:* Ocurrió un problema al procesar el mensaje. Intenta de nuevo."
    }, { quoted: m });
  }
};

handler.help = ['ver'];
handler.tags = ['tools'];
handler.command = /^ver$/i;
export default handler;
