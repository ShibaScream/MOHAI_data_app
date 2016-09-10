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
        if (d.country_answer) {
          d.geoAddress = 'country+=+' + d.country_answer.replace(/\s+/g, '+');
        } else if (d.state_answer) {
          d.geoAddress = 'state+=+' + d.state_answer.replace(/\s+/g, '+');
        } else {
          console.error('this is bad data');
        }
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
        if(location.lat && location.lng) {
          // console.log(geoData);
          mapObj.addMarker({
            lat: +location.lat,
            lng: +location.lng
          });
        } else {
          // because Google gets mad: the i multiplies the delay by every iteration
          i += 1;
          setTimeout(function() {
            mapObj.geocoder.geocode({'address': location.geoAddress}, function(results, status) {
              if (status === 'OK') {
                if (results[0]) {
                  var geoData = results[0];
                  location.lat = geoData.geometry.location.lat();
                  location.lng = geoData.geometry.location.lng();
                  if (geoData.address_components.length === 1) {
                    location.country = geoData.address_components[0].long_name;
                  } else if (geoData.address_components.length === 2) {
                    location.state = geoData.address_components[0].long_name;
                    location.country = geoData.address_components[1].long_name;
                  }
                  mapObj.addMarker(geoData.geometry.location);
                  $.ajax({
                    type: 'PUT',
                    url: '/locationupdate',
                    contentType: 'application/json',
                    data: JSON.stringify(location)
                  }).fail(function(){
                    console.error('location data did not update in postgres');
                  });
                } else {
                  console.error('no results found for ' + location.geoAddress);
                }
              } else {
                console.error('Geocoder failed due to: ' + status + ' for ' + location.geoAddress);
              }
            });
          }, 500 * i);
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
      zoom: 3,
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
