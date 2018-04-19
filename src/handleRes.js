/**
 * The primary constructor for the handleRes methods.
 * @name handleRes
 * @since 1.1.0
 * @module handleRes
 * @param {object} res - The response object from an Express app or similar
 * @returns {object} An object containing the .accept, and .reject methods, and the .proceed getter.
 * @example
 * const handleRes = require('handle-res')
 * const express = require('express')
 *
 * const app = express()
 *
 * app.route('/', function (req, res) {
 *   // direct chain
 *   handleRes(res).accept({})
 *
 *   // or partial
 *   const handler = handleRes(res)
 *   // ...later
 *   handler.accept({})
 * })
 */
function handleRes (res) {
  /**
   * A mostly internal function that determines if we have already sent headers.
   * @name proceed
   * @since 1.1.0
   * @returns {boolean} true means that we have not sent headers, so proceed to respond; false means we have, so don't
   * @example
   * handleRes(res).proceed // either true or false
   * // true - we have not sent headers, so proceed to send a response
   * // false - we have sent headers, so do not send a response
   */
  function proceed () {
    // if headersSent is undefined, we will return false (!true)
    var headersSent = typeof res.headersSent === 'boolean' ? res.headersSent : true
    // if we have not sent them, return true
    return !headersSent
  }

  /**
   * Send an http response with the givin status code and append a truthy ok prop to the response body
   * @name accept
   * @kind function
   * @since 1.1.0
   * @param {object} [body={}] - The json object to send in the response
   * @param {number|string} [status=200] - The HTTP status code to return to client
   * @returns {boolean} true means that the response was sent, false means it was not. This method will only return false if a response has already been sent for the request.
   * @example
   * handleRes(res).accept({
   *   foo: 'bar'
   * })
   *
   * // will execute res.status(200).json({ ok: true, foo: bar })
   */
  function accept (body, status) {
    // check if we should proceed. If not, return false
    if (!proceed()) return false
    // use 200 status if no status is provided
    status = status || 200
    // use an empty object if no body is provided
    body = body || {}
    // add a truthy "ok" prop to the response body
    body.ok = true
    res.status(status).json(body)
    return true
  }

  /**
   * Send an http response with status code 200 and append a falsey ok prop to the response body. Useful for known errors. The message, status, and trace are meant to help define what went wrong so that client code can display meaningful errors to the user. **Note** that client code *must* check for .ok to be true or false, because the http status code will be 200.
   * @name reject
   * @kind function
   * @since 1.1.0
   * @param {string} [message=''] - The message string to append to the body
   * @param {number|string} [status=500] - The status code to append to the body
   * @param {object} [trace={}] - The trace object to append to the body
   * @returns {boolean} true means that the response was sent, false means it was not. This method will only return false if a response has already been sent for the request.
   * @example
   * handleRes(res).reject('Wrong password', 401, { email: '' })
   * // will execute res.status(401).json({ ok: false, message: 'Wrong password', status: 401, trace: { email: '' } })
   */
  function reject (message, status, trace) {
    // check if we should proceed. If not, return false
    if (!proceed()) return false
    // use 500 status if no status is provided
    status = status || 500
    // assign a falsey "ok" prop to the response body
    // append an error message, status code, and a trace object to the body
    var body = {
      ok: false,
      // default to an empty message
      message: message || '',
      // default to the 500 status code
      status: status,
      // default to an empty trace object
      trace: trace || {}
    }
    res.status(status).json(body)
    return true
  }

  return {
    accept: accept,
    reject: reject,
    get proceed () { return proceed() }
  }
}

module.exports = handleRes
