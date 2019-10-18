const { h, q, qa, m } = require('../index.js')

describe('haka', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should create HTML', async () => {
    document.body.innerHTML = h`<div id="app">Hello</div>`
    expect(document.body.innerHTML).toBe('<div id="app">Hello</div>')
  })

  it('should query an element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    expect(q('#app').innerHTML).toBe('Hello')
  })

  it('should query an element', async () => {
    document.body.innerHTML = `<ul><li>Hello</li><li>Hello</li></ul>`
    expect(qa('li').length).toBe(2)
    expect(qa('li')[0].innerHTML).toBe('Hello')
    expect(qa('li')[1].innerHTML).toBe('Hello')
  })

  it('should insert into element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<span>Bye</span>')
    expect(q('#app').innerHTML).toBe('<span>Bye</span>')
  })

  it('should insert before element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<div>Before</div>', 'before')
    expect(document.body.innerHTML).toBe('<div>Before</div><div id="app">Hello</div>')
  })

  it('should insert before element short', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<div>Before</div>', 'b')
    expect(document.body.innerHTML).toBe('<div>Before</div><div id="app">Hello</div>')
  })

  it('should insert after element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<div>After</div>', 'after')
    expect(document.body.innerHTML).toBe('<div id=\"app\">Hello</div><div>After</div>')
  })

  it('should insert after element short', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<div>After</div>', 'a')
    expect(document.body.innerHTML).toBe('<div id=\"app\">Hello</div><div>After</div>')
  })

  it('should insert at top of element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<div>Top</div>', 'top')
    expect(document.body.innerHTML).toBe('<div id=\"app\"><div>Top</div>Hello</div>')
  })

  it('should insert at top of element short', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<div>Top</div>', 'top')
    expect(document.body.innerHTML).toBe('<div id=\"app\"><div>Top</div>Hello</div>')
  })

  it('should insert at end of element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<div>End</div>', 'end')
    expect(document.body.innerHTML).toBe('<div id=\"app\">Hello<div>End</div></div>')
  })

  it('should insert at end of element short', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<div>End</div>', 'e')
    expect(document.body.innerHTML).toBe('<div id=\"app\">Hello<div>End</div></div>')
  })

  it('should replace the element', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<div>Replace</div>', 'replace')
    expect(document.body.innerHTML).toBe('<div>Replace</div>')
  })

  it('should replace the element short', async () => {
    document.body.innerHTML = `<div id="app">Hello</div>`
    m('#app', '<div>Replace</div>', 'r')
    expect(document.body.innerHTML).toBe('<div>Replace</div>')
  })
})
