'use strict'

import gulp from 'gulp'
import sync from 'gulp-npm-script-sync'

gulp.task('npm:sync', function() {
  sync(gulp)
})

