(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('.tab-content').hide();
    $('#about_visitors').show();
    $.get('/data/age', function(data){
      window.visualization.verticalBarChart(data, '#age_groups');
    });
    mapObj.googleReq(mapObj.mapRender);
  };
  module.aboutController = aboutController;
})(window);
