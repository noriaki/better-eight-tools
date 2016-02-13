import jQuery from 'jquery';

jQuery(function($) {

  console.info('content_script init');
  chrome.runtime.sendMessage({ "stat": { "showicon": true } }, $.noop);
  chrome.runtime.sendMessage({ "stat": { "setup": true } }, $.noop);

  chrome.runtime.onMessage.addListener(function(req, sender, callback) {
    if(req.stat.confirm) {
      //console.info('confirm');
      chrome.runtime.sendMessage({ "stat": { "setup": true } }, $.noop);
    }
    if(req.stat.cancel) {
      //console.info('cancel');
      chrome.runtime.sendMessage({ "stat": { "hideicon": true } }, $.noop);
    }
    if(req.stat.auth_token) {
      //console.info('auth_token');
      callback($('meta[name="csrf-token"]').attr('content'));
    }
    if(req.stat.retrieve) {
      const cards_data = $('.c_list .section .prof').map(function() {
        const $this = $(this);
        return {
          full_name: $.trim($this.find('dt').text()),
          company_name: $.trim($this.find('dd.com').text()),
          department: $.trim($this.find('dd.department_and_position').text()),
          company_phone_number: $.trim($this.find('dd.tel dd').text()),
          email: $.trim($this.find('dd.mail dd').text())
        };
      }).toArray();
      callback(cards_data);
    }
  });
});
