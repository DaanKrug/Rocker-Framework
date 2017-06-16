var RockerAjax = function(){
	this.idInnerDrawMsgAlert = null;
	this.initialized = false;
	this.initialize = function(){
		this.initialized = true;
	};
	this.validate = function(){
		if(!this.initialized){
			console.log('You should use the singleton variable "singletonRockerAjax" ');
			return false;
		}
		return true;
	};
	this.openRequest = function(http_request,url){
		try{
			if(null!=http_request){
				var indexOf = url.indexOf('?');
				if(indexOf != -1){
					var params = url.substr(indexOf);
					var urlNew = url.substr(0,indexOf);
					urlNew = urlNew.replace('?', '');
					params = params.replace('?', '');
					http_request.open("POST", urlNew, true);
					http_request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					http_request.send(params);
				}else{
					http_request.open("GET", url, true);
					http_request.send(null);
				}
			}
		}catch(error){
			console.log('Error on openRequest: ' + error);
		}
	};
	this.getHttpRequest = function(){
		if(!this.validate()){return false;}
		var http_request = null;
		if (window.XMLHttpRequest){ 
			http_request = new XMLHttpRequest(); 
		} else if (window.ActiveXObject){ //IE 
			try { 
				http_request = new ActiveXObject("Msxml2.XMLHTTP"); 
			} catch (e) { 
				try { 
					http_request = new ActiveXObject("Microsoft.XMLHTTP"); 
				} catch (e2) {} 
			} 
		} 
		if (!http_request) { 
			console.log('Error, could not obtain a XMLHTTP instance!!'); 
			return false; 
		}else{
			return http_request;
		}
	};
	this.triggerRequest = function(url,idInner,idToClickOnComplete,nameForm){
		if(!this.validate()){return false;}
		var http_request = this.getHttpRequest();
		var thisThis = this;
		http_request.onreadystatechange = function(){
			if (http_request.readyState == 4) { 
				if (http_request.status == 200 || http_request.status == 0){ 
					try{
						var inner = http_request.responseText;
						inner = singletonRockerCommons.trim(inner);
						var form = null;
						if(null!=nameForm && nameForm != ''){
							form = singletonRockerStorage.getJsForm(nameForm);
						}
						if(null==form){
							if(null!=idInner && idInner != '' && inner != null && inner != ''){
								singletonRockerCommons.innerHtml(idInner,inner);
								singletonRockerCommons.show(idInner);
							}else{
								singletonRockerCommons.hide(idInner);
							}
						}else{
							var shouldRollback = false;
							var json = null;
							if(inner.indexOf(form.errorCode) == 0){//server error
								inner = inner.replace(form.errorCode,'');
								shouldRollback = true;
							}else if(inner.indexOf(form.jsonCode) == 0){//json object returned
								json = inner.replace(form.jsonCode,'');
								json = singletonRockerCommons.trim(json);
								inner = null;
							}
							if(null!=idInner && idInner != '' && inner != null && inner != ''){
								thisThis.idInnerDrawMsgAlert = null;
								var timeToWaitMsgAlert = 
									((null!=form && null!=form.timeToWaitMsgAlert && form.timeToWaitMsgAlert > 0) 
									? form.timeToWaitMsgAlert : 3000);
								var msgToAlert = inner;
								if(shouldRollback && null!=inner && (inner.indexOf('|') != -1) ){
									var arr = inner.split('|');
									msgToAlert = arr[1];
									timeToWaitMsgAlert = (arr[0] * timeToWaitMsgAlert);
								}
								if(null!=form.aliasObject && form.aliasObject != ''){
									msgToAlert = msgToAlert.replace(form.typeObject,form.aliasObject);
									msgToAlert = msgToAlert.replace(form.typeObject.toLowerCase(),form.aliasObject);
									msgToAlert = msgToAlert.replace(form.typeObject.toUpperCase(),form.aliasObject);
								}
								thisThis.innerDrawAlert(msgToAlert,timeToWaitMsgAlert,null,shouldRollback);
							}
							if(shouldRollback){
								form.rollbackSubmitForm();
							}else {
								if(null!=form.onclickSubmit && form.onclickSubmit != ''){
									eval(form.onclickSubmit);
								}
								if(null!=form.rockerTable){
									form.rockerTable.setSelectedPage(1);
								}
								if(null!=json){
									form.setJsonObject(json);
								}
							}
							if(null!=form.rockerSplashMask){
								form.rockerSplashMask.removeSplash();
							}
						}
						if(null!=idToClickOnComplete && idToClickOnComplete != ''){
							singletonRockerCommons.clickElementById(idToClickOnComplete);
						}
					}catch(error){console.log('Error on triggerRequest: ' + error);}
				} else { 
					console.log('Error on triggerRequest http_request.status: ' + http_request.status);
				} 
			} 
		};
		this.openRequest(http_request,url);
	};
	this.makeRequest2 = function(url,nameForm,idInner,idToClickOnComplete){ 
		if(!this.validate()){return false;}
		if(url!=''){
			var comp = new Date().getTime();
			url = (url + '&v'+ comp + '=' + comp);
			this.triggerRequest(url,idInner,idToClickOnComplete,nameForm);
			return true;
		}else{
			return false;
		}  
	};
	this.makeRequest = function(url,nameForm,idInner) { 
		if(!this.validate()){return false;}
		this.makeRequest2(url,nameForm,idInner, null);
	};
	this.idInnerDrawAlert = 'divInnerMsgsDrawAlert';
	this.intervalDrawAlert = null;
	this.hideDrawedAlert = function(idInner){
		try{
			if(null!=this.intervalDrawAlert){
				clearInterval(this.intervalDrawAlert);
				this.intervalDrawAlert = null;
			}
			singletonRockerCommons.hide(idInner);
		}catch(error){console.log('Error on hideDrawedAlert: ' + error);}
	};
	this.innerDrawAlert = function(inner,timeToWait,idToClickOnComplete,shouldRollback){
		try{
			var ajaxJsForms = this;
			var timeToHide = (null!=timeToWait && timeToWait > 0) ? timeToWait : 3000;
			var elem = singletonRockerCommons.getElement(this.idInnerDrawAlert);
			if(null==elem){
				var node = document.createElement("div");
				node.id = this.idInnerDrawAlert;
				node.style = 'display: none;';
				if(null==this.idInnerDrawMsgAlert || this.idInnerDrawMsgAlert == ''){
					var firstChild = document.body.childNodes[0];
					if(null!=firstChild){
						document.body.insertBefore(node,firstChild);
					}else{
						document.body.appendChild(node);
					}
				}else{
					singletonRockerCommons.getElement(this.idInnerDrawMsgAlert).innerHTML = '';
					singletonRockerCommons.getElement(this.idInnerDrawMsgAlert).appendChild(node);
					this.idInnerDrawMsgAlert = null;
				}
				elem = singletonRockerCommons.getElement(this.idInnerDrawAlert);
			}
			var inner2 = '<div id="'+ this.idInnerDrawAlert +'_intern" ';
			inner2 += ' class="rockerMsg ui-widget ui-widget-content ui-corner-all ui-state-' + (shouldRollback ? 'error' : 'highlight' ) + '" >';
			inner2 += '<p>';
			inner2 += '<span class="ui-icon ui-icon-' + (shouldRollback ? 'alert' : 'info' ) + '"></span>';
			inner2 += inner;
			inner2 += '</p>';
			inner2 += '</div>';
			elem.innerHTML = inner2;
			if(null!=idToClickOnComplete && idToClickOnComplete!=''){
				singletonRockerCommons.clickElementById(idToClickOnComplete);
			}
			singletonRockerCommons.show(this.idInnerDrawAlert);
			var elem2 = singletonRockerCommons.getElement(this.idInnerDrawAlert +'_intern');
			elem2.style.left = ((window.innerWidth - elem2.offsetWidth) /2) + 'px';
			elem2.style.top = 40;
			this.intervalDrawAlert = setInterval(function(){ajaxJsForms.hideDrawedAlert(ajaxJsForms.idInnerDrawAlert);},timeToHide);
		}catch(error){console.log('Error on innerDrawAlert: ' + error);}
	};
	this.makeRequestDrawAlert = function(url,timeToWait,idToClickOnComplete){
		if(!this.validate()){return false;}
		var http_request = this.getHttpRequest();
		var thisThis = this;
		http_request.onreadystatechange = function(){
			if (http_request.readyState == 4) { 
				if (http_request.status == 200 || http_request.status == 0){ 
					try{
						var inner = http_request.responseText;
						if(null!=inner && inner!=''){
							var inner = singletonRockerCommons.trim(inner);
							if(inner != ''){
								thisThis.innerDrawAlert(inner,timeToWait,idToClickOnComplete,false);
							}
						}
					}catch(error){console.log('Error on makeRequestDrawAlert: ' + error);}
				} else { 
					console.log('Error on makeRequestDrawAlert http_request.status:' + http_request.status);
				} 
			} 
		};
		this.openRequest(http_request,url);
	};
	this.makeRequestTableScroller = function(url,idTable,idToClikOnComplete){
		if(!this.validate()){return false;}
		var http_request = this.getHttpRequest();
		http_request.onreadystatechange = function(){
			if (http_request.readyState == 4) { 
				if (http_request.status == 200 || http_request.status == 0){ 
					try{
						var inner = http_request.responseText;
						if(null!=inner && inner!=''){
							var json = singletonRockerCommons.trim(inner);
							singletonRockerStorage.setJsonObjectListTable(idTable,json);
							if(null!=idToClikOnComplete && idToClikOnComplete!=''){
								singletonRockerCommons.clickElementById(idToClikOnComplete);
							}
						}
					}catch(error){console.log('Error on makeRequestTableScroller: ' + error);}
				} else { 
					console.log('Error on makeRequestTableScroller http_request.status: ' + http_request.status);
				} 
			} 
		};
		this.openRequest(http_request,url);
	};
};
var singletonRockerAjax = new RockerAjax();
singletonRockerAjax.initialize();