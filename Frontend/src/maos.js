var map;
var image;
var beachMarker;
var userMarker;
var userImage;
var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
var Form = require('./Form');

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: 50.464384, lng: 30.519128}
    });

    image = 'assets/images/map-icon.png';
    beachMarker = new google.maps.Marker({
        animation: google.maps.Animation.BOUNCE,
        position: {lat: 50.464384, lng: 30.519128},
        map: map,
        icon: image
    });
    userImage = 'assets/images/home-icon.png';
    userMarker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: null,
        map: map,
        icon: userImage
    });

    google.maps.event.addListener(map, 'click', function (me) {
        var coordinates = me.latLng;
        geocodeLatLng(coordinates, function (err, adress) {
            if (!err) {
                $('#adress').val(adress);
                //вызвать функцию прокладывания пути которая будет измерять время и менять время в div-e Время
                calculateRoute(adress, function (err, result) {
                    if (!err) {
                        var directionsService = new google.maps.DirectionsService();
                        directionsService.route({
                            origin: {lat: 50.464384, lng: 30.519128},
                            destination: coordinates,
                            travelMode: google.maps.TravelMode["DRIVING"]
                        }, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                var leg = response.routes[0].legs[0];
                                $(".time").text(leg.duration.text);
                                $(".ad").text(adress);


                                directionsDisplay.setDirections(response);

                                //Можем сразу нанести на карту
                                directionsDisplay.setMap(map);
                            }
                        });

                        userMarker.setMap(null);
                        userMarker = new google.maps.Marker({
                            animation: google.maps.Animation.BOUNCE,
                            position: coordinates,
                            map: map,
                            icon: userImage
                        });
                    }
                });
            } else {
                alert("Немає адреси");
            }
        });
    });
};

function geocodeAddress(adress, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': adress}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            var coordinates = results[0].geometry.location;
            callback(null, coordinates);
        } else {
            callback(new Error("Can not find the	adress"));
        }
    });
}

function calculateRoute(address, callback) {
    directionsDisplay.setMap(null);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            return callback(null, results[0].geometry.location);

        } else {
            return callback(new Error("No result"));
        }
    });
}

function geocodeLatLng(latlng, callback) {
//Модуль за роботу з адресою
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[1]) {
            var adress = results[1].formatted_address;
            callback(null, adress);
        } else {
            callback(new Error("Can't find adress"));
        }
    });
}

module.exports.cal = function (address) {
    geocodeAddress(address, function (err, coordinates) {
        if (!err) {
            var directionsService = new google.maps.DirectionsService();
            directionsService.route({
                origin: {lat: 50.464384, lng: 30.519128},
                destination: coordinates,
                travelMode: google.maps.TravelMode["DRIVING"]
            }, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {



                    var leg = response.routes[0].legs[0];
                    $(".time").text(leg.duration.text);
                    $(".ad").text(address);


                    directionsDisplay.setDirections(response);

                    //Можем сразу нанести на карту
                    directionsDisplay.setMap(map);
                }
            });

            userMarker.setMap(null);
            userMarker = new google.maps.Marker({
                animation: google.maps.Animation.BOUNCE,
                position: coordinates,
                map: map,
                icon: userImage
            });
        } else {
            alert("Немає адреси");
        }
    });
};

google.maps.event.addDomListener(window, 'load', initMap);
exports.updateAddress = function (address) {

};
