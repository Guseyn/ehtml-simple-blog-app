'use strict'

const { ResponseWithWrittenHead, EndedResponse } = require('@cuties/http')
const { Endpoint, RequestParams } = require('@cuties/rest')
const { StringifiedJSON } = require('@cuties/json')
const { Value } = require('@cuties/object')
const FetchedPostFromBlogStorage = require('./../async/FetchedPostFromBlogStorage')

class FetchPostEndpoint extends Endpoint {
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
        new FetchedPostFromBlogStorage(
          this.blogStorage,
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

module.exports = FetchPostEndpoint
