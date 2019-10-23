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
text('#el', 'Hello')

// Get text from element
text('#el')

// Get HTML from element
html('#el')

// Insert HTML into element
html('#el', '<div>Hello</div>')

// Insert HTML before element
html('#el', '<div>Hello</div>', 'before')

// Insert HTML after element
html('#el', '<div>Hello</div>', 'after')

// Insert HTML at top of element
html('#el', '<div>Hello</div>', 'top')

// Insert HTML at end of element
html('#el', '<div>Hello</div>', 'end')

// Works with HTML elements as well
html(q('button'), '<span>Loading</span>')

// Get all attributes
attr('#app')

// Get specific attribute
attr('#app', 'class')

// Set attributes
attr('#app', { class: 'hello', id: 'bye' })
```
ISC licensed. Enjoy!
