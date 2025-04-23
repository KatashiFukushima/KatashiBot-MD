import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

const cleanSessionFiles = async (conn, chatId = null) => {
  const uniqid = chatId ? chatId.split('@')[0] : null;
  const sessionPath = './KatashiBotSession/';
  
  try {
    if (!existsSync(sessionPath)) {
      console.log(`${lenguajeGB['smsAvisoFG']()}𝙇𝘼 𝘾𝘼𝙍𝙋𝙀𝙏𝘼 𝘿𝙀 𝙎𝙀𝙎𝙎𝙄𝙊𝙉 𝙉𝙊 𝙀𝙓𝙄𝙎𝙏𝙀`);
      return false;
    }

    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    
    for (const file of files) {

      if ((uniqid && file.includes(uniqid)) || (!uniqid && file !== 'creds.json')) {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }

    return filesDeleted;
    
  } catch (err) {
    console.error(`${lenguajeGB['smsAvisoFG']()}𝙀𝙍𝙍𝙊𝙍 𝘼𝙇 𝙇𝙄𝙈𝙋𝙄𝘼𝙍 𝙎𝙀𝙎𝙎𝙄𝙊𝙉:`, err);
    return false;
  }
};

setInterval(async () => {
  try {
    const filesDeleted = await cleanSessionFiles(global.conn);
    if (filesDeleted > 0) {
      console.log(`${lenguajeGB['smsAvisoEG']()}𝙇𝙄𝙈𝙋𝙄𝙀𝙕𝘼 𝘼𝙐𝙏𝙊𝙈𝘼́𝙏𝙄𝘾𝘼: 𝙎𝙀 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍𝙊𝙉 ${filesDeleted} 𝘼𝙍𝘾𝙃𝙄𝙑𝙊𝙎`);
    }
  } catch (e) {
    console.error('Error en limpieza automática:', e);
  }
}, 60000);

const handler = async (m, { conn, usedPrefix }) => {
  const chatId = m.isGroup ? m.chat : m.sender;
  
  try {
    const filesDeleted = await cleanSessionFiles(conn, chatId);
    
    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, { 
        text: `${lenguajeGB['smsAvisoAG']()}𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝙊́ 𝙉𝙄𝙉𝙂𝙐𝙉 𝘼𝙍𝘾𝙃𝙄𝙑𝙊 𝙌𝙐𝙀 𝙄𝙉𝘾𝙇𝙐𝙔𝘼 𝙇𝘼 𝙄𝘿 𝘿𝙀𝙇 𝘾𝙃𝘼𝙏` 
      }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, {
        text: `${lenguajeGB['smsAvisoEG']()}𝙎𝙀 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍𝙊𝙉 ${filesDeleted} 𝘼𝙍𝘾𝙃𝙄𝙑𝙊𝙎 𝘿𝙀 𝙎𝙀𝙎𝙄𝙊𝙉`
      }, { quoted: m });
    }
    
  } catch (err) {
    console.error(`${lenguajeGB['smsAvisoFG']()}𝙀𝙍𝙍𝙊𝙍 𝙀𝙉 𝙇𝙄𝙈𝙋𝙄𝙀𝙕𝘼 𝙈𝘼𝙉𝙐𝘼𝙇:`, err);
    await conn.sendMessage(m.chat, {
      text: `${lenguajeGB['smsAvisoFG']()}𝙊𝘾𝙐𝙍𝙍𝙄𝙊 𝙐𝙉 𝙀𝙍𝙍𝙊𝙍 𝘼𝙇 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍 𝙇𝙊𝙎 𝘼𝙍𝘾𝙃𝙄𝙑𝙊𝙎 𝘿𝙀 𝙎𝙀𝙎𝙎𝙄𝙊𝙉`
    }, { quoted: m });
  }
  
  await conn.sendMessage(m.chat, {
    text: `${lenguajeGB['smsAvisoRG']()}🥷 𝙃𝙊𝙇𝘼 𝙔𝘼 𝙁𝙐𝙉𝘾𝙄𝙊𝙉𝘼\n𝙎𝙄 𝙀𝙇 𝘽𝙊𝙏 𝙉𝙊 𝙇𝙀 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼 𝙎𝙐𝙎 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙃𝘼𝙂𝘼 𝙐𝙉 𝙋𝙀𝙌𝙐𝙀𝙉𝙊𝙎 𝙎𝙋𝘼𝙈\n\n*𝙀𝙅𝙀𝙈𝙋𝙇𝙊:*\n${usedPrefix}s\n${usedPrefix}s\n${usedPrefix}s`
  }, { quoted: m });
};

handler.help = ['deletebot'];
handler.tags = ['jadibot'];
handler.command = /^(msgespera|ds)$/i;
export default handler;
