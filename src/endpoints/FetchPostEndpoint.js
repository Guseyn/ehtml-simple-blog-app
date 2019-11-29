'use strict'

const { as } = require('@cuties/cutie')
const { ResponseWithWrittenHead, EndedResponse } = require('@cuties/http')
const { Endpoint, RequestParams } = require('@cuties/rest')
const { StringifiedJSON } = require('@cuties/json')
const { Value } = require('@cuties/object')
const { IsNull } = require('@cuties/is')
const { If, Else } = require('@cuties/if-else')
const FetchedPostFromBlogStorage = require('./../async/FetchedPostFromBlogStorage')

class FetchPostEndpoint extends Endpoint {
  constructor (regexpUrl, type, blogStorage) {
    super(regexpUrl, type, blogStorage)
    this.blogStorage = blogStorage
  }

  body (request, response) {
    return new RequestParams(
      request
    ).as('REQUEST_PARAMS').after(
      new FetchedPostFromBlogStorage(
        this.blogStorage,
        new Value(
          as('REQUEST_PARAMS'),
          'id'
        )
      ).as('POST').after(
        new If(
          new IsNull(
            as('POST')
          ),
          new EndedResponse(
            new ResponseWithWrittenHead(
              response, 404, 'not found', {
                'Content-Type': 'application/json'
              }
            ),
            new StringifiedJSON(
              { error: 'post not found' }
            )
          ),
          new Else(
            new EndedResponse(
              new ResponseWithWrittenHead(
                response, 200, 'ok', {
                  'Content-Type': 'application/json'
                }
              ),
              new StringifiedJSON(
                as('POST')
              )
            )
          )
        )
      )
    )
  }
}

module.exports = FetchPostEndpoint
