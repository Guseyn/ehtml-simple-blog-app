'use strict'

const { as } = require('@cuties/cutie')
const { Backend, RestApi, ServingFilesEndpoint } = require('@cuties/rest')
const { Created } = require('@cuties/created')
const CustomNotFoundEndpoint = require('./endpoints/CustomNotFoundEndpoint')
const CustomInternalServerErrorEndpoint = require('./endpoints/CustomInternalServerErrorEndpoint')
const CustomIndexEndpoint = require('./endpoints/CustomIndexEndpoint')
const notFoundEndpoint = new CustomNotFoundEndpoint(new RegExp(/\/not-found/))
const internalServerErrorEndpoint = new CustomInternalServerErrorEndpoint(new RegExp(/^\/internal-server-error/))
const AddPostEndpoint = require('./endpoints/AddPostEndpoint')
const FetchPostEndpoint = require('./endpoints/FetchPostEndpoint')
const AddCommentEndpoint = require('./endpoints/AddCommentEndpoint')
const FetchPostsEndpoint = require('./endpoints/FetchPostsEndpoint')
const FetchCommentsEndpoint = require('./endpoints/FetchCommentsEndpoint')
const BlogStorage = require('./storage/BlogStorage')
const path = require('path')

const mapper = (url) => {
  return path.join('src', 'static', ...url.split('?')[0].split('/').filter(path => path !== ''))
}

new Created(
  BlogStorage
).as('BLOG_STORAGE').after(
  new Backend(
    'http',
    8000,
    '127.0.0.1',
    new RestApi(
      new CustomIndexEndpoint('./src/static/html/index.html', notFoundEndpoint),
      new ServingFilesEndpoint(/^\/(html|css|js|images)(\?(.+))?/, mapper, {}, notFoundEndpoint),
      new Created(AddPostEndpoint, /^\/post\/new/, 'POST', as('BLOG_STORAGE')),
      new Created(FetchPostEndpoint, /^\/post\?index=(\d+)/, 'GET', as('BLOG_STORAGE')),
      new Created(FetchPostsEndpoint, /^\/posts(\?page=(\d+))?(&size=(\d+))?/, 'GET', as('BLOG_STORAGE')),
      new Created(AddCommentEndpoint, /^\/comment\/new\?index=(\d+)/, 'POST', as('BLOG_STORAGE')),
      new Created(FetchCommentsEndpoint, /^\/comments\?index=(\d+)(&page=(\d+))?(&size=(\d+))?/, 'GET', as('BLOG_STORAGE')),
      notFoundEndpoint,
      internalServerErrorEndpoint
    )
  )
).call()
