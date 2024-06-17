// Función creada por Katashi Fukushima. Está a libre edición de videos para el envío del saludo

let handler = async (m, { conn, usedPrefix, command}) => {
let pp = ['https://qu.ax/Tvpv.mp4',
    'https://qu.ax/Tvpv.mp4', 
    'https://qu.ax/Tvpv.mp4',
    'https://telegra.ph/file/50eca30f45943a6db26e1.mp4',
    'https://telegra.ph/file/50aa71dded2ca8fd6c5c8.mp4',
    'https://telegra.ph/file/ef00deb46d8e651e51930.mp4',
    'https://telegra.ph/file/1190e241a86e3c9677d63.mp4',
    'https://telegra.ph/file/78af207ee1584e80b2b3c.mp4',
    'https://telegra.ph/file/327a0236dbd52575c0a2b.mp4',
    'https://telegra.ph/file/7c37838887adf2dda1258.mp4',
    'https://telegra.ph/file/b645126ab59bbbeb1724d.mp4',
    'https://telegra.ph/file/7245f7debfc1b260e4c17.mp4',
    'https://telegra.ph/file/ac97ae9f977a93d75e2f1.mp4',
    'https://telegra.ph/file/0dd0e5cc18594a9d0dd64.mp4',
    'https://telegra.ph/file/34557cdf8f6b0eb768961.mp4',
    'https://telegra.ph/file/36f715657cdc57d0deb77.mp4',
    'https://telegra.ph/file/f9e051d25585d47cbe574.mp4',
    'https://telegra.ph/file/cf9bd2ec8229e959c37fd.mp4',
    'https://telegra.ph/file/02e94c48e06969ec73b10.mp4',
    'https://telegra.ph/file/dcb1ba32ddccf3d116c21.mp4',
    'https://telegra.ph/file/fc4b723ac0b7416a862ee.mp4',
    'https://telegra.ph/file/ac6131f48138c9ab70a39.mp4',
    'https://telegra.ph/file/e74b6b052d8782f36c81e.mp4',
    'https://telegra.ph/file/337c228c8ff3f9b64d4c7.mp4',
    'https://telegra.ph/file/80bee16453bfb8e29f9f5.mp4',
    'https://telegra.ph/file/467ecf18fac48643d75eb.mp4',
    'https://telegra.ph/file/023713e26b4604e5ccb7e.mp4',
    'https://telegra.ph/file/30439fcee466b87a43e91.mp4',
    'https://telegra.ph/file/3f7a3070c38bd612b8a27.mp4',
    'https://telegra.ph/file/4ad4a7721e2e62b164153.mp4',
    'https://telegra.ph/file/041ee1685176b454446c4.mp4',
    'https://telegra.ph/file/de8e6c16cd5ceb65dbf1d.mp4',
    'https://telegra.ph/file/b51962d0bfd90fd5a3625.mp4',
    'https://telegra.ph/file/c8e90ddc78f9d307a1ebb.mp4'
]
//let pp2 = 'https://tinyurl.com/294oahv9'
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) throw '✦ Menciona al usuario con *@user*'
let name2 = conn.getName(who)
let name = conn.getName(m.sender)

await conn.sendMessage(m.chat, { video: { url: pp.getRandom() }, gifPlayback: true, caption: `*${name}*` + ' está saludando a' + ` *${name2}*` + ' (ﾉ^ヮ^)ﾉ*:・ﾟ✧', contextInfo: fakeChannel }, { quoted: m })
}
handler.help = ['saludar <@user>']
handler.tags = ['fun']
handler.command = ['saludar', 'hola', 'saludo']
export default handler
