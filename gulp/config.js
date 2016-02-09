'use strict'

const dest_dir = './build'
const src_dir = './src'
const tmp_dir = './tmp'

import view_helper from '../src/views/helper'

module.exports = {
  dest: dest_dir,
  src: src_dir,
  tmp: tmp_dir,

  copy: {
    compiled: {
      src: [
	tmp_dir + '/build/**/*'
      ],
      dest: dest_dir
    },
    assets: {
      src: [
	src_dir + '/icons/**/*',
	src_dir + '/images/**/*',
	src_dir + '/manifest.json'
      ],
      dest: dest_dir
    }
  },

  haml: {
    helper: view_helper,
    src: src_dir + '/views/**/!(_)*.haml',
    dest: tmp_dir + '/build/'
  }
}
