'use strict'

const { as } = require('@cuties/cutie')
const { ResponseWithWrittenHead, EndedResponse } = require('@cuties/http')
const { Endpoint, RequestParams } = require('@cuties/rest')
const { StringifiedJSON } = require('@cuties/json')
const { Value } = require('@cuties/object')
const FetchedCommentsFromPost = require('./../async/FetchedCommentsFromPost')

class FetchCommentsEndpoint extends Endpoint {
  constructor (regexpUrl, type, blogStorage) {
    super(regexpUrl, type, blogStorage)
    this.blogStorage = blogStorage
  }

  body (request, response) {
    return new RequestParams(
      request
    ).as('REQUEST_PARAMS').after(
      new EndedResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok', {
            'Content-Type': 'application/json'
          }
        ),
        new StringifiedJSON(
          new FetchedCommentsFromPost(
            this.blogStorage,
            new Value(
              as('REQUEST_PARAMS'),
              'index'
            ),
            new Value(
              as('REQUEST_PARAMS'),
              'page'
            ),
            new Value(
              as('REQUEST_PARAMS'),
              'size'
            )
          )
        )
      )
    )
  }
}

module.exports = FetchCommentsEndpoint
