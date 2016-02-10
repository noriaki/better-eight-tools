'use strict'

import gulp       from 'gulp'
import plumber    from 'gulp-plumber'
import sass       from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import conf       from '../config'

gulp.task('build:css', function() {
  const config = conf.scss
  gulp.src(config.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
})
