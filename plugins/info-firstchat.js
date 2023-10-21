export async function before(m) {

if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return
  
let user = global.db.data.users[m.sender]

if (new Date() - user.pc < 21600000) return
await conn.reply(m.chat, `👋 Hola ${userName}!!
 *${saludo}*

📅 Fecha: ${fecha}
⏰ Hora: ${tiempo}

⚠️ *Nota:* no envíe spam al bot
🧃 Escriba *.menu* para mostrar el menú 
  
📝 ¿Quieres apoyar este proyecto para que siga actualizándose? enviar a través de: 
*https://paypal.me/KatashiF*`, m, fakes,)
user.pc = new Date * 1

}
