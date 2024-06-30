/**
 * Plugin desarrollado por el proyecto del bot ANI MX SCANS de ReyEndymion
 * https://github.com/ReyEndymion
 */

import { Low as _0x239e, JSONFile as _0x247a } from 'lowdb';
const isNumber = _0x1c90 => typeof _0x1c90 === 'number' && !isNaN(_0x1c90),
    databaseFile = './countMessagesReg.json',
    adapter = new _0x247a(databaseFile),
    db = new _0x239e(adapter);
let handler = async (_0x4c69e2, { conn: _0x12f0ab, text: _0x1792df, participants: _0x482d92, args: _0x2c22b4, command: _0x177a2f }) => {
    let _0x4e607f = db.data.bot[_0x12f0ab.user.jid].chats.groups[_0x4c69e2.chat],
        _0x16f4db = '',
        _0x3a254b = false,
        _0x238c9f = new Set(_0x482d92.map(_0x37f05e => _0x37f05e.id)),
        _0x13c535 = _0x4e607f.users,
        _0x23c798 = _0x482d92.length,
        _0x1781e8 = _0x482d92.filter(_0x4b67b4 => _0x4b67b4.admin === 'admin' || _0x4b67b4.admin === 'superadmin').map(_0x49a401 => _0x49a401.id),
        _0x2f1b59 = _0x12f0ab.user.jid,
        _0x1f6ad0 = (await _0x12f0ab.groupMetadata(_0x4c69e2.chat)).owner;
    for (let _0x2277a7 of _0x482d92) {
        let _0x34cb05 = _0x2277a7.id;
        if (!(_0x34cb05 in _0x13c535)) db.data.bot[_0x12f0ab.user.jid].chats.groups[_0x4c69e2.chat].users[_0x34cb05] = { msgcount: { count: 0, time: 0 } }, await db.write(), console.log(`Usuario ${_0x34cb05} inicializado en la base de datos.`);
        else if ((_0x13c535[_0x34cb05] && _0x13c535[_0x34cb05].msgcount && _0x13c535[_0x34cb05].msgcount.count && _0x13c535[_0x34cb05].msgcount.time) === undefined) db.data.bot[_0x12f0ab.user.jid].chats.groups[_0x4c69e2.chat].users[_0x34cb05] = { msgcount: { count: 0, time: 0 } };
    }
    for (let _0x397284 in _0x13c535) (!_0x238c9f.has(_0x397284) || typeof _0x13c535[_0x397284] !== 'object' || _0x13c535[_0x397284] === null) && delete _0x13c535[_0x397284];
    let _0x5712b5 = [],
        _0x4225d4 = '';
    for (let _0x5c2ae7 in _0x13c535) {
        let _0x3a8c29 = _0x13c535[_0x5c2ae7],
            _0x540101 = _0x5c2ae7.split('@')[0];
        if (_0x3a8c29 && _0x3a8c29.msgcount && _0x3a8c29.msgcount.count === 0 && _0x5c2ae7 !== _0x2f1b59 && _0x5c2ae7 !== _0x1f6ad0) {
            if (_0x2c22b4[0] === 'todos' || !_0x1781e8.includes(_0x5c2ae7)) {
                _0x5712b5.push(_0x5c2ae7);
                let _0x4db9f3 = _0x3a8c29.msgcount.count;
                _0x4225d4 += `@${_0x540101} con ${_0x4db9f3} mensajes\n`;
            } else {
                _0x5712b5.push(_0x5c2ae7);
            }
        }
    }
    if (_0x5712b5.length > 0) {
        const _0x5a3a8e = new Date(_0x13c535[_0x4c69e2.sender].msgcount.time),
            _0x1b6bfb = _0x5a3a8e.getDate(),
            _0x2d5717 = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            _0x162429 = _0x2d5717[_0x5a3a8e.getMonth()],
            _0x451cb4 = _0x5a3a8e.getFullYear(),
            _0x2034c3 = `${_0x1b6bfb} de ${_0x162429} de ${_0x451cb4}`;
        _0x16f4db = `*[ELIMINACION DE INACTIVOS]*\n\n*Grupo: ${await _0x12f0ab.getName(_0x4c69e2.chat)}*\n*Participantes: ${_0x23c798}*\n\n*[ 👻 FANTASMAS QUE MORIRAN 👻 ]*\n${_0x4225d4}\n\n*Nota: Esto es 100% acertado y el conteo empezo desde ${_0x2034c3}, el Bot eliminara la lista mencionada, empezando en 20 segundos y cada 10 segundos eliminara un numero*`, _0x3a254b = true;
    } else _0x16f4db = `*Este grupo no tiene fantasmas :D.*`, _0x3a254b = false;
    let _0x34cf09 = '',
        _0x5d4ab0 = 0;
    for (const _0x2a58af of _0x16f4db) await new Promise(_0x48bb6b => setTimeout(_0x48bb6b, 5)), _0x34cf09 += _0x2a58af, _0x5d4ab0++, _0x5d4ab0 % 10 === 0 && _0x12f0ab.sendPresenceUpdate('composing', _0x4c69e2.chat);
    if (_0x3a254b) {
        await _0x12f0ab.sendMessage(_0x4c69e2.chat, { text: _0x34cf09.trim(), mentions: _0x12f0ab.parseMention(_0x34cf09) }, { quoted: _0x4c69e2, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
        _0x4e607f.welcome = false;
        await delay(20000);
        _0x34cf09 = '';
        for (let _0x2f10d6 of _0x5712b5) console.log('KickMentionedANI: ', _0x2f10d6, _0x12f0ab.user.jid, _0x2f10d6.includes(_0x12f0ab.user.jid)), await _0x12f0ab.groupParticipantsUpdate(_0x4c69e2.chat, [_0x2f10d6], 'remove'), delete _0x13c535[_0x2f10d6], await delay(10000);
        _0x4e607f.welcome = true;
        _0x34cf09 = `La eliminacion fue exitosa`;
        return _0x12f0ab.sendMessage(_0x4c69e2.chat, { text: _0x34cf09.trim(), mentions: _0x12f0ab.parseMention(_0x34cf09) }, { quoted: _0x4c69e2, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
    } else return _0x12f0ab.sendMessage(_0x4c69e2.chat, { text: _0x34cf09.trim(), mentions: _0x12f0ab.parseMention(_0x34cf09) }, { quoted: _0x4c69e2, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
};
handler.command = /^(kick|sacar)fantasmas$/i, handler.admin = true, handler.botAdmin = true;
export default handler;
const delay = _0x1db99a => new Promise(_0x46a216 => setTimeout(_0x46a216, _0x1db99a));

//desarrollado por https://github.com/ReyEndymion
//antiguamente participa en desactivacion de despedida en el anterior plugin y este lo hereda https://github.com/BrunoSobrino/
