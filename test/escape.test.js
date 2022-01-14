/**
* @jest-environment jsdom
*/

const { esc, raw } = require('../index.js')

describe('escape', () => {
  it('should escape strings', () => {
    expect(esc('hello')).toBe('hello')
    expect(esc('<div>hello</div>')).toBe('&lt;div&gt;hello&lt;/div&gt;')
  })

  it('should unescape strings', () => {
    expect(raw('hello')).toBe('hello')
    expect(raw('&lt;div&gt;hello&lt;/div&gt;')).toBe('<div>hello</div>')
  })
})