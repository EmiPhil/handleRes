function handleRes () {
  // check if we have already responded to the request

  // if we have, send a warning log and do nothing

  // otherwise, return true

  function accept () {
    // add a truthy "ok" prop to the response body
    // check if we should proceed, then send the result
  }

  function reject () {
    // assign a falsey "ok" prop to the response body

    // append an error message and a status code to the body

    // check if we should proceed, then send the result

    // return the result of proceed
  }

  return {
    accept: accept,
    reject: reject
  }
}

module.exports = handleRes
