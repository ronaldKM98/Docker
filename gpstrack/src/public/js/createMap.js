var map;

function initMap(route) {
    //socket = io.connect('http://localhost:4000');
    console.log('map-canvas'.concat(route));
    map = new google.maps.Map(document.getElementById('map-canvas'.concat(route)), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });
}

//initMap();