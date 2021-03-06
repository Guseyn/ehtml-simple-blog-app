'use strict'

const { 
  ExecutedLint
} = require('@cuties/wall')

new ExecutedLint(
  process,
  './src/async',
  './src/endpoints',
  './src/events',
  './src/model',
  './src/storage',
  './src/app.js'
).call()
