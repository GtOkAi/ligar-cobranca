'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var axios = require('axios');
var fs = require('fs');
var path = require('path');
require('dotenv').config();
var ZenviaProvider = require('./providers/ZenviaProvider');
var TwilioProvider = require('./providers/TwilioProvider');
var ZENVIA_TOKEN = process.env.ZENVIA_TOKEN;
var ZENVIA_PHONE_NUMBER = process.env.ZENVIA_PHONE_NUMBER;

// Twilio Config
var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
var TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_FROM;

// Função para log condicional baseado no modo debug
var _debugLog = function debugLog(message) {
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
  if (!numero) return numero;
  var original = numero.toString().trim();

  // Remove todos os caracteres não numéricos
  var limpo = original.replace(/\D/g, '');

  // Se o número começa com 0, remove o 0
  if (limpo.startsWith('0')) {
    limpo = limpo.substring(1);
  }

  // Se o input original não tinha + e tem 10 ou 11 dígitos, assumimos que é BR e adicionamos 55
  // Se já tinha +, respeitamos o código do país fornecido
  if (!original.startsWith('+') && (limpo.length === 10 || limpo.length === 11)) {
    limpo = '55' + limpo;
  }

  // Adiciona o + no início
  return '+' + limpo;
};
var getProvider = function getProvider(args) {
  // Se o usuário explicitou o provider
  if (args.provider === 'twilio') {
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      throw new Error('Credenciais da Twilio não encontradas (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN).');
    }
    return new TwilioProvider(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  }
  if (args.provider === 'zenvia') {
    var _token = args.token || ZENVIA_TOKEN;
    if (!_token) throw new Error('Token Zenvia não encontrado.');
    return new ZenviaProvider(_token);
  }

  // Detecção automática
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && !ZENVIA_TOKEN && !args.token) {
    return new TwilioProvider(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  }

  // Default para Zenvia (para manter compatibilidade e wizard)
  var token = args.token || ZENVIA_TOKEN;
  if (!token && !TWILIO_ACCOUNT_SID) {
    // Se não tem nada configurado, provavelmente está rodando pela primeira vez ou wizard.
    // Vamos assumir Zenvia pois o wizard pede token Zenvia.
    return null; // Retorna null para indicar que falta configuração
  }

  // Se tiver token Zenvia ou foi passado via args
  return new ZenviaProvider(token || ZENVIA_TOKEN);
};
function makeMultipleCalls(_x) {
  return _makeMultipleCalls.apply(this, arguments);
}
function _makeMultipleCalls() {
  _makeMultipleCalls = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(args) {
    var results, currentCall, alvos, alvosUnicos, provider, _iterator, _step, numero, numeroDestino, i, fromNumber, numeroOrigem, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          results = [];
          currentCall = 0; // Determina a lista de números alvo
          alvos = args.numeros && args.numeros.length > 0 ? args.numeros : [args.para]; // Remove duplicatas e valores vazios
          alvosUnicos = _toConsumableArray(new Set(alvos)).filter(function (n) {
            return n;
          });
          if (!(alvosUnicos.length === 0)) {
            _context2.next = 6;
            break;
          }
          throw new Error('Nenhum número de destino especificado.');
        case 6:
          _context2.prev = 6;
          provider = getProvider(args);
          _context2.next = 19;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](6);
          if (!args.provider) {
            _context2.next = 14;
            break;
          }
          throw _context2.t0;
        case 14:
          if (!(args.token || ZENVIA_TOKEN)) {
            _context2.next = 18;
            break;
          }
          provider = new ZenviaProvider(args.token || ZENVIA_TOKEN);
          _context2.next = 19;
          break;
        case 18:
          throw _context2.t0;
        case 19:
          if (provider) {
            _context2.next = 25;
            break;
          }
          if (!args.token) {
            _context2.next = 24;
            break;
          }
          provider = new ZenviaProvider(args.token);
          _context2.next = 25;
          break;
        case 24:
          throw new Error('Nenhum provedor configurado. Configure ZENVIA_TOKEN ou TWILIO credentials.');
        case 25:
          // Para cada número alvo
          _iterator = _createForOfIteratorHelper(alvosUnicos);
          _context2.prev = 26;
          _iterator.s();
        case 28:
          if ((_step = _iterator.n()).done) {
            _context2.next = 58;
            break;
          }
          numero = _step.value;
          numeroDestino = formatarNumero(numero); // Faz as chamadas repetidas para o número atual
          i = 0;
        case 32:
          if (!(i < args.quantidade)) {
            _context2.next = 56;
            break;
          }
          _context2.prev = 33;
          // Prepara argumentos para o provider
          // Prioriza número de origem do argumento, depois do env var específico do provider
          fromNumber = args.de;
          if (!fromNumber) {
            if (provider instanceof TwilioProvider) {
              fromNumber = TWILIO_PHONE_NUMBER;
            } else {
              fromNumber = ZENVIA_PHONE_NUMBER;
            }
          }
          numeroOrigem = formatarNumero(fromNumber);
          _context2.next = 39;
          return provider.call({
            to: numeroDestino,
            from: numeroOrigem,
            text: args.texto,
            voice: args.voz,
            speed: args.velocidade,
            record: args.gravar,
            debugLog: function debugLog(msg, debug) {
              return _debugLog(msg, args.debug);
            }
          });
        case 39:
          result = _context2.sent;
          results.push(result);
          currentCall++;
          if (args.onProgress) {
            args.onProgress(currentCall);
          }
          _context2.next = 50;
          break;
        case 45:
          _context2.prev = 45;
          _context2.t1 = _context2["catch"](33);
          results.push({
            success: false,
            number: numeroDestino,
            error: _context2.t1.message
          });
          currentCall++;
          if (args.onProgress) {
            args.onProgress(currentCall);
          }
        case 50:
          if (!(i < args.quantidade - 1 || alvosUnicos.indexOf(numero) < alvosUnicos.length - 1)) {
            _context2.next = 53;
            break;
          }
          _context2.next = 53;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 1000);
          });
        case 53:
          i++;
          _context2.next = 32;
          break;
        case 56:
          _context2.next = 28;
          break;
        case 58:
          _context2.next = 63;
          break;
        case 60:
          _context2.prev = 60;
          _context2.t2 = _context2["catch"](26);
          _iterator.e(_context2.t2);
        case 63:
          _context2.prev = 63;
          _iterator.f();
          return _context2.finish(63);
        case 66:
          return _context2.abrupt("return", results);
        case 67:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[6, 10], [26, 60, 63, 66], [33, 45]]);
  }));
  return _makeMultipleCalls.apply(this, arguments);
}
var cobranca = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(args) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (args.debug) {
            console.log('Debug: Argumentos recebidos:', args);
          }

          // Se um token Zenvia foi fornecido via CLI, salva no .env (mantendo comportamento original)
          // Nota: Isso é específico da Zenvia. Twilio não tem wizard de CLI ainda.
          if (args.token && !args.provider) {
            // Assume Zenvia se passar token sem especificar provider
            if (/^[a-zA-Z0-9]{32}$/.test(args.token)) {
              salvarToken(args.token);
            }
          }
          _context.next = 5;
          return makeMultipleCalls(args);
        case 5:
          return _context.abrupt("return", _context.sent);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          throw new Error(_context.t0.message);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function cobranca(_x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = cobranca;