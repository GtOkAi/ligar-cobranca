#!/usr/bin/env node
'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var _yargs = require('yargs');
var _yargs2 = _interopRequireDefault(_yargs);
var _safe = require('colors/safe');
var _ramda = require('ramda');
var _cobranca = require('./cobranca');
var _cobranca2 = _interopRequireDefault(_cobranca);
var inquirer = require('inquirer');
var chalk = require('chalk');
var boxen = require('boxen');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var title = boxen(chalk.bold.blue('Ligar Cobrança') + '\n' + chalk.gray('Uma ferramenta para fazer chamadas automáticas usando APIs de voz (Zenvia, Twilio)'), {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'blue'
});
var emitSuccess = function emitSuccess(message) {
  return console.log(chalk.green(' ✓ ' + message));
};
var emitError = function emitError(message) {
  return console.log(chalk.red(' ✗ ' + message));
};
var emitInfo = function emitInfo(message) {
  return console.log(chalk.blue(' ℹ ' + message));
};
var voices = [{
  name: chalk.cyan('Ricardo') + ' (Português BR - Masculino)',
  value: 0
}, {
  name: chalk.magenta('Vitória') + ' (Português BR - Feminino)',
  value: 1
}, {
  name: chalk.yellow('Joey') + ' (Inglês - Masculino)',
  value: 2
}, {
  name: chalk.green('Maxim') + ' (Russo - Masculino)',
  value: 3
}];
var defaultTexts = [{
  name: chalk.cyan('Alô? Alô? Alô? Alô? Alô?'),
  value: 'Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô? Alô?'
}, {
  name: chalk.gray('Personalizado'),
  value: 'custom'
}];
var interactiveMode = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var answers;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log(boxen(chalk.blue("\nLIGAR-COBRAN\xC7A\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28C0\u28E4\u28F6\u28F6\u28F6\u28F6\u28F6\u28E6\u28E4\u28F6\u28E4\u28E4\u28C0\u28C0\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28E0\u28F4\u28FE\u287F\u281B\u280B\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2809\u2809\u281B\u283B\u28BF\u28F6\u28E6\u28E4\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28E0\u28FE\u281F\u28EF\u2845\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u281B\u28BF\u28F7\u28E6\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28BF\u28E7\u28E4\u28C4\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28E4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u283B\u28F7\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u28E4\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u2819\u281B\u283B\u28FF\u287F\u28FF\u28F6\u28F6\u28E6\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u283B\u28FF\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2880\u28E0\u28FF\u2841\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B0\u28FF\u2803\u2800\u2800\u2800\u2809\u2809\u2809\u2809\u2809\u2809\u2809\u2809\u2809\u2809\u2809\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2818\u28BF\u28E7\u2840\u2800\u2800\u2800\u2800\u2800\n\u28B0\u28FF\u28FF\u28FF\u28D7\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28F8\u287F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u283B\u28FF\u28C4\u2800\u2800\u2800\u2800\n\u2800\u2809\u2809\u28B9\u28FF\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2839\u28FF\u28C4\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28F8\u28FF\u2803\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2838\u28FF\u2844\u2800\u2800\n\u2800\u2800\u2800\u2800\u28FF\u28C7\u2800\u2800\u2800\u2800\u2800\u28A0\u28FE\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u283B\u28FF\u2800\u2800\n\u2800\u2800\u2800\u2800\u28B9\u28FF\u2840\u2800\u2800\u2800\u28E0\u28FF\u28FF\u28FF\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28C7\u2800\n\u2800\u2800\u2800\u2800\u2800\u28BF\u28E7\u2800\u2880\u28FE\u28FF\u2883\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u2800\n\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28E4\u28FE\u287F\u2800\u28B8\u28FF\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u2846\n\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u281F\u280B\u2800\u2800\u28B8\u28FF\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28E7\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28F8\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FE\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF  \n\nN\xE3o sou respons\xE1vel pelo uso que voc\xEA faz da ferramenta! Divirta-se!\n"), {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'blue'
          }));
          _context.next = 3;
          return inquirer.prompt([{
            type: 'list',
            name: 'provider',
            message: 'Selecione o provedor de API:',
            choices: [{
              name: 'Zenvia',
              value: 'zenvia'
            }, {
              name: 'Twilio',
              value: 'twilio'
            }],
            "default": 'zenvia'
          }, {
            type: 'input',
            name: 'token',
            message: 'Digite seu token da Zenvia (ou pressione Enter se já estiver configurado no .env):',
            when: function when(answers) {
              return answers.provider === 'zenvia';
            },
            validate: function validate(input) {
              if (!input) return true; // Permite vazio se já estiver no .env
              if (!/^[a-zA-Z0-9]{32}$/.test(input)) {
                return 'Token inválido. O token da Zenvia deve ter 32 caracteres alfanuméricos.';
              }
              return true;
            }
          }, {
            type: 'list',
            name: 'tipo',
            message: 'Tipo de chamada:',
            choices: [{
              name: '1 - Chamada única',
              value: 1
            }, {
              name: '2 - Chamadas múltiplas',
              value: 2
            }],
            "default": 1
          }, {
            type: 'input',
            name: 'para',
            message: 'Número de destino:',
            validate: function validate(input) {
              if (!input) return 'Por favor, insira um número';
              if (!/^\+?[0-9]{10,15}$/.test(input.replace(/\D/g, ''))) {
                return 'Número inválido. Use o formato: +5511999999999';
              }
              return true;
            },
            when: function when(answers) {
              return answers.tipo === 1;
            }
          }, {
            type: 'input',
            name: 'numeros',
            message: 'Números de destino (separados por vírgula):',
            validate: function validate(input) {
              if (!input) return 'Por favor, insira pelo menos um número';
              var numeros = input.split(',').map(function (n) {
                return n.trim().replace(/\D/g, '');
              });
              if (numeros.length < 2) return 'Insira pelo menos 2 números';
              var _iterator = _createForOfIteratorHelper(numeros),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var numero = _step.value;
                  if (!/^[0-9]{10,15}$/.test(numero)) {
                    return 'Número inválido. Use o formato: 5511999999999';
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              return true;
            },
            filter: function filter(input) {
              if (!input) return '';
              // Remove espaços extras e caracteres não numéricos
              var numeros = input.split(',').map(function (n) {
                return n.trim().replace(/\D/g, '');
              });
              return numeros.join(',');
            },
            when: function when(answers) {
              return answers.tipo === 2;
            }
          }, {
            type: 'input',
            name: 'de',
            message: 'Número de origem (opcional):',
            "default": function _default(answers) {
              if (answers.provider === 'twilio') {
                return process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_FROM || '';
              }
              return process.env.ZENVIA_PHONE_NUMBER || '';
            },
            validate: function validate(input) {
              if (!input) return true;
              if (!/^\+?[0-9]{10,15}$/.test(input.replace(/\D/g, ''))) {
                return 'Número inválido. Use o formato: +5511999999999';
              }
              return true;
            }
          }, {
            type: 'list',
            name: 'tipoMensagem',
            message: 'Mensagem:',
            choices: [{
              name: '1 - Mensagem padrão',
              value: 'padrao'
            }, {
              name: '2 - Mensagem personalizada',
              value: 'custom'
            }],
            "default": 0
          }, {
            type: 'input',
            name: 'texto',
            message: 'Digite sua mensagem:',
            when: function when(answers) {
              return answers.tipoMensagem === 'custom';
            }
          }, {
            type: 'list',
            name: 'voz',
            message: 'Voz:',
            choices: [{
              name: '1 - Ricardo (BR)',
              value: 0
            }, {
              name: '2 - Vitória (BR)',
              value: 1
            }, {
              name: '3 - Joey (EN)',
              value: 2
            }, {
              name: '4 - Maxim (RUS)',
              value: 3
            }],
            "default": 0
          }, {
            type: 'list',
            name: 'velocidade',
            message: 'Velocidade da voz:',
            choices: [{
              name: '1 - Muito lento',
              value: 1
            }, {
              name: '2 - Lento',
              value: 2
            }, {
              name: '3 - Normal',
              value: 3
            }, {
              name: '4 - Rápido',
              value: 4
            }, {
              name: '5 - Muito rápido',
              value: 5
            }],
            "default": 3
          }, {
            type: 'confirm',
            name: 'gravar',
            message: 'Gravar chamada?',
            "default": false
          }, {
            type: 'input',
            name: 'quantidade',
            message: 'Quantidade de chamadas:',
            "default": '1',
            validate: function validate(input) {
              var num = parseInt(input);
              if (isNaN(num) || num < 1 || num > 999) {
                return 'Por favor, insira um número entre 1 e 999';
              }
              return true;
            }
          }, {
            type: 'confirm',
            name: 'debug',
            message: 'Ativar modo debug?',
            "default": false
          }]);
        case 3:
          answers = _context.sent;
          return _context.abrupt("return", {
            provider: answers.provider,
            token: answers.token || undefined,
            para: answers.para,
            numeros: answers.tipo === 2 ? (answers.numeros || '').split(',').map(function (n) {
              return n.trim().replace(/\D/g, '');
            }) : null,
            de: answers.de,
            texto: answers.tipoMensagem === 'custom' ? answers.texto : 'Alô? Alô? Alô? Alô? Alô?',
            voz: parseInt(answers.voz),
            velocidade: parseInt(answers.velocidade),
            gravar: answers.gravar,
            quantidade: parseInt(answers.quantidade),
            debug: answers.debug
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function interactiveMode() {
    return _ref.apply(this, arguments);
  };
}();
var cli = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var argv, args, executarChamadas, _yield$inquirer$promp, acao;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          argv = _yargs2["default"].usage('Uso: $0 [opções]').option('provider', {
            alias: 'P',
            description: 'Provedor de API (zenvia ou twilio)',
            type: 'string',
            choices: ['zenvia', 'twilio']
          }).option('para', {
            alias: 'p',
            description: 'Número de destino',
            type: 'string'
          }).option('numeros', {
            alias: 'n',
            description: 'Números de destino (separados por vírgula)',
            type: 'array'
          }).option('de', {
            alias: 'd',
            description: 'Número de origem',
            type: 'string'
          }).option('texto', {
            alias: 't',
            description: 'Mensagem para ser convertida em voz',
            type: 'string'
          }).option('voz', {
            alias: 'v',
            description: 'Voz a ser utilizada (0-3)',
            type: 'number',
            "default": 0
          }).option('velocidade', {
            alias: 's',
            description: 'Velocidade da voz (1-5)',
            type: 'number',
            "default": 3
          }).option('gravar', {
            alias: 'g',
            description: 'Gravar a chamada',
            type: 'boolean',
            "default": false
          }).option('quantidade', {
            alias: 'q',
            description: 'Quantidade de chamadas (1-999)',
            type: 'number',
            "default": 1
          }).option('debug', {
            description: 'Ativar modo debug',
            type: 'boolean',
            "default": false
          }).help('h').alias('h', 'help').argv;
          if (!(argv.para || argv.numeros)) {
            _context3.next = 6;
            break;
          }
          args = argv;
          _context3.next = 9;
          break;
        case 6:
          _context3.next = 8;
          return interactiveMode();
        case 8:
          args = _context3.sent;
        case 9:
          // Função para executar as chamadas
          executarChamadas = /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              var totalChamadas, currentCall, updateProgress, results, sucessos, falhas, sucessosFormatados, falhasFormatadas;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    totalChamadas = args.quantidade * (args.numeros ? args.numeros.length : 1);
                    currentCall = 0; // Atualiza o progresso a cada chamada
                    updateProgress = function updateProgress(current) {
                      currentCall = current;
                      process.stdout.write("\r\x1B[K"); // Limpa a linha atual
                      process.stdout.write("Efetuando liga\xE7\xF5es (".concat(current, "/").concat(totalChamadas, ")..."));
                    }; // Adiciona o callback de progresso aos argumentos
                    args.onProgress = updateProgress;
                    _context2.next = 6;
                    return _cobranca2["default"](args);
                  case 6:
                    results = _context2.sent;
                    // Limpa a linha do progresso
                    process.stdout.write("\r\x1B[K"); // Limpa a linha atual

                    // Exibe o resumo das chamadas
                    sucessos = results.filter(function (r) {
                      return r.success;
                    }).length;
                    falhas = results.filter(function (r) {
                      return !r.success;
                    });
                    sucessosFormatados = sucessos.toString().padStart(2, '0');
                    falhasFormatadas = falhas.length.toString().padStart(2, '0');
                    console.log(boxen(chalk.green("\u2713 Chamadas iniciadas: ".concat(sucessosFormatados)) + '\n' + chalk.red("\u2717 Falhas no envio:    ".concat(falhasFormatadas)) + '\n\n' + chalk.gray('Nota: O telefone pode levar alguns segundos para tocar.'), {
                      padding: 1,
                      margin: 1,
                      borderStyle: 'round',
                      borderColor: falhas.length > 0 ? 'red' : 'green',
                      title: 'Relatório de Envio',
                      titleAlignment: 'center'
                    }));
                    if (falhas.length > 0) {
                      console.log(chalk.red('\nDetalhes das falhas:'));
                      falhas.forEach(function (f) {
                        console.log(chalk.red("\u2022 ".concat(f.number || 'Desconhecido', ": ").concat(f.error)));
                      });
                      console.log(''); // Linha em branco
                    }
                    return _context2.abrupt("return", results);
                  case 15:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function executarChamadas() {
              return _ref3.apply(this, arguments);
            };
          }(); // Executa as chamadas iniciais
          _context3.next = 12;
          return executarChamadas();
        case 12:
          if (!true) {
            _context3.next = 37;
            break;
          }
          _context3.next = 15;
          return inquirer.prompt([{
            type: 'list',
            name: 'acao',
            message: 'O que você deseja fazer?',
            choices: [{
              name: '1 - Executar novamente com as mesmas configurações',
              value: 'repetir'
            }, {
              name: '2 - Reiniciar com novas configurações',
              value: 'reiniciar'
            }, {
              name: '3 - Sair',
              value: 'sair'
            }],
            "default": 0
          }]);
        case 15:
          _yield$inquirer$promp = _context3.sent;
          acao = _yield$inquirer$promp.acao;
          if (!(acao === 'sair')) {
            _context3.next = 22;
            break;
          }
          console.log('\n👋 Até logo!');
          return _context3.abrupt("break", 37);
        case 22:
          if (!(acao === 'reiniciar')) {
            _context3.next = 31;
            break;
          }
          console.log('\n🔄 Reiniciando com novas configurações...\n');
          // Força o modo interativo para coletar novas configurações
          _context3.next = 26;
          return interactiveMode();
        case 26:
          args = _context3.sent;
          _context3.next = 29;
          return executarChamadas();
        case 29:
          _context3.next = 35;
          break;
        case 31:
          if (!(acao === 'repetir')) {
            _context3.next = 35;
            break;
          }
          console.log('\n🔄 Executando novamente...\n');
          _context3.next = 35;
          return executarChamadas();
        case 35:
          _context3.next = 12;
          break;
        case 37:
          _context3.next = 43;
          break;
        case 39:
          _context3.prev = 39;
          _context3.t0 = _context3["catch"](0);
          console.error(chalk.red('❌ Erro:'), _context3.t0.message);
          process.exit(1);
        case 43:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 39]]);
  }));
  return function cli() {
    return _ref2.apply(this, arguments);
  };
}();
cli();