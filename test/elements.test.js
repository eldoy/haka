const { q, qa, css, html, text, attr, h } = require('../index.js')

describe('elements', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  describe('query', () => {
    it('should query an element', async () => {
      document.body.innerHTML = `<div id="app">Hello</div>`
      expect(q('#app').innerHTML).toBe('Hello')
    })

    it('should return null if not found', async () => {
      document.body.innerHTML = `<div id="app">Hello</div>`
      expect(q('#hello')).toBeNull()
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

    it('should query with HTMLElements', async () => {
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

    it('should query with callback', async () => {
      document.body.innerHTML = `<div id="app"><span>Hello</span></div>`
      q('#app', el => {
        expect(el.innerHTML).toBe('<span>Hello</span>')
      })
    })

    it('should query with callback and scope', async () => {
      document.body.innerHTML = `<div id="app"><span>Hello</span></div>`
      q('span', '#app', el => {
        el.textContent = 'Hello'
      })
      expect(q('span').textContent).toBe('Hello')
    })

    it('should query all with callback', async () => {
      document.body.innerHTML = `<ul><li>Hello</li><li>Bye</li></div>`
      qa('li', el => {
        el.textContent = el.textContent.toLowerCase()
      })
      expect(qa('li')[0].textContent).toBe('hello')
      expect(qa('li')[1].textContent).toBe('bye')
    })
  })

  describe('css', () => {
    it('should replace styles', async () => {
      document.body.innerHTML = `<div id="app">Hello</div>`
      css('#app', 'background-color: yellow;')
      expect(q('#app').style.backgroundColor).toBe('yellow')
    })

    it('should set styles', async () => {
      document.body.innerHTML = `<div id="app">Hello</div>`
      css('#app', { backgroundColor: 'yellow' })
      expect(q('#app').style.backgroundColor).toBe('yellow')
    })

    it('should get styles', async () => {
      document.body.innerHTML = `<div id="app" style="background-color:yellow">Hello</div>`
      expect(css('#app', 'backgroundColor')).toBe('yellow')
    })
  })

  describe('html', () => {
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
  })

  describe('text', () => {
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
      text('#app', 'Bye')
      expect(q('#app').textContent).toBe('Bye')
    })

    it('should set blank text of an element', async () => {
      document.body.innerHTML = `<div id="app">Hello</div>`
      text('#app', '')
      expect(q('#app').textContent).toBe('')
    })
  })

  describe('attr', () => {
    it('should get element attributes value', async () => {
      document.body.innerHTML = `<div id="app" class="hello"><span>Hello</span></div>`
      expect(attr('#app', 'id')).toBe('app')
    })

    it('should set element attributes', async () => {
      document.body.innerHTML = `<div id="app"><span>Hello</span></div>`
      attr('#app', { class: 'hello' })
      expect(q('#app').getAttribute('class')).toBe('hello')
    })

    it('should remove element attributes', async () => {
      document.body.innerHTML = `<div id="app"><span>Hello</span></div>`
      attr('#app', { id: null })
      expect(q('div').outerHTML).toBe('<div><span>Hello</span></div>')
    })

    it('should return null if not found', async () => {
      document.body.innerHTML = `<div id="app">Hello</div>`
      expect(attr('#hello')).toBeNull()
    })
  })
})
