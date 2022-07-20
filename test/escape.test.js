/**
* @jest-environment jsdom
*/

const { esc, raw } = require('../index.js')

describe('escape', () => {
  it('should escape strings', () => {
    expect(esc(undefined)).toBe(undefined)
    expect(esc(null)).toBe(null)
    expect(esc('')).toBe('')
    expect(esc('hello')).toBe('hello')
    expect(esc('<div>hello</div>')).toBe('&lt;div&gt;hello&lt;/div&gt;')
  })

  it('should unescape strings', () => {
    expect(raw(undefined)).toBe(undefined)
    expect(raw(null)).toBe(null)
    expect(raw('')).toBe('')
    expect(raw('hello')).toBe('hello')
    expect(raw('&lt;div&gt;hello&lt;/div&gt;')).toBe('<div>hello</div>')
  })
})
