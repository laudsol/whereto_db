$(document).ready(()=>{

  //creates the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.79, lng: -86.14},
    zoom: 8
    });

  //sets directions on map
  var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

  //set request for directions
  var request = {
          destination: {lat: 41.85, lng: -87.65},
          origin: {lat: 39.79, lng: -86.14},
          travelMode: 'DRIVING'
        };

  // loads map with directions request
  var directionsService = new google.maps.DirectionsService();
      directionsService.route(request, function(response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        }
      });

  $('#map').append(map);

});
