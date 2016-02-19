import utils from './lib/_utils';
import b     from './lib/_browser';

console.info('content_script init');
chrome.runtime.sendMessage("icon/show", () => {});
chrome.runtime.sendMessage("setup", () => {});

chrome.runtime.onMessage.addListener(function(req, sender, callback) {
  if(req.stat.confirm) {
    //console.info('confirm');
    chrome.runtime.sendMessage("setup", () => {});
  }
  if(req.stat.cancel) {
    //console.info('cancel');
    chrome.runtime.sendMessage("icon/hide", () => {});
  }
  if(req.stat.auth_token) {
    //console.info('auth_token');
    callback(document.querySelector('meta[name="csrf-token"]')
                     .getAttribute('content'));
  }
  if(req.stat.retrieve) {
    callback(utils.map(b.classes('crd-ttl'), (elm) => {
      return {
        "full_name": b.classes('ttl', elm)[0].textContent.trim(),
        "company_name": b.tags(
          'em', b.classes('op', elm)[0])[0].textContent.trim()
      };
    }));
  }
});
