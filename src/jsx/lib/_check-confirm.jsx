import jQuery from 'jquery';

export default function ConfirmChecker() {
  this.check_point_uri = 'is_confirmed';
}

jQuery.extend(ConfirmChecker.prototype, {
  check: function() {
    const d = jQuery.Deferred();
    const self = this;
    const key = {}; key[this.check_point_uri] = false;
    chrome.storage.sync.get(key, function(ret) {
      ret[self.check_point_uri] ? d.resolve() : d.reject();
    });
    return d.promise();
  },
  set: function(value) {
    const key = {};
    key[this.check_point_uri] = value === undefined ? true : value;
    chrome.storage.sync.set(key);
  }
});
