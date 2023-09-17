const userSpamData = {}
let handler = m => m
handler.before = async function (m, { conn }) {
    let user = global.db.data.users[m.sender]
    const sender = m.sender
    const currentTime = new Date().getTime()
    const timeWindow = 4000  
    const messageLimit = 4  

    if (!(sender in userSpamData)) {
        userSpamData[sender] = {
            lastMessageTime: currentTime,
            messageCount: 1,
            antiBan: 0, 
        }
    } else {
        const userData = userSpamData[sender]
        const timeDifference = currentTime - userData.lastMessageTime

if (userData.antiBan === 1) {
conn.reply(m.chat, `@${sender.split("@")[0]} No puede hacer nada por 30 segundos`, m)
} else if (userData.antiBan === 2) {
conn.reply(m.chat, `@${sender.split("@")[0]} No puede hacer nada por 1 minuto`, m)
} else if (userData.antiBan === 3) {
conn.reply(m.chat, `@${sender.split("@")[0]} No puede hacer nada por 2 minutos`, m)
}

        if (timeDifference <= timeWindow) {
            userData.messageCount += 1

            if (userData.messageCount >= messageLimit) {
                const mention = `@${sender.split("@")[0]}`
                const warningMessage = `Baneado ${mention} por enviar spam.`
                conn.reply(m.chat, warningMessage, m)
                user.banned = true
                userData.antiBan++
                userData.messageCount = 1
                
                
                if (userData.antiBan === 1) {
                    setTimeout(() => {
                        if (userData.antiBan === 1) {
                            userData.antiBan = 0
                            user.banned = false
                        }
                    }, 30000) // 30 segundos
                } else if (userData.antiBan === 2) {
                    setTimeout(() => {
                        if (userData.antiBan === 2) {
                            userData.antiBan = 0
                            user.banned = false
                        }
                    }, 60000) // 1 minuto
                } else if (userData.antiBan === 3) {
                    setTimeout(() => {
                        if (userData.antiBan === 3) {
                            userData.antiBan = 0
                            user.banned = false
                        }
                    }, 120000) // 2 minutos
                }
            }
        } else {
            if (timeDifference >= 2000) {
                userData.messageCount = 1
            }
        }

        userData.lastMessageTime = currentTime
    }
}

export default handler
