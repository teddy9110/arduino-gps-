	var fBrowse = document.getElementById('fileBrowser');
	fBrowse.addEventListener('change', readFile);

	var infowindow = new google.maps.InfoWindow();
	var marker, i;

	  function readFile(event) {
		var aMap = maps.getMap();
 		var input = event.target;
		var file = input.files[0];

		var reader = new FileReader();
			reader.onload = function(){
			  var csvString = reader.result;
			  var data = $.csv.toObjects(csvString);
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
		};

		reader.readAsText(file);

		}
