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
		for (i = 0; i < data.length; i++) {
                	marker = new google.maps.Marker({
	                position: new google.maps.LatLng(data[i]["Lat"], data[i]["Long"]),
        	        map: aMap
	                });
	
	                google.maps.event.addListener(marker, 'click', (function(marker, i) {
	                return function() {
	                        infowindow.setContent(data[i]["Name"]);
	                        infowindow.open(aMap, marker);
	                }
	                })(marker, i));
	        }               
           }
       });

 }

