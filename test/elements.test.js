const { q, qa, html, text, attr, h } = require('../index.js')

describe('elements', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should get the inner HTML', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(html('#app')).toBe('Hello')
  })

  it('should return null if not found', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(html('#hello')).toBeNull()
  })

  it('should insert into element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<span>Bye</span>')
    expect(q('#app').innerHTML).toBe('<span>Bye</span>')
  })

  it('should insert blank into element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '')
    expect(q('#app').innerHTML).toBe('')
  })

  it('should insert before element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<div>Before</div>', 'before')
    expect(document.body.innerHTML).toBe('<div>Before</div><div id="app">Hello</div>')
  })

  it('should insert before element short', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<div>Before</div>', 'b')
    expect(document.body.innerHTML).toBe('<div>Before</div><div id="app">Hello</div>')
  })

  it('should insert after element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<div>After</div>', 'after')
    expect(document.body.innerHTML).toBe('<div id=\"app\">Hello</div><div>After</div>')
  })

  it('should insert after element short', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<div>After</div>', 'a')
    expect(document.body.innerHTML).toBe('<div id=\"app\">Hello</div><div>After</div>')
  })

  it('should insert at top of element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<div>Top</div>', 'top')
    expect(document.body.innerHTML).toBe('<div id=\"app\"><div>Top</div>Hello</div>')
  })

  it('should insert at top of element short', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<div>Top</div>', 'top')
    expect(document.body.innerHTML).toBe('<div id=\"app\"><div>Top</div>Hello</div>')
  })

  it('should insert at end of element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<div>End</div>', 'end')
    expect(document.body.innerHTML).toBe('<div id=\"app\">Hello<div>End</div></div>')
  })

  it('should insert at end of element short', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<div>End</div>', 'e')
    expect(document.body.innerHTML).toBe('<div id=\"app\">Hello<div>End</div></div>')
  })

  it('should replace the element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<div>Replace</div>', 'replace')
    expect(document.body.innerHTML).toBe('<div>Replace</div>')
  })

  it('should replace the element short', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    html('#app', '<div>Replace</div>', 'r')
    expect(document.body.innerHTML).toBe('<div>Replace</div>')
  })

  it('should get the text of an element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(text('#app')).toBe('Hello')
  })

  it('should return null if not found', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(text('#hello')).toBeNull()
  })

  it('should set the text of an element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(text('#app', 'Bye')).toBe('Bye')
    expect(q('#app').textContent).toBe('Bye')
  })

  it('should set blank text of an element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(text('#app', '')).toBe('')
    expect(q('#app').textContent).toBe('')
  })

  it('should query an element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(q('#app').innerHTML).toBe('Hello')
  })

  it('should return null if not found', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(q('#hello')).toBeNull()
  })

  it('should return null if not found with null scope', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(q('#hello', '#hello')).toBeNull()
  })

  it('should query an element', async () => {
    document.body.innerHTML = `<ul><li>Hello</li><li>Hello</li></ul>`
    expect(qa('li').length).toBe(2)
    expect(qa('li')[0].innerHTML).toBe('Hello')
    expect(qa('li')[1].innerHTML).toBe('Hello')
  })

  it('should return null if not found with null scope', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(qa('#hello', '#hello').length).toBe(0)
  })

  it('should create HTML', async () => {
    document.body.innerHTML = h`<div id="app">Hello</div>`
    expect(document.body.innerHTML).toBe('<div id="app">Hello</div>')
  })

  it('should work with HTMLElements', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    let app = document.querySelector('#app')
    expect(q(app).innerHTML).toBe('Hello')
  })

  it('should query from element as string', async () => {
    document.body.innerHTML = `<div id="app"><span>Hello</span></div>`
    expect(q('span', '#app').textContent).toBe('Hello')
  })

  it('should query from element as element', async () => {
    document.body.innerHTML = `<div id="app"><span>Hello</span></div>`
    const app = document.getElementById('app')
    expect(q('span', app).textContent).toBe('Hello')
  })

  it('should query all from element as string', async () => {
    document.body.innerHTML = `<div id="app"><span>Hello</span></div>`
    expect(qa('span', '#app')[0].textContent).toBe('Hello')
  })

  it('should query all from element as string', async () => {
    document.body.innerHTML = `<div id="app"><span>Hello</span></div>`
    const app = document.getElementById('app')
    expect(qa('span', '#app')[0].textContent).toBe('Hello')
  })

  it('should get element attributes value', async () => {
    document.body.innerHTML = `<div id="app" class="hello"><span>Hello</span></div>`
    expect(attr('#app', 'id')).toBe('app')
  })

  it('should set element attributes', async () => {
    document.body.innerHTML = `<div id="app"><span>Hello</span></div>`
    attr('#app', { class: 'hello' })
    expect(q('#app').getAttribute('class')).toBe('hello')
  })

  it('should return null if not found', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(attr('#hello')).toBeNull()
  })
})