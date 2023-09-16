case 'payment' :{
simple.relayMessage(m.chat, {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: 1893939,
      requestFrom: m.sender,
      noteMessage: {
        extendedTextMessage: {
          text: "Hola",
          contextInfo: {
            externalAdReply: {
              showAdAttribution: true
            }
          }
        }
      }
    }
  }, {})
}
break

            case 'myip': {
                if (!isCreator) throw mess.owner
                var http = require('http')
                http.get({
                    'host': 'api.ipify.org',
                    'port': 80,
                    'path': '/'
                }, function(resp) {
                    resp.on('data', function(ip) {
                        m.reply("🔎 Mi dirección IP pública es: " + ip);
                    })
                })
            }
            break
case 'ipinfo': case 'infoip': {
             if (!isPremium && global.db.data.users[m.sender].limit < 1) return reply(mess.endLimit) //
		            db.data.users[m.sender].limit -= 1 // -1 limit
if (!text) return reply("donde está la ip? ")
fetchJson('http://ip-api.com/json/' + text ).then((y) => {
reply(`						『 IP INFORMACIÓN 』\n
🖥 *IP:* ${text}
📌 *Estado:* ${y.status}
🌐 *País:* ${y.countryCode}
🌍 *Region:* ${y.region}
🗾 *Nombre de Región:* ${y.regionName}
🏢 *Ciudad:* ${y.city}
🛶 *Zip:* ${y.zip}
🛰 *Latitud:* ${y.lat}
🛩 *Longitud:* ${y.lon}
⏰ *Zona horaria:* ${y.timezone}
🔋 *Isp:* ${y.isp}
📡 *Org:* ${y.org}
🪄 *As:* ${y.as}
`)
})
}
break
case 'iploc': case 'ipmap': {
             if (!isPremium && global.db.data.users[m.sender].limit < 1) return reply(mess.endLimit) //
		            db.data.users[m.sender].limit -= 1 // -1 limit
if (!text) return reply("y la ip?")
reply(`	      『 IP LOCALIZACIÓN 』\n\n*UBICACIÓN DE : ${text}*`)
fetchJson('http://ip-api.com/json/' + text ).then((y) => {
anu = `
🛰 *Latitud:* ${y.lat}
🛩 *Longitud:* ${y.lon}
`
simple.sendMessage(from, { location :  { degreesLatitude: y.lat, degreesLongitude: y.lon }}, {quoted: m})
})
}
break
case 'profile': case 'perfil': {
const jids = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender ? m.sender : false
const dns = await store.chats.all().filter(v => v.id.includes(jids)).map(v => v)
const isblocks = await simple.fetchBlocklist()
const isBlock = isblocks.includes(jids)
texnr = `     「 Profile Inspector 」
▸ Numero : ${jids.split("@")[0]}

▸ Mencion : @${jids.split("@")[0]}

▸ Nombre : ${simple.getName(jids)}

▸ Biografía : ${jsonformat(await simple.fetchStatus(jids).catch(() => {}))}

▸ Bussines : ${jsonformat(await simple.getBusinessProfile(jids))}

▸ última conversación : ${dns[0] ? moment(dns[0].conversationTimestamp * 1000).tz("America/Guayaquil").format("DD/MM/YYYY HH:mm:ss") : "Indefinido"}

▸ Chat : ${dns[0] ? dns[0].unreadCount +" chat" : "0 chat"}
▸ bloqueado? : ${isBlock}`
try {
ppuser = await simple.profilePictureUrl(jids, 'image')
} catch {
ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
simple.sendMessage(m.chat, { image: { url: ppuser }, caption: texnr, mentions: await parseMention(texnr), contextInfo:{externalAdReply:{
title:"WhatsApp Bot Multi Device",
body:"By hj",
thumbnail: menu,
mediaType:2,
mediaUrl: "https://instagram.com/azami.19",
sourceUrl: "https://instagram.com/azami.19"
}}}, {quoted:m})
}
break			
 case 'checknumber':
  sticWait(from)
  const dripska = {
    method: 'GET',
    url: 'https://phonenumbervalidatefree.p.rapidapi.com/ts_PhoneNumberValidateTest.jsp',
    qs: {number: `${text}`},
    headers: {
      'X-RapidAPI-Key': '837661b454msh274b6753ca80823p11c653jsn973bb2a55a34',
      'X-RapidAPI-Host': 'phonenumbervalidatefree.p.rapidapi.com',
      useQueryString: true
    }
  };
  let dhidhi = require('request')
  dhidhi(dripska, function (error, response, body) {
    if (error) throw new Error(error);
    reply(body);
    console.log(body);
  });
break
case 'veriphone':
  sticWait(from)
  const dripdrop = {
    method: 'GET',
    url: 'https://veriphone.p.rapidapi.com/verify',
    qs: {phone: `${text}`},
    headers: {
      'X-RapidAPI-Key': '837661b454msh274b6753ca80823p11c653jsn973bb2a55a34',
      'X-RapidAPI-Host': 'veriphone.p.rapidapi.com',
      useQueryString: true
    }
  };
  let mhati = require('request')
  mhati(dripdrop, function (error, response, body) {
    if (error) throw new Error(error);
    reply(body);
    console.log(body);
  });
  break
  case 'weather':
  if (!args[0]) throw " proporcione el nombre del lugar o la ubicación"
  try {
    const response = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`
    )
    const res = await response
    const name = res.data.name
    const Country = res.data.sys.country
    const Weather = res.data.weather[0].description
    const Temperature = res.data.main.temp + "°C"
    const Minimum_Temperature = res.data.main.temp_min + "°C"
    const Maximum_Temperature = res.data.main.temp_max + "°C"
    const Humidity = res.data.main.humidity + "%"
    const Wind = res.data.wind.speed + "km/h"
    const wea = `*📍LUGAR:* ${name}\n*PAÍS:* ${Country}\n*TIEMPO:* ${Weather}\n*TEMPERATURA:* ${Temperature}\nTEMPERATURA MÍNIMA: ${Minimum_Temperature}\n*📛TEMPERATURA MÁXIMA:* ${Maximum_Temperature}\n*HUMEDAD:* ${Humidity}\n*VIENTO:* ${Wind}
  `

    reply(wea)
  } catch (e) {
    return "Ubicación de error no encontrada!!!"
  }
break