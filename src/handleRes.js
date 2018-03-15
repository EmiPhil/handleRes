function handleRes (res) {
  // check if we have already responded to the request
  function proceed () {
    // if headersSent is undefined, we will return false (!true)
    var headersSent = res.hasOwnProperty('headersSent') ? res.headersSent : true
    // if we have not sent them, return true
    return !headersSent
  }

  function accept () {
    // add a truthy "ok" prop to the response body
    // check if we should proceed, then send the result
    // return the result of proceed
  }

  function reject () {
    // assign a falsey "ok" prop to the response body

    // append an error message and a status code to the body

    // check if we should proceed, then send the result

    // return the result of proceed
  }

  function error () {
    // check if we should proceed, then send an http status code

    // return the result of proceed
  }

  return {
    accept: accept,
    reject: reject,
    error: error,
    get proceed () { return proceed() }
  }
}

module.exports = handleRes
