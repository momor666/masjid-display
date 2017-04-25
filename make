#!/usr/bin/env node

'use strict'

global.library = 'IqamaDashboard'

var command = process.argv[2],
    utils   = require('./tasks/_utils'),
    eslint  = require('./tasks/eslint'),
    minify  = require('./tasks/minify'),
    build   = require('./tasks/build'),
    watch   = require('./tasks/watch'),
    serve   = require('./tasks/serve')

/**
 * Each task required (except watch) returns a promise so you will be able to chain them as you prefer
 */

switch(command) {
  case 'serve':
    serve()
    break
  case 'eslint':
    eslint()
    break
  case 'build':
    build()
    break
  case 'watch':
    watch()
    break
  case 'minify':
    minify()
    break
  default:
    eslint()
      .then(build)
      .then(minify)
      .then(function(){
        utils.print('Project successfully compiled!', 'confirm')
      })

}
