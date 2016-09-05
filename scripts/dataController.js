(function(module) {
  var dataController = {};
  dataController.index = function() {
    $('.tab-content').hide();
    $('#visual_page').show();
    $('#filter_section').show();
  };
  
  module.dataController = dataController;
})(window);
