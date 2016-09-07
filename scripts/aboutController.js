(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('.tab-content').hide();
    $('#about_visitors').show();
    module.visualization.ages();
    mapObj.googleReq(mapObj.mapRender);
  };
  module.aboutController = aboutController;
})(window);
