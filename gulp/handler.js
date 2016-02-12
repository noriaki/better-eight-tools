//import through from 'through2';
import notify  from 'gulp-notify';

function error() {
  const args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
}

function success(options) {
  options.onLast = true;
  options.subtitle = 'success';
  return notify(options);
}

export { error, success };
