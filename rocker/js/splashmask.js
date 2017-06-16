var RockerSplashMask = function(idToSplash, minTimeMiliseconds){
	this.idToSplash = idToSplash;
	this.id = this.idToSplash + '_splash_' + new Date().getTime();
	this.showing = false;
	this.minTimeMiliseconds = (null!=minTimeMiliseconds && minTimeMiliseconds > 500) ? minTimeMiliseconds : 500;
	this.timeInitial = 0;
	this.interval = null;
	this.aditionalClass = '';
	this.setAditionalClass = function(className){
		this.aditionalClass = ((null!=className && className != '') ? className : '');
	};
	this.removeSplash = function(){
		try{
			if(null!=this.interval){
				clearInterval(this.interval);
				this.interval = null;
			}
			if(this.showing == false){
				return;
			}
			if(this.timeInitial > 0){
				var dif = (new Date().getTime() - this.timeInitial);
				var rest = (this.minTimeMiliseconds - dif);
				this.timeInitial = 0;
				if(rest > 900){
					rest -= 650;
					var thisThis = this;
					this.interval  = setInterval(function(){thisThis.removeSplash();},rest);
					return;
				}
			}
			this.showing = false;
			var node = singletonRockerCommons.getElement(this.id);
			if(null!=node){
				var parent = singletonRockerCommons.getElement(this.idToSplash);
				parent.removeChild(node);
			}
		}catch(error){console.log('Error on removeSplash:' + error);}
	};
	this.makeSplash = function(){
		try{
			if(this.showing == true){
				return;
			}
			var parent = singletonRockerCommons.getElement(this.idToSplash);
			if(null==parent){
				return;
			}
			this.showing = true;
			var width = parent.offsetWidth;
			var height = parent.offsetHeight;
			var innerInterna = '<div style="margin: 0px; width: 0' + width + 'px; height: 0' + height + 'px;" class="rockerSplashIntern"></div>';
			var node = document.createElement("div");
			node.id = this.id;
			node.className = "rockerSplash" + " " + this.aditionalClass;
			node.innerHTML = innerInterna;
			this.timeInitial = new Date().getTime();
			if(null!=parent.childNodes && parent.childNodes.length > 0){
				parent.insertBefore(node,parent.childNodes[0]);
			}else{
				parent.appendChild(node);
			}
		}catch(error){console.log('Error on makeSplash:' + error);}
	};
};