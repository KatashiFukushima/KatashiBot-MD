import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

const cleanSessionFiles = async (conn) => {
  const sessionPath = './KatashiBotSession/';
  try {
    if (!existsSync(sessionPath)) {
      console.log(`${lenguajeGB['smsAvisoFG']()} 𝙇𝘼 𝘾𝘼𝙍𝙋𝙀𝙏𝘼 "/KatashiBotSession" 𝙉𝙊 𝙀𝙓𝙄𝙎𝙏𝙀 𝙊 𝙀𝙎𝙏𝘼 𝙑𝘼𝘾𝙄́𝘼`);
      return;
    }
    
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }
    
    if (filesDeleted === 0) {
      console.log(`${lenguajeGB['smsAvisoFG']()}𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝙊 𝙉𝙄𝙉𝙂𝙐𝙉 𝘼𝙍𝘾𝙃𝙄𝙑𝙊 𝙋𝘼𝙍𝘼 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍 𝙀𝙉 𝙇𝘼 𝘾𝘼𝙍𝙋𝙀𝙏𝘼 "/KatashiBotSession"`);
    } else {
      console.log(`${lenguajeGB['smsAvisoAG']()} 𝙄𝙉𝙄𝘾𝙄𝘼𝙉𝘿𝙊 𝙋𝙍𝙊𝘾𝙀𝙎𝙊 𝘿𝙀 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝘾𝙄𝙊𝙉 𝘿𝙀 : ${filesDeleted} 𝘼𝙍𝘾𝙃𝙄𝙑𝙊 𝘿𝙀 𝙎𝙀𝙎𝙎𝙄𝙊𝙉, 𝙀𝙓𝘾𝙀𝙋𝙏𝙊 𝙀𝙇 𝘼𝙍𝘾𝙃𝙄𝙑𝙊 "/creds.json"`);
    }
  } catch (err) {
    console.error('𝙀𝙍𝙍𝙊𝙍 𝘼𝙇 𝙇𝙀𝙀𝙍 𝙇𝘼 𝘾𝘼𝙍𝙋𝙀𝙏𝘼 𝙊 𝙇𝙊𝙎 𝘼𝙍𝘾𝙃𝙄𝙑𝙊𝙎 𝘿𝙀 𝙎𝙀𝙎𝙎𝙄𝙊𝙉:', err);
  }
};


setInterval(() => {
  cleanSessionFiles(global.conn);
}, 3600000);

const handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(
      m.chat,
      { text: `${lenguajeGB['smsAvisoAG']()}𝙐𝙏𝙄𝙇𝙄𝙕𝘼 𝙀𝙎𝙏𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝘿𝙄𝙍𝙀𝘾𝙏𝘼𝙈𝙀𝙉𝙏𝙀 𝙀𝙉 𝙀𝙇 𝙉𝙐́𝙈𝙀𝙍𝙊 𝙋𝙍𝙄𝙉𝘾𝙄𝙋𝘼𝙇 𝘿𝙀𝙇 𝘽𝙊𝙏` },
      { quoted: m }
    );
  }
  
  await cleanSessionFiles(conn);
  
  await conn.sendMessage(m.chat, {
    text: `${lenguajeGB['smsAvisoRG']()}🥷 *_HOLA, YA FUNCIONA_* \n *_SI EL BOT NO RESPONDE A COMANDOS, POR FAVOR REALICE UN PEQUEÑO SPAM_* \n\n*𝙀𝙅𝙀𝙈𝙋𝙇𝙊:*\n${usedPrefix}s\n${usedPrefix}s\n${usedPrefix}s`
  }, { quoted: m });
}

handler.help = ['del_reg_in_session_owner'];
handler.tags = ['owner'];
handler.command = /^(del_reg_in_session_owner|clearallsession|deletekatashi|deletekata)$/i;
handler.rowner = true
export default handler;
