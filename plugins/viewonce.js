import { downloadContentFromMessage } from "@whiskeysockets/baileys";

const handler = async (m, { conn }) => {
  try {
    const quotedInfo = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quotedInfo) {
      return await conn.sendMessage(m.chat, {
        text: "❌ *Error:* Debes usarlo en mensajes de *ver una sola vez* para verlo nuevamente."
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
    console.error("Error", error);
    
    await conn.sendMessage(m.chat, {
      react: { text: "❌", key: m.key }
    });
    
    await conn.sendMessage(m.chat, {
      text: "❌ *Error:* Ocurrió un problema inesperado al revisar el mensaje."
    }, { quoted: m });
  }
};

handler.help = ['ver'];
handler.tags = ['tools'];
handler.command = /^ver$/i;
export default handler;
