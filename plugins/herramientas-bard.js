import fetch from 'node-fetch'

var handler = async (m, { text,  usedPrefix, command }) => {

if (!text) throw `*🤨 ¿Qué carajo quiere buscar? 🤬 ¡Ingrese un texto!* `

try {

await m.reply('🌐 *_Aguarde un momento..._*')
var apii = await fetch(`https://aemt.me/bard?text=${text}`)
var res = await apii.json()
await m.reply(res.result)

} catch (error) {
console.error(error)
throw '⚠️ *CARAJO, HA OCURRIDO UN ERROR* 😳'
}

}
handler.command = ['bard']
handler.help = ['bard']
handler.tags = ['ai']

handler.premium = false

export default handler
