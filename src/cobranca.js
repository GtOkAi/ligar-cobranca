'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cobranca;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _superagentPromise = require('superagent-promise');

var _superagentPromise2 = _interopRequireDefault(_superagentPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = (0, _superagentPromise2.default)(_superagent2.default, _bluebird2.default);
var route = function route(path) {
    return 'https://api.totalvoice.com.br' + path;
};

var cobrancaInText = 'PODERÁ SER PROTOCOLADO A PETIÇÃO EXTRA JUDICIAL REFERENTE AO NÃO CUMPRIMENTO DO SEU COMPROMISSO.';

var sms = function sms(to, token) {
    return request.post(route('/sms')).set('Access-Token', token).set('Accept', 'application/json').send({ numero_destino: to, mensagem: cobrancaInText });
};

var call = function call(from, to, token, tipo,texto,voz,velocidade,mp3) {
        let stringTipo = "alo";
        if(tipo == 0) { stringTipo = Math.floor((Math.random()*6) + 1); }
        if(tipo > 0) { stringTipo= tipo}
        let definirVoz = 'br-Ricardo';
        let velocidadeVoz = 1;
        console.log("teste:");
        console.log(texto);
        console.log(from);
        console.log(voz);
        console.log(velocidade);
        console.log(mp3);

        if(voz == 1) { definirVoz = 'br-Vitoria'}
        if(voz == 2) { definirVoz = 'en-Joey'}
        if(voz == 3) { definirVoz = 'rus-Maxim'}
        if(velocidade != undefined) {
        velocidadeVoz = velocidade.toString();
        }
        let somFinal = 'http://8balls.com.br/sejavip2/'+stringTipo+'.mp3';
        if(mp3 != undefined) {
            somFinal = mp3;
        }
        let dados = {
                url_audio: somFinal
            };
            let tipoAcao = 'audio';
        if(texto != undefined) {
                tipoAcao = 'tts';
            dados = {
                "mensagem": texto,
                "velocidade": velocidadeVoz,
                "tipo_voz": definirVoz
            }
        }
        console.log(tipoAcao);
        console.log(somFinal);
    return request.post(route('/composto')).set('Access-Token', token).set('Accept', 'application/json').send({
        numero_destino: to,
        dados: [{
            acao: tipoAcao,
            acao_dados: dados
        }],
        bina: from
    });

};

function cobranca(args) {
    if (!/^[a-f0-9]{32}$/.test(args.token)) {
        return (0, _bluebird.reject)(new Error('Token inválido. Obtenha um em https://totalvoice.com.br'));
    }

    if (!/^[0-9]{10,11}$/.test(args.para)) {
        return (0, _bluebird.reject)(new Error('Número de telefone inválido'));
    }

    var action = args.sms ? sms(args.para, args.token) : call(args.de, args.para, args.token, args.tipo,args.texto,args.voz,args.velocidade,args.mp3);

    return action.catch(function (err) {
        if (err.status === 405 || err.status === 403) {
            return (0, _bluebird.reject)(new Error((err.body || err.response.body).mensagem));
        }

        return (0, _bluebird.reject)(err);
    });
}