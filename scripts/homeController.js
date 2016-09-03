(function(module) {
  homeController = {};
  homeController.index = function() {
    $('.tab-content').hide();
    $('#main').show();
  };
  module.homeController = homeController;
})(window);
