var map, infoWindow, watchID, routeId, socket;
var user = document.getElementById('user').value;

function initMap() {
    //socket = io.connect('http://localhost:4000');
    var socket = io();
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 16
    });
    infoWindow = new google.maps.InfoWindow;
}

function record() {
    //Create the route in teh database
    //and associate that route with the points
    document.getElementById("recordbtn").disabled = true;
    
    var socket = io();
    socket.emit('new route', user);
    socket.on('new route', function (route) {
        routeId = JSON.parse(route);
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        watchID = navigator.geolocation.watchPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //Save the point to database
            socket.emit('new point', { lat: pos.lat, lon: pos.lng, routeId: routeId });

            //Show the point in the map
            var marker = new google.maps.Marker({ position: pos });
            marker.setMap(map);
            map.setCenter(marker.getPosition());
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

async function stopRecord() {
    navigator.geolocation.clearWatch(watchID);
    //document.forms["stopForm"].submit(); //No hay necesidad de AJAX porque redirije
    document.stopForm.submit();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}