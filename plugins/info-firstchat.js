export async function before(m) {

if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return
  
let user = global.db.data.users[m.sender]

if (new Date() - user.pc < 1) return
await m.reply(`🌟 *Bienvenido a KatashiBot* 🥷🏻
📲 _Ejecute el comando .menu para visualizar los comandos que dispongo_ 🫡

📌 *Cualquier duda o sugerencia puede contactar a mi creador:* 🎉
📩 wa.me/51948705559 📭`) 
user.pc = new Date * 1
}
