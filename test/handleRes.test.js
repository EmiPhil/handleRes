const test = require('ava')
const handleRes = require('../src/handleRes')

test('Module loads', t => {
  const actual = typeof handleRes
  const expected = 'function'
  t.deepEqual(actual, expected)
})
