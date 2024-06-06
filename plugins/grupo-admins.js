let handler = async (m, { conn, participants, groupMetadata, args, usedPrefix, text, command }) => {
  if (!text) return m.reply(`${lenguajeGB['smsAvisoMG']()}𝑰𝑵𝑮𝑹𝑬𝑺𝑬 𝑼𝑵 𝑻𝑬𝑿𝑻𝑶 𝑷𝑶𝑹 𝑬𝑳 𝑪𝑼𝑨𝑳 𝑸𝑼𝑰𝑬𝑹𝑬 𝑸𝑼𝑬 𝑺𝑶𝑳𝑰𝑪𝑰𝑻𝑬 𝑳𝑨 𝑷𝑹𝑬𝑺𝑬𝑵𝑪𝑰𝑨 𝑫𝑬 𝑳𝑶𝑺 𝑨𝑫𝑴𝑰𝑵𝑺`)
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/admins.jpg'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let pesan = args.join` `
let oi = `${lenguajeGB.smsAddB5()} _${pesan}_`

let textoA = 
`*⊱ ──── 《.⋅ 🥷 ⋅.》 ──── ⊰*
ෆ ${lenguajeGB.smsAddB3()}
ෆ ${oi}
*⊱ ──── 《.⋅ ${vs} ⋅.》 ──── ⊰*`

let textoB = 
`${listAdmin}

⛔ ${lenguajeGB.smsAddB4()} ⛔`.trim()
await conn.sendFile(m.chat, pp, 'error.jpg', textoA + textoB, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
//await conn.sendButton(m.chat, textoA, textoB, pp, [[lenguajeGB.smsConMenu(), `.menu`]], m, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.command = /^(admins|@admins|dmins)$/i
handler.group = true
export default handler
