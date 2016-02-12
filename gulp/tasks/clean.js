import gulp        from 'gulp';
import del         from 'del';
import conf        from '../config';

/*
 * replace with npm run build
 * (because run-script with pre, post scripts)
 */
//gulp.task('clean', ['clean:build', 'clean:tmp']);

gulp.task('clean:build', del.bind(null ,conf.clean.build.src));
gulp.task('clean:tmp', del.bind(null, conf.clean.tmp.src));
