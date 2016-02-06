function DataLoader() {
  this.target_uri = 'https://8card.net/export/csv_orders';
  this.is_file_generated = false;
  this.url_sjis = null;
  this.url = this.url_utf8 = null;
}

// Class methods
DataLoader.download_blob = function(text, filename) {
  filename = filename || 'downloaded-file';
  var blob = new Blob([text]);
  if(navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    var a = jQuery('<a>').attr({
      href: URL.createObjectURL(blob), download: filename
    }).text(filename)[0];
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', false, true);
    a.dispatchEvent(event);
  }
};
DataLoader.download_url = function(url, filename) {
  var self = this;
  jQuery.get(url).done(function(data) {
    self.download_blob(data, filename);
  });
};

// Instance methods
jQuery.extend(DataLoader.prototype, {
  get_orders: function() { return jQuery.get(this.target_uri); },
  order: function() {
    var d = jQuery.Deferred();
    var self = this;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { "stat": { "auth_token": true } }, function(token) {
	jQuery.post(self.target_uri, { authenticity_token: token })
	  .always(function() {
	    self.check_interval(function(order) {
	      //console.info('check_interval callback');
	      d.resolve(); });
	  });
      });
    });
    return d.promise();
  },
  check_interval: function(callback) {
    var self = this;
    var timer = setInterval(function() {
      self.get_orders().done(function(orders) {
	if(orders[0] && orders[0].csv_order && orders[0].csv_order.file_generated_at !== null) {
	  clearInterval(timer);
	  callback(orders[0].csv_order);
	}
      });
    }, 1 * 1000 /* each 1sec */);
  },
  setup: function() {
    var d = jQuery.Deferred();
    var self = this;
    this.get_orders().done(function(orders) {
      jQuery.each(orders, function(i, order) {
	var data = order.csv_order;
	if(data.file_generated_at === null) {
	  return true;
	} else {
	  self.url_sjis = data.url_for_sjis;
	  self.url = self.url_utf8 = data.url_for_utf8;
	  self.is_file_generated = true;
	  return false;
	}
      });
      self.is_file_generated ? d.resolve(self) : d.reject();
    });
    return d.promise();
  },
  load: function(url_type) {
    var d = new jQuery.Deferred();
    url_type = url_type || 'utf8';
    jQuery.get(this['url_'+url_type]).done(function(data, status, xhr) {
      var csv_string = jQuery.trim(data.split("\n\n")[1]);
      var header_split_index = csv_string.indexOf("\n");
      var csv_headers = csv_string.slice(0, header_split_index).split(",");
      var csv_body = csv_string.slice(header_split_index+1);
      d.resolve(csv_headers, csv_body);
    });
    return d.promise();
  }
});
