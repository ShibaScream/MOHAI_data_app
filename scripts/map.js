(function(module){

  mapObj = {};
  mapObj.geoCodeJSON = [];
  mapObj.parsedLocation = [];

// get visitor location data and query google api
  mapObj.googleReq = function(callback) {
    $.ajax({
        url: '/location',
        type: 'GET',
        success: function(data) {
          data.forEach(function(ele) {
          mapObj.parsedLocation.push(ele.answertext.split(' ').join('+'));
          console.log('hi');
        })
      }
    }).done(function() {
      mapObj.parsedLocation.forEach(function(ele) {
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?&address=' + ele + '&key=AIzaSyB3pPN8d00FXzTZOjGUHKapkreiitMwfxE',
            type: 'GET',
            success: function(data, message, xhr) {
              mapObj.geoCodeJSON = data;
              console.log(mapObj.geoCodeJSON);
            }
          });
        });
    });
  };

  module.mapObj = mapObj;
})(window);

mapObj.googleReq();


//perform google geocoding request and pull lat/lon
// mapObj.mapRenderReq = function(data){
//   console.log(data);
//   };

// //render map
// function initMap(result) {
//   var map;
//
//   if(result) {
//     map = new
//     google.maps.Map(document.getElementById('map'), {
//       scrollwheel: true,
//       zoom: 8
//     });
//
//     result.forEach(function(visitor) {
//       var marker = new google.maps.Marker({
//         position: {lat: visitor.location}
//       })
//     })
//     })
//   }
// }
