let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) throw `${lenguajeGB['smsAvisoMG']()}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 @𝙏𝘼𝙂 𝙊 𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀\n𝙏𝘼𝙂 𝙎𝙊𝙈𝙀𝙊𝙉𝙀 @𝙏𝘼𝙂 𝙊𝙍 𝙏𝙔𝙋𝙀 𝙏𝙃𝙀 𝙉𝘼𝙈𝙀`

if (command == 'ship') {
let juego = `*${nombre1} tu oportunidad de enamorarte de ${text.toUpperCase()} ${nombre2} ES DE ${(500).getRandom()}% Deberias pedirle que sea tu  novia/o ?_*`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}

}
handler.help = ['ship'].map(v => v + 'nombre1 nombre2')
handler.tags = ['calculator']
handler.command = ['ship']
handler.exp = 100
export default handler
