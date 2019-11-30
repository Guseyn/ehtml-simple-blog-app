'use strict'

class BlogStorage {
  constructor () {
    this.posts = []
    this.postCount = 0
  }

  addPost (post) {
    post.comments = []
    post.id = this.postCount
    this.posts.unshift(post)
    this.postCount += 1
    return post
  }

  addComment (id, comment) {
    id = id * 1
    const post = this.posts.find(p => p.id === id)
    if (!post) {
      return null
    }
    comment.postId = post.id
    post.comments.push(comment)
    return comment
  }

  getPost (id, page = 0, size = 3) {
    id = id * 1 
    const post = this.posts.find(p => p.id === id)
    if (!post) {
      return null
    }
    return post
  }

  getPosts (page = 0, size = 3) {
    const response = { }
    page = page * 1
    size = size * 1
    response.posts = this.posts
      .slice(page * size, (page + 1) * size)
      .map(
        (post) => {
          return {
            id: post.id,
            userEmail: post.userEmail,
            title: post.title,
            date: post.date,
            content: post.content
          }
        }
      )
    response.lastPage = (page + 1) * size >= this.posts.length
    return response
  }
}

module.exports = BlogStorage
