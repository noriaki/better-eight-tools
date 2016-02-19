import Router from './lib/_router';

console.info('background init');

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  const router = new Router(request, sender, callback);
  router.routing();
});
