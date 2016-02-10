'use strict'

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import haml from 'gulp-haml'
import prettify from 'gulp-prettify'
import conf from '../config'

gulp.task('build:html', function() {
  const config = conf.haml
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(haml({
      compilerOpts: {
	locals: {
	  helper: config.helper
	}
      }
    }))
    .pipe(prettify())
    .pipe(gulp.dest(config.dest))
})
