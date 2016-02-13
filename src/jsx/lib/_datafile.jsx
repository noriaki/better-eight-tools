import jQuery from 'jquery';

jQuery(function($) {
  const view_premium = "/html/premium.html";
  const view_simple = "/html/simple.html";
  if(document.location.pathname === view_premium) {
    // ga('set', 'page', view_premium);
    // ga('send', 'pageview');

    const dl = new DataLoader();
    const helper_fn = {
      update_file_info: function() {
        dl.get_orders().done(function(data, status) {
          if(data && data[0]) {
            const d = data[0].csv_order;
            if(d && d.file_generated_at !== null) {
              $('#file_generated_at')
                    .text($.format.date(d.file_generated_at, "yyyy/MM/dd HH:mm:ss"))
                    .append($('<small>').text('('+$.format.prettyDate(d.file_generated_at)+')'));
              $('#cards_count').text(d.cards_count).parent().highlight();
            }
          }
        });
      }
    };

    helper_fn.update_file_info();

    $('#update_file').on('click', function(e) {
      var self = this;
      $(self).prop('disabled', true);
      $('#file_generating_progress').slideDown('fast');
      dl.order().done(function() {
        helper_fn.update_file_info();
        $('#file_generating_progress').slideUp();
        $(self).prop('disabled', false);
      });

      // ga('send', 'event', 'datafile', 'update');

      return false;
    });

    $('#export_original').on('click', function(e) {
      dl.setup().done(function(loader) {
        DataLoader.download_url(loader.url, 'eight_original_'+utils.datestamp()+'.csv');
        // ga('send', 'event', 'datafile', 'download', 'original-csv');
      });
      return false;
    });

    $('#export_csv_plain').on('click', function(e) {
      dl.setup().done(function(loader) {
        loader.load().done(function(csv_headers, csv_body) {
          var csv_data = CardSet.parse_csv(csv_headers, csv_body);
          DataLoader.download_blob(CSV.encode(csv_data, { header: true }),
                                   'eight_plain_'+utils.datestamp()+'.csv');
          // ga('send', 'event', 'datafile', 'download', 'plain-csv');
        });
      });
      return false;
    });

    $('#export_csv_gmail').on('click', function(e) {
      dl.setup().done(function(loader) {
        loader.load().done(function(csv_headers, csv_body) {
          var csv_data = CardSet.parse_csv(csv_headers, csv_body);
          gmail_csv_data = $.map(csv_data, function(row) {
            var ret = {};
            $.each(Card.keys_gmail_conv, function(key, gmail_key) {
              if(gmail_key === null) return true;
              if(ret[gmail_key] === undefined) {
                ret[gmail_key] = row[key];
              }
            });
            ret["Categories"] = "Import from Eight["+utils.datestamp()+"]";
            return ret;
          });
          DataLoader.download_blob(
            CSV.encode(gmail_csv_data, { header: true }),
            'eight_gmail_'+utils.datestamp()+'.csv');
          // ga('send', 'event', 'datafile', 'download', 'gmail-csv');
        });
      });
      return false;
    });

    $('#export_vcard').on('click', function(e) {
      dl.setup().done(function(loader) {
        loader.load().done(function(csv_headers, csv_body) {
          var csv_data = CardSet.parse_csv(csv_headers, csv_body);
          var card_set = CardSet.import(csv_data);
          var vcard_data = card_set.map(function(card, i) {
            if(utils.nnub(card.attr('full_name'))) {
              return card.to_vcard();
            } else { return null; }
          });
          DataLoader.download_blob(
            vcard_data.join('\n'), 'eight_vcard_'+utils.datestamp()+'.vcd');
          // ga('send', 'event', 'datafile', 'download', 'vcard');
        });
      });
      return false;
    });

  } else if(document.location.pathname === view_simple) {
    //console.info('simple.html');
    // ga('set', 'page', view_simple);
    // ga('send', 'pageview');

    $('#export_original, #export_csv_gmail, #export_vcard').on('click', function(e) {
      return false;
    });

    $('#export_csv_plain').on('click', function(e) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id, { "stat": { "retrieve": true } }, function(cards_data) {
            DataLoader.download_blob(
              CSV.encode(cards_data, { header: true }),
              'eight_plain_lite_'+utils.datestamp()+'.csv');
            // ga('send', 'event', 'datafile', 'download', 'plain-csv');
          });
      });
      return false;
    });

    $('#getpremium').on('click', function(e) {
      // ga('send', 'event', 'getpremium', 'access', 'large-button');
      window.open('https://8card.net/premium');
      return false;
    });
  }

  $('.close').on('click', function(e) { window.close(); return false; });
  $('[data-toggle="tooltip"]').tooltip();
});
