const { params } = require('../index.js')

describe('params', () => {
  it('should get the correct parameter', () => {
    window.history.pushState({}, '', 'http://localhost/?hello=1&bye=2')
    expect(params('hello')).toBe('1')
    expect(params('bye')).toBe('2')
    expect(params('not')).toBe('')
  })

  it('should return empty string if no parameter supplied', () => {
    window.history.pushState({}, '', 'http://localhost/site/name/campaign')
    expect(params('')).toBe('')
    expect(params(undefined)).toBe('')
    expect(params(null)).toBe('')
  })

  it('should get numbered parameters', () => {
    window.history.pushState({}, '', 'http://localhost/site/name/campaign')
    expect(params('hello')).toBe('')
    expect(params('bye')).toBe('')
    expect(params(0)).toBe('site')
    expect(params(1)).toBe('name')
    expect(params(2)).toBe('campaign')
  })

  it('should get numbered parameters mixed', () => {
    window.history.pushState({}, '', 'http://localhost/site/name/campaign?hello=1&bye=2')
    expect(params('hello')).toBe('1')
    expect(params('bye')).toBe('2')
    expect(params('nei')).toBe('')
    expect(params(0)).toBe('site')
    expect(params(1)).toBe('name')
    expect(params(2)).toBe('campaign')
  })
})