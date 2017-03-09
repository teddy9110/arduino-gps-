class X {
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

	getCSV(){
		let csvdata = this.fetch('GET','some url');
		let data = csvdata.split('\n');
		for(let i = 0; i < data.length; i++){
			data[i] = data[i].split(',');
		}
		return data;
	}
}
