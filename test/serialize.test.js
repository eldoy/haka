const { serialize } = require('../index.js')

describe('serialize', () => {
  it('should serialize form data', async () => {
    document.body.innerHTML = /* html */`<form>
      <input name="hello" value="bye">
      <input type="number" name="amount" value="5">
      <select multiple name="select">
        <option value="1" selected></option>
        <option value="2"></option>
      </select>
      <input type="radio" value="a" name="radio">
      <input type="radio" value="b" name="radio" checked>
      <input type="radio" value="c" name="radio">
      <input type="checkbox" value="1" name="check" checked>
      <input type="checkbox" value="2" name="check">
    </form>`
    const data = serialize(document.querySelector('form'))
    expect(data.hello).toBe('bye')
    expect(data.amount).toEqual(5)
    expect(data.select).toEqual(['1'])
    expect(data.check).toEqual(['1'])
    expect(data.radio).toEqual('b')
  })
})