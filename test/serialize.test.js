const { serialize } = require('../index.js')

describe('serialize', () => {
  it('should serialize form data', async () => {
    document.body.innerHTML = '<form><input name="hello" value="bye"></form>'
    const data = serialize(document.querySelector('form'))
    expect(data.hello).toBe('bye')
  })
})