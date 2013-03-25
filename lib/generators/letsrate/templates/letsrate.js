jQuery.fn.raty.defaults.path = "/assets";
jQuery.fn.raty.defaults.half_show = true;
jQuery.fn.raty.defaults.hints = [];

jQuery(function($){
  $(".star").each(function() {
    var $readonly = ($(this).attr('data-readonly') == 'true');
    var $not_rated_text = $(this).attr('data-not-rated-text');
    $(this).raty({
      score: function(){
        return $(this).attr('data-rating')
      },
      number: function() {
        return $(this).attr('data-star-count')
      },
      noRatedMsg: $not_rated_text,
      readOnly: $readonly,
      click: function(score, evt) {
        var _this = this;
        $.post('<%= Rails.application.class.routes.url_helpers.rate_path %>',
        {
          score: score,
          dimension: $(this).attr('data-dimension'),
          id: $(this).attr('data-id'),
          klass: $(this).attr('data-classname')
        },
        function(data) {
          if(data) {
            // success code goes here ...

            if ($(_this).attr('data-disable-after-rate') == 'true') {
              $(_this).raty('set', { readOnly: true, score: score });
            }
          }
        });
		  }
    });
	});
});
