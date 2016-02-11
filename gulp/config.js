const dest_base_dir = './build';
const src_base_dir = './src';
const dest_dir = dest_base_dir + '/release';
const src_dir = src_base_dir;
const tmp_dir = './tmp';

import view_helper from '../src/views/helper';

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
      src_base: src_base_dir,
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
  },

  scss: {
    src: src_dir + '/scss/**/!(_)*.scss',
    dest: tmp_dir + '/build/css/'
  },

  js: {
    src: src_dir + '/jsx/**/!(_)*.jsx',
    dest: tmp_dir + '/build/js/',
    src_ext: '.jsx',
    dest_ext: '.js',
    suffix: '.bundle'
  },

  lint: {
    src: [
      src_dir + '/jsx/**/*.js?(x)',
      './gulpfile*.js',
      './gulp/**/*.js'
    ]
  }
};
