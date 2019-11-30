'use strict'

const { AsyncObject } = require('@cuties/cutie')

class AddedCommentToPost extends AsyncObject {
  constructor (blogStorage, comment, id) {
    super(blogStorage, comment, id)
  }

  syncCall () {
    return (blogStorage, comment, id) => {
      return blogStorage.addComment(id, comment)
    }
  }
}

module.exports = AddedCommentToPost
