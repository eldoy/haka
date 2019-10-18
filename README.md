# HAKA
Tiny Javascript HTML and DOM manipulation library.

### Install
`npm i haka`

### Usage
```javascript
var { q, qa, m } = require('haka')

// Get first element
q('#el')

// Get all elements
qa('.els')

// Insert string into element
m('#el', '<div>Hello</div>')

// Insert string before element
m('#el', '<div>Hello</div>', 'before')

// Insert string after element
m('#el', '<div>Hello</div>', 'after')

// Insert string at top of element
m('#el', '<div>Hello</div>', 'top')

// Insert string at end of element
m('#el', '<div>Hello</div>', 'end')
```
ISC licensed. Enjoy!
