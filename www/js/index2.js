var Map;
var a = 0;
var Infowindow;
var Latitude = undefined;
var Longitude = undefined;

// Get geo coordinates

function getPlacesLocation() {
    navigator.geolocation.getCurrentPosition(onPlacesSuccess, onPlacesError, {
        enableHighAccuracy: true
    });
}

// Success callback for get geo coordinates

var onPlacesSuccess = function(position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getPlaces(Latitude, Longitude);

}

// Get places by using coordinates

function getPlaces(latitude, longitude) {

    var latLong = new google.maps.LatLng(latitude, longitude);
    if (a == 0) {
        var mapOptions = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        }
        a = 1;
    } else {
        var mapOptions = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: Map.getZoom(),
            mapTypeId: google.maps.MapTypeId.SATELLITE
        }
    }


    Map = new google.maps.Map(document.getElementById("map"), mapOptions);

    Infowindow = new google.maps.InfoWindow();

    var markerPoint = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: markerPoint,
        map: Map,
        title: "Device Location"
    })

}

// Success callback for watching your changing position

var onPlacesWatchSuccess = function(position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getPlaces(updatedLatitude, updatedLongitude);
    }
}

// Success callback for locating stores in the area

function foundStoresCallback(results, status) {

    if (status === google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {

            createMarker(results[i]);

        }
    }
}

// Place a pin for each store on the map

function createMarker(place) {

    var placeLoc = place.geometry.location;

    var marker = new google.maps.Marker({
        map: Map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {

        Infowindow.setContent(place.name);
        Infowindow.open(Map, this);

    });
}

// Error callback

function onPlacesError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchPlacesPosition() {

    return navigator.geolocation.watchPosition(onPlacesWatchSuccess, onPlacesError, {
        enableHighAccuracy: true
    });
}

watchPlacesPosition();
