
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

var map, infoWindow, watchID;
var latArr = new Array();
var lonArr = new Array();

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
}

function record() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        watchID = navigator.geolocation.watchPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        var h = document.createElement("H5");
        h.style.color = '#FFFFFF'
        var text = document.createTextNode("Latitud" + pos.lat + "Longitud : " + pos.lng);
        document.getElementById('container').appendChild(h.appendChild(text));
        console.log(pos.lat, pos.lng);
        latArr.push(pos.lat);
        lonArr.push(pos.lng);

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

async function stopRecord() {
    navigator.geolocation.clearWatch(watchID);
    document.getElementById('latArr').value = JSON.stringify(latArr);
    document.getElementById('lonArr').value = JSON.stringify(lonArr);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}