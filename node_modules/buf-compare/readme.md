# buf-compare [![Build Status](https://travis-ci.org/sindresorhus/buf-compare.svg?branch=master)](https://travis-ci.org/sindresorhus/buf-compare)

> Node.js [`Buffer.compare()`](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_compare_buf1_buf2) [ponyfill](https://ponyfill.com)


## Install

```
$ npm install --save buf-compare
```


## Usage

```js
var bufCompare = require('buf-compare');

bufCompare(new Buffer('a'), new Buffer('a'));
//=> 0

bufCompare(new Buffer('a'), new Buffer('b'));
//=> -1
```


## API

See the [`Buffer.compare()` docs](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_compare_buf1_buf2).


## Related

- [buffer-equals](https://github.com/sindresorhus/buffer-equals) - Node.js `buffer.equals()` ponyfill
- [buf-indexof](https://github.com/sindresorhus/buf-indexof) - Node.js `buffer.indexOf()` ponyfill


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
