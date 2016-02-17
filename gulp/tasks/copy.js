import gulp from 'gulp';
import conf from '../config';

gulp.task('copy', () => {
  const config = conf.copy;
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
