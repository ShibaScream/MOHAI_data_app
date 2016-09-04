(function(module){

  mapObj.visitorLocation = function() {
  $.get('/location').done(function(data) {
      console.log('inside vistitor location function');
      return data
    });
  };

  // mapObj.filterLocation = function(arr) {
  //   console.log(arr);
  //   arr.filter(
  //   });
  // };
//
  module.mapObj = mapObj;
})(window);

mapObj.visitorLocation();

function initMap(result) {
  var map;

  if(result) {
    map = new
    google.maps.Map(document.getElementById('map'), {
      scrollwheel: true,
      zoom: 8
    });

    result.forEach(function(visitor) {
      var marker = new google.maps.Marker({
        position: {lat: visitor.location}
      })
    })
    })
  }
}
