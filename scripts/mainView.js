(function(module){

  var mainView = {};

  mainView.menuToggle = function(){
    $('#menuToggle').on('click', function(){
      if ($('.menuSelect').css('display') === 'none') {
        $('.menuSelect').slideDown('fast');
      } else {
        $('.menuSelect').slideUp('fast');
      }
    });

    $('.menuSelect').on('click', function() {
      $('.menuSelect').toggle();
    });
  };
  mainView.menuToggle();

  $(window).on('resize', function() {
    if($(window).width() >= 600) {
      $('.menuSelect').show();
    } else {
      $('.menuSelect').hide();
      // $('.menuSelect').show();
    }
  });

  module.mainView = mainView;
})(window);
