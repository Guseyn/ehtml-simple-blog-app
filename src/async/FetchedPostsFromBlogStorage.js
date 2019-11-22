'use strict'

const { AsyncObject } = require('@cuties/cutie')

class FetchedPostsFromBlogStorage extends AsyncObject {
  constructor (blogStorage, page, size) {
    super(blogStorage, page, size)
  }

  syncCall () {
    return (blogStorage, page, size) => {
      return blogStorage.getPosts(page, size)
    }
  }
}

module.exports = FetchedPostsFromBlogStorage
