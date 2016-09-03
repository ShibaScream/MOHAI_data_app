(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('.tab-content').hide();
    $('#about_visitors').show();
  };
  module.aboutController = aboutController;
})(window);
