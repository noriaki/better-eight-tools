import gulp         from 'gulp';
import globby       from 'globby';
import _            from 'lodash';
import path         from 'path';
import co           from 'co';
import through      from 'through2';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import browserify   from 'browserify'; // transform config in package.json
import sourcemaps   from 'gulp-sourcemaps';
import * as handler from '../handler';
import conf         from '../config';

const config = conf.js;

gulp.task('build:js', function() {
  globby(config.src).then((entries) => {
    const promises = _.map(entries, (uri) => {

      return new Promise((resolve) => {

        const output_filename = [
          path.basename(uri, config.src_ext), config.suffix, config.dest_ext
        ].join('');
        const bundled_stream = through();
        bundled_stream
          .pipe(source(output_filename))
          .pipe(buffer())
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(config.dest))
          .on('end', resolve);

        browserify({
          entries: [uri],
          debug: true
        })
          .bundle()
          .on('error', handler.error)
          .pipe(bundled_stream);
      });

    });

    co(function*() { yield promises; }).catch((err) => {
      console.error(err.stack);
    });
  });
});
