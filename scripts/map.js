(function(module){
  var mapObj = {};

  mapObj.visitorLocation = function() {
  $.get('/location').done(function(data) {
      console.log(data);
    });
  };

  module.mapObj = mapObj;
})(window);
