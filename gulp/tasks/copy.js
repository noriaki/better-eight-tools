import gulp from 'gulp'
import conf from '../config'

gulp.task('copy', ['copy:compiled', 'copy:assets'])

gulp.task('copy:compiled', function() {
  let config = conf.copy.compiled
  gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
})

gulp.task('copy:assets', function() {
  let config = conf.copy.assets
  gulp.src(config.src, { base: config.base })
    .pipe(gulp.dest(config.dest))
})
