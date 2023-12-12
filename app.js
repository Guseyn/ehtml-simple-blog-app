'use strict'

const express = require('express')
const path = require('path')

const BlogStorage = require('./BlogStorage')

const app = express()
const port = 8000

const blogStorage = new BlogStorage()

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'index.html'))
})

app.get('/post', (req, res) => {
  const id = req.query.id
  const post = blogStorage.getPost(id)
  if (!post) {
    return res.status(404).json({ message: 'Post Not Found' })
  }
  res.json(post)
})

app.get('/posts', (req, res) => {
  const page = req.query.page || 0
  const size = req.query.size || 3
  const posts = blogStorage.getPosts(page, size)
  res.json(posts)
})

app.post('/post/new', (req, res) => {
  const post = req.body
  const createdPost = blogStorage.addPost(post)
  res.json(createdPost)
})

app.post('/comment/new', (req, res) => {
  const postId = req.query.postId
  const comment = req.body
  const addedComment = blogStorage.addComment(postId, comment)
  res.json(addedComment)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
