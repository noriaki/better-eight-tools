import notify from 'gulp-notify';
export default function handle_errors() {
  const args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error %>'
  }).apply(this, args);
  this.emit('end');
}
