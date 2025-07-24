import axios from 'axios';

const handler = async (m, { conn }) => {
  try {
    const res = await axios.get('https://panel.skyultraplus.com/api/application/servers', {
      headers: {
        'Authorization': 'Bearer ptlc_AC9ttaVgCmwmDs8DhE9ejPy9ffa7eGunbyDERnqJTqU',
        'Accept': 'application/json'
      },
      timeout: 5000
    });
    await conn.reply(m.chat, `✅ API respondió con ${res.data.data.length} servidores`, m);
  } catch (error) {
    await conn.reply(m.chat, `❌ Error: ${error.message}`, m);
  }
};

handler.command = /^testptero$/i;
export default handler;