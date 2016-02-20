import utils from './lib/_utils';
import b     from './lib/_browser';

console.info('content_script init');
chrome.runtime.sendMessage("icon/show", () => {});
chrome.runtime.sendMessage("setup", () => {});

chrome.runtime.onMessage.addListener(function(req, sender, callback) {
  if(req.stat.auth_token) {
    //console.info('auth_token');
    const auth_token = document.querySelector('meta[name="csrf-token"]')
                               .getAttribute('content');
    callback(auth_token);
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
