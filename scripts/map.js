(function(module) {

  mapObj = {};
  mapObj.geoCodeJSON = [];
  mapObj.parsedLocation = [];
  mapObj.markers = [];

//** dont forget to delete
  // mapObj.dummyData = ['afghanistan', 'iraq', 'india'];

// get visitor location data and query google api
  mapObj.googleReq = function(callback) {
    this.mapRender();
    $.get('/location', function(data) {
      mapObj.parsedLocation = data.map(function(d) {
        if (d.answertext === 'Washington') {
          d.answertext += '+State';
        };
        return d.answertext.replace(/\s+/g, '+');
      });
    }).then(function() {
      mapObj.geoCodeJSON = mapObj.parsedLocation.map(function(location) {
        // because Google gets mad
        setTimeout(function() {
          mapObj.geocoder.geocode({'address': location}, function(results, status) {
            if (status === 'OK') {
              console.log(status);
              if (results[0]) {
                console.log(results[0].geometry.location);
                mapObj.addMarker(results[0].geometry.location);
              } else {
                console.error('no results found');
              }
            } else {
              console.error('Geocoder failed due to: ' + status);
            }
          });
        }, 100000);
      });
    });
  };

  //pull lat/lon from geocodeJSON and render map
  mapObj.mapRender = function() {
    mapObj.map;
    mapObj.geocoder;

    console.log('inside map render');

    mapObj.map = new
    google.maps.Map(document.getElementById('i_frame'), {
      scrollwheel: true,
      zoom: 2,
      center: {lat: 47.608013, lng: -122.335167}
    });

    mapObj.geocoder = new google.maps.Geocoder;

  };

  mapObj.addMarker = function(location) {
    var marker = new google.maps.Marker({
      // fix position
      position: location,
      map: mapObj.map,
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    this.markers.push(marker);

  };

  module.mapObj = mapObj;
})(window);
