const { time } = require('../index.js')
let d = new Date('04 Dec 1995 00:12:00')

describe('time', () => {
  it('should format a date', () => {
    let result = time(d)
    expect(result).toBe('04/12/1995')

    result = time(d, 'hh:MM:ss dd/mm-yy')
    expect(result).toBe('00:12:00 04/12-95')
  })
})