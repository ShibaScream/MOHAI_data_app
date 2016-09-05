(function(module) {

  mapObj = {};
  mapObj.geoCodeJSON = [];
  mapObj.parsedLocation = [];

//** dont forget to delete
  mapObj.dummyData = ['afghanistan', 'iraq', 'india'];

// get visitor location data and query google api
  mapObj.googleReq = function(callback) {
    $.ajax({
        url: '/location',
        type: 'GET',
        success: function(data) {
          data.forEach(function(ele) {
          mapObj.parsedLocation.push(ele.answertext.split(' ').join('+'));
          console.log('successful heroku server retrieval');
        })
      }
    }).then(function() {
      mapObj.dummyData.forEach(function(ele) {  ////dont forget to change dummy data back
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?&address=' + ele + '&key=AIzaSyB3pPN8d00FXzTZOjGUHKapkreiitMwfxE',
            type: 'GET',
            success: function(data, message, xhr) {
              console.log('successful google JSON retrieval');
            }
          }).then(function(data) {
              data.results.forEach(function(data) {
                // console.log(data.geometry);
                mapObj.geoCodeJSON.push(data.geometry);
              });
            }).then(mapObj.mapRender().one());
        });
      });
  };

  //pull lat/lon from geocodeJSON and render map
  mapObj.mapRender = function() {
    var map;

    console.log('inside map render');

    if (mapObj.geoCodeJSON.length > 0) {
      map = new
      google.maps.Map(document.getElementById('i_frame'), {
        scrollwheel: true,
        zoom: 4
      });

      mapObj.geoCodeJSON.forEach(function(ele) {
        var marker = new google.maps.Marker({
          position: ele.location,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
        //set center to seattle lat/lng
        map.setCenter({lat: 47.608013, lng: -122.335167});
      });
    } else {
      // if no data then create a map of tasmania because... ya know.
      map = new google.maps.Map(document.getElementById('i_frame'), {
        center: {lat: -41.4545196, lng: 145.9706648},
        scrollwheel: true,
        zoom: 6
      });
    }
  };

  module.mapObj = mapObj;
})(window);

mapObj.googleReq();
