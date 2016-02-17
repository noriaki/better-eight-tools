const dest_base_dir = './build';
const src_base_dir  = './src';
const dest_dir      = dest_base_dir + '/release';
const src_dir       = src_base_dir;
const tmp_dir       = './tmp';
const bower_dir     = './bower_components';

import 'babel-register';
import path        from 'path';
import haml_helper from './haml_helper';

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

  fonts: {
    src: [
      bower_dir + '/bootstrap-sass/assets/fonts/bootstrap/*'
    ],
    dest: tmp_dir + '/build/css/fonts'
  },

  html: {
    helper: haml_helper,
    src: src_dir + '/haml/**/!(_|.)*.haml',
    dest: tmp_dir + '/build/html/',
    watch_options: [
      src_dir + '/haml/',
      '--ignoreDotFiles',
      '--wait=0.5'
    ].join(' ')
  },

  css: {
    src: src_dir + '/scss/**/!(_|.)*.scss',
    dest: tmp_dir + '/build/css/',
    suffix: '.bundle',
    libs: [
      bower_dir + '/bootstrap-sass/assets/stylesheets/'
    ],
    watch_options: [
      src_dir + '/scss/',
      '--ignoreDotFiles',
      '--wait=0.5'
    ].join(' ')
  },

  js: {
    src: src_dir + '/jsx/**/!(_|.)*.jsx',
    dest: tmp_dir + '/build/js/',
    src_ext: '.jsx',
    dest_ext: '.js',
    suffix: '.bundle',
    watch_options: [
      src_dir + '/jsx/',
      '--ignoreDotFiles',
      '--wait=0.5'
    ].join(' ')
  },

  lint: {
    src: [
      src_dir + '/jsx/**/*.js?(x)',
      './gulpfile*.js',
      './gulp/**/*.js'
    ]
  },

  pack: {
    src: dest_dir + '/**',
    filename: path.basename(dest_dir) + '.zip',
    dest: dest_base_dir
  }
};
