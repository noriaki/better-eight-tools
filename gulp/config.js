'use strict'

const dest_base_dir = './build'
const src_base_dir = './src'
const dest_dir = dest_base_dir + '/release'
const src_dir = src_base_dir
const tmp_dir = './tmp'

import view_helper from '../src/views/helper'

module.exports = {
  dest: dest_dir,
  src: src_dir,
  tmp: tmp_dir,

  dest_base: dest_base_dir,
  src_base: src_base_dir,

  clean: {
    src_base: '.',
    build: {
      src: dest_base_dir + '/*'
    },
    tmp: {
      src: tmp_dir + '/build/*'
    }
  },

  copy: {
    compiled: {
      src: [
	tmp_dir + '/build/**/*'
      ],
      dest: dest_dir 
    },
    assets: {
      base: src_base_dir,
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
    dest: tmp_dir + '/build/html/'
  }
}
