import { Low as _0x2bb6, JSONFile as _0x2d74 } from 'lowdb';
const _0x2f67 = _0x180d;
(function (_0x3b5d30, _0x2f1957) {
    const _0x3b3e62 = _0x180d, _0x446c24 = _0x3b5d30();
    while (!![]) {
        try {
            const _0x8edffe = parseInt(_0x3b3e62(0x14e)) / 0x1 + parseInt(_0x3b3e62(0x14c)) / 0x2 * (parseInt(_0x3b3e62(0x14d)) / 0x3) + parseInt(_0x3b3e62(0x14f)) / 0x4 * (-parseInt(_0x3b3e62(0x150)) / 0x5) + -parseInt(_0x3b3e62(0x14b)) / 0x6 + parseInt(_0x3b3e62(0x152)) / 0x7 * (parseInt(_0x3b3e62(0x151)) / 0x8) + -parseInt(_0x3b3e62(0x148)) / 0x9 + -parseInt(_0x3b3e62(0x149)) / 0xa * (-parseInt(_0x3b3e62(0x14a)) / 0xb);
            if (_0x8edffe === _0x2f1957) break;
            else _0x446c24['push'](_0x446c24['shift']());
        } catch (_0x37d65d) {
            _0x446c24['push'](_0x446c24['shift']());
        }
    }
}(_0x45a7, 0x6c7ce));
const isNumber = _0x3e1b64 => {
        const _0x4b6f8c = _0x180d;
        return typeof _0x3e1b64 === _0x4b6f8c(0x153) && !isNaN(_0x3e1b64);
    },
    databaseFile = './countMessagesReg.json',
    adapter = new _0x2d74(databaseFile),
    db = new _0x2bb6(adapter);
let handler = async (_0x51442f, { conn: _0x5c91fa, text: _0x10458e, participants: _0x5c0215 }) => {
    const _0x37a426 = _0x180d;
    let _0x2027d7 = db[_0x37a426(0x154)]['bot'][_0x5c91fa['user']['jid']]['chats']['groups'][_0x51442f[_0x37a426(0x155)]], _0x2ba456 = '', _0x14cda2 = ![], _0x59ad3d = new Set(_0x5c0215['map'](_0x4a0ae5 => _0x4a0ae5['id'])), _0x2faada = _0x2027d7[_0x37a426(0x156)], _0x1bc83d = _0x5c0215['length'];
    for (let _0x1ff5cf of _0x5c0215) {
        let _0x52375c = _0x1ff5cf['id'];
        if (!(_0x52375c in _0x2faada)) db[_0x37a426(0x154)]['bot'][_0x5c91fa[_0x37a426(0x157)][_0x37a426(0x158)]][_0x37a426(0x159)][_0x51442f[_0x37a426(0x155)]][_0x37a426(0x156)][_0x52375c] = {
            'msgcount': {
                'count': 0x0,
                'time': 0x0
            }
        }, await db[_0x37a426(0x15a)](), console[_0x37a426(0x15b)](_0x37a426(0x15c) + _0x52375c + _0x37a426(0x15d));
        else (users[_0x52375c] && users[_0x52375c][_0x37a426(0x15e)] && users[_0x52375c][_0x37a426(0x15e)][_0x37a426(0x15f)] && users[_0x52375c][_0x37a426(0x15e)][_0x37a426(0x160)]) === undefined && (global['db']['data'][_0x37a426(0x161)][_0x5c91fa['user']['jid']]['chats'][_0x37a426(0x159)][_0x51442f['chat']]['users'][_0x52375c] = {
            'msgcount': {
                'count': 0x0,
                'time': 0x0
            }
        });
    }
    for (let _0x53f37f in _0x2faada) (!_0x59ad3d[_0x37a426(0x162)](_0x53f37f) || typeof _0x2faada[_0x53f37f] !== 'object' || _0x2faada[_0x53f37f] === null) && delete _0x2faada[_0x53f37f];
    let _0x1bbcf8 = [], _0x1f1957 = '';
    for (let _0x5a577e in _0x2faada) {
        let _0x7c4b60 = _0x2faada[_0x5a577e], _0x3c7165 = _0x5a577e[_0x37a426(0x163)]('@')[0x0];
        if (_0x7c4b60 && _0x7c4b60[_0x37a426(0x15e)] && _0x7c4b60[_0x37a426(0x15e)][_0x37a426(0x15f)] === 0x0) {
            _0x1bbcf8[_0x37a426(0x164)](_0x5a577e);
            let _0x16362a = _0x7c4b60[_0x37a426(0x15e)][_0x37a426(0x15f)];
            _0x1f1957 += '@' + _0x3c7165 + _0x37a426(0x165) + _0x16362a + ' mensajes\n';
        }
    }
    if (_0x1bbcf8[_0x37a426(0x166)] > 0x0) {
        const _0x4e0580 = new Date(users[_0x51442f[_0x37a426(0x167)]][_0x37a426(0x160)]), _0x5c34a8 = _0x4e0580[_0x37a426(0x168)](), _0x27727f = [
                'enero',
                'febrero',
                'marzo',
                'abril',
                'mayo',
                'junio',
                'julio',
                'agosto',
                'septiembre',
                'octubre',
                'noviembre',
                'diciembre'
            ], _0x41f6d1 = _0x27727f[_0x4e0580['getMonth']()], _0x1309ac = _0x4e0580[_0x37a426(0x169)](), _0x1662c5 = _0x5c34a8 + ' de ' + _0x41f6d1 + ' de ' + _0x1309ac;
        _0x2ba456 = '*[REVISIÓN\x20DE\x20INACTIVOS]*\n\n*Grupo:\x20' + await _0x5c91fa[_0x37a426(0x16a)](_0x51442f[_0x37a426(0x155)]) + '*\n*Participantes:\x20' + _0x1bc83d + '*\n\n*[👻\x20LISTA\x20DE\x20FANTASMAS\x20👻\x20]*\n' + _0x1f1957 + '\n\n*Nota:\x20Esto\x20es\x20100%\x20acertado\x20y\x20el\x20conteo\x20empezo\x20desde\x20' + _0x1662c5 + '*', _0x14cda2 = !![];
    } else _0x2ba456 = _0x37a426(0x16b), _0x14cda2 = ![];
    let _0x4d1325 = '', _0x11f78c = 0x0;
    for (const _0x13eaaa of _0x2ba456) await new Promise(_0x3d38cf => setTimeout(_0x3d38cf, 0x5)), _0x4d1325 += _0x13eaaa, _0x11f78c++, _0x11f78c % 0xa === 0x0 && await _0x5c91fa[_0x37a426(0x16c)]('composing', _0x51442f[_0x37a426(0x155)]);
    if (_0x14cda2) await _0x5c91fa[_0x37a426(0x16d)](_0x51442f[_0x37a426(0x155)], { 'text': _0x4d1325[_0x37a426(0x16e)](), 'mentions': _0x5c91fa[_0x37a426(0x16f)](_0x4d1325) }, { 'quoted': _0x51442f, 'ephemeralExpiration': 0x15180, 'disappearingMessagesInChat': 0x15180 });
    else return _0x5c91fa[_0x37a426(0x16d)](_0x51442f[_0x37a426(0x155)], { 'text': _0x4d1325[_0x37a426(0x16e)](), 'mentions': _0x5c91fa[_0x37a426(0x16f)](_0x4d1325) }, { 'quoted': _0x51442f, 'ephemeralExpiration': 0x15180, 'disappearingMessagesInChat': 0x15180 });
};
function _0x180d(_0x158181, _0x515453) {
    const _0x45a7ae = _0x45a7();
    return _0x180d = function (_0x180db8, _0x15b52f) {
        _0x180db8 = _0x180db8 - 0x148;
        let _0x1723ee = _0x45a7ae[_0x180db8];
        return _0x1723ee;
    }, _0x180d(_0x158181, _0x515453);
}
handler[_0x2f67(0x170)] = /^((ver)?fantasmas|sider|ghosts)$/i, handler[_0x2f67(0x171)] = !![], handler[_0x2f67(0x172)] = !![], export default handler;
function _0x45a7() {
    const _0x5766ff = [
        '93HtwCVr',
        '848232qJpHEm',
        '6bzuCTu',
        '46xIJDrA',
        '606379kRrxrD',
        '3316632AiaKMh',
        '5890638CwvDch',
        'write',
        'log',
        'Usuario\x20',
        '\x20inicializado\x20en\x20la\x20base\x20de\x20datos.',
        'count',
        'time',
        'bot',
        'has',
        'split',
        'push',
        'length',
        'sender',
        'getDate',
        'getFullYear',
        'getName',
        '*Este\x20grupo\x20no\x20tiene\x20fantasmas\x20:D.',
        'sendPresenceUpdate',
        'sendMessage',
        'trim',
        'parseMention',
        'command',
        'admin',
        'botAdmin',
        '2860352CGTxMI',
        '1GeSVtX',
        '10991097SvLpbJ',
        '2VvNllA',
        'number',
        'data',
        'chat',
        'users',
        'user',
        'jid',
        'chats',
        'groups'
    ];
    _0x45a7 = function () {
        return _0x5766ff;
    };
    return _0x45a7();
}
