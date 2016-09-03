(function(module){

  var mainView = {};

  mainView.menuToggle = function(){
    $('#menuToggle').on('click', function(){
      $('#menuSelect').toggle();
    });
  };
  mainView.menuToggle();

  module.mainView = mainView;
})(window);
