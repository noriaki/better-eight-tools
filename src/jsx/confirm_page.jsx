import jQuery from 'jquery';
import ga from './lib/_google-analytics.jsx';
import ConfirmChecker from './lib/_check-confirm.jsx';

jQuery(function($) {
  ga('set', 'page', 'confirm.html');
  ga('send', 'pageview');

  //console.info("confirm.html");
  $('#confirm').on('click', function() {
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
  $('#cancel').on('click', function() {
    //console.info('click cancel');
    ga('send', 'event', 'confirmation', 'cancel');

    window.close();
    return false;
  });
});
