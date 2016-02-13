import jQuery from 'jquery';
import ConfirmChecker from './lib/_check-confirm.jsx';
import PremiumChecker from './lib/_check-premium.jsx';

jQuery(function() {
  console.info('background init');

  chrome.runtime.onMessage.addListener(function(req, sender) {
    if(req.stat.showicon) {
      //console.info('showicon');
      chrome.pageAction.show(sender.tab.id);
    } else if(req.stat.hideicon) {
      //console.info('hideicon');
      chrome.pageAction.hide(sender.tab.id);
    }
    if(req.stat.setup) {
      //console.info('setup');
      const confirm_checker = new ConfirmChecker();
      const premium_checker = new PremiumChecker();
      confirm_checker.check().then(function() {
        // is confirmed
        //console.info('is_confirmed');
        premium_checker.check().then(function() {
          // for premium user
          //console.info('is_premium');
          chrome.pageAction.setPopup({
            tabId: sender.tab.id,
            popup: "html/premium.html"
          });
        }, function() {
          // for non-premium user
          //console.info('is_not_premium');
          chrome.pageAction.setPopup({
            tabId: sender.tab.id,
            popup: "html/simple.html"
          });
        });
      }, function() {
        // is not confirmed
        console.info('is_not_confirm');
        chrome.pageAction.setPopup({
          tabId: sender.tab.id,
          popup: "html/confirm.html"
        });
      });

    } // end of if(req.stat.setup)

  }); // end of chrome.runtime.onMessage.addListener

}); // end of jQuery
