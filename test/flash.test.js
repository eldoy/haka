const { flash, cookie } = require('../index.js')

describe('flash', () => {
  beforeEach(() => {
    window.scroll = function(){}
    cookie('flash', '', -1)
  })

  it('should not show flash if it does not exist', () => {
    document.body.innerHTML = '<div></div>'
    expect(flash('hello')).toBeNull()
  })

  it('should support the class option', done => {
    document.body.innerHTML = '<div id="flash"></div>'
    flash('Hello', { class: 'hello', time: 1 })
    const el = document.querySelector('#flash')
    expect(el.classList.contains('hello')).toBe(true)
    setTimeout(function() {
      expect(el.classList.contains('hello')).toBe(false)
      done()
    }, 2)
  })

  it('should show flash now', done => {
    document.body.innerHTML = '<div id="flash"></div>'
    flash('Hello', { time: 1 })
    expect(cookie('flash')).toBeNull()
    expect(document.querySelector('#flash').textContent).toBe('Hello')
    setTimeout(function() {
      expect(document.querySelector('#flash').style.opacity).toBe('0')
      done()
    }, 2)
  })
})