'use strict'

const { AsyncObject } = require('@cuties/cutie')

class AddedCommentToPost extends AsyncObject {
  constructor (blogStorage, comment, index) {
    super(blogStorage, comment, index)
  }

  syncCall () {
    return (blogStorage, comment, index) => {
      return blogStorage.addComment(index, comment)
    }
  }
}

module.exports = AddedCommentToPost
