const test = require('ava')
const handleRes = require('../src/handleRes')

test('Module loads', t => {
  const actual = typeof handleRes
  const expected = 'function'
  t.deepEqual(actual, expected)
})

test('handleRes should return the "accept" method', t => {
  const actual = typeof handleRes().accept
  const expected = 'function'
  t.deepEqual(actual, expected)
})

test('handleRes should return the "reject" method', t => {
  const actual = typeof handleRes().reject
  const expected = 'function'
  t.deepEqual(actual, expected)
})

test('handleRes should return the "error" method', t => {
  const actual = typeof handleRes().error
  const expected = 'function'
  t.deepEqual(actual, expected)
})
