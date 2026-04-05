import fetch from 'node-fetch';
const handler = async (m, {conn, command, args, text, usedPrefix}) => {
if (!text) throw `${lenguajeGB['smsAvisoMG']()}${mid.smsMalused4}\n*${usedPrefix + command} Billie Eilish - Bellyache*`
try { 
const yt_play = await search(args.join(' '))
const texto1 = `*𓆩 𓃠 𓆪 ✧═══ ${vs} ═══✧ 𓆩 𓃠 𓆪*

ও ${mid.smsYT1}
» ${yt_play[0].title}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
ও ${mid.smsYT15}
» ${yt_play[0].ago}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
ও ${mid.smsYT5}
» ${secondString(yt_play[0].duration.seconds)}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
ও  ${mid.smsYT10}
» ${MilesNumber(yt_play[0].views)}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
ও  ${mid.smsYT2}
» ${yt_play[0].author.name}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
ও ${mid.smsYT4}
» ${yt_play[0].url}

﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
ও 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼 𝙀𝙎𝙏𝙀 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘾𝙊𝙉:
» *audio* | *video* | *audiodoc* | *videodoc*

*𓆩 𓃠 𓆪 ✧═══ ${vs} ═══✧ 𓆩 𓃠 𓆪*`.trim()

await conn.sendMessage(m.chat, {
image: { url: yt_play[0].thumbnail },
caption: texto1
}, { quoted: m })
} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
handler.limit = 0
}}
handler.command = ['play', 'play2', 'play3', 'play4']
//handler.limit = 3
//handler.register = true 
handler.before = async function (m, { conn }) {
const choice = typeof m.text === 'string' ? m.text.trim().toLowerCase() : ''
const validChoices = new Set(['audio', 'video', 'audiodoc', 'videodoc'])
if (!validChoices.has(choice)) return false
if (!m.quoted) return false

const youtubeUrl = extractYouTubeUrl(getQuotedText(m.quoted))
if (!youtubeUrl) return false

try {
if (choice === 'audio' || choice === 'audiodoc') {
await conn.reply(m.chat, `${lenguajeGB['smsAvisoEG']()}${mid.smsAud}`, fkontak, m)
const apiMp3 = `https://api.delirius.store/download/ytmp3?url=${encodeURIComponent(youtubeUrl)}`
const responseMp3 = await fetch(apiMp3)
if (!responseMp3.ok) throw new Error(`HTTP ${responseMp3.status}`)
const jsonMp3 = await responseMp3.json()
if (!jsonMp3?.status || !jsonMp3?.data?.download) throw new Error('Respuesta invalida de API ytmp3')

const title = sanitizeFileName(jsonMp3.data.title || 'audio')
if (choice === 'audiodoc') {
await conn.sendMessage(
    m.chat,
    {
        document: { url: jsonMp3.data.download },
        fileName: `${title}.mp3`,
        mimetype: 'audio/mpeg',
        caption: `╭━❰  ${wm}  ❱━⬣\n┃📥 YOUTUBE DL 📥\n┃ও *${mid.smsYT1}:* \n┃» ${title}\n╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣`,
    },
    { quoted: m },
)
return true
}
await conn.sendFile(m.chat, jsonMp3.data.download, `${title}.mp3`, null, m, false, { mimetype: 'audio/mpeg' })
return true
}

await conn.reply(m.chat, `${lenguajeGB['smsAvisoEG']()}${mid.smsVid}`, fkontak, m)
const apiMp4 = `https://api.delirius.store/download/ytmp4?url=${encodeURIComponent(youtubeUrl)}&format=360`
const responseMp4 = await fetch(apiMp4)
if (!responseMp4.ok) throw new Error(`HTTP ${responseMp4.status}`)
const jsonMp4 = await responseMp4.json()
if (!jsonMp4?.status || !jsonMp4?.data?.download) throw new Error('Respuesta invalida de API ytmp4')

const title = sanitizeFileName(jsonMp4.data.title || 'video')
if (choice === 'videodoc') {
await conn.sendMessage(
    m.chat,
    {
        document: { url: jsonMp4.data.download },
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4',
        caption: `╭━❰  ${wm}  ❱━⬣\n┃📥 YOUTUBE DL 📥\n┃ও *${mid.smsYT1}:* \n┃» ${title}\n╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣`,
    },
    { quoted: m },
)
return true
}
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
    { quoted: m },
)
return true
} catch (error) {
console.log('play reply download error:', error)
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${choice}\n\n${wm}`, fkontak, m)
return true
}
}
export default handler;

async function search(query, options = {}) {
const endpoint = `https://api.delirius.store/search/ytsearch?q=${encodeURIComponent(query)}`
const res = await fetch(endpoint)
if (!res.ok) throw new Error(`Delirius ytsearch HTTP ${res.status}`)

const json = await res.json()
if (!json?.status || !Array.isArray(json?.data)) {
throw new Error('Respuesta invalida de Delirius ytsearch')
}

const videos = json.data
.filter(item => item?.type === 'video' && item?.url)
.map(item => ({
title: item.title || 'Sin titulo',
url: item.url,
thumbnail: item.thumbnail || item.image || '',
ago: item.publishedAt || 'Desconocido',
views: Number(item.views) || 0,
author: {
name: item.author?.name || item.description || 'Desconocido'
},
duration: {
seconds: parseDurationToSeconds(item.duration || '0:00')
}
}))

if (!videos.length) throw new Error('Sin resultados de video en Delirius ytsearch')
return videos;
}

function parseDurationToSeconds(duration = '') {
if (typeof duration !== 'string' || !duration.includes(':')) return 0
const parts = duration.split(':').map(n => Number(n.trim()))
if (parts.some(Number.isNaN)) return 0
if (parts.length === 3) {
const [h, m, s] = parts
return h * 3600 + m * 60 + s
}
if (parts.length === 2) {
const [m, s] = parts
return m * 60 + s
}
return parts[0] || 0
}

function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1.';
const arr = number.toString().split('.');
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
seconds = Number(seconds);
const d = Math.floor(seconds / (3600 * 24));
const h = Math.floor((seconds % (3600 * 24)) / 3600);
const m = Math.floor((seconds % 3600) / 60);
const s = Math.floor(seconds % 60);
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
return dDisplay + hDisplay + mDisplay + sDisplay;
    }

function getQuotedText(quoted = {}) {
return (
quoted.text ||
quoted.caption ||
quoted.body ||
quoted.message?.conversation ||
quoted.message?.extendedTextMessage?.text ||
quoted.message?.imageMessage?.caption ||
quoted.message?.videoMessage?.caption ||
''
)
}

function extractYouTubeUrl(text = '') {
const match = String(text).match(/https?:\/\/(?:www\.)?(?:youtube\.com\S+|youtu\.be\S+)/i)
return match?.[0] || ''
}

function sanitizeFileName(name = '') {
return String(name)
.replace(/[\\/:*?"<>|]/g, '')
.replace(/\s+/g, ' ')
.trim()
.slice(0, 120)
}
