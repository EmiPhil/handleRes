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
  const actualHeadersSent = handleRes({ headersSent: true, json () { } }).accept()
  const expectedHeadersSent = false
  const actualHeadersNotSent = handleRes({ headersSent: false, json () { } }).accept()
  const expectedHeadersNotSent = true
  t.deepEqual(actualHeadersSent, expectedHeadersSent)
  t.deepEqual(actualHeadersNotSent, expectedHeadersNotSent)
})

test('handleRes.reject should return the value of proceed', t => {
  const actualHeadersSent = handleRes({ headersSent: true }).reject()
  const expectedHeadersSent = false
  const actualHeadersNotSent = handleRes({ headersSent: false }).reject()
  const expectedHeadersNotSent = true
  t.deepEqual(actualHeadersSent, expectedHeadersSent)
  t.deepEqual(actualHeadersNotSent, expectedHeadersNotSent)
})

test('handleRes.error should return the value of proceed', t => {
  const actualHeadersSent = handleRes({ headersSent: true }).error()
  const expectedHeadersSent = false
  const actualHeadersNotSent = handleRes({ headersSent: false }).error()
  const expectedHeadersNotSent = true
  t.deepEqual(actualHeadersSent, expectedHeadersSent)
  t.deepEqual(actualHeadersNotSent, expectedHeadersNotSent)
})

/**
 * the following function is to spy on the result of the .accept and .reject call. It is required because .accept and .reject are impure functions with side effects (we call res.json for the user instead of returning the body)
 */
const jsonResponder = target => body => { target.body = body }

test('handleRes.accept should not proceed if headersSent is true', t => {
  const actual = handleRes({ headersSent: true }).accept()
  const expected = false
  t.deepEqual(actual, expected)
})

test('handleRes.accept should use an empty object by default', t => {
  let target = {}
  handleRes({ headersSent: false, json: jsonResponder(target) }).accept()
  const actual = typeof target.body
  const expected = 'object'
  t.deepEqual(actual, expected)
})

test('handleRes.accept should assign ok to the body object', t => {
  let target = {}
  handleRes({ headersSent: false, json: jsonResponder(target) }).accept({})
  const actual = target.body
  const expected = { ok: true }
  t.deepEqual(actual, expected)
})

test('handleRes.accept should return all other body props', t => {
  let target = {}
  handleRes({ headersSent: false, json: jsonResponder(target) }).accept({
    foo: 'bar',
    bar: 'foo'
  })
  const actual = target.body
  const expected = { ok: true, foo: 'bar', bar: 'foo' }
  t.deepEqual(actual, expected)
})

test('handleRes.reject should not proceed if headersSent is true', t => {
  const actual = handleRes({ headersSent: true }).reject()
  const expected = false
  t.deepEqual(actual, expected)
})
