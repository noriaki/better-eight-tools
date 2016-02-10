'use strict'

import gulp          from 'gulp'
import globby        from 'globby'
import _             from 'lodash'
import path          from 'path'
import co            from 'co'
import through       from 'through2'
import source        from 'vinyl-source-stream'
import buffer        from 'vinyl-buffer'
import browserify    from 'browserify'
import babelify      from 'babelify'
import uglifyify     from 'uglifyify'
import sourcemaps    from 'gulp-sourcemaps'
import handle_errors from '../error_handler'
import conf          from '../config'

const config = conf.js

gulp.task('build:js', function() {
  globby(config.src).then((entries) => {
    const promises = _.map(entries, uri => {

      return new Promise((resolve) => {
	
	let filename = path.basename(uri, '.js') + config.suffix + '.js'
	let bundled_stream = through()
	bundled_stream
	  .pipe(source(filename))
	  .pipe(buffer())
	  .pipe(sourcemaps.init({ loadMaps: true }))
	  .pipe(sourcemaps.write('./'))
	  .pipe(gulp.dest(config.dest))
	  .on('end', resolve)

	browserify({
	  entries: [uri],
	  debug: true,
	  transform: [babelify, uglifyify]
	})
	  .bundle()
	  .on('error', handle_errors)
	  .pipe(bundled_stream)
      })

    })

    co(function*() { yield promises }).catch((err) => {
      console.error(err.stack)
    }) })
})
