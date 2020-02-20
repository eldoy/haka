# HAKA
Functional Javascript HTML and DOM manipulation toolkit.

The whole library is only 2K minified. Works in all browsers, including IE.

### Install
`npm i haka`

### Usage
Use only the functions you need, only `q` is required for most functions.
```js
// From NodeJS
var { q, qa, html, text, css, attr, time, cookie, flash, serialize } = require('haka')

// Include directly in your site
<script src="/dist/haka-min.js"></script>
```

### Querying
Haka uses `document.querySelector` and `document.querySelectorAll` behind the scenes.
```js
// Get first element from document
q('#el')

// Get first element from #app
q('#el', '#app')

// Get all elements from document
qa('.els')

// Get all elements from #app
qa('.els', '#app')

// Chaining, apply to one
q('#el', el => el.innerHTML = '<span>Hello</span>')

// Chaining, apply to all
qa('li', el => el.innerHTML = '<span>Hello</span>')
```

### Text content
Sets and gets the text content of elements.
```js
// Insert text into element
text('#el', 'Hello')

// Get text from element
text('#el')
```

### HTML content
Sets and gets the HTML content of elements.
```js
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
```

### CSS
Add and remove CSS styles from elements.
```js
// Get css value
css('#el', 'backgroundColor')

// Replace css values
css('#el', 'background-color: yellow; color: red')

// Remove all css values
css('#el', '')

// Merge css values
css('#el', { backgroundColor: 'yellow', color: null })
```

### Attributes
Sets and gets the attributes of elements.
```js
// Get all attributes
attr('#app')

// Get specific attribute
attr('#app', 'class')

// Set attributes
attr('#app', { class: 'hello', id: 'bye' })
```

### Time format
Formats date objects into date strings.
```js
var date = new Date()

// Default format is dd/mm/yyyy
time(date)

// Custom format
time(date, 'hh:MM:ss dd/mm-yy')
```

### Query params
Get URL query parameters.
```js
// Get the id parameter (?id=1)
params('id')
```

### Cookies
Sets, gets and deletes browser cookies.
```js
// Get a cookie
cookie('name')

// Set a cookie, expires in 30 days
cookie('name', 'hello')

// Set a cookie with expiry in days
cookie('name', 'hello', 7)

// Delete a cookie
cookie('name', '', -1)
```

### Form serialization
Collects values from `<form>` elements.
```js
// Serialize form
var data = serialize(form)
```

### Flash messages
Displays flash message notifications. Depends on the `cookie` function.

The default class name for the container is `flash` and requires an initial opacity of 0. The message will automatically fade out after 5 seconds.
```html
<div class="flash">Messages will be displayed here</div>
```

Run the `flash` function to display the messages.
```js
// Display flash message
flash('hello')

// With default options
flash('hello', { el: '.flash', time: 5000, name: 'flash' })

// Prepare flash message on next page load
cookie('flash', 'hello')

// Display flash message from cookie above
flash()
```

MIT licensed. Enjoy!
