import jQuery from 'jquery';
import Card from './_card.jsx';
import CSV from 'csv';

export default function CardSet() {
  // assign props
  //const klass = this.constructor;

  // Initialize
  this.init.apply(this, arguments);
}

// Class consts
jQuery.extend(CardSet, {

});

// Class props
//CardSet.example = new Value();

// Class methods
CardSet.parse_csv = function(csv_headers, csv_body) {
  const headers = Card.keys;
  const casts = Card.key_types;
  jQuery.each(csv_headers.slice(headers.length), function(i, label) {
    //Array.prototype.push.apply(headers, ["label" + ("00" + (i+1)).slice(-3)]);
    Array.prototype.push.apply(headers, ["is_labeled:" + label]);
    Array.prototype.push.apply(casts, ['Boolean']);
  });
  return CSV.parse(jQuery.trim(csv_body), { header: headers, cast: casts });
};
CardSet.import = function(data) {
  const cs = new CardSet();
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
