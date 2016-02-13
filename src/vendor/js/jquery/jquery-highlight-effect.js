// require jquery.color.js
(function($) {
  $.fn.highlight = function(speed) {
    var org_bg_color = this.css('backgroundColor');
    return (this.css({ backgroundColor: '#ffffcc' })
	    .animate({ backgroundColor: org_bg_color }, speed || 1500));
  };
})(jQuery);
