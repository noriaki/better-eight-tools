const dest_base_dir = './build';
const src_base_dir = './src';
const dest_dir = dest_base_dir + '/release';
const src_dir = src_base_dir;
const tmp_dir = './tmp';

import view_helper from '../src/haml/helper';
import path        from 'path';

module.exports = {
  dest: dest_dir,
  src: src_dir,
  tmp: tmp_dir,

  dest_base: dest_base_dir,
  src_base: src_base_dir,

  clean: {
    build: {
      src: [ dest_base_dir ]
    },
    tmp: {
      src: [ tmp_dir + '/build' ]
    }
  },

  copy: {
    src: [
      tmp_dir + '/build/**/*'
    ],
    dest: dest_dir
  },

  assets: {
    src_base: src_base_dir,
    src: [
      src_dir + '/icons/**/*.png',
      src_dir + '/images/**/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}',
      src_dir + '/manifest.json'
    ],
    dest: tmp_dir + '/build',
    watch_options: [
      src_dir + '/icons',
      src_dir + '/images',
      src_dir + '/manifest.json',
      '--ignoreDotFiles',
      '--ignoreUnreadable'
    ].join(' ')
  },

  html: {
    helper: view_helper,
    src: src_dir + '/haml/**/!(_|.)*.haml',
    dest: tmp_dir + '/build/html/',
    watch_options: [src_dir, '/haml/', ' --ignoreDotFiles'].join('')
  },

  css: {
    src: src_dir + '/scss/**/!(_|.)*.scss',
    dest: tmp_dir + '/build/css/',
    watch_options: [src_dir, '/scss/', ' --ignoreDotFiles'].join('')
  },

  js: {
    src: src_dir + '/jsx/**/!(_|.)*.jsx',
    dest: tmp_dir + '/build/js/',
    watch_options: [src_dir, '/jsx/', ' --ignoreDotFiles'].join(''),
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
  },

  pack: {
    src: dest_dir + '/*',
    filename: path.basename(dest_dir) + '.zip',
    dest: dest_base_dir
  }
};
