var timer;
var timer2;
var infowindow = new google.maps.InfoWindow();
var marker, i;
var bearing=1.00;
function starttimer() {


console.log("timerstarted");
    timer = setInterval(getcsv,30000 );

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

              var lon1=0 ;
              var lon2= gpsData[i]["Long"];
              var Lat1=0 ;
              var Lat2= gpsData[i]["lat"];
              var dlon = lon2 - lon1 ;

              var y = Math.sin(dlon) * Math.cos(Lat2);

              var x = ((Math.cos(Lat1)*Math.sin(Lat2) -Math.sin(Lat1) )* Math.cos(Lat2)) * Math.cos(dlon);
               bearing=(Math.atan(y,x) *180 / Math.pi);
              console.log(bearing);
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
                          infowindow.setContent(gpsData[i][bearing]);
                          infowindow.open(aMap, marker);
                      }
                  })
                  (marker, i));
          }
      }
  });



}
