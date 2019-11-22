'use strict'

const { AsyncObject } = require('@cuties/cutie')

class FetchedPostFromBlogStorage extends AsyncObject {
  constructor (blogStorage, index) {
    super(blogStorage, index)
  }

  syncCall () {
    return (blogStorage, index) => {
      return blogStorage.getPost(index * 1)
    }
  }
}

module.exports = FetchedPostFromBlogStorage
