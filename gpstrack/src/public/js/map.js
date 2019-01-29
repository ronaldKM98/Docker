
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

var map, infoWindow, watchID, routeId;
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
    //Antes que nada debemos crear la Ruta en la base de datos
    //y obtener su Id para poder asociar los puntos que van a ser recogidos
    //document.forms["routeForm"].submit(); //Como recupero la respuesta de aqui para obtener el routeId ??? 
    document.routeForm.submit();
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        watchID = navigator.geolocation.watchPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //Aqui mostraremos el punto en el mapa
            var h = document.createElement("H5");
            h.style.color = '#FFFFFF'
            var text = document.createTextNode("Latitud" + pos.lat + "Longitud : " + pos.lng);
            document.getElementById('container').appendChild(h.appendChild(text));
            
            //Aqui guardamos el punto en la base de datos 
            document.getElementById('lat').value = pos.lat;
            document.getElementById('lon').value = pos.lng;
            document.getElementById('routeId').value = routeId; //En realidad es routeId, OJO
            //document.forms["pointForm"].submit(); //Como recarga la pagina, es mejor usar AJAX
            document.getElementById('pointForm').submit(); //Necesita ser añadido con sockets
            console.log(pos.lat, pos.lng);
            
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