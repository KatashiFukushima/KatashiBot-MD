import moment from 'moment-timezone'

export async function before(m, conn) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return
    
    let who = m.sender
    let name = await conn.getName(who)

    // Puedes adaptar esto según tus necesidades.
    let saludo = ucapan()
    let fecha = moment.tz('America/Los_Angeles').format('YYYY-MM-DD')
    let tiempo = moment.tz('America/Los_Angeles').format('HH:mm')

    if (new Date() - user.pc < 21600000) return

    await conn.reply(m.chat, `👋 Hola ${name}!!
    *${saludo}*

    📅 Fecha: ${fecha}
    ⏰ Hora: ${tiempo}

    ⚠️ *Nota:* no envíe spam al bot
    🧃 Escriba *.menu* para mostrar el menú 
  
    📝 ¿Quieres apoyar este proyecto para que siga actualizándose? enviar a través de: 
    *https://paypal.me/KatashiF*`, m)

    user.pc = new Date() * 1
}

function ucapan() {
    const time = moment.tz('America/Los_Angeles').format('HH')
    let res = "👋 *BIENVENIDO(A) | WELCOME* 👋"
    if (time >= 4) {
        res = "🌇 *Buenos Días | Good Morning* ⛅"
    }
    if (time >= 11) {
        res = "🏙️ *Buenas Tardes | Good Afternoon* 🌤️"
    }
    if (time >= 15) {
        res = "🌆 *Buenas tardes | Good Afternoon* 🌥️"
    }
    if (time >= 17) {
        res = "🌃 *Buenas noches | Good Evening* 💫"
    }
    return res
}
