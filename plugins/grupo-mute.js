let handler = async (m, { conn, command, text, isAdmin }) => {
  if (!isAdmin) throw '👑 *Solo un administrador puede ejecutar este comando*'

  const ownerJid = `${global.owner?.[0]?.[0] || ''}@s.whatsapp.net`
  const mentioned = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : null
  const quoted = m.quoted?.sender || null
  const fromText = text ? text.replace(/[^0-9]/g, '') : ''
  const target = mentioned || quoted || (fromText ? `${fromText}@s.whatsapp.net` : null)

  if (!target) {
    const prompt = command === 'mute'
      ? '╰⊱❗️⊱ *Menciona a la persona que deseas mutar* ⊱❗️⊱'
      : '╰⊱❗️⊱ *Menciona a la persona que deseas demutar* ⊱❗️⊱╮'
    return conn.reply(m.chat, prompt, m)
  }

  if (target === ownerJid) throw '😼 *El creador del bot no puede ser mutado*'
  if (target === conn.user?.jid) throw '❌️ *No puedes mutar el bot*'
  if (target === m.sender && command === 'unmute') throw '👑 *Sólo otro administrador puede desmutarte*'

  let groupMeta = await conn.groupMetadata(m.chat)
  let groupOwner = groupMeta?.owner || `${m.chat.split('-')[0]}@s.whatsapp.net`
  if (target === groupOwner) throw '❌️ *No puedes mutar el creador del grupo*'

  global.db.data.users = global.db.data.users || {}
  if (!global.db.data.users[target]) global.db.data.users[target] = {}
  if (typeof global.db.data.users[target].muto !== 'boolean') global.db.data.users[target].muto = false

  let user = global.db.data.users[target]

  if (command === 'mute') {
    if (user.muto) throw '😼 *Este usuario ya ha sido mutado*'
    user.muto = true
    return conn.reply(m.chat, '*Tus mensajes serán eliminados*', m, { mentions: [target] })
  }

  if (command === 'unmute') {
    if (!user.muto) throw '😼 *Este usuario no ha sido mutado*'
    user.muto = false
    return conn.reply(m.chat, '*Tus mensajes no serán eliminados*', m, { mentions: [target] })
  }
}

handler.command = /^(mute|unmute)$/i
handler.group = true
handler.admin = true
handler.botAdmin = false

export default handler
