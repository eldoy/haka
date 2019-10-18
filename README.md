# HAKA
Tiny Javascript HTML and DOM manipulation library.

### Install
`npm i haka`

### Usage
```javascript
var { h, q, qa } = require('haka')

// Get first element
q('#el')

// Get all elements
qa('.els')

// Insert string into element
h('#el', '<div>Hello</div>')

// Insert string before element
h('#el', '<div>Hello</div>', 'before')

// Insert string after element
h('#el', '<div>Hello</div>', 'after')

// Insert string at top of element
h('#el', '<div>Hello</div>', 'top')

// Insert string at end of element
h('#el', '<div>Hello</div>', 'end')
```
ISC licensed. Enjoy!
