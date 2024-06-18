import axios from 'axios';

let handler = async (m, { conn, text }) => {
await m.reply("Buscando...");
  if (!text) return conn.reply(m.chat, "Ingrese una dirección IP válida", m);

  axios.get(`http://ip-api.com/json/${text}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,hosting,query`).then ((res) => {
    
    let hasil = `
*IP CHECKER*

IP : ${res.data.query}
País : ${res.data.country}
Código de País : ${res.data.countryCode}
Provincia : ${res.data.regionName}
Código de Provincia : ${res.data.region}
Ciudad : ${res.data.city}
Distrito : ${res.data.district}
Código Postal : ${res.res.data.zip}
Coordenadas : ${res.data.lat}, ${data.lon}
Zona Horaria : ${res.data.timezone}
ISP : ${res.data.isp}
Organización : ${res.data.org}
AS : ${res.data.as}
Mobile : ${res.data.mobile ? "Si" : "No"}
Hosting : ${res.data.hosting ? "Si" : "No"}
`.trim();
conn.reply(m.chat, hasil, m)})
    
handler.help = ['ip', 'ipcheck', 'ipcek'].map(v => v + ' <alamat ip>')
handler.tags = ['tools']
handler.command = /^(ip|ipcheck|ipcek)$/i
handler.owner = true
export default handler