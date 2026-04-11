let handler = async (m, { conn }) => {
let isBypass = global.opts['bypass']
global.opts['bypass'] = !isBypass
await conn.sendMessage(m.chat, { react: { text: !isBypass ? '✅' : '❌', key: m.key } })
}
handler.help = ['bypass']
handler.tags = ['owner']
handler.command = /^(bypass|anularregistro)$/i
handler.rowner = true
export default handler
