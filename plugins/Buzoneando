import util from 'util'
import path from 'path'
let handler = async (m, { conn }) => {
if (!db.data.chats[m.chat].audios && m.isGroup) return 0
  
let vn = './media/Buzoneando.mp3'
conn.sendPresenceUpdate('recording', m.chat)
conn.sendFile(m.chat, vn, 'Buzoneando.mp3', null, m, true, { type: 'audioMessage', ptt: true })
}
handler.customPrefix = /Buzoneando/
handler.command = new RegExp
export default handler
