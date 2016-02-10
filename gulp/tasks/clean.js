'use strict'

import gulp from 'gulp'
import del from 'del'
import vinyl_paths from 'vinyl-paths'
import conf from '../config'

gulp.task('clean', ['clean:build', 'clean:tmp'])

const clean = (paths) => {
  gulp.src(paths, { base: conf.clean.src_base })
    .pipe(vinyl_paths(del))
}

gulp.task('clean:build', function() {
  clean(conf.clean.build.src)
})

gulp.task('clean:tmp', function() {
  clean(conf.clean.tmp.src)
})
