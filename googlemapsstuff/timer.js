var timer;
var timer2;
var infowindow = new google.maps.InfoWindow();
var marker, i;

function starttimer() {
  updatemaps();
console.log("timerstarted");
  timer = setInterval(updatemaps,30000 );
  timer = setInterval(getcsv,29000 );
}

function getcsv(){

  $.ajax({
                 type: "GET",
                 url: "pull.php" ,
                success : updatemaps()

});
}

function updatemaps(){
  console.log("map updated");
  var aMap = maps.getMap();
  var file = 'https://mi-linux.wlv.ac.uk/~1305057/store.txt';
  $.ajax({
      url: "store.txt",
      dataType: "text",
      success: function(data) {
          var csvString = data;
          var gpsData = $.csv.toObjects(csvString);
          for (i = 0; i < gpsData.length; i++) {
              //console.log("LATITUDE = "+gpsData[i]["Lat"]);
              // console.log("LONGITUDE = "+gpsData[i]["Long"]);
              //    console.log("ID = "+gpsData[i]["ID"]);
              if (gpsData[i]["Flag"] == "1") {
                  marker = new google.maps.Marker({
                      position: new google.maps.LatLng(gpsData[i]["Lat"], gpsData[i]["Long"]),
                      map: aMap,
                      icon: 'https://mi-linux.wlv.ac.uk/~1305057/panic.png'
                  });
              } else {
                  marker = new google.maps.Marker({
                      position: new google.maps.LatLng(gpsData[i]["Lat"], gpsData[i]["Long"]),
                      map: aMap,
                      icon: 'https://mi-linux.wlv.ac.uk/~1305057/normal.png'
                  });
              }
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                      return function() {
                          infowindow.setContent(gpsData[i]["ID"]);
                          infowindow.open(aMap, marker);
                      }
                  })
                  (marker, i));
          }
      }
  });



}
