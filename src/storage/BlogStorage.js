'use strict'

class BlogStorage {
  constructor () {
    this.posts = []
  }

  addPost (post) {
    this.posts.push(post)
    return {
      index: this.posts.length - 1,
      userEmail: post.userEmail,
      title: post.title,
      date: post.date,
      content: post.content
    }
  }

  addComment (index, comment) {
    if (!this.posts[index]) {
      return null
    }
    this.posts[index].comments = this.posts[index].comments || []
    this.posts[index].comments.unshift(comment)
    return comment
  }

  getPost (index) {
    if (!this.posts[index]) {
      return null
    }
    return {
      userEmail: this.posts[index].userEmail,
      title: this.posts[index].title,
      date: this.posts[index].date,
      content: this.posts[index].content
    }
  }

  getPosts (page = 0, size = 3) {
    return this.posts
      .slice(page * size, (page + 1) * size)
      .map(
        (post) => {
          return {
            userEmail: post.userEmail,
            title: post.title,
            date: post.date,
            content: post.content
          }
        }
      )
  }

  getComments (index, page = 0, size = 3) {
    const post = this.posts[index]
    if (post) {
      return {
        userEmail: post.userEmail,
        title: post.title,
        date: post.date,
        content: post.content,
        comments: post.comments.slice(page * size, (page + 1) * size)
      }
    }
    return null
  }
}

module.exports = BlogStorage
