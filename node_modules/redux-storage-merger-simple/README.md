# [redux-storage-merger-simple][]

[![build](https://travis-ci.org/react-stack/redux-storage-merger-simple.svg?branch=master)](https://travis-ci.org/react-stack/redux-storage-merger-simple)
[![dependencies](https://david-dm.org/react-stack/redux-storage-merger-simple.svg)](https://david-dm.org/react-stack/redux-storage-merger-simple)
[![devDependencies](https://david-dm.org/react-stack/redux-storage-merger-simple/dev-status.svg)](https://david-dm.org/react-stack/redux-storage-merger-simple#info=devDependencies)

[![license](https://img.shields.io/npm/l/redux-storage-merger-simple.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-merger-simple)
[![npm version](https://img.shields.io/npm/v/redux-storage-merger-simple.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-merger-simple)
[![npm downloads](https://img.shields.io/npm/dm/redux-storage-merger-simple.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-merger-simple)

Simple and current default merger for [redux-storage][].

## Installation

    npm install --save redux-storage-merger-simple
    
## Usage

Custom mergers, like this one, can simply be passed as second argument to [redux-storage][]s `reducer`:

```js
import merger from 'redux-storage-merger-simple';
const reducer = storage.reducer(reducer, merger);
```

# A fork of [redux-storage-merger-simple](https://github.com/michaelcontento/redux-storage-merger-simple)

The original author of the package [redux-storage-merger-simple](https://github.com/michaelcontento/redux-storage-merger-simple) has decided to deprecate the project and no longer maintained. The package will now be maintained here.

Thank you [michaelcontento](https://github.com/michaelcontento) for a great library!

## License

    The MIT License (MIT)

    Copyright (c) 2016- Gunjan Soni <gunjan.soni2002@gmail.com> 
    Copyright (c) 2015-2016 Michael Contento <mail@michaelcontento.de> 

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  [redux-storage]: https://github.com/react-stack/redux-storage
  [redux-storage-merger-simple]: https://github.com/react-stack/redux-storage-merger-simple
