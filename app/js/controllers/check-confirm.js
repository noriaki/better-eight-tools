function ConfirmChecker() {
  this.check_point_uri = 'is_confirmed';
};

jQuery.extend(ConfirmChecker.prototype, {
  check: function() {
    var d = jQuery.Deferred();
    var self = this;
    var key = {}; key[this.check_point_uri] = false;
    chrome.storage.sync.get(key, function(ret) {
      ret[self.check_point_uri] ? d.resolve() : d.reject();
    });
    return d.promise();
  },
  set: function(value) {
    var key = {}; key[this.check_point_uri] = value === undefined ? true : value;
    chrome.storage.sync.set(key);
  }
});

jQuery(function($) {
  var view_confirm = "/app/views/confirm.html";
  if(document.location.pathname === view_confirm) {
    ga('set', 'page', view_confirm);
    ga('send', 'pageview');

    //console.info("confirm.html");
    $('#confirm').on('click', function(e) {
      (new ConfirmChecker()).set(true);
      //console.info('set confirm and reinitialize');
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, { "stat": { "confirm": true } }, $.noop);
      });

      ga('send', 'event', 'confirmation', 'confirm');

      //console.log('confirm:window.close()');
      $(this).find('span').show();
      setTimeout(function() { window.close(); }, 1000);
      return false;
    });
    $('#cancel').on('click', function(e) {
      //console.info('click cancel');
      /* // disable page_action icon
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, { "stat": { "cancel": true } }, $.noop);
      });
      */
      ga('send', 'event', 'confirmation', 'cancel');

      window.close();
      return false;
    });
  }
});
