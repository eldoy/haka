# HAKA
Tiny Javascript HTML and DOM manipulation library.

### Install
`npm i haka`

### Usage
```javascript
var { h, t, q, qa } = require('haka')

// Get first element
q('#el')

// Get all elements
qa('.els')

// Insert text into element
t('#el', 'Hello')

// Get text from element
t('#el')

// Get HTML from element
h('#el')

// Insert HTML into element
h('#el', '<div>Hello</div>')

// Insert HTML before element
h('#el', '<div>Hello</div>', 'before')

// Insert HTML after element
h('#el', '<div>Hello</div>', 'after')

// Insert HTML at top of element
h('#el', '<div>Hello</div>', 'top')

// Insert HTML at end of element
h('#el', '<div>Hello</div>', 'end')
```
ISC licensed. Enjoy!
