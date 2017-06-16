var RockerValidatorData = function(){
	this.initialized = false;
	this.initialize = function(){
		this.initialized = true;
	};
	this.validateInitialized = function(){
		if(!this.initialized){
			console.log('You should use the singleton variable "singletonRockerValidatorData" ');
			return false;
		}
		return true;
	};
	this.validateDate = function(data){
		if(!this.validateInitialized()){return false;}
		var day = data.substr(0,2);
		day = parseInt(day);
		if(day > 31 || day == 0){
			return singletonRockerI18n.getMessage('RockerValidatorData.invalidDay',['01','31']);
		}
		var month = data.substr(3,5);
		month = parseInt(month);
		if(month == 0  || month > 12){
			return singletonRockerI18n.getMessage('RockerValidatorData.invalidMonth',['01','12']);
		}
		return "";
	};
};
var singletonRockerValidatorData = new RockerValidatorData();
singletonRockerValidatorData.initialize();