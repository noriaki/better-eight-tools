//import through from 'through2';
import path     from 'path';
import notify   from 'gulp-notify';
import notifier from 'node-notifier';

export default class Handler {
  constructor() {
    this.e = null;
  }

  error() { // should call bind(error context)
    const args = Array.prototype.slice.call(arguments);
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end');
  }

  success(options) {
    if(this.e === null) {
      const default_options = {
        "title": 'success', "message": 'task',
        "onLast": true, "subtitle": 'success',
        "icon": path.resolve('./node_modules/gulp-notify/assets/gulp.png')
      };
      options = Object.assign({}, default_options, options);
      notifier.notify(options, (e,r) => { console.log(e,r); });
    }
  }
}
