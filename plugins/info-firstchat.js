export async function before(m) {

const username = conn.getName(m.sender)

if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return
  
let user = global.db.data.users[m.sender]

if (new Date() - user.pc < 21600000) return
await m.reply(`🌟 *Hola ${username}, bienvenido a KatashiBot* 🥷🏻
📲 _Ejecute el comando .menu para visualizar los comandos que dispongo_ 🫡

📌 *Cualquier duda o sugerencia puede contactar a mi creador:* 🎉
📩 wa.me/51948705559 📭
🙏❣️ *Si desea apoyar el proyecto Katashi Bot puede donar a esta cuenta por PayPal* ✅📈
🌟 https://www.paypal.com/paypalme/KatashiF ✨`) 
user.pc = new Date * 1
}
