import axios from "axios"

let handler = async (m, { args }) => {
  if (!args[0]) {
    let resp = `*[❗INFO❗] ESCRIBA EL NOMBRE DE SU PAIS O CIUDAD*`
    let txt = '';
    let count = 0;
    for (const c of resp) {
        await new Promise(resolve => setTimeout(resolve, 5));
        txt += c;
        count++;
        if (count % 10 === 0) {
            conn.sendPresenceUpdate('composing' , m.chat);
        }
    }
        await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
  }
  try {
      const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`)
    const res = await response
    const name = res.data.name
    const Country = res.data.sys.country
    const Weather = res.data.weather[0].description
    const Temperature = res.data.main.temp + "°C"
    const Minimum_Temperature = res.data.main.temp_min + "°C"
    const Maximum_Temperature = res.data.main.temp_max + "°C"
    const Humidity = res.data.main.humidity + "%"
    const Wind = res.data.wind.speed + "km/h"
    const wea = `「 📍 」LUGAR: ${name}\n「 🗺️ 」PAIS: ${Country}\n「 🌤️ 」TIEMPO: ${Weather}\n「 🌡️ 」TEMPERATURA: ${Temperature}\n「 💠 」 TEMPERATURA MINIMA: ${Minimum_Temperature}\n「 📛 」TEMPERATURA MAXIMA: ${Maximum_Temperature}\n「 💦 」HUMEDAD: ${Humidity}\n「 🌬️ 」 VIENTO: ${Wind}
  `.trim()
         let txt = '';
       let count = 0;
       for (const c of wea) {
           await new Promise(resolve => setTimeout(resolve, 5));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
} catch (e) {
let resp = " *[❗INFO❗] Error!\n _No se encontrarón resultados, trate de escribir un país o ciudad existente._* "
       let txt = '';
       let count = 0;
       for (const c of resp) {
           await new Promise(resolve => setTimeout(resolve, 5));
           txt += c;
           count++;
           if (count % 10 === 0) {
               conn.sendPresenceUpdate('composing' , m.chat);
           }
       }
           await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )
}
}
handler.help = ['clima *<ciudad/país>*']
handler.tags = ['herramientas']
handler.command = /^(prueba12|tiempo)$/i
export default handler
