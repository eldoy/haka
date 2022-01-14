/**
* @jest-environment jsdom
*/

const { serialize } = require('../index.js')

function form(html) {
  document.body.innerHTML = `<form>${html}</form>`
}

function data() {
  return serialize(document.querySelector('form'))
}

describe('serialize', () => {
  it('should get values from text inputs', () => {
    form(`<input name="hello" value="bye">`)
    expect(data().hello).toBe('bye')
  })

  it('should not get values from empty text inputs', () => {
    form(`<input name="empty">`)
    expect(data().empty).toBeUndefined()
  })

  it('should not get values from empty number inputs', () => {
    form(`<input type="number" name="blank" value="">`)
    expect(data().blank).toBeUndefined()
  })

  it('should get values from number inputs', () => {
    form(`<input type="number" name="amount" value="5">`)
    expect(data().amount).toEqual(5)
  })

  it('should get values from zero number input', () => {
    form(`<input type="number" name="amount" value="0">`)
    expect(data().amount).toEqual(0)
  })

  it('should get values from multiple selects', () => {
    form(`<select multiple name="select">
      <option value="1" selected></option>
      <option value="2"></option>
    </select>`)
    expect(data().select).toEqual(['1'])
  })

  it('should not get values from empty multiple select', () => {
    form(`<select multiple name="select_empty">
      <option value=""></option>
      <option></option>
    </select>`)
    expect(data().select_empty).toBeUndefined()
  })

  it('should get values from single select', () => {
    form(`<select name="select_single">
      <option value="1" selected></option>
      <option value="2"></option>
    </select>`)
    expect(data().select_single).toBe('1')
  })

  it('should not get values from empty single select', () => {
    form(`<select name="select_single_empty">
      <option></option>
      <option value=""></option>
    </select>`)
    expect(data().select_single_empty).toBeUndefined()
  })

  it('should get values from radio buttons', () => {
    form(`<input type="radio" value="a" name="radio">
      <input type="radio" value="b" name="radio" checked>
      <input type="radio" value="c" name="radio">`)
    expect(data().radio).toEqual('b')
  })

  it('should not get values from empty radio buttons', () => {
    form(`<input type="radio" name="radio_empty">
      <input type="radio" value="" name="radio_empty">`)
    expect(data().radio_empty).toBeUndefined()
  })

  it('should get values from checkboxes', () => {
    form(`<input type="checkbox" value="1" name="check" checked>
      <input type="checkbox" value="2" name="check">`)
    expect(data().check).toEqual(['1'])
  })

  it('should not get values from empty checkboxes', () => {
    form(`<input type="checkbox" name="check_empty">
      <input type="checkbox" value="" name="check_empty">`)
    expect(data().check_empty).toBeUndefined()
  })
})