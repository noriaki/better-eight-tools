import gulp from 'gulp'
import conf from '../config'

gulp.task('copy', function() {
  const config = conf.copy
  gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
})
