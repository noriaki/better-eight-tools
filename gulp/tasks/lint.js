import gulp    from 'gulp';
import eslint  from 'gulp-eslint';
import Handler from '../handler';
import conf    from '../config';
import debug   from 'gulp-debug';

gulp.task('lint', () => {
  const config = conf.lint;
  const handler = new Handler();
  return gulp.src(config.src)
    .pipe(debug({ title: 'lint-file:' }))
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', function() {
      handler.e = true;
      handler.error.apply(this, arguments);
    })
    .on('end', () => {
      handler.success({
        title: 'Finished lint',
        message: '[Gulp ESLint] All files have been verified.'
      });
    })
  ;
});
