/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

const cleanSessionFiles = async (conn) => {
  const sessionPath = './KatashiBotSession/';
  try {
    if (!existsSync(sessionPath)) {
      console.log(`${lenguajeGB['smsAvisoFG']()} *_LA CARPETA (KatashiBotSession) NO EXISTE O ESTA VACIA._*`);
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
      console.log(`${lenguajeGB['smsAvisoFG']()} *_NO SE ENCONTRO NINGUN ARCHIVO PARA ELIMINAR EN LA CARPETA (KatashiBotSession)_*`);
    } else {
      console.log(`${lenguajeGB['smsAvisoAG']()} *_INICIANDO PROCESO DE ELIMINACION DE : ${filesDeleted} ARCHIVO DE SESSION, EXCEPTO EL ARCHIVO (creds.json)_*`);
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
