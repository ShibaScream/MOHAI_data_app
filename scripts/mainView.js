(function(module){

  var mainView = {};

  mainView.menuToggle = function(){
    $('#menuToggle').on('click', function(){
      $('#menuSelect').toggle();
    });
  };
  mainView.menuToggle();

  // $(window).on('resize', function() {
  //   if($(window).width() <= 600) {
  //     $('nav').show();
  //     console.log('resize fucker');
  //   } else {
  //     $('nav').hide();
  //     $('menuSelect').show();
  //     console.log('smaller window');
  //   }
  // });

  module.mainView = mainView;
})(window);
