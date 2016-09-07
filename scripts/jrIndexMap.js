console.log('hello');

var mapPlacement = document.getElementById('i_frame');

var map;

function initMap() {
  map = new google.maps.Map((mapPlacement), {
    center: { lat: 47.611435, lng: -122.330456},
    zoom: 12
  });
}
initMap();
