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

*𓆩 𓃠 𓆪 ✧═══ ${vs} ═══✧ 𓆩 𓃠 𓆪*`.trim()

await conn.sendMessage(m.chat, {
image: { url: yt_play[0].thumbnail },
caption: texto1
}, { quoted: m })

const downloadHint = `╭═══〘 卐 𝐊𝐚𝐭𝐚𝐬𝐡𝐢 𝐁𝐨𝐭 卐 〙═══⊷❍
┃ ❖ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒
┃ ❖ Audio: ${usedPrefix}yta ${yt_play[0].url}
┃ ❖ Audio Doc: ${usedPrefix}ytmp3doc ${yt_play[0].url}
┃ ❖ Video: ${usedPrefix}ytv ${yt_play[0].url}
┃ ❖ Video Doc: ${usedPrefix}ytmp4doc ${yt_play[0].url}
╰══════════════════════════⊷❍`

await conn.sendMessage(m.chat, {
text: `*𝙀𝙇𝙄𝙅𝘼 𝙌𝙐𝙀 𝙑𝘼 𝙃𝘼𝘾𝙀𝙍 𝘾𝙊𝙉 ${text}*\n\n${downloadHint}`
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
