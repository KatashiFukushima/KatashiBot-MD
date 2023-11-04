let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `${lenguajeGB['smsAvisoMG']()} 𝙀𝙏𝙄𝙌𝙄𝙀𝙏𝙀 @𝙏𝘼𝙂 𝙊 𝙀𝙏𝙄𝙌𝙄𝙀𝙏𝙀 @𝙏𝘼𝙂 𝙊𝙍 𝙏𝙄𝙈𝘼 𝙉𝘼𝙈𝙀`

  if (command == 'ship') {
    // Aquí capturamos los valores de `text` y `text2` mencionados por el usuario
    const [textValue, text2Value] = text.split(' ');

    if (!text2Value) {
      // Si no se proporciona `text2`, simplemente repetimos `text`
      text2Value = textValue;
    }

    let juego = `*${textValue} tu oportunidad de enamorarte de ${text2Value} ES DE ${Math.floor(Math.random() * 101)}% Deberías pedirle que sea tu novia/o?*`.trim();
    await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {});
  }
}

handler.help = ['ship'].map(v => v + ' <text> <text2>')
handler.tags = ['calculator']
handler.command = ['ship']
handler.exp = 100
export default handler
