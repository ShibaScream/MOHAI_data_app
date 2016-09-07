(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('.tab-content').hide();
    $('#about_visitors').show();

    module.visualization.ages();
    
  };
  module.aboutController = aboutController;
})(window);
