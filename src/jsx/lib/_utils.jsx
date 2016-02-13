module.exports = {
  datestamp: function(date) {
    date = date || new Date();
    return [
      date.getFullYear(),
      ('0'+(date.getMonth()+1)).slice(-2),
      ('0'+date.getDate()).slice(-2)
    ].join('');
  },
  utc_datetime: function(date) {
    date = date || new Date();
    return [
      date.getUTCFullYear(), '-',
      date.getUTCMonth()+1, '-',
      date.getUTCDate(), 'T',
      date.getUTCHours(), ':',
      date.getUTCMinutes(), ':',
      date.getUTCSeconds(), 'Z'
    ].join('');
  },
  e: function(str) {
    // escape [,:;] to prepending '\' in text value
    return str.replace(/[,:;]/g, "\\$&");
  },
  nnub: function(v) {
    // return Not Null Or Undefined or Blank
    return !(v === null || v === undefined || v === '');
  }
};
