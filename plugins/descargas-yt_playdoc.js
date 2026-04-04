import fetch from 'node-fetch'

const handler = async (m, { conn, command, args, usedPrefix }) => {
	if (!args || !args[0]) {
		return conn.reply(
			m.chat,
			`${lenguajeGB['smsAvisoMG']()}${mid.smsMalused7}\n*${usedPrefix + command} Billie Eilish - Bellyache*`,
			fkontak,
			m,
		)
	}

	const queryOrUrl = args.join(' ').trim()
	const mode = getMode(command)
	const modeText = mode === 'audio' ? 'AUDIO' : 'VIDEO'

	await conn.reply(
		m.chat,
		`${lenguajeGB['smsAvisoEG']()}PRONTO TENDRA SU DOCUMENTO ${modeText}, ESPERE POR FAVOR`,
		fkontak,
		m,
	)

	try {
		const youtubeUrl = await resolveYoutubeUrl(queryOrUrl)
		const result =
			mode === 'audio'
				? await getDeliriusAudio(youtubeUrl)
				: await getDeliriusVideo(youtubeUrl)

		const title = sanitizeFileName(result.title || (mode === 'audio' ? 'audio' : 'video'))
		const ext = mode === 'audio' ? 'mp3' : 'mp4'
		const mime = mode === 'audio' ? 'audio/mpeg' : 'video/mp4'

		await conn.sendMessage(
			m.chat,
			{
				document: { url: result.download },
				fileName: `${title}.${ext}`,
				mimetype: mime,
				caption: `╭━❰  ${wm}  ❱━⬣\n┃📥 YOUTUBE DL 📥\n┃ও *${mid.smsYT1}:* \n┃» ${title}\n╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣`,
			},
			{ quoted: m },
		)

		handler.limit = mode === 'audio' ? 1 : 2
	} catch (e) {
		await conn.reply(
			m.chat,
			`${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`,
			fkontak,
			m,
		)
		console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
		console.log(e)
		handler.limit = 0
	}
}

handler.help = ['ytmp4doc', 'ytmp3doc'].map((v) => v + ' <busqueda|url>')
handler.tags = ['downloader']
handler.command = /^(ytmp4doc|ytmp3doc|playaudiodoc|playdoc|playdoc2|playvideodoc)$/i
handler.register = true

export default handler

function getMode(command = '') {
	const cmd = command.toLowerCase()
	if (['playvideodoc', 'ytmp4doc', 'playdoc2'].includes(cmd)) return 'video'
	return 'audio'
}

function isYouTubeUrl(text = '') {
	return /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\//i.test(text)
}

async function resolveYoutubeUrl(queryOrUrl) {
	if (isYouTubeUrl(queryOrUrl)) return queryOrUrl

	const endpoint = `https://api.delirius.store/search/ytsearch?q=${encodeURIComponent(queryOrUrl)}`
	const res = await fetch(endpoint)
	if (!res.ok) throw new Error(`Delirius ytsearch HTTP ${res.status}`)

	const json = await res.json()
	if (!json?.status || !Array.isArray(json?.data)) {
		throw new Error('Respuesta invalida de Delirius ytsearch')
	}

	const firstVideo = json.data.find((item) => item?.type === 'video' && item?.url)
	if (!firstVideo?.url) throw new Error('Sin resultados de video en Delirius ytsearch')

	return firstVideo.url
}

async function getDeliriusAudio(url) {
	const endpoint = `https://api.delirius.store/download/ytmp3?url=${encodeURIComponent(url)}`
	const res = await fetch(endpoint)
	if (!res.ok) throw new Error(`Delirius ytmp3 HTTP ${res.status}`)

	const json = await res.json()
	if (!json?.status || !json?.data?.download) {
		throw new Error('Respuesta invalida de Delirius ytmp3')
	}

	return {
		title: json.data.title || 'audio',
		download: json.data.download,
	}
}

async function getDeliriusVideo(url) {
	const endpoint = `https://api.delirius.store/download/ytmp4?url=${encodeURIComponent(url)}&format=360`
	const res = await fetch(endpoint)
	if (!res.ok) throw new Error(`Delirius ytmp4 HTTP ${res.status}`)

	const json = await res.json()
	if (!json?.status || !json?.data?.download) {
		throw new Error('Respuesta invalida de Delirius ytmp4')
	}

	return {
		title: json.data.title || 'video',
		download: json.data.download,
	}
}

function sanitizeFileName(name = '') {
	return String(name)
		.replace(/[\\/:*?"<>|]/g, '')
		.replace(/\s+/g, ' ')
		.trim()
		.slice(0, 120)
}
