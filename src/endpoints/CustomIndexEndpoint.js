
'use strict'

const { CreatedReadStream } = require('@cuties/fs')
const { ResponseWithWrittenHead } = require('@cuties/http')
const { PipedReadable, ReadableWithErrorEvent } = require('@cuties/stream')
const { IndexEndpoint } = require('@cuties/rest')
const NotFoundErrorEvent = require('./../events/NotFoundErrorEvent')

class CustomIndexEndpoint extends IndexEndpoint {
  constructor (page, notFoundEndpoint) {
    super()
    this.page = page
    this.notFoundEndpoint = notFoundEndpoint
  }

  body (request, response) {
    return new PipedReadable(
      new ReadableWithErrorEvent(
        new CreatedReadStream(
          this.page
        ),
        new NotFoundErrorEvent(
          this.notFoundEndpoint, request, response
        )
      ),
      new ResponseWithWrittenHead(
        response, 200, 'ok', {
          'Cache-Control': 'no-cache',
          'Content-Type': 'text/html'
        }
      )
    )
  }
}

module.exports = CustomIndexEndpoint
