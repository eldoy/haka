# HAKA
Functional Javascript HTML and DOM manipulation toolkit.

### Install
`npm i haka`

### Usage
Use only the functions you need, only 'q' is required for most functions.
```javascript
var { q, qa, css, html, text, attr, cookie, flash, serialize } = require('haka')
```

### Querying
Haka uses `document.querySelector` and `document.querySelectorAll` behind the scenes.
```javascript
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

### CSS
Add and remove CSS styles from elements.
```javascript
// Get css value
css('#el', 'backgroundColor')

// Replace css values
css('#el', 'background-color: yellow; color: red')

// Remove all css values
css('#el', '')

// Merge css values
css('#el', { backgroundColor: 'yellow', color: null })
```

### Text content
Sets and gets the text content of elements.
```javascript
// Insert text into element
text('#el', 'Hello')

// Get text from element
text('#el')
```

### HTML content
Sets and gets the HTML content of elements.
```javascript
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

### Attributes
Sets and gets the attributes of elements.
```javascript
// Get all attributes
attr('#app')

// Get specific attribute
attr('#app', 'class')

// Set attributes
attr('#app', { class: 'hello', id: 'bye' })
```

### Cookies
Sets, gets and deletes browser cookies.
```javascript
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
Collects values from form elements.
```javascript
// Serialize form
var data = serialize(form)
```

### Flash messages
Displays flash message notifications. Depends on the `cookie` function.
```javascript
// Display flash message
flash('hello')

// Prepare flash message on next page load
cookie('flash', 'hello')

// Display flash message from cookie above
flash()
```

ISC licensed. Enjoy!
