import ga from './lib/_google-analytics.jsx';
import jQuery from 'jquery';
import utils from './lib/_utils.jsx';
import DataLoader from './lib/_data-loader.jsx';
import CSV from 'csv';
require('bootstrap-tooltip');

jQuery(function($) {
  //console.info('simple.html');
  ga('set', 'page', 'simple.html');
  ga('send', 'pageview');

  $('#export_original, #export_csv_gmail, #export_vcard').on('click', function() {
    return false;
  });

  $('#export_csv_plain').on('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id, { "stat": { "retrieve": true } }, function(cards_data) {
          DataLoader.download_blob(
            CSV.encode(cards_data, { header: true }),
            'eight_plain_lite_'+utils.datestamp()+'.csv');
          ga('send', 'event', 'datafile', 'download', 'plain-csv');
        });
    });
    return false;
  });

  $('#getpremium').on('click', function() {
    ga('send', 'event', 'getpremium', 'access', 'large-button');
    window.open('https://8card.net/premium');
    return false;
  });

  $('.close').on('click', function() { window.close(); return false; });
  $('[data-toggle="tooltip"]').tooltip();
});
