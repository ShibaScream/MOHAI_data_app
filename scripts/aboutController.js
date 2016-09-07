(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('.tab-content').hide();
    $('#about_visitors').show();
    mapObj.googleReq(mapObj.mapRender);
  };
  module.aboutController = aboutController;
})(window);
