# HAKA
Tiny Javascript HTML and DOM manipulation library.

### Install
`npm i haka`

### Usage
```javascript
var { h, t, q, qa } = require('haka')

// Get first element from document
q('#el')

// Get first element from #app
q('#el', '#app')

// Get all elements from document
qa('.els')

// Get all elements from #app
qa('.els', '#app')

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

// Works with HTML elements as well
const btn = q('button')
h(btn, '<span>Loading</span>')
```
ISC licensed. Enjoy!
