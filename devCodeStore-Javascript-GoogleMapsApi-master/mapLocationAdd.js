var maps = (function() {

    var data = {map:''},
        marker;


    var initialise = function () {
        var mapOptions = {
            center: new google.maps.LatLng(53.5160, -1.1330),
            zoom: 6,
			mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        data.map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('found a geolocation of lat=' + position.coords.latitude + ', long=' + position.coords.longitude);
                initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                data.map.setCenter(initialLocation);
                setMarker(initialLocation);
            });
        } else {
            console.log('could not find geolocation');
        }
        $('#map-input').on('change', 'input#postcode', function() {
            var postcode = $(this).val();
            getCoords(postcode);
        });
    }

    var getCoords = function(postcode) {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address':postcode+', UK'}, function(results, status) {
            console.log('status='+status+',results='+results);
            if(status == google.maps.GeocoderStatus.OK) {
                var loc = results[0].geometry.location;
                console.log(loc);
                data.map.setCenter(loc);
                setMarker(loc);
                data.map.setZoom(16);
            } else {
                console.log('failed to get location');
            }
        });
    }
    var setMarker = function(location) {
        marker = new google.maps.Marker({
            position: location,
            map: data.map,
            title: 'You are here.'
        });
    }

    var mapObject = function() {
        return data.map;
    }

    return {init: initialise, getMap: mapObject};
})();

google.maps.event.addDomListener(window, 'load', maps.init);
