import { spawn } from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {
    if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
    if (conn.user.jid == conn.user.jid) {
    const { key } = await conn.sendMessage(m.chat, {text: `🚀🚀`}, {quoted: m});
await delay(1000 * 1);
await conn.sendMessage(m.chat, {text: `🚀🚀🚀🚀`, edit: key});
await delay(1000 * 1);
await conn.sendMessage(m.chat, {text: `🚀🚀🚀🚀🚀🚀`, edit: key});
await conn.sendMessage(m.chat, {text: `✇ 𝑲𝒂𝒕𝒂𝒔𝒉𝒊𝑩𝒐𝒕 𝒓𝒆𝒊𝒏𝒊𝒄𝒊𝒂𝒏𝒅𝒐 ✇\n\n✇ 𝑲𝒂𝒕𝒂𝒔𝒉𝒊𝑩𝒐𝒕 𝒓𝒆𝒔𝒕𝒂𝒓𝒕𝒊𝒏𝒈 ✇`, edit: key});
    process.send('reset')
  } else throw 'eh'
}
handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart','reiniciar'] 
handler.rowner = true
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
