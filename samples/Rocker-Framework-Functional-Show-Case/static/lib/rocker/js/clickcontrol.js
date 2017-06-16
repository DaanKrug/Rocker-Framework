var RockerClickTimeControl = function(){
	this.initialized = false;
	this.initialize = function(){
		this.initialized = true;
	};
	this.validate = function(){
		if(!this.initialized){
			console.log('You should use the singleton variable "singletonRockerClickTimeControl".');
			return false;
		}
		return true;
	};
	this.arrayClicks = [];
	this.validateClick = function(idElem,minTimeMilisecs){
		if(!this.validate()){return false;}
		if(null==minTimeMilisecs || !(minTimeMilisecs > 0)){
			minTimeMilisecs = 1000;
		}
		var lastTime = this.getFromStorage(idElem,this.arrayClicks,0);
		var now = new Date().getTime();
		this.addToStorage(idElem,now,this.arrayClicks);
		if((now - lastTime) >= minTimeMilisecs){
			return true;
		}
		return false;
	};
	this.getFromStorage = function (id,array,valueIfNull){
		if(!this.validate()){return false;}
		var value = null;
		var size = array.length;
		for(var i = 0; i < size; i++){
			if(null==array[i]){
				continue;
			}
			if(array[i][0] == id){
				value = array[i][1];
				break;
			}
		}
		return (null!=value ? value : valueIfNull);
	};
	this.addToStorage = function(id,value,array){
		if(!this.validate()){return false;}
		var pos = -1;
		var size = array.length;
		for(var i = 0; i < size; i++){
			if(null==array[i]){
				continue;
			}
			if(array[i][0] == id){
				pos = i;
				break;
			}
		}
		if(pos >= 0){ array[pos][1] = value;}
		else{array[size] = [id, value];}
	};
};
var singletonRockerClickTimeControl = new RockerClickTimeControl();
singletonRockerClickTimeControl.initialize();

