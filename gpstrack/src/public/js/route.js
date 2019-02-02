var map;
var points = JSON.parse(document.getElementById('points').value);
function initMap() {
    //socket = io.connect('http://localhost:4000');
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 16
    });
    points.forEach(point => {
        var pos = {
            lat: point.lat,
            lng: point.lon
        };
        var marker = new google.maps.Marker({ position: pos });
            marker.setMap(map);
            map.setCenter(marker.getPosition());
    });
}