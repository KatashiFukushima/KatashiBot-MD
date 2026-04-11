import fetch from "node-fetch";
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!mime) throw `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇* ⊱❗️⊱╮\n\n𝙀𝙉𝙑𝙄𝙀 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix + command}`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw `╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼* ⊱⚠️⊱╮\n\nEL FORMATO DEL ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO`;

    m.reply("*🐈 𝙈𝙀𝙅𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝘼 𝘾𝘼𝙇𝙄𝘿𝘼𝘿...*");

    let img = await q.download?.();
    let upld = await uploadToTelegraph(img);
    
    let res = await fetch(`https://api.delirius.store/ia/enhance?image=${upld}&scale=4`);
    let json = await res.json();
    
    if (json.status && json.data?.url) {
      await conn.sendMessage(m.chat, { image: { url: json.data.url } }, { quoted: m });
    } else {
      console.log("HD API FAIL:", json);
      throw "Error en la API de Delirius: " + (json.data?.msg || json.msg || "Sin respuesta válida");
    }
  } catch (e) {
    console.error(e);
    m.reply("╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼* ⊱⚠️⊱╮\n\n𝙁𝘼𝙇𝙇𝙊́, 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍\n\n" + e);
  }
};

async function uploadToTelegraph(buffer) {
  const { ext, mime } = await fileTypeFromBuffer(buffer);
  const form = new FormData();
  const blob = new Blob([buffer.toArrayBuffer()], { type: mime });
  form.append('file', blob, 'tmp.' + ext);
  const res = await fetch('https://telegra.ph/upload', {
    method: 'POST',
    body: form
  });
  const img = await res.json();
  if (img.error) throw img.error;
  return 'https://telegra.ph' + img[0].src;
}

handler.help = ["remini", "hd", "enhance"];
handler.tags = ["ai", "tools"];
handler.command = ["remini", "hd", "enhance"];
export default handler;
