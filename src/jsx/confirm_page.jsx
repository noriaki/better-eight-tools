import jQuery from 'jquery';
import ga from './lib/_google-analytics.jsx';

jQuery(function($) {
  ga('set', 'page', 'confirm.html');
  ga('send', 'pageview');

  //console.info("confirm.html");
  $('#confirm').on('click', function() {
    //console.info('set confirm and reinitialize');
    chrome.runtime.sendMessage("confirmation/agree", $.noop);

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
    chrome.runtime.sendMessage("confirmation/reject", $.noop);
    return false;
  });
});
