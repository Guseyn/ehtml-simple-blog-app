'use strict'

const { ResponseWithWrittenHead, EndedResponse } = require('@cuties/http')
const { Endpoint, RequestBody } = require('@cuties/rest')
const { ParsedJSON, StringifiedJSON } = require('@cuties/json')
const { StringFromBuffer } = require('@cuties/buffer')
const AddedPostToBlogStorage = require('./../async/AddedPostToBlogStorage')

class AddPostEndpoint extends Endpoint {
  constructor (regexpUrl, type, blogStorage) {
    super(regexpUrl, type, blogStorage)
    this.blogStorage = blogStorage
  }

  body (request, response) {
    return new EndedResponse(
      new ResponseWithWrittenHead(
        response, 200, 'ok', {
          'Content-Type': 'application/json'
        }
      ),
      new StringifiedJSON(
        new AddedPostToBlogStorage(
          this.blogStorage,
          new ParsedJSON(
            new StringFromBuffer(
              new RequestBody(request)
            )
          )
        )
      )
    )
  }
}

module.exports = AddPostEndpoint
