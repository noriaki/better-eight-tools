import gulp       from 'gulp';
import plumber    from 'gulp-plumber';
import sass       from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import rename     from 'gulp-rename';
import conf       from '../config';

gulp.task('build:css', function() {
  const config = conf.css;
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: config.libs
    }))
    .pipe(rename({ suffix: config.suffix }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest));
});
