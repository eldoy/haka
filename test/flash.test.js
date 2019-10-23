const { flash, cookie } = require('../index.js')

describe('flash', () => {
  beforeEach(() => {
    window.scroll = function(){}
    cookie('flash', '', -1)
  })

  it('should not show flash if it does not exist', async () => {
    document.body.innerHTML = '<div></div>'
    expect(flash('.flash', 'hello')).toBeUndefined()
  })

  it('should store flash', async () => {
    document.body.innerHTML = '<div class="flash"></div>'
    flash('.flash', 'Hello')
    expect(cookie('flash')).toBe('Hello')
  })

  it('should show flash now', async () => {
    document.body.innerHTML = '<div class="flash"></div>'
    flash('.flash', 'Hello', true)
    expect(cookie('flash')).toBeNull()
    expect(document.querySelector('.flash').textContent).toBe('Hello')
  })
})