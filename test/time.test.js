/**
 * @jest-environment jsdom
 */

const { time } = require('../index.js')
let dateString = '2020-09-03T22:14:23.132Z'
let date = new Date(dateString)

describe('time', () => {
  it('should format a date with default options', () => {
    let result = time(date)
    expect(result).toBe('9/4/2020')
  })

  it('should support lang option', async () => {
    let result = time(date, { lang: 'no' })
    expect(result).toBe('4.9.2020')
  })

  it('should support lang option as string', async () => {
    let result = time(date, 'no')
    expect(result).toBe('4.9.2020')
  })

  it('should support long formats', async () => {
    let result = time(date, { lang: 'no', weekday: 'long', month: 'long' })
    expect(result).toBe('september fredag')
  })

  it('should support format option', async () => {
    let result = time(date, {
      lang: 'no',
      day: 'numeric',
      weekday: 'long',
      month: 'long',
      format: '%weekday %day. %month'
    })
    expect(result).toBe('fredag 4. september')
  })

  it('should support format option with uppercase', async () => {
    let result = time(date, {
      lang: 'no',
      day: 'numeric',
      weekday: 'long',
      month: 'long',
      format: '%Weekday %day. %Month'
    })
    expect(result).toBe('Fredag 4. September')
  })
})
