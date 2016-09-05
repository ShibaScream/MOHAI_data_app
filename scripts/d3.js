(function(module) {
  visualization = {};

  visualization.ages = function() {
    $.get('/ages', function(data) {
      console.log(data);
    });
  };

  module.visualization = visualization;

}(window));
