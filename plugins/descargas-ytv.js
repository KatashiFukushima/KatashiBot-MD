import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}${mid.smsMalused7}\n*${usedPrefix + command} https://youtu.be/c5gJRzCi0f0*`, fkontak, m)
let youtubeLink = '';
if (args[0].includes('you')) {
youtubeLink = args[0]; 
} else {
const index = parseInt(args[0]) - 1;
if (index >= 0) {
if (Array.isArray(global.videoList) && global.videoList.length > 0) {
const matchingItem = global.videoList.find(item => item.from === m.sender);
if (matchingItem) {
if (index < matchingItem.urls.length) {
youtubeLink = matchingItem.urls[index];
} else {
throw `${lenguajeGB['smsAvisoFG']()} ${mid.smsYT} ${matchingItem.urls.length}*`;
}} else {
throw `${lenguajeGB['smsAvisoMG']()}${mid.smsY2(usedPrefix, command)} ${usedPrefix}playlist <texto>*`;
}} else {
throw `${lenguajeGB['smsAvisoMG']()}${mid.smsY2(usedPrefix, command)}${usedPrefix}playlist <texto>*`;
}}}  
const isAudioCommand = /^audio|fgmp3|dlmp3|getaud|yt(a|mp3)$/i.test(command)
if (isAudioCommand) {
await conn.reply(m.chat, lenguajeGB['smsAvisoEG']() + mid.smsAud, fkontak, m)
} else {
await conn.reply(m.chat, lenguajeGB['smsAvisoEG']() + mid.smsVid, fkontak, m)
}

try {
if (isAudioCommand) {
const apiMp3 = `https://api.delirius.store/download/ytmp3?url=${encodeURIComponent(youtubeLink)}`
const responseMp3 = await fetch(apiMp3)
if (!responseMp3.ok) throw new Error(`HTTP ${responseMp3.status}`)
const jsonMp3 = await responseMp3.json()
if (!jsonMp3?.status || !jsonMp3?.data?.download) throw new Error('Respuesta inválida de API ytmp3')

const title = jsonMp3.data.title || 'audio'
await conn.sendFile(m.chat, jsonMp3.data.download, `${title}.mp3`, null, m, false, { mimetype: 'audio/mpeg' })
} else {
const format = args[1] || '360'
const apiMp4 = `https://api.delirius.store/download/ytmp4?url=${encodeURIComponent(youtubeLink)}&format=${encodeURIComponent(format)}`
const responseMp4 = await fetch(apiMp4)
if (!responseMp4.ok) throw new Error(`HTTP ${responseMp4.status}`)
const jsonMp4 = await responseMp4.json()
if (!jsonMp4?.status || !jsonMp4?.data?.download) throw new Error('Respuesta inválida de API ytmp4')

const title = jsonMp4.data.title || 'video'
const thumb = jsonMp4.data.image || null
await conn.sendMessage(
  m.chat,
  {
    video: { url: jsonMp4.data.download },
    fileName: `${title}.mp4`,
    mimetype: 'video/mp4',
    caption: `╭━❰  ${wm}  ❱━⬣\n┃ 💜 ${mid.smsYT1}\n┃ ${title}\n╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣`,
    thumbnail: thumb ? await (await fetch(thumb)).buffer() : undefined,
  },
  { quoted: m }
)
}
} catch (E) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(E)
}}
handler.command = /^audio|fgmp3|dlmp3|getaud|yt(a|mp3)$|^video|fgmp4|dlmp4|getvid|yt(v|mp4)?$/i
export default handler
