let handler = async (m, { conn, command, text }) => {
if (!text) throw `*⚠️ ESCRIBE EL NOMBRE DE DOS PERSONAS PARA CALCULAR SU ATRACCIÓN SEXUAL*`
let [text1, ...text2] = text.split(' ')
text2 = (text2 || []).join(' ')
if (!text2) throw `*⚠️ ESCRIBE EL NOMBRE DE LA SEGUNDA PERSONA*`
let love = `_🥵 *${text1}* tu oportunidad de cogerte a *${text2}* es de *${Math.floor(Math.random() * 100)}%* 👉👌_\n\n¡Fóllal@ de una vez! con el comando _.follar ${text2}_ 

`.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })
}
handler.help = ['kchero']
handler.tags = ['fun']
handler.command = /^kchero|kchera|folladora|follador$/i
export default handler
