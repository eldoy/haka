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

  it('should show flash now', async () => {
    document.body.innerHTML = '<div class="flash"></div>'
    flash('Hello', { time: 10 })
    expect(cookie('flash')).toBeNull()
    expect(document.querySelector('.flash').textContent).toBe('Hello')
    await new Promise(r => setTimeout(r, 11))
    expect(document.querySelector('.flash').style.opacity).toBe('0')
  })
})