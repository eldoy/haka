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

  it('should not get values from empty set text inputs', () => {
    form(`<input name="empty" value="">`)
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

  it('should get empty from text field with empty number type', () => {
    form(`<input name="hello" data-type="number">`)
    expect(data().hello).toBeUndefined()
  })

  it('should get number from text field with number type', () => {
    form(`<input name="hello" data-type="number" value="5">`)
    expect(data().hello).toBe(5)
  })

  it('should be true with bool type string true', () => {
    form(`<input name="hello" data-type="bool" value="true">`)
    expect(data().hello).toBe(true)
  })

  it('should be true with bool type string 1', () => {
    form(`<input name="hello" data-type="bool" value="1">`)
    expect(data().hello).toBe(true)
  })

  it('should be true with bool type string on', () => {
    form(`<input name="hello" data-type="bool" value="on">`)
    expect(data().hello).toBe(true)
  })

  it('should be false with bool type string false', () => {
    form(`<input name="hello" data-type="bool" value="false">`)
    expect(data().hello).toBe(false)
  })

  it('should be false with bool type string 0', () => {
    form(`<input name="hello" data-type="bool" value="0">`)
    expect(data().hello).toBe(false)
  })

  it('should be false with bool type string off', () => {
    form(`<input name="hello" data-type="bool" value="off">`)
    expect(data().hello).toBe(false)
  })

  it('should get default value from text inputs', () => {
    form(`<input name="hello" data-default="hello">`)
    expect(data().hello).toBe('hello')
  })

  it('should get default empty value from text inputs', () => {
    form(`<input name="hello" data-default="">`)
    expect(data().hello).toBe('')
  })
})