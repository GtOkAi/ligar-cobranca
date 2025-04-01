'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var axios = require('axios');
var fs = require('fs');
var path = require('path');
require('dotenv').config();
var ZENVIA_TOKEN = process.env.ZENVIA_TOKEN;
var ZENVIA_PHONE_NUMBER = process.env.ZENVIA_PHONE_NUMBER;

// Função para log condicional baseado no modo debug
var debugLog = function debugLog(message) {
  var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (debug) {
    console.log(message);
  }
};

// Função para salvar token no arquivo .env
var salvarToken = function salvarToken(token) {
  var envPath = path.join(process.cwd(), '.env');
  var envContent = '';

  // Verifica se o arquivo .env existe
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Remove espaços em branco e quebras de linha extras
  envContent = envContent.trim();

  // Atualiza ou adiciona o token
  if (envContent.includes('ZENVIA_TOKEN=')) {
    envContent = envContent.replace(/ZENVIA_TOKEN=.*/, "ZENVIA_TOKEN=".concat(token));
  } else {
    envContent += "\nZENVIA_TOKEN=".concat(token);
  }

  // Garante que o arquivo termine com uma quebra de linha
  if (!envContent.endsWith('\n')) {
    envContent += '\n';
  }

  // Salva o arquivo
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Token salvo com sucesso no arquivo .env');
  console.log('🔍 Token atual:', token);
};

// Função para formatar número brasileiro
var formatarNumero = function formatarNumero(numero) {
  // Remove todos os caracteres não numéricos
  numero = numero.replace(/\D/g, '');

  // Se o número começa com 0, remove o 0
  if (numero.startsWith('0')) {
    numero = numero.substring(1);
  }

  // Se o número não começa com 55 e tem 10 ou 11 dígitos (DDD + número), adiciona 55
  if (!numero.startsWith('55') && (numero.length === 10 || numero.length === 11)) {
    numero = '55' + numero;
  }

  // Adiciona o + no início
  return '+' + numero;
};
var call = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(token, para, texto, voz, velocidade, de, gravar) {
    var debug,
      voiceMap,
      speedMap,
      _response$data$dados,
      _response$data$dados2,
      response,
      _error$response,
      _error$response2,
      _error$response3,
      _error$response4,
      _error$response5,
      _error$response6,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          debug = _args.length > 7 && _args[7] !== undefined ? _args[7] : false;
          voiceMap = {
            0: 'br-Ricardo',
            1: 'br-Vitoria',
            2: 'en-Joey',
            3: 'rus-Maxim'
          };
          speedMap = {
            1: 0.5,
            // Muito lento
            2: 0.75,
            // Lento
            3: 1,
            // Normal
            4: 1.5,
            // Rápido
            5: 2 // Muito rápido
          };
          _context.prev = 3;
          debugLog('\n🔍 Iniciando chamada:', debug);
          debugLog('   - Para: ' + para, debug);
          debugLog('   - De: ' + de, debug);
          debugLog('   - Voz: ' + voiceMap[voz], debug);
          debugLog('   - Velocidade: ' + speedMap[velocidade], debug);
          debugLog('   - Gravar: ' + (gravar ? 'Sim' : 'Não'), debug);
          debugLog('   - Mensagem: ' + texto, debug);
          _context.next = 13;
          return axios.post('https://voice-api.zenvia.com/tts', {
            numero_destino: para,
            mensagem: texto,
            resposta_usuario: false,
            tipo_voz: voiceMap[voz],
            bina: de,
            gravar_audio: gravar,
            detecta_caixa: false,
            bina_inteligente: true,
            velocidade: speedMap[velocidade] || 1
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Token': token
            }
          });
        case 13:
          response = _context.sent;
          debugLog('✅ Chamada iniciada com sucesso!', debug);
          debugLog('   - ID: ' + ((_response$data$dados = response.data.dados) === null || _response$data$dados === void 0 ? void 0 : _response$data$dados.id), debug);
          debugLog('   - Status: ' + response.data.status, debug);
          debugLog('   - Mensagem: ' + response.data.mensagem, debug);
          return _context.abrupt("return", {
            success: true,
            messageId: (_response$data$dados2 = response.data.dados) === null || _response$data$dados2 === void 0 ? void 0 : _response$data$dados2.id,
            status: response.data.status,
            message: response.data.mensagem,
            number: para
          });
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](3);
          debugLog('❌ Erro na chamada:', debug);
          debugLog('   - Número: ' + para, debug);
          debugLog('   - Status: ' + ((_error$response = _context.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.status), debug);
          debugLog('   - Mensagem: ' + (((_error$response2 = _context.t0.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.mensagem) || _context.t0.message), debug);
          if ((_error$response3 = _context.t0.response) !== null && _error$response3 !== void 0 && _error$response3.data) {
            debugLog('   - Detalhes: ' + JSON.stringify(_context.t0.response.data, null, 2), debug);
          }
          return _context.abrupt("return", {
            success: false,
            error: ((_error$response4 = _context.t0.response) === null || _error$response4 === void 0 || (_error$response4 = _error$response4.data) === null || _error$response4 === void 0 ? void 0 : _error$response4.mensagem) || _context.t0.message,
            number: para,
            status: (_error$response5 = _context.t0.response) === null || _error$response5 === void 0 ? void 0 : _error$response5.status,
            details: (_error$response6 = _context.t0.response) === null || _error$response6 === void 0 ? void 0 : _error$response6.data
          });
        case 29:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 21]]);
  }));
  return function call(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();
function makeMultipleCalls(_x8) {
  return _makeMultipleCalls.apply(this, arguments);
}
function _makeMultipleCalls() {
  _makeMultipleCalls = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(args) {
    var results, totalCalls, currentCall, i, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          results = [];
          totalCalls = args.quantidade;
          currentCall = 0; // Faz as chamadas em sequência para o mesmo número
          i = 0;
        case 4:
          if (!(i < args.quantidade)) {
            _context4.next = 24;
            break;
          }
          _context4.prev = 5;
          _context4.next = 8;
          return call(args.token || ZENVIA_TOKEN, args.para, args.texto, args.voz, args.velocidade, args.de, args.gravar, args.debug);
        case 8:
          result = _context4.sent;
          results.push(result);
          currentCall++;
          if (args.onProgress) {
            args.onProgress(currentCall);
          }
          _context4.next = 19;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](5);
          results.push({
            success: false,
            number: args.para,
            error: _context4.t0.message
          });
          currentCall++;
          if (args.onProgress) {
            args.onProgress(currentCall);
          }
        case 19:
          _context4.next = 21;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 1000);
          });
        case 21:
          i++;
          _context4.next = 4;
          break;
        case 24:
          return _context4.abrupt("return", results);
        case 25:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 14]]);
  }));
  return _makeMultipleCalls.apply(this, arguments);
}
var makeCall = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(args) {
    var token, response, _error$response7;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Usa o token fornecido ou o do .env
          token = args.token || process.env.ZENVIA_TOKEN;
          if (token) {
            _context2.next = 4;
            break;
          }
          throw new Error('Token não encontrado. Configure ZENVIA_TOKEN no arquivo .env ou forneça um token via linha de comando');
        case 4:
          _context2.next = 6;
          return axios.post('https://voice-api.zenvia.com/tts', {
            numero_destino: args.para,
            mensagem: args.texto,
            resposta_usuario: false,
            tipo_voz: args.voz === 0 ? 'br-Ricardo' : args.voz === 1 ? 'br-Vitoria' : args.voz === 2 ? 'en-Joey' : 'rus-Maxim',
            bina: args.de,
            gravar_audio: args.gravar,
            bina_inteligente: true,
            velocidade: args.velocidade === 1 ? 0.5 : args.velocidade === 2 ? 0.75 : args.velocidade === 3 ? 1 : args.velocidade === 4 ? 1.5 : 2
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Token': token
            }
          });
        case 6:
          response = _context2.sent;
          return _context2.abrupt("return", {
            success: true,
            number: args.para,
            response: response.data
          });
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          throw new Error(((_error$response7 = _context2.t0.response) === null || _error$response7 === void 0 || (_error$response7 = _error$response7.data) === null || _error$response7 === void 0 ? void 0 : _error$response7.mensagem) || _context2.t0.message);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function makeCall(_x9) {
    return _ref2.apply(this, arguments);
  };
}();
var cobranca = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(args) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (args.debug) {
            console.log('Debug: Argumentos recebidos:', args);
          }

          // Se um token foi fornecido, salva no .env
          if (!args.token) {
            _context3.next = 6;
            break;
          }
          if (/^[a-zA-Z0-9]{32}$/.test(args.token)) {
            _context3.next = 5;
            break;
          }
          throw new Error('Token inválido. O token da Zenvia deve ter 32 caracteres alfanuméricos.');
        case 5:
          salvarToken(args.token);
        case 6:
          _context3.next = 8;
          return makeMultipleCalls(args);
        case 8:
          return _context3.abrupt("return", _context3.sent);
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          throw new Error(_context3.t0.message);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function cobranca(_x10) {
    return _ref3.apply(this, arguments);
  };
}();
module.exports = cobranca;