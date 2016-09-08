(function(module) {

  mapObj = {};
  // mapObj.geoCodeJSON = [];
  // mapObj.parsedLocation = [];
  mapObj.markers = [];
  mapObj.dbData = [];

//** dont forget to delete
  // mapObj.dummyData = ['afghanistan', 'iraq', 'india'];

// get visitor location data and query google api
  mapObj.googleReq = function(callback) {
    this.mapRender();
    $.get('/location', function(data) {
      // instead of separate arrays, I am mapping the new data and including the
      // the original properties--that way it will be easier to post the data
      // back to the database
      mapObj.dbData = data.map(function(d) {
        // google gets confused about "Washington"--defaults to Washington DC
        // the geoAddress is used to query the geocoder
        if (d.answertext === 'Washington') {
          d.geoAddress = d.answertext + '+State';
        };
        d.geoAddress = d.answertext.replace(/\s+/g, '+');
        return d;
      });
    }).then(function() {
      var i = 0;
      mapObj.dbData.forEach(function(location) {
        /**
        TO DO: check if geoData already exists on each location
          if geoData exists, then addMarker
          else, query geocoder
        **/
        if(location.geoData) {
          // console.log(geoData);
          mapObj.addMarker(geoData);
        } else {
          // because Google gets mad: the i multiplies the delay by every iteration
          i += 1;
          setTimeout(function() {
            mapObj.geocoder.geocode({'address': location.geoAddress}, function(results, status) {
              if (status === 'OK') {
                console.log(status);
                if (results[0]) {
                  var geoData = results[0];
                  location.lat = geoData.geometry.location.lat();
                  location.lng = geoData.geometry.location.lng();
                  location.country = geoData.address_components[5].long_name;
                  location.state = geoData.address_components[4].long_name;
                  console.log(geoData);
                  mapObj.addMarker(geoData);
                  // TO DO: POST the new geoData to database, use an UPDATE sql statement (in server.js)
                  $.ajax({
                    type: 'PUT',
                    url: '/locationupdate',
                    data: JSON.stringify(location),
                    dataType: 'JSON'
                  }).done(function(){
                    console.log('updated table');
                  });
                } else {
                  console.error('no results found');
                }
              } else {
                console.error('Geocoder failed due to: ' + status);
              }
            });
          }, 250 * i);
        };
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
