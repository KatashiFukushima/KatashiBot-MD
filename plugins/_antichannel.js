const linkRegex = /whatsapp.com\/(?:channel\/)?([0-9A-Za-z]{20,24})/i
export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)
    let hapus = m.key.participant
    let pesan = m.key.id

    if (chat.antiCanal && !isAdmin) {
        if (isBotAdmin && bot.restrict) {
           return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: pesan, participant: hapus }})
            return conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!bot.restrict) return m.reply('El Programador y El administrador no seran eliminados!')
    }
    return !0
}
