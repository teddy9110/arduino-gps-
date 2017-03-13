# arduino-gps-



if(data[i]["flag"] == "panic" ){
          marker = new google.maps.Marker({
      		position: new google.maps.LatLng(data[i]["Lat"], data[i]["Long"]),
      		map: aMap
           icon: 'brown_markerA.png'
      		});
}else {
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(data[i]["Lat"], data[i]["Long"]),
        map: aMap
         icon: 'blue_markerA.png'
        });

}

