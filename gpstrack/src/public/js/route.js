var map;
var points = JSON.parse(document.getElementById('points').value);
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 16
    });
    directionsDisplay.setMap(map);

    var waypoints = [];
    for(var i = 1; i < points.length - 1; i++) {
        var location = new google.maps.LatLng(points[i].lat, points[i].lon); 
        waypoints.push({location: location, stopover: true});
    };
    console.log(waypoints);
    
    directionsService.route({
        origin: new google.maps.LatLng(points[0].lat, points[0].lon),
        destination: new google.maps.LatLng(points[points.length - 1].lat,
            points[points.length - 1].lon),
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
}