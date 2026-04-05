import { Low, JSONFile } from 'lowdb'

const databaseFile = './countMessagesReg.json'
const adapter = new JSONFile(databaseFile)
const db = new Low(adapter)

const ensureDbShape = (conn, chatId) => {
  db.data ||= {}
  db.data.bot ||= {}

  const botJid = conn?.user?.jid || conn?.user?.id || 'unknown@s.whatsapp.net'
  db.data.bot[botJid] ||= {}
  db.data.bot[botJid].chats ||= {}
  db.data.bot[botJid].chats.groups ||= {}
  db.data.bot[botJid].chats.groups[chatId] ||= {}
  db.data.bot[botJid].chats.groups[chatId].users ||= {}

  return db.data.bot[botJid].chats.groups[chatId].users
}

const ensureUserCounter = (users, jid) => {
  users[jid] ||= {}
  users[jid].msgcount ||= { count: 0, time: 0 }
  if (typeof users[jid].msgcount.count !== 'number' || Number.isNaN(users[jid].msgcount.count)) {
    users[jid].msgcount.count = 0
  }
  if (typeof users[jid].msgcount.time !== 'number' || Number.isNaN(users[jid].msgcount.time)) {
    users[jid].msgcount.time = 0
  }
}

let handler = async (m, { conn, args, participants, isAdmin }) => {
  await db.read()

  if (!m.isGroup) {
    return conn.reply(m.chat, 'Este comando solo funciona en grupos.', m)
  }

  const users = ensureDbShape(conn, m.chat)

  for (const p of participants || []) {
    if (!p?.id) continue
    ensureUserCounter(users, p.id)
  }

  let target = null
  if (/^t|todos$/i.test(String(args?.[0] || '').trim()) && isAdmin) {
    let out = `Total de usuarios: ${(participants || []).length}\n\n`
    for (const jid of Object.keys(users)) {
      ensureUserCounter(users, jid)
      const n = jid.split('@')[0]
      out += `@${n} tiene ${users[jid].msgcount.count} mensajes\n`
    }
    await db.write()
    return conn.sendMessage(
      m.chat,
      { text: out, mentions: conn.parseMention(out) },
      { quoted: m, ephemeralExpiration: 86400, disappearingMessagesInChat: 86400 }
    )
  }

  if (/^\d+$/.test(String(args?.[0] || '').trim()) && isAdmin) {
    target = `${String(args[0]).replace(/\D/g, '')}@s.whatsapp.net`
  } else if (m.quoted?.sender && isAdmin) {
    target = m.quoted.sender
  } else if (Array.isArray(m.mentionedJid) && m.mentionedJid[0] && isAdmin) {
    target = m.mentionedJid[0]
  } else {
    target = m.sender
  }

  ensureUserCounter(users, target)
  await db.write()

  const msg = `@${target.split('@')[0]} tiene ${users[target].msgcount.count} mensajes`
  return conn.sendMessage(
    m.chat,
    { text: msg, mentions: conn.parseMention(msg) },
    { quoted: m, ephemeralExpiration: 86400, disappearingMessagesInChat: 86400 }
  )
}

handler.admin = true
handler.command = /^revcount$/i

export default handler
