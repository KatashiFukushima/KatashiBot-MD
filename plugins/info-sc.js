const { generateWAMessageFromContent } = (await import(global.baileys))
import { performance } from 'perf_hooks'
import fs from 'fs'
import moment from 'moment-timezone';
import fetch from 'node-fetch';
let handler  = async (m, { conn, usedPrefix: _p }) => {
const res = await fetch('https://api.github.com/repos/KatashiFukushima/KatashiBot-MD');
const json = await res.json();
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var days = Math.floor(seconds / (24 * 60 * 60 * 1000));
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `🌟  𝘽 𝙊 𝙏  -  𝙎 𝘾 𝙍 𝙄 𝙋 𝙏  🌟\n\n*» 𝙉𝙊𝙈𝘽𝙍𝙀 :* ${json?.name || 'GataBot-MD'}\n*» 𝙑𝙄𝙎𝙄𝙏𝘼𝙉𝙏𝙀𝙎 :* ${json?.watchers_count || '-'}\n*» 𝘼𝘾𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝘾𝙄𝙊𝙉 :* ${moment(json?.updated_at).format('DD/MM/YY - HH:mm:ss') || '-'}\n*» 𝙐𝙍𝙇 :* ${json?.html_url || 'https://github.com/KatashiFukushima/KatashiBot-MD'}\n\n${json?.forks_count || '-'} Forks · ${json?.stargazers_count || '-'} Stars · ${json?.open_issues_count || '-'} Issues\n\n*⏰ 𝙏𝙄𝙀𝙈𝙋𝙊 𝘼𝘾𝙏𝙄𝙑𝙊 | 𝘼𝘾𝙏𝙄𝙑𝙀 𝙏𝙄𝙈𝙀:*\n \t${pad(days)} Dias\t ${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segudos \t\n`
}
					const runtime = process.uptime()
		            const teks = `${kyun(runtime)}`
					const itsme = `0@s.whatsapp.net`
					const split = `🥷 𝗦𝘂𝗽𝗲𝗿 𝗞𝗮𝘁𝗮𝘀𝗵𝗶𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽`
					const rtimebro = {
					contextInfo: {
					participant: itsme,
					quotedMessage: {
					extendedTextMessage: {
				    text: split
									}
								}
							}
					}
						    
						  let prep = generateWAMessageFromContent(m.chat, { orderMessage: { 
itemCount: -10062007, status: 500,
surface: 999,
message: teks,
description: '^^',
orderTitle: 'Hi Sis',
token: '9',
curreyCode: 'IDR',
totalCurrencyCode: '>〰<',
totalAmount1000: '1000000',
sellerJid: global.md,
thumbnail: global.gataImg
}}, {contextInfo: null, quoted: m})
await conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
//conn.sendMessage(m.chat, `${teks}`, MessageType.text, rtimebro)
}
handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^(runtime|sc|activo)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null 

export default handler
