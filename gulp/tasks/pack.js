import gulp from 'gulp';
import zip  from 'gulp-zip';
import conf from '../config';

gulp.task('pack', () => {
  const config = conf.pack;
  return gulp.src(config.src)
    .pipe(zip(config.filename))
    .pipe(gulp.dest(config.dest));
});
