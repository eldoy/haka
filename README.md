# HAKA
Functional Javascript HTML and DOM manipulation toolkit.

The whole library is less than 4K minified. Works in all browsers, including IE.

### Install
`npm i haka`

### Usage
Use only the functions you need, only `q` is required for most functions.
```js
// From NodeJS
var { q, qa, esc, raw, css, html, text, attr, time, params, cookie, store, serialize, flash } = require('haka')

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

### Escape string
Escapes string making it safe.
```js
// Outputs: &lt;div&gt;hello&lt;/div&gt;
esc('<div>Hello</div>')
```

### Unescape string
Unescapes an escaped string.
```js
// Outputs: <div>Hello</div>
raw('&lt;div&gt;hello&lt;/div&gt;')
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

// Default language is 'en'
time(date)

// Options for language and format
time(date, {
  lang: 'no',
  day: 'numeric',
  weekday: 'long',
  month: 'long',
  format: '%weekday %day. %Month'
})
```
All options for [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) are supported.

### Number format
Formats numbers based on locale.

```js
var number = 100000

// Default language is 'en'
num(number)

// Custom language as string
num(number, 'no')

// Options for language and format
num(number, {
  lang: 'no',
  style: 'currency',
  currency: 'EUR',
  maximumSignificantDigits: 3
})
```
All options for [NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) are supported.


### Query params
Get URL query parameters.
```js
// Get the id parameter (?id=1)
params('id')

// Get parameters by number (/site/name)
params(0) // site
params(1) // name
```

### Cookies
Sets, gets and deletes browser cookies.
```js
// Get a cookie
cookie('name')

// Set a cookie, expires in 30 days
cookie('name', 'hello')

// Set a cookie with expiry in days
cookie('name', 'hello', { days: 7 })

// Set cookie domain, default is current domain
cookie('name', 'hello', { domain: 'www.7i.no' })

// Set cookie domain, all subdomains
cookie('name', 'hello', { domain: '.7i.no' })

// Set cookie path, default is '/'
cookie('name', 'hello', { path: '/admin' })

// Set cookie with httpOnly and secure options
cookie('name', 'hello', { httpOnly: 1, secure: 1 })

// Delete a cookie
cookie('name', null)
```

### Store
Sets, gets and deletes sessionStorage values.
```js
// Get a store value
store('name')

// Set a store value
store('name', 'hello')

// Delete a store value, returns the previous value if any
store('name', null)

// Clear store, delete all values
store()
```

### Form serialization
Collects values from `<form>` elements.
```js
// Serialize form
var data = serialize(form)
```
The values will not be included if the input fields are empty or the `name` attribute is missing.

The input fields have support for types:
```html
<!-- Convert the value to number -->
<input type="number">

<!-- The data-type attribute overrides the type attribute -->
<input data-type="number">

<!-- Convert to boolean, true or false -->
<input data-type="bool" value="true">

<!-- Values false, off, 0 and '' becomes false -->
<input data-type="bool" value="false">

<!-- Convert to date object -->
<input type="date" data-type="date">
```

You can specify defaults if the value is empty:
```html
<!-- Default value is 'hello' -->
<input data-default="hello">

<!-- Default value is empty string: '' -->
<input data-default="">

<!-- Combine with data-type, becomes the number 0 -->
<input data-type="number" data-default="0">
```

### Flash messages
Displays flash message notifications. Depends on the `cookie` function.

The default id for the container is `flash` and requires an initial opacity of 0. The message will automatically fade out after 5 seconds.
```html
<div id="flash">Messages will be displayed here</div>
```

Run the `flash` function to display the messages.
```js
// Display flash message
flash('hello')

// With default options
flash('hello', { el: '#flash', time: 5000, name: 'flash' })

// Prepare flash message on next page load
cookie('flash', 'hello')

// Display flash message from cookie above
flash()
```

MIT licensed. Enjoy!
