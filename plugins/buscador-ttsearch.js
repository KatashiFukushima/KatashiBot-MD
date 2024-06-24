import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
if (!text) throw `🙂‍↔️ Ingresa un texto junto al comando.\n\n*Ejemplo:*\n*${usedPrefix + command}* katashi es gay`
  await m.react('🕓')
  try {
    let response = await fetch(https://api.yanzbotz.my.id/api/cari/tiktok?query=${text})
    let data = await response.json()
    let img = await (await fetch('url de la imagen de tu bot pe')).buffer()

    if (data.status === 200) {
      let videos = data.result.videos

      let txt = *  T I K T O K  -  S E A R C H*
      for (let i = 0; i < (50 <= videos.length ? 50 : videos.length); i++) {
        let video = videos[i]
        txt += \n\n
        txt += `	   Nro : ${i + 1}\n`
        txt += `	  Título : ${video.title}\n`
        txt += `	   Autor : ${video.author.nickname}\n`
        txt += `	   Url : https://vm.tiktok.com/video/${video.video_id}`
      }
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
await m.react('✅') 
} else {
await m.react('✖️')
}
} catch {
await m.react('✖️')
}}
handler.tags = ['search']
handler.help = ['tiktoksearch <texto>']
handler.command = ['tiktoksearch', 'tiktoks']
handler.register = true 
//handler.limit = 1

export default handler
