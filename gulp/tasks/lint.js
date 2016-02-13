import gulp         from 'gulp';
import eslint       from 'gulp-eslint';
import * as handler from '../handler';
import conf         from '../config';
import debug        from 'gulp-debug';

gulp.task('lint', () => {
  const config = conf.lint;
  console.log(handler);
  gulp.src(config.src)
    .pipe(debug())
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', handler.error)
    //.pipe(handler.success({ title: 'Gulp ESLint' }))
  ;
});
