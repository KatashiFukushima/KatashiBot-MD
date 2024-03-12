/*let handler = async (m, {
    conn, usedPrefix, participants
  }) => {
    conn.level = global.db.data.users[m.sender]
    conn.fight = conn.fight ? conn.fight : {}
    const delay = time => new Promise(res => setTimeout(res, time));
    const money = Math.floor(Math.random() * 10000)
    const exp = Math.floor(Math.random() * 10000)
  
    if (typeof conn.fight[m.sender] != "undefined" && conn.fight[m.sender] == true) return m.reply(`No puedes pelear de nuevo porque ya estás en una pelea.`)
  
    let peleando = "https://i.ibb.co/9nNfz7m/OIG1.jpg"
  
    let users = participants.map(u => u.id)
    var oponente
    oponente = users[Math.floor(users.length * Math.random())]
    while (typeof global.db.data.users[oponente] == "undefined" || oponente == m.sender) {
        oponente = users[Math.floor(users.length * Math.random())]
    }
  
    let duracionPelea = getRandom(1, 2)
    let msg = `*Tú* (nivel ${global.db.data.users[m.sender].level}) desafías a *${conn.getName(oponente)}* (nivel ${global.db.data.users[oponente].level}) y están en medio de una pelea intensa.\n\nEspera ${duracionPelea} minutos más y veremos quién gana.`
    conn.sendMessage(m.chat, { image: { url: peleando }, caption: msg }, { quoted: m })
  
    conn.fight[m.sender] = true
  
    await delay(1000 * 60 * duracionPelea)
  
    let razonesPerder = ['Novato',
        'Débil',
        'Gay',                  
        'Menos habilidoso',
        'Perdiste por ser débil',
        'Derrota humillante'
    ]
    let razonesGanar = ['Fuerte',
        'Pro',
        'Maestro del juego',
        'Leyenda del juego',
        'Extremadamente Pro',
        'Peleador dedicado'
    ]
  
    let oportunidades = []
    for (let i = 0; i < global.db.data.users[m.sender].level; i++) oportunidades.push(m.sender)
    for (let i = 0; i < global.db.data.users[oponente].level; i++) oportunidades.push(oponente)
  
    let puntosJugador = 0
    let puntosOponente = 0
    for (let i = 0; i < 10; i++) {
        let ventaja = getRandom(0, oportunidades.length - 1)
        if (oportunidades[ventaja] == m.sender) puntosJugador += 1
        else puntosOponente += 1
    }
  
    if (puntosJugador > puntosOponente) {
        let premio = (puntosJugador - puntosOponente) * 10000
        global.db.data.users[m.sender].money += money
        global.db.data.users[m.sender].exp += exp
        let msg1 = `*${conn.getName(m.sender)}* [${puntosJugador * 10}] - [${puntosOponente * 10}] *${conn.getName(oponente)}*\n\n*Tú* (nivel ${global.db.data.users[m.sender].level}) GANASTE contra *${conn.getName(oponente)}* (nivel ${global.db.data.users[oponente].level}) porque eres ${razonesGanar[getRandom(0, razonesGanar.length - 1)]}\n\nPremio: ${money.toLocaleString()} Katacoins`
        conn.sendMessage(m.chat, { image: { url: peleando }, caption: msg1 }, { quoted: m })
    } else if (puntosJugador < puntosOponente) {
        let multa = (puntosOponente - puntosJugador) * 100000
        global.db.data.users[m.sender].money -= money
        global.db.data.users[m.sender].exp -= exp
        let msg2 = `*${conn.getName(m.sender)}* [${puntosJugador * 10}] - [${puntosOponente * 10}] *${conn.getName(oponente)}*\n\n*Tú* (nivel ${global.db.data.users[m.sender].level}) PERDISTE contra *${conn.getName(oponente)}* (nivel ${global.db.data.users[oponente].level}) porque eres ${razonesPerder[getRandom(0, razonesPerder.length - 1)]}\n\nTu *`Experiencia`* disminuyó en ${exp.toLocaleString()}`
        conn.sendMessage(m.chat, { image: { url: peleando }, caption: msg2 }, { quoted: m })
    } else {
        let msg3 = `*${conn.getName(m.sender)}* [${puntosJugador * 10}] - [${puntosOponente * 10}] *${conn.getName(oponente)}*\n\nLa pelea terminó en empate, ¡no recibes nada! 😂`
        conn.sendMessage(m.chat, { image: { url: peleando }, caption: msg3 }, { quoted: m })
    }
  
    delete conn.fight[m.sender]
  }
  handler.help = ['pelear']
  handler.tags = ['game']
  handler.command = ['pelea', 'pelear']
  
  export default handler;
  
  function getRandom(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  */
