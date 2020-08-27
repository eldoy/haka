const { cookie } = require('../index.js')

describe('cookie', () => {
  beforeEach(() => {
    cookie('name', null)
  })

  it('should set and get cookies', () => {
    cookie('name', 'hello')
    expect(cookie('name')).toBe('hello')
    cookie('next', 'bye')
    expect(cookie('next')).toBe('bye')
  })

  it('should delete cookies', () => {
    cookie('name', 'hello')
    expect(cookie('name')).toBe('hello')
    cookie('name', null)
    expect(cookie('name')).toBeNull()
  })
})