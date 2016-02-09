'use strict'

const dest_dir = './build'
const src_dir = './src'
const tmp_dir = './tmp'

import view_helper from '../src/views/helper'

module.exports = {
  dest: dest_dir,

  copy: {
    src: [
      tmp_dir + '/build/**/*'
    ],
    dest: dest_dir
  },

  haml: {
    helper: view_helper,
    src: src_dir + '/views/**/!(_)*.haml',
    dest: tmp_dir + '/build/'
  }
}
