import gulp from 'gulp';
import conf from '../config';

gulp.task('build:assets', () => {
  const config = conf.assets;
  gulp.src(config.src, { base: config.src_base })
    .pipe(gulp.dest(config.dest));
});
