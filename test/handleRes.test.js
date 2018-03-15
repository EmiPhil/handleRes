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

test('handleRes should return an internal reference to the proceed method', t => {
  const actual = typeof handleRes({}).proceed
  const expected = 'boolean'
  t.deepEqual(actual, expected)
})

test('handleRes.proceed should return true if the headers have not been sent, and false if they have', t => {
  const actualHeadersSent = handleRes({ headersSent: true }).proceed
  const expectedHeadersSent = false
  const actualHeadersNotSent = handleRes({ headersSent: false }).proceed
  const expectedHeadersNotSent = true
  t.deepEqual(actualHeadersSent, expectedHeadersSent)
  t.deepEqual(actualHeadersNotSent, expectedHeadersNotSent)
})

test('handleRes.proceed should return false if the headersSent prop is undefined', t => {
  const actual = handleRes({}).proceed
  const expected = false
  t.deepEqual(actual, expected)
})

test('handleRes.accept should return the value of proceed', t => {
  const actualHeadersSent = handleRes({ headersSent: true }).accept()
  const expectedHeadersSent = false
  const actualHeadersNotSent = handleRes({ headersSent: false }).accept()
  const expectedHeadersNotSent = true
  t.deepEqual(actualHeadersSent, expectedHeadersSent)
  t.deepEqual(actualHeadersNotSent, expectedHeadersNotSent)
})
