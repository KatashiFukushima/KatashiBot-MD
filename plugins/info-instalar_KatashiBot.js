let handler  = async (m, { conn, usedPrefix, command }) => {
let picture = './media/menus/Menu1.jpg'
let gata = `𝑰𝑵𝑺𝑻𝑨𝑳𝑨𝑪𝑰Ó𝑵 𝑫𝑬 𝑲𝑨𝑻𝑨𝑺𝑯𝑰𝑩𝑶𝑻 🥷

*━━━━━━━━━━━━━⬣*
✅ 𝗜𝗡𝗦𝗧𝗔𝗟𝗔𝗥 𝗘𝗡 𝗜𝗡𝗙𝗜𝗡𝗜𝗧𝗬
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
*𝑲𝒂𝒕𝒂𝒔𝒉𝒊𝑩𝒐𝒕 : 𝑰𝒏𝒇𝒊𝒏𝒊𝒕𝒚*
*_Tutorial en proceso..._*
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
_DASHBOARD_
_https://dash.boxmineworld.com_
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
_Tutorial - Crea una cuenta en la Dashboard_
*_Tutorial en proceso..._*
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
_PANEL_
_https://store.panel-infinitywa.store_
*━━━━━━━━━━━━━⬣*

*━━━━━━━━━━━━━⬣*
✅ 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝙍 𝙀𝙉 𝙏𝙀𝙍𝙈𝙐𝙓
*⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯*
*𝑲𝒂𝒕𝒂𝒔𝒉𝒊𝑩𝒐𝒕 : 𝑰𝒏𝒔𝒕𝒂𝒍𝒂𝒄𝒊ó𝒏 𝑨𝒖𝒕𝒐𝒎á𝒕𝒊𝒄𝒂*
*_https://www.youtube.com/shorts/ZLJYDUM6vSY_*
termux-setup-storage
apt update -y && yes | apt upgrade && pkg install -y bash wget mpv && wget -O - https://raw.githubusercontent.com/KatashiFukushima/KatashiBot-MD/master/katashi.sh | bash
*━━━━━━━━━━━━━⬣*`
await 
//conn.sendFile(m.chat, gataImg, 'lp.jpg', gata, fkontak, false, { contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: imagen4, sourceUrl: accountsgb }}})}
conn.sendButton(m.chat, gata, `Comunícate con Mi Creador si necesitas ayuda con la Instalación.\n\nContact My Creator if you need help with the Installation.\n\n${ig}\n${wm}`, picture, [
['𝘾𝙪𝙚𝙣𝙩𝙖𝙨 𝙊𝙛𝙞𝙘𝙞𝙖𝙡𝙚𝙨 | 𝘼𝙘𝙘𝙤𝙪𝙣𝙩𝙨 ✅', '.cuentaskb'],
['🎁 𝘿𝙤𝙣𝙖𝙧 | 𝘿𝙤𝙣𝙖𝙩𝙚', '.donar']], 'termux-setup-storage\n\napt update -y && yes | apt upgrade && pkg install -y bash wget mpv && wget -O - https://raw.githubusercontent.com/KatashiFukushima/KatashiBot-MD/master/katashi.sh | bash', fkontak)}
handler.command = /^(instalarbot|instalarkatashibot|instalarkatashi|procesobot|botproceso|procesodelbot|botinstall|installbot)/i
export default handler


