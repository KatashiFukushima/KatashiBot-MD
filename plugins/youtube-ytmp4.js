import Scraper from "@SumiFX/Scraper"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply('🔍 Ingresa el enlace del vídeo de YouTube junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://youtu.be/QSvaCSt8ixs`)
if (!args[0].match(/youtu/gi)) return conn.reply(m.chat, `Verifica que el enlace sea de YouTube.`, m)

let user = global.db.data.users[m.sender]
try {
let { title, size, quality, thumbnail, dl_url } = await Scraper.ytmp4(args[0])
if (size.includes('GB') || size.replace(' MB', '') > 120) { return await m.reply('El archivo pesa mas de 120 MB, se canceló la Descarga Descargue en MP4DOC PARA QUE DE ENVÍE SU VIDEO.')}
let txt = ` ╭─⬣「 *YouTube Descarga* 」⬣\n`
    txt += `│: ̗̀➛ *🔍 Titulo ∙* ${title}\n`
    txt += `│: ̗̀➛ *🪴 Calidad ∙* ${quality}\n`
    txt += `│: ̗̀➛ *⚖ Peso ∙* ${size}\n`
    txt += `╰─⬣`
await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, dl_url, title + '.mp4', `*🔍 Titulo ∙* ${title}\n*🪴 Calidad ∙* ${quality}`, m, false, { asDocument: user.useDocument })
} catch {
}}
handler.help = ['ytmp4 <yt url>']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'yt', 'ytv']
handler.register = true 
//handler.limit = 1
export default handler