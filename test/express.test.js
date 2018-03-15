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

app.get('/error', (req, res) => handleRes(res).error(501))

let server

test.before(t => {
  console.log('TURNING MOCK SERVER ON')
  server = app.listen(PORT)
})

test.after(t => {
  console.log('CLOSING MOCK SERVER')
  server.close()
})

test('accept endpoint', async t => {
  const res = await request.get(`${uri}/accept`)
  const actual = JSON.parse(res)
  const expected = { ok: true, foo: 'bar' }
  t.deepEqual(actual, expected)
})
