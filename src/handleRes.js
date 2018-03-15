function handleRes (res) {
  // check if we have already responded to the request
  function proceed () {
    // if headersSent is undefined, we will return false (!true)
    var headersSent = res.hasOwnProperty('headersSent') ? res.headersSent : true
    // if we have not sent them, return true
    return !headersSent
  }

  function accept (body) {
    // check if we should proceed. If not, return false
    if (!proceed()) return false
    // use an empty object if no body is provided
    body = body || {}
    // add a truthy "ok" prop to the response body
    body.ok = true
    res.json(body)
    return true
  }

  function reject (message, status, trace) {
    // check if we should proceed. If not, return false
    if (!proceed()) return false
    // assign a falsey "ok" prop to the response body
    // append an error message, status code, and a trace object to the body
    var body = {
      ok: false,
      // default to an empty message
      message: message || '',
      // default to the 500 status code
      status: status || 500,
      // default to an empty trace object
      trace: trace || {}
    }
    res.json(body)
    return true
  }

  function error (status) {
    // check if we should proceed. If not, return false
    if (!proceed()) return false
    // send status code 500 by default
    res.sendStatus(status || 500)
    return true
  }

  return {
    accept: accept,
    reject: reject,
    error: error,
    get proceed () { return proceed() }
  }
}

module.exports = handleRes
