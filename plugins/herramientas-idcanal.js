let handler = async (m, { conn, usedPrefix, command }) => {
  const hint = `${lenguajeGB['smsAvisoMG']()}Responde a un mensaje reenviado de un canal para obtener su ID.`

  const quoted = m.quoted || null
  if (!quoted && !(m.chat || '').endsWith('@newsletter')) throw hint

  // If command is used directly in a channel chat, return current channel JID.
  if ((m.chat || '').endsWith('@newsletter')) {
    return conn.reply(m.chat, `*ID del canal:*\n${m.chat}`, m)
  }

  const info = extractForwardedNewsletterInfo(quoted)
  if (!info.newsletterJid) {
    throw `${lenguajeGB['smsAvisoMG']()}No encontre datos de canal en ese mensaje.\n\nTip: responde a una publicacion reenviada desde un canal.`
  }

  const channelName = info.newsletterName || 'Sin nombre'
  const text = `*ID del canal:*\n${info.newsletterJid}\n\n*Nombre:*\n${channelName}`
  return conn.reply(m.chat, text, m)
}

handler.help = ['idcanal']
handler.tags = ['tools']
handler.command = /^(idcanal|canalid|idchannel)$/i

export default handler

function extractForwardedNewsletterInfo(quoted) {
  const qMessage = quoted?.message || quoted?.msg?.message || {}

  const direct = quoted?.forwardedNewsletterMessageInfo || quoted?.msg?.forwardedNewsletterMessageInfo
  if (direct?.newsletterJid) return direct

  const extCtx = qMessage?.extendedTextMessage?.contextInfo || quoted?.msg?.contextInfo || quoted?.contextInfo
  if (extCtx?.forwardedNewsletterMessageInfo?.newsletterJid) {
    return extCtx.forwardedNewsletterMessageInfo
  }

  const imageCtx = qMessage?.imageMessage?.contextInfo
  if (imageCtx?.forwardedNewsletterMessageInfo?.newsletterJid) {
    return imageCtx.forwardedNewsletterMessageInfo
  }

  const videoCtx = qMessage?.videoMessage?.contextInfo
  if (videoCtx?.forwardedNewsletterMessageInfo?.newsletterJid) {
    return videoCtx.forwardedNewsletterMessageInfo
  }

  const docCtx = qMessage?.documentMessage?.contextInfo
  if (docCtx?.forwardedNewsletterMessageInfo?.newsletterJid) {
    return docCtx.forwardedNewsletterMessageInfo
  }

  return {}
}
