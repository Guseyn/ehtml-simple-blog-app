'use strict'

const { ResponseWithWrittenHead, EndedResponse } = require('@cuties/http')
const { Endpoint, RequestBody, RequestParams } = require('@cuties/rest')
const { ParsedJSON, StringifiedJSON } = require('@cuties/json')
const { StringFromBuffer } = require('@cuties/buffer')
const { Value } = require('@cuties/object')
const AddedCommentToPost = require('./../async/AddedCommentToPost')

class AddCommentEndpoint extends Endpoint {
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
        new AddedCommentToPost(
          this.blogStorage,
          new ParsedJSON(
            new StringFromBuffer(
              new RequestBody(request)
            )
          ),
          new Value(
            new RequestParams(
              request
            ),
            'index'
          )
        )
      )
    )
  }
}

module.exports = AddCommentEndpoint
