/**
* @jest-environment jsdom
*/

const { store } = require('../index.js')

describe('store', () => {
  beforeEach(() => {
    store('name', null)
  })

  it('should clear store', () => {
    store('name', 'hello')
    store('bye', 'bye')
    const result = store()
    expect(store('name')).toBeUndefined()
    expect(store('bye')).toBeUndefined()
  })

  it('should set and get stores for simple values', () => {
    let result = store('name', 'hello')
    expect(result).toBe('hello')
    expect(store('name')).toBe('hello')
    expect(store('name')).toBe('hello')
    result = store('name', 1)
    expect(result).toBe(1)
    expect(store('name')).toBe(1)
    expect(store('name')).toBe(1)
    result = store('name', '')
    expect(result).toBe('')
    expect(store('name')).toBe('')
  })

  it('should set and get values for objects', () => {
    let result = store('name', { hello: 'master' })
    expect(result).toEqual({ hello: 'master' })
    expect(store('name')).toEqual({ hello: 'master' })
    result = store('name', [1, 2, 'bye'])
    expect(result).toEqual([1, 2, 'bye'])
    expect(store('name')).toEqual([1, 2, 'bye'])
    store('name', { name: '' })
    expect(store('name')).toEqual({ name: '' })
  })

  it('should delete store values', () => {
    store('name', 'hello')
    expect(store('name')).toBe('hello')
    store('name', null)
    expect(store('name')).toBeUndefined()
  })
})