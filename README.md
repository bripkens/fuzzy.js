# fuzzy.js [![Build Status](https://travis-ci.org/bripkens/fuzzy.js.svg?branch=gh-pages)](https://travis-ci.org/bripkens/fuzzy.js) [![NPM version](https://badge.fury.io/js/fuzzy.js.png)](http://badge.fury.io/js/fuzzy.js)

Fuzzy.js is a library for approximate (fuzzy) string matching.
Fuzzy.js is aimed at providing an
experience which you may know from editors such as Sublime Text,
Atom, TextMate and others.

**Demo: http://bripkens.github.com/fuzzy.js/demo**

## Installation

 - Either download the [developer](https://raw.github.com/bripkens/fuzzy.js/master/fuzzy.js)
   or the [minified](https://raw.github.com/bripkens/fuzzy.js/master/fuzzy.min.js)
   version of fuzzy.js and include it in your HTML file.
 - NPM users can `npm install fuzzy.js`

## Usage

```
var query = 'majs';
var term = 'main.js';

var match = fuzzy(term, query);
console.log(match.score);            // 8
console.log(match.query);            // 'majs'
console.log(match.term);             // 'main.js'
console.log(match.highlightedTerm);  // '<em>m</em><em>a</em>in.<em>j</em><em>s</em>'

// sorting an array of matches
var matches = [ ... ];
matches.sort(fuzzy.matchComparator); // sorts descending
```

## License (MIT)

Copyright (c) 2016 Ben Ripkens

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
