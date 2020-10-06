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

  it('should support long formats', async () => {
    let result = time(date, { lang: 'no', weekday: 'long', month: 'long' })
    expect(result).toBe('september fredag')
  })

  it('should support format option', async () => {
    let result = time(date, { lang: 'no', day: 'numeric', weekday: 'long', month: 'long', format: '%weekday %day. %month'})
    expect(result).toBe('fredag 4. september')
  })

  it('should support format option with uppercase', async () => {
    let result = time(date, { lang: 'no', day: 'numeric', weekday: 'long', month: 'long', format: '%Weekday %day. %Month'})
    expect(result).toBe('Fredag 4. September')
  })

  it('should show today\s date', () => {
    let formatter = new Intl.DateTimeFormat()
    let today = formatter.format(new Date())

    let result = time(new Date)
    expect(result).toBe(today)
  })

  it('should support empty, undefined or null date', () => {
    let result = time()
    expect(result).toBe('')

    result = time(undefined)
    expect(result).toBe('')

    result = time(null)
    expect(result).toBe('')
  })

  it('should support string dates', () => {
    let formatter = new Intl.DateTimeFormat()
    let today = formatter.format(new Date())

    let result = time(today)
    expect(result).toBe(today)
  })
})