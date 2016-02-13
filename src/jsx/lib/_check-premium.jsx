import jQuery from 'jquery';

export default function PremiumChecker() {
  this.check_point_uri = 'https://8card.net/contract/contracts/latest.json';
}

jQuery.extend(PremiumChecker.prototype, {
  check: function() {
    const d = jQuery.Deferred();
    this.get().done(function(data) {
      const contract = data.apple_contract ||
                       data.google_contract ||
                       data.premium_ticket_contract;
      //d.resolve(); // debug: premium user.
      //d.reject(); // debug: not premium user.

      // status: 1==active, 4==expired
      contract.status === 1 ? d.resolve() : d.reject();
    });
    return d.promise();
  },
  get: function() { return jQuery.get(this.check_point_uri); }
});
