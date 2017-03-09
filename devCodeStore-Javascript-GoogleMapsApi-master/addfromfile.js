var fBrowse = document.getElementById('updateloc');

  fetch(method = 'GET', path){
		this.request = new XMLHttpRequest();
		this.request.open(method, path, 1);
		this.request.onload = () => {
			let status = this.request.status;
			switch(status){
				case 200:
				let response = this.request.responseText;
				return response;

				case 404:
				console.log(status+':'+this.request.statusText);
				return '';
			}
		}
		this.request.send();

	}
	
		let csvdata = this.fetch('GET','some url');
		let data = csvdata.split('\n');
		for(let i = 0; i < data.length; i++){
			data[i] = data[i].split(',');
		}
		return data;



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


		google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
			infowindow.setContent(data[i]["ID"]);
			infowindow.open(aMap, marker);
		}
		})(marker, i));
	}


 }
