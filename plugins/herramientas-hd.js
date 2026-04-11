import crypto from 'crypto'
import fileTypePkg from 'file-type'
import { promises as fsp } from 'fs'
import os from 'os'
import path from 'path'
import fetch from 'node-fetch'
import sharp from 'sharp'

const { fileTypeFromBuffer } = fileTypePkg

async function safeFileType(buf) {
  try { return await fileTypeFromBuffer(buf) } catch { return null }
}

async function safeJson(res) {
  const t = await res.text().catch(() => '')
  try { return JSON.parse(t) } catch { return { raw: t } }
}

function extFromMime(mime) {
  if (/png/i.test(mime)) return 'png'
  if (/webp/i.test(mime)) return 'webp'
  return 'jpg'
}

/**
 * Convierte un buffer (ej. webp) a PNG usando Sharp.
 */
async function convertToPng(buffer) {
  return await sharp(buffer)
    .png()
    .toBuffer()
}

/**
 * Lógica principal para VectorInk Image Enhance.
 * @param {Buffer} imgBuffer 
 * @returns {Promise<Buffer|null>}
 */
async function vectorinkEnhance(imgBuffer) {
  const ft = await safeFileType(imgBuffer)
  const mime = ft?.mime || 'image/jpeg'
  const base64 = `data:${mime};base64,${imgBuffer.toString('base64')}`

  const res = await fetch('https://vectorink.io/api/v1/image-enhance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64 })
  })

  if (!res.ok) {
    const err = await safeJson(res)
    throw new Error(`VectorInk Error: ${res.status} ${JSON.stringify(err)}`)
  }

  const json = await safeJson(res)
  if (!json.image) throw new Error('VectorInk Error: No image in response')

  const base64Data = json.image.split(';base64,').pop()
  return Buffer.from(base64Data, 'base64')
}

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    
    if (!/image/g.test(mime)) {
      throw `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇* ⊱❗️⊱╮\n\n𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 *${usedPrefix + command}*`
    }

    m.reply('*🐈 𝙈𝙀𝙅𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝘼 𝘾𝘼𝙇𝙄𝘿𝘼𝘿...*')

    let img = await q.download?.()
    if (!img) throw 'Error al descargar la imagen.'

    // Paso 1: Mejorar imagen con VectorInk
    let enhancedBuffer = await vectorinkEnhance(img)
    
    // Paso 2: Verificar formato y convertir si es necesario
    // VectorInk a veces devuelve webp, WhatsApp prefiere jpeg/png para mensajes de imagen
    const ft = await safeFileType(enhancedBuffer)
    if (ft?.ext === 'webp') {
      enhancedBuffer = await convertToPng(enhancedBuffer)
    }

    await conn.sendMessage(m.chat, { image: enhancedBuffer }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply(`╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼* ⊱⚠️⊱╮\n\n𝙊𝘾𝙐𝙍𝙍𝙄𝙊́ 𝙐𝙉 𝙀𝙍𝙍𝙊𝙍:\n\n${e.message || e}`)
  }
}

handler.help = ['hd', 'remini', 'enhance']
handler.tags = ['ai', 'tools']
handler.command = ['hd', 'remini', 'enhance']

export default handler
