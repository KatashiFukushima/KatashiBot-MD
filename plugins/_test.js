import axios from 'axios';

let handler = async (m, { conn, text }) => {
  await m.reply("Buscando...");
  if (!text) return conn.reply(m.chat, "Masukan Alamat IP yang akan dicek", m);

  try {
    const response = await axios.get(`http://ip-api.com/json/${text}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,mobile,hosting,query`);
    const data = response.data;

    // Manejo de errores de la API (status != "success")
    if (data.status !== "success") {
      throw new Error(data.message || "Error en la solicitud a la API");
    }

    let hasil = `
*IP CHECKER*

IP : ${data.query}
Negara : ${data.country}
Kode Negara : ${data.countryCode}
Provinsi : ${data.regionName}
Kode Provinsi : ${data.region}
Kota : ${data.city}
Kode Pos : ${data.zip}
Kordinat : ${data.lat}, ${data.lon}
Zona Waktu : ${data.timezone}
ISP : ${data.isp}
Organización : ${data.org}
AS : ${data.as}
Mobile : ${data.mobile ? "Si" : "No"}
Hosting : ${data.hosting ? "Si" : "No"}
`.trim();

    conn.reply(m.chat, hasil, m);
  } catch (error) {
    conn.reply(m.chat, `Error al obtener información de la IP: ${error.message}`, m);
    console.error(error);
  }
};
handler.help = ['ip', 'ipcheck', 'ipcek'].map(v => v + ' <alamat ip>')
handler.tags = ['tools']
handler.command = /^(ip|ipcheck|ipcek)$/i
handler.owner = false
export default handler
