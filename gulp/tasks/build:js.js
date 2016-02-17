import gulp       from 'gulp';
import globby     from 'globby';
import _          from 'lodash';
import path       from 'path';
import through    from 'through2';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';
import browserify from 'browserify'; // transform config in package.json
import sourcemaps from 'gulp-sourcemaps';
import gutil      from 'gulp-util';
import Handler    from '../handler';
import conf       from '../config';

const config = conf.js;
const handler = new Handler();

gulp.task('build:js', (done) => {
  globby(config.src).then((entries) => {
    const promises = _.map(entries, (uri) => {

      return new Promise((resolve) => {

        const output_filename = [
          path.basename(uri, config.src_ext), config.suffix, config.dest_ext
        ].join('');
        const bundled_stream = through();
        bundled_stream
          .pipe(source(output_filename))
          .on('end', () => {
            gutil.log('Building file:', gutil.colors.cyan(output_filename)); })
          .pipe(buffer())
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(config.dest))
          .on('end', () => {
            resolve(output_filename);
          });

        browserify({
          entries: [uri],
          debug: true,
          extensions: [ ".es6", ".es", ".jsx", ".js" ]
        })
          .bundle()
          .on('error', function() {
            handler.e = true;
            handler.error.apply(this, arguments);
          })
          .pipe(bundled_stream);

      });

    });

    Promise.all(promises).then(() => {
      handler.success({
        title: 'Finished build:js',
        message: '[Browserify] All files have been built.' });
      done();
    });

  });

});
