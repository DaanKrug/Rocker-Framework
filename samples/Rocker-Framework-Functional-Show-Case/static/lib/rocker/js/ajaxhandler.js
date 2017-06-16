var RockerAjaxHandler = function(url,expectedResult){
	this.url = url + '&antiCache=' + new Date().getTime();
	this.expectedResult = expectedResult;
	this.debug = false;
	this.handleSuceed = function(result){};//external use, should be override
	this.handleUnsuceed = function(result){};//external use, should be override
	this.send = function(){
		var thisThis = this;
		var wasSendNull = false;
		var http_request = singletonRockerAjax.getHttpRequest();
		var indexOf = this.url.indexOf('?');
		if(indexOf != -1){
			var params = this.url.substr(indexOf);
			var urlNew = this.url.substr(0,indexOf);
			urlNew = urlNew.replace('?', '');
			params = params.replace('?', '');
			http_request.open("POST", urlNew, true);
			http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			http_request.send(params);
		}else{
			http_request.open("GET",this.url, true);
			http_request.send(null);
		}
		http_request.onreadystatechange = function(){
			if (http_request.readyState == 4) { 
				if (http_request.status == 200 || http_request.status == 0){ 
					try{
						var result = http_request.responseText;
						if(null!=thisThis.expectedResult){
							if(null!=result && result == thisThis.expectedResult){
								thisThis.handleSuceed(result);
							}else{
								thisThis.handleUnsuceed(result);
							}							
						}else{
							if(null!=result){
								thisThis.handleSuceed(result);
							}else{
								thisThis.handleUnsuceed(result);
							}
						}
					}catch(error){
						console.log('Error on send: ' + error);
					}
				} else { 
					console.log('Error on send http_request.status:' + http_request.status);
				} 
			} 
		};
	};
};

