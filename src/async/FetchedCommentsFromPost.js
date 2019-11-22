'use strict'

const { AsyncObject } = require('@cuties/cutie')

class FetchedCommentsFromPost extends AsyncObject {
  constructor (blogStorage, index, page, size) {
    super(blogStorage, index, page, size)
  }

  syncCall () {
    return (blogStorage, index, page, size) => {
      return blogStorage.getComments(index, page, size)
    }
  }
}

module.exports = FetchedCommentsFromPost
