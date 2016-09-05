// (function(module){

//get visitor location data
  mapObj.visitorLocation = function() {
  $.get('/location').done(function(data) {
      // console.log(data.location);
      console.log(data);
      return data
    });
  };

// //perform google geocoding request
// mapObj.googleReq = function(visitor) {
//   $.get('http://maps.googleapis.com/maps/api/geocode/outputFormat?parameters')
// }


  // module.mapObj = mapObj;
// })(window);

mapObj.visitorLocation();
//
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
