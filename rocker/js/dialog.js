var ConfirmDialog = function(){
	this.initialized = false;
	this.tInterval = null;
	this.initialize = function(){
		this.initialized = true;
	};
	this.validate = function(){
		if(!this.initialized){
			console.log('You should use the singleton variable "singletonRockerConfirmation" ');
			return false;
		}
		return true;
	};
	this.showPanel = function(){
	
	};
	this.confirm = function(msg){
		if(!(this.validate())){return false;}
		if(null!=this.tInterval){return false;}
		
		return confirm(msg);
	};
};
var singletonRockerConfirmation = new ConfirmDialog();
singletonRockerConfirmation.initialize();