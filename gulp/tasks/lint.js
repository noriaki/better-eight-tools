import gulp          from 'gulp';
import eslint        from 'gulp-eslint';
import handle_errors from '../error_handler';
import conf          from '../config';

import debug         from 'gulp-debug';

gulp.task('lint', () => {
  const config = conf.lint;
  gulp.src(config.src)
    .pipe(debug())
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', handle_errors);
});
