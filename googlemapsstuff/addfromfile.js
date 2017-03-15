var fBrowse = document.getElementById('updateloc');
fBrowse.addEventListener('click', readFile);
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var infowindow = new google.maps.InfoWindow();
var marker, i;




  function readFile(event) {
          var aMap = maps.getMap();
          var file = 'https://mi-linux.wlv.ac.uk/~1305057/store.txt';
             $.ajax({
             url : "store.txt",
             dataType: "text",
             success : function (data) {
                var csvString = data;
                var gpsData = $.csv.toObjects(csvString);
                for (i = 0; i < gpsData.length; i++) {
	                //console.log("LATITUDE = "+gpsData[i]["Lat"]);
        	       // console.log("LONGITUDE = "+gpsData[i]["Long"]);
                //    console.log("ID = "+gpsData[i]["ID"]);
                  if(data[i]["Flag"]=="1"){
                        marker = new google.maps.Marker({
                        position: new google.maps.LatLng(gpsData[i]["Lat"], gpsData[i]["Long"]),
                        map: aMap,
                        icon: iconBase + 'https://mi-linux.wlv.ac.uk/~1305057/blue_MarkerA.PNG'

                        });
                              }else{
                                marker = new google.maps.Marker({
                                position: new google.maps.LatLng(gpsData[i]["Lat"], gpsData[i]["Long"]),
                                map: aMap,
                                icon: iconBase + 'https://mi-linux.wlv.ac.uk/~1305057/brown_MarkerA.PNG'

                          });

                        }

		              google.maps.event.addListener(marker, 'click', (function(marker, i) {
	                   return function() {
		                     infowindow.setContent(gpsData[i]["ID"]);
		                       infowindow.open(aMap, marker);
                         }
                            }
                                )
                                (marker, i)
                                          );




		}
     	     }
  	});
 }
