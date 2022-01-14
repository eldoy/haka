/**
* @jest-environment jsdom
*/

const { params } = require('../index.js')

describe('params', () => {
  it('should not show flash if it does not exist', () => {
    window.history.pushState({}, '', 'http://localhost/?hello=1&bye=2')
    expect(params('hello')).toBe('1')
    expect(params('bye')).toBe('2')
    expect(params('not')).toBe('')
  })
})