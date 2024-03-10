import fetch from 'node-fetch'
import fs from 'fs'

function generarCodigo() {
const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const numeros = '0123456789'
const caracteresEspeciales = '#@%_*!^<'
let codigo = ''
for (let i = 0; i < 3; i++) {
codigo += letras.charAt(Math.floor(Math.random() * letras.length))
}
for (let i = 0; i < 2; i++) {
codigo += numeros.charAt(Math.floor(Math.random() * numeros.length))
}
for (let i = 0; i < 1; i++) {
codigo += caracteresEspeciales.charAt(Math.floor(Math.random() * caracteresEspeciales.length))
}
codigo = codigo.split('').sort(() => Math.random() - 0.5).join('');
return codigo
}
handler.command = /^rcode$/i
export default handler
