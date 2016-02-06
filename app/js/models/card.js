function Card() {
  // assign props
  var klass = this.constructor;
  
  // Initialize
  this.init.apply(this, arguments);
};

// Class consts
jQuery.extend(Card, {
  keys: [
    'company_name', 'department', 'title', 'full_name', 'email', 'postal_code',
    'address', 'company_phone_number', 'department_number', 'direct_line_number',
    'company_fax_number', 'mobile_phone_number', 'url', 'exchange_timestamp',
    'is_connected', 'is_rescanning', 'is_contain_unreadable_characters'
  ],
  key_types: [
    'String', 'String', 'String', 'String', 'String', 'String',
    'String', 'String', 'String', 'String',
    'String', 'String', 'String', 'String',
    'Boolean', 'Boolean', 'Boolean'
  ],
  keys_gmail_conv: {
    "company_name": 'Company',
    "department": null,
    "title": 'Job Title',
    "full_name": 'Name',
    "email": 'E-mail Address',
    "postal_code": null,
    "address": 'Business Address',
    "company_phone_number": 'Business Phone',
    "department_number": 'Business Phone',
    "direct_line_number": 'Business Phone',
    "company_fax_number": null,
    "mobile_phone_number": 'Mobile Phone',
    "url": 'Web Page',
    "exchange_timestamp": 'Notes',
    "is_connected": null,
    "is_rescanning": null,
    "is_contain_unreadable_characters": null
  }
});

// Class props
//Card.example = new Value();

// Class methods
Card.assignments = function(params) {
  var ret = {};
  jQuery.each(this.keys, function(i, key) {
    ret[key] = params[key];
  });
  return ret;
};

// Instance methods
jQuery.extend(Card.prototype, {
  init: function(params) {
    this.klass = this.constructor;
    this.attributes = this.klass.assignments(params);
  },
  save: function() {
    this.db.put(this.klass.table_name, this.attributes, this.attributes[this.klass.table_id]);
    return this;
  },
  attr: function(key, value) {
    var self = this;
    if(key === undefined) {
      return this.attributes;
    } else {
      if(typeof key == 'string') {
	if(value === undefined) {
	  return this.get_attr(key);
	} else {
	  return this.set_attr(key, value);
	}
      } else if(typeof key == 'array') {
	
	return jQuery.map(key, function(k) { return self.attr(k); });
      } else if(typeof key == 'object') {
	jQuery.each(key, function(k, v) { self.attr(k, v); });
	return this;
      }
    }
  },
  get_attr: function(key) {
    return this.attributes[key];
  },
  set_attr: function(key, value) {
    this.attributes[key] = value;
    return this;
  },
  to_csv: function(keys) {},
  to_vcard: function(keys) {
    var attrs = this.attributes;
    var vcard = ['BEGIN:VCARD', 'VERSION:3.0'];
    vcard.push('N:'+(utils.nnub(attrs.full_name) ? utils.e(attrs.full_name) : '')+';;;;');
    vcard.push('FN:'+(utils.nnub(attrs.full_name) ? utils.e(attrs.full_name) : ''));
    vcard.push('X-PHONETIC-FIRST-NAME:');
    vcard.push('X-PHONETIC-LAST-NAME:'+
	       (utils.nnub(attrs.full_name_reading) ? utils.e(attrs.full_name_reading) : ''));
    if(utils.nnub(attrs.company_name)) {
      var org = 'ORG:'+utils.e(attrs.company_name);
      if(utils.nnub(attrs.department)) { org += ';' + utils.e(attrs.department); }
      vcard.push(org);
    }
    if(utils.nnub(attrs.title)) {
      vcard.push('TITLE:'+utils.e(attrs.title));
    }
    if(utils.nnub(attrs.company_phone_number)) {
      vcard.push('TEL;TYPE=WORK;TYPE=VOICE:'+attrs.company_phone_number);
    }
    if(utils.nnub(attrs.direct_line_number)) {
      vcard.push('TEL;TYPE=MAIN;TYPE=VOICE:'+attrs.direct_line_number);
    }
    if(utils.nnub(attrs.mobile_phone_number)) {
      vcard.push('TEL;TYPE=CELL;TYPE=VOICE:'+attrs.mobile_phone_number);
    }
    if(utils.nnub(attrs.company_fax_number)) {
      vcard.push('TEL;TYPE=WORK;TYPE=FAX:'+attrs.company_fax_number);
    }
    if(utils.nnub(attrs.url)) {
      vcard.push('item1.URL;TYPE=pref:'+attrs.url);
      vcard.push('item1.X-ABLABEL:_$!<HomePage>!$_');
    }
    if(utils.nnub(attrs.email)) {
      vcard.push('EMAIL;TYPE=WORK;TYPE=INTERNET:'+attrs.email);
    }
    vcard.push('PRODID:-//Noriaki Uchiyama//Better Eight Tools//JA');
    vcard.push('REV:'+utils.utc_datetime());
    vcard.push('END:VCARD');
    return vcard.join("\n");
  }
});


/* ----- */
function CardSet() {
  // assign props
  var klass = this.constructor;
  
  // Initialize
  this.init.apply(this, arguments);
};

// Class consts
jQuery.extend(CardSet, {

});

// Class props
//CardSet.example = new Value();

// Class methods
CardSet.parse_csv = function(csv_headers, csv_body) {
  var headers = Card.keys;
  var casts = Card.key_types;
  $.each(csv_headers.slice(headers.length), function(i, label) {
    //Array.prototype.push.apply(headers, ["label" + ("00" + (i+1)).slice(-3)]);
    Array.prototype.push.apply(headers, ["is_labeled:" + label]);
    Array.prototype.push.apply(casts, ['Boolean']);
  });
  return CSV.parse($.trim(csv_body), { header: headers, cast: casts });
};
CardSet.import = function(data) {
  var cs = new CardSet();
  jQuery.each(data, function(i, params) { cs.add(params); });
  return cs;
};

// Instance methods
jQuery.extend(CardSet.prototype, {
  init: function() {
    this.klass = this.constructor;
    this.sets = [];
  },
  size: function() { return this.sets.length; },
  add: function(params) {
    if(params.constructor === Card) {
      this.sets.push(params);
    } else {
      this.sets.push(new Card(params));
    }
  },
  each: function(func) {
    return jQuery.each(this.sets, func);
  },
  map: function(func) {
    return jQuery.map(this.sets, func);
  }
});
