import gulp from 'gulp'
import haml from 'gulp-haml'
import conf from '../config'

gulp.task('haml', function() {
  const config = conf.haml
  gulp.src(config.src)
    .pipe(haml({
      compilerOpts: {
	locals: {
	  helper: config.helper
	}
      }
    }))
    .pipe(gulp.dest(config.dest))
})
