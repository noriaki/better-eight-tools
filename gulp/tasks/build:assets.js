import gulp from 'gulp';
import conf from '../config';

function copy(config) {
  return gulp.src(config.src, { base: config.src_base })
    .pipe(gulp.dest(config.dest));
}

gulp.task('build:fonts', () => {
  copy(conf.fonts);
});

gulp.task('build:assets', ['build:fonts'], () => {
  copy(conf.assets);
});
