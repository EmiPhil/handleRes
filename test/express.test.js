const test = require('ava')
const express = require('express')
const request = require('request-promise-native')
const handleRes = require('../src/handleRes')

const app = express()

const PORT = 3623
const uri = `http://localhost:${PORT}`

app.get('/accept', (req, res) => handleRes(res).accept({ foo: 'bar' }))

app.get('/reject', (req, res) => handleRes(res).reject('Bad request', '900', {
  route: req.originalUrl
}))

app.get('/reject_2', (req, res) => handleRes(res).reject('', 900, {}))

app.get('/error', (req, res) => handleRes(res).error(501))

app.get('/multiple_accept', (req, res) => {
  handleRes(res).accept()
  handleRes(res).accept()
})

app.get('/multiple_reject', (req, res) => {
  handleRes(res).reject()
  handleRes(res).reject()
})

app.get('/multiple_error', (req, res) => {
  handleRes(res).error()
  handleRes(res).error()
})

let server

test.before(t => {
  console.log('TURNING MOCK SERVER ON')
  server = app.listen(PORT)
})

test.after(t => {
  console.log('TURNING MOCK SERVER OFF')
  server.close()
})

test('accept endpoint should work', async t => {
  const res = await request.get(`${uri}/accept`)
  const actual = JSON.parse(res)
  const expected = { ok: true, foo: 'bar' }
  t.deepEqual(actual, expected)
})

test('reject endpoint should work with string error', async t => {
  const res = (await t.throws(request.get(`${uri}/reject`))).error
  const actual = JSON.parse(res)
  const expected = {
    ok: false,
    message: 'Bad request',
    status: '900',
    trace: {
      route: '/reject'
    }
  }
  t.deepEqual(actual, expected)
})

test('reject endpoint should work with numerical error', async t => {
  const res = (await t.throws(request.get(`${uri}/reject_2`))).error
  const actual = JSON.parse(res)
  const expected = {
    ok: false,
    message: '',
    status: 900,
    trace: {}
  }
  t.deepEqual(actual, expected)
})

test('error endpoint should work', async t => {
  const actual = (await t.throws(request.get(`${uri}/error`))).message
  const expected = '501 - "Not Implemented"'
  t.deepEqual(actual, expected)
})

test('Multiple attempts to accept should not throw an error', async t => {
  const res = await request.get(`${uri}/multiple_accept`)
  const actual = JSON.parse(res)
  const expected = { ok: true }
  t.deepEqual(actual, expected)
})

test('Multiple attempts to reject should not throw an error', async t => {
  const res = (await t.throws(request.get(`${uri}/multiple_reject`))).error
  const actual = JSON.parse(res)
  const expected = { ok: false, message: '', status: 500, trace: {} }
  t.deepEqual(actual, expected)
})

test('Multiple attempts to error should not throw an error', async t => {
  const actual = (await t.throws(request.get(`${uri}/multiple_error`))).message
  const expected = '500 - "Internal Server Error"'
  t.deepEqual(actual, expected)
})
