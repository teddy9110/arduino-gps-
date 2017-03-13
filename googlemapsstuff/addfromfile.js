var fBrowse = document.getElementById('updateloc');
fBrowse.addEventListener('click', readFile);

var infowindow = new google.maps.InfoWindow();
var marker, i;

  function readFile(event) {
          var aMap = maps.getMap();
          var file = 'https://mi-linux.wlv.ac.uk/~1305057/pins.txt';
          $.ajax({
             url : "pins.txt",
             dataType: "text",
             success : function (data) {
                var csvString = data;
                var gpsData = $.csv.toObjects(csvString);
                for (i = 0; i < gpsData.length; i++) {
	                console.log("LATITUDE = "+gpsData[i]["Lat"]);
        	        console.log("LONGITUDE = "+gpsData[i]["Long"]);
                        marker = new google.maps.Marker({
                        position: new google.maps.LatLng(gpsData[i]["Lat"], gpsData[i]["Long"]),
                        map: aMap
                });

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        return function() {
		        infowindow.setContent(gpsData[i]["Name"]);
		        infowindow.open(aMap, marker);
		}
		})(marker, i));
		}
     	     }
  	});
 }

