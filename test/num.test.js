const { num } = require('../index.js')

describe('num', () => {
  it('should format a number with default language', () => {
    let result = num(100_000.01)
    expect(encodeURIComponent(result)).toEqual('100%2C000.01')
  })

  it('should format a number with custom language', () => {
    let result = num(100_000.01, 'no')
    expect(encodeURIComponent(result)).toEqual('100%C2%A0000%2C01')
  })

  it('should format a number with number as string', () => {
    let result = num('100_000.01', 'no')
    expect(encodeURIComponent(result)).toEqual('100%C2%A0000%2C01')
  })
})
