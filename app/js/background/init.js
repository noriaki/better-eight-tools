jQuery(function($) {
  //console.info('background init');

  /*
  chrome.runtime.onInstalled.addListener(function(installs) {
    if(installs.reason === "install") {
      // todo: insertion start tour guide tool tip.
      var tooltip = chrome.extension.getURL("app/images/tooltip.png");
      $('page top position').append($("<img>").attr("src", tooltip));
      // todo: click to fade-out, and close.
    }
  });
  */

  chrome.runtime.onMessage.addListener(function(req, sender, callback) {
    if(req.stat.showicon) {
      //console.info('showicon');
      chrome.pageAction.show(sender.tab.id);
    } else if(req.stat.hideicon) {
      //console.info('hideicon');
      chrome.pageAction.hide(sender.tab.id);
    }
    if(req.stat.setup) {
      //console.info('setup');
      var confirm_checker = new ConfirmChecker();
      var premium_checker = new PremiumChecker();
      confirm_checker.check().then(function() {
	// is confirmed
	//console.info('is_confirmed');
	premium_checker.check().then(function() {
	  // for premium user
	  //console.info('is_premium');
	  chrome.pageAction.setPopup({
	    tabId: sender.tab.id,
	    popup: "app/views/premium.html"
	  });
	}, function() {
	  // for non-premium user
	  //console.info('is_not_premium');
	  chrome.pageAction.setPopup({
	    tabId: sender.tab.id,
	    popup: "app/views/simple.html"
	  });
	});
      }, function() {
	// is not confirmed
	//console.info('is_not_confirm');
	chrome.pageAction.setPopup({
	  tabId: sender.tab.id,
	  popup: "app/views/confirm.html"
	});
      });

    }

  });

});
