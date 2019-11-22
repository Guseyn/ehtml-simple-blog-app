'use strict'

const { AsyncObject } = require('@cuties/cutie')

class AddedPostToBlogStorage extends AsyncObject {
  constructor (blogStorage, post) {
    super(blogStorage, post)
  }

  syncCall () {
    return (blogStorage, post) => {
      return blogStorage.addPost(post)
    }
  }
}

module.exports = AddedPostToBlogStorage
