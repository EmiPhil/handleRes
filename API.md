<a name="module_handleRes"></a>

## handleRes ⇒ <code>object</code>
The primary constructor for the handleRes methods.

**Returns**: <code>object</code> - An object containing the .accept, .reject, and .error methods, and the .proceed getter.  
**Since**: 1.1.0  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | The response object from an Express app or similar |

**Example**  
```js
const handleRes = require('handle-res')
const express = require('express')

const app = express()

app.route('/', function (req, res) {
  // direct chain
  handleRes(res).accept({})

  // or partial
  const handler = handleRes(res)
  // ...later
  handler.accept({})
})
```

* [handleRes](#module_handleRes) ⇒ <code>object</code>
    * [~proceed](#module_handleRes..proceed) ⇒ <code>boolean</code>
    * [~accept([body])](#module_handleRes..accept) ⇒ <code>boolean</code>
    * [~reject([message], [status], [trace])](#module_handleRes..reject) ⇒ <code>boolean</code>
    * [~error([status])](#module_handleRes..error) ⇒ <code>boolean</code>

<a name="module_handleRes..proceed"></a>

### handleRes~proceed ⇒ <code>boolean</code>
A mostly internal function that determines if we have already sent headers.

**Kind**: inner property of [<code>handleRes</code>](#module_handleRes)  
**Returns**: <code>boolean</code> - true means that we have not sent headers, so proceed to respond; false means we have, so don't  
**Since**: 1.1.0  
**Example**  
```js
handleRes(res).proceed // either true or false
// true - we have not sent headers, so proceed to send a response
// false - we have sent headers, so do not send a response
```
<a name="module_handleRes..accept"></a>

### handleRes~accept([body]) ⇒ <code>boolean</code>
Send an http response with status code 200 and append a truthy ok prop to the response body

**Kind**: inner method of [<code>handleRes</code>](#module_handleRes)  
**Returns**: <code>boolean</code> - true means that the response was sent, false means it was not. This method will only return false if a response has already been sent for the request.  
**Since**: 1.1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [body] | <code>object</code> | <code>{}</code> | The json object to send in the response |

**Example**  
```js
handleRes(res).accept({
  foo: 'bar'
})

// will execute res.json({ ok: true, foo: bar })
```
<a name="module_handleRes..reject"></a>

### handleRes~reject([message], [status], [trace]) ⇒ <code>boolean</code>
Send an http response with status code 200 and append a falsey ok prop to the response body. Useful for known errors. The message, status, and trace are meant to help define what went wrong so that client code can display meaningful errors to the user. **Note** that client code *must* check for .ok to be true or false, because the http status code will be 200.

**Kind**: inner method of [<code>handleRes</code>](#module_handleRes)  
**Returns**: <code>boolean</code> - true means that the response was sent, false means it was not. This method will only return false if a response has already been sent for the request.  
**Since**: 1.1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [message] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | The message string to append to the body |
| [status] | <code>number</code> \| <code>string</code> | <code>500</code> | The status code to append to the body |
| [trace] | <code>object</code> | <code>{}</code> | The trace object to append to the body |

**Example**  
```js
handleRes(res).reject('Wrong password', 401, { email: '' })
// will execute res.json({ ok: false, message: 'Wrong password', status: 401, trace: { email: '' } })
```
<a name="module_handleRes..error"></a>

### handleRes~error([status]) ⇒ <code>boolean</code>
Send an http response with the specified status and default http headers for the code if present, or however the http framework handles non-standard codes otherwise (see http://expressjs.com/en/api.html#res.sendStatus for express specific handling of non-standard errors). This method should only be used as a catch-all - ideally you implement specific behaviour for all known error cases using reject so that the client application can gracefully handle them.

**Kind**: inner method of [<code>handleRes</code>](#module_handleRes)  
**Returns**: <code>boolean</code> - true means that the response was sent, false means it was not. This method will only return false if a response has already been sent for the request.  
**Since**: 1.1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [status] | <code>number</code> | <code>500</code> | The http status code to send. It is highly recommended to use the standard codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status |

**Example**  
```js
handleRes(res).error(503)
// will execute res.sendStatus(503)
```
