var RockerCriptoerIntern = function(){
	this.initialized = false;
	this.initialize = function(){
		this.load();
		this.initialized = true;
	};
	this.validate = function(){
		if(!this.initialized){
			console.log('You should use the singleton variable "singletonRockerCriptoerIntern" ');
			return false;
		}
		return true;
	};
	var criptoeeer = function(type,cauxi){
		this.type = type;
		this.complement = '0000ffffaaccffee8891ffff0000' + cauxi + '0000aaaaff4acfffaaffaaaa0000';
		this.cript = function(msg){
			if(null==msg || singletonRockerCommons.trim(msg) == ''){
				return msg;
			}
			if(!(this.type >= 1 && this.type <= 4)){
				return (this.complement + singletonRockerCommons.trim(msg));
			}
			var msg2 = '';
			var arr = [];
			var size = msg.length;
			for(var i = 0; i < size; i+=4){
				arr[arr.length] = msg.substring(i,i+4);
			}
			var size2 = arr.length;
			for(var i = 0; i < size2; i++){
				if(this.type == 1){
					msg2 += (arr[i][3]);
					msg2 += (arr[i][0]);
					msg2 += (arr[i][2]);
					msg2 += (arr[i][1]);
				}else if(this.type == 2){
					msg2 += (arr[i][2]);
					msg2 += (arr[i][1]);
					msg2 += (arr[i][0]);
					msg2 += (arr[i][3]);
				}else if(this.type == 3){
					msg2 += (arr[i][1]);
					msg2 += (arr[i][3]);
					msg2 += (arr[i][0]);
					msg2 += (arr[i][2]);
				}else if(this.type == 4){
					msg2 += (arr[i][2]);
					msg2 += (arr[i][3]);
					msg2 += (arr[i][0]);
					msg2 += (arr[i][1]);
				}
			}
			return (this.complement + msg2);
		};
		this.decript = function(msgCr){
			if(null==msgCr || msgCr == ''){
				return msgCr;
			}
			msgCr = msgCr.replace(this.complement,'');
			if(!(this.type >= 1 && this.type <= 4)){
				return msgCr;
			}
			var arr = [];
			var msg2 = '';
			var size = msgCr.length;
			for(var i = 0; i < size; i+=4){
				arr[arr.length] = msgCr.substring(i,i+4);
			}
			var size2 = arr.length;
			for(var i = 0; i < size2; i++){
				if(this.type == 1){
					msg2 += (arr[i][1]);//1
					msg2 += (arr[i][3]);//3
					msg2 += (arr[i][2]);//2
					msg2 += (arr[i][0]);//0
				}else if(this.type == 2){
					msg2 += (arr[i][2]);//2
					msg2 += (arr[i][1]);//1
					msg2 += (arr[i][0]);//0
					msg2 += (arr[i][3]);//3
				}else if(this.type == 3){
					msg2 += (arr[i][2]);//2
					msg2 += (arr[i][0]);//0
					msg2 += (arr[i][3]);//3
					msg2 += (arr[i][1]);//1
				}else if(this.type == 4){
					msg2 += (arr[i][2]);//2
					msg2 += (arr[i][3]);//3
					msg2 += (arr[i][0]);//0
					msg2 += (arr[i][1]);//1
				}
			}
			return msg2;
		};
	};
	this.cripters = [];
	this.addCripter = function(type,cauxi){
		this.cripters[this.cripters.length] = new criptoeeer(type,cauxi);
	};
	this.load = function(){
		this.addCripter(1,'24daac3aad81');
		this.addCripter(2,'24dad2aaad81');
		this.addCripter(3,'24daaab5ad81');
		this.addCripter(4,'24df6aaaad81');
		this.addCripter(1,'45f62b');
		this.addCripter(2,'45bbfb');
		this.addCripter(3,'45c5afb');
		this.addCripter(4,'4584fb');
		this.addCripter(1,'4523e88e62ee');
		this.addCripter(2,'4523ee62e72e');
		this.addCripter(3,'4523ee62c23ee');
		this.addCripter(4,'4523e7fe62ee');
		this.addCripter(1,'6751ad');
		this.addCripter(2,'67accd');
		this.addCripter(3,'67c5dad');
		this.addCripter(4,'67aabdd');
	};
	this.cript = function(msg){
		if(!this.validate()){return null;}
		var size = this.cripters.length;
		var pos = parseInt((Math.random() * size) + 1);
		if(pos > (size - 1)){
			pos = (size - 1);
		}
		return this.cripters[pos].cript(msg);
	};
	this.decript = function(msg){
		if(!this.validate()){return null;}
		var size = this.cripters.length;
		for(var i = 0; i < size; i++){
			var index = msg.indexOf(this.cripters[i].complement);
			if(index >= 0){
				return this.cripters[i].decript(msg);
			}
		}
		return msg;
	};
};
var singletonRockerCriptoerIntern = new RockerCriptoerIntern();
singletonRockerCriptoerIntern.initialize();
var RockerCriptoer = function(){
	this.additionalChars = 8;
	this.sinalizer = 'AAAABBBB';
	this.finalizer = 'BBBBAAAA';
	this.initialized = false;
	this.initialize = function(){
		this.initialized = true;
	};
	this.validate = function(){
		if(!this.initialized){
			console.log('You should use the singleton variable "singletonRockerCripter" ');
			return false;
		}
		return true;
	};
	this.cript = function(word){
		if(!this.validate()){return '';}
		word = this.protectContent(word);
		var arrays = [];
		arrays[0] = this.getPrefixSufix('',false);
		arrays[1] = this.getArrCodes(this.stringToArray(word),false);
		arrays[2] = this.getPrefixSufix('',true);
		var arrayNew = this.mixArray(arrays);
		var arrayCommuted = this.processArray(arrayNew,true);
		var hexArray = this.hexdecarray(arrayCommuted,true);
		var hexArrayString = this.arrayToString(hexArray);
		hexArrayString = singletonRockerCriptoerIntern.cript(hexArrayString);
		return (this.sinalizer + hexArrayString + this.finalizer);
	};
	this.decript = function(wordCript){
		if(!this.validate()){return '';}
		wordCript = wordCript.replace(this.sinalizer,'');
		wordCript = wordCript.replace(this.finalizer,'');
		wordCript = singletonRockerCriptoerIntern.decript(wordCript);
		var hexArrayRev = this.stringToArraySplited(wordCript,4);
		var decArray = this.hexdecarray(hexArrayRev,false);
		var arrayUncommuted = this.processArray(decArray,false);
		var arrLetters = this.getArrCodes(this.removeComplement(arrayUncommuted),true);
		var string = this.arrayToString(arrLetters);
		return string;
	};
	this.decriptTrunk = function(wordCript){
		if(!this.validate()){return wordCript;}
		var valueDec = '';
		if(null!=wordCript && wordCript!=''){
			var initPos = wordCript.indexOf(this.sinalizer);
			var endPos = wordCript.indexOf(this.finalizer);
			if(initPos != -1){
				var sAux = '';
				var txtBefore = '';
				var txtAfter = '';
				if(endPos != -1){
					sAux = wordCript.substring(initPos,endPos);
					txtBefore = wordCript.substring(0,initPos);
					txtAfter = wordCript.substring(endPos);
				}else{
					sAux = wordCript.substring(initPos);
					txtBefore = wordCript.substring(0,initPos);
				}
				txtBefore = txtBefore.replace(this.sinalizer,'');
				txtBefore = txtBefore.replace(this.finalizer,'');
				sAux = sAux.replace(this.sinalizer,'');
				sAux = sAux.replace(this.finalizer,'');
				sAux = singletonRockerCriptoerIntern.decript(sAux);
				txtAfter = txtAfter.replace(this.sinalizer,'');
				txtAfter = txtAfter.replace(this.finalizer,'');
				var hexArrayRev = this.stringToArraySplited(sAux,4);
				var decArray = this.hexdecarray(hexArrayRev,false);
				var arrayUncommuted = this.processArray(decArray,false);
				var arrLetters = this.getArrCodes(this.removeComplement(arrayUncommuted),true);
				valueDec = this.arrayToString(arrLetters);
				valueDec = txtBefore + valueDec + txtAfter;
			}else{
				valueDec = wordCript;
			}
		}
		return valueDec;
	};
	this.removeComplement = function(array){
		if(!this.validate()){return '';}
		var arrayNew = [];
		if(null!=array && array.length > (2 * this.additionalChars)){
			var size = array.length;
			for(var i = 0; i < size; i++){
				if(i >= this.additionalChars && i < (size - (this.additionalChars) ) ){
					arrayNew[arrayNew.length] = array[i];
				}
			}
		}
		return arrayNew;
	};
	this.hexdecarray = function(array,toHex){
		if(!this.validate()){return '';}
		if(null!=array && array.length > 0){
			var arrayNew = [];
			var size = array.length;
			for(var i = 0; i < size; i++){
				if(toHex){
					var hexString = array[i].toString(16);
					while(hexString.length < 4){
						hexString = '0' + hexString;
					}
					arrayNew[arrayNew.length] = hexString;
				}else{
					arrayNew[arrayNew.length] = parseInt(array[i],16);
				}
			}
			return arrayNew;
		}
		return array;
	};
	this.getPrefixSufix = function(complement,isSufix){
		if(!this.validate()){return '';}
		var arrString = this.stringToArray(complement);
		var arrCodes = this.getArrCodes(arrString);
		var size = arrCodes.length;
		if(size >= this.additionalChars){
			var arrCodes2 = [];
			for(var i = 0; i < this.additionalChars; i++){
				arrCodes2[arrCodes2.length] = arrCodes[i];
			}
			arrCodes = arrCodes2;
		}else{
			for(var i = size; i < this.additionalChars; i++){
				var rand = parseInt((Math.random() * 255));
				arrCodes[arrCodes.length] = rand;
			}
		}
		if(null!=isSufix && (isSufix == 'true' || isSufix == true)){
			return this.processArrayReverse(arrCodes);
		}else{
			return this.processArray(arrCodes,false);
		}
	};
	this.processArrayReverse = function(array){
		if(!this.validate()){return '';}
		if(null!=array && array.length > 0){
			var size = array.length;
			var arrCodes4 = [];
			var arrCodes5 = [];
			var arrCodes6 = [];
			for(var i = (size - 1); i >= 0; i--){
				if(i%3 == 0){
					arrCodes4[arrCodes4.length] = array[i];
				}else if(i%3 == 1){
					arrCodes5[arrCodes5.length] = array[i];
				}else if(i%3 == 2){
					arrCodes6[arrCodes6.length] = array[i];
				}
			}
			var arrCodes = [];
			arrCodes[0] = arrCodes4;
			arrCodes[1] = arrCodes5;
			arrCodes[2] = arrCodes6;
			return this.mixArray(arrCodes);
		}else{
			return array;
		}
	};
	this.mixArray = function(arrays){
		if(!this.validate()){return '';}
		var newArray = [];
		if(null!=arrays && arrays.length > 0){
			var size = arrays.length;
			for(var i = 0; i < size; i++){
				var array = arrays[i];
				if(null!=array && array.length > 0){
					size2 = array.length;
					for(var j = 0; j < size2; j++){
						newArray[newArray.length] = array[j];
					}
				}
			}
		}
		return newArray;
	};
	this.processArray = function(array,commuting){
		if(!this.validate()){return '';}
		if(null!=array && array.length > 0){
			var size = array.length;
			var arrCodes = [];
			for(var i = 0; i < size; i++){
				var vAux = ((i+2) % 11);
				if(commuting){
					arrCodes[arrCodes.length] = (array[i] + vAux );
				}else{
					arrCodes[arrCodes.length] = (array[i] - vAux );
				}
			}
			return arrCodes;
		}else{
			return array;
		}
	};
	this.stringToArray = function(string){
		if(!this.validate()){return '';}
		var arr = [];
		if(null!=string && string.length > 0){
			var size = string.length;
			for(var i = 0; i < size; i++){
				arr[arr.length] = string.charAt(i);
			}
		}
		return arr;
	};
	this.stringToArraySplited = function(string,numberChars){
		if(!this.validate()){return '';}
		var arr = [];
		if(null!=string && string.length > 0){
			var size = string.length;
			while(size > numberChars){
				arr[arr.length] = string.substr(0,numberChars);
				string = string.slice(numberChars);
				size = string.length;
			}
			if(size > 0){
				arr[arr.length] = string;
			}
		}
		return arr;
	};
	this.arrayToString = function(arrayString){
		if(!this.validate()){return '';}
		var string = '';
		if(null!=arrayString && arrayString.length > 0){
			var size = arrayString.length;
			for(var i = 0; i < size; i++){
				string += arrayString[i];
			}
		}
		return string;
	};
	this.getArrCodes = function(arrString,toChar){
		if(!this.validate()){return '';}
		var arrCodes = [];
		if(null!=arrString && arrString.length > 0){
			var size = arrString.length;
			for(var i = 0; i < size; i++){
				arrCodes[arrCodes.length] = ((toChar) ?  (String.fromCharCode(arrString[i])) : (arrString[i].charCodeAt(0)));
			}
		}
		return arrCodes;
	};
	this.protectContent = function(string){
		if(!this.validate()){return '';}
		string = string.replace(/<script type="text\/javascript">/gi,'');
		string = string.replace(/< script type="text\/javascript">/gi,'');
		string = string.replace(/<script type="text\/javascript" >/gi,'');
		string = string.replace(/< script type="text\/javascript" >/gi,'');
		string = string.replace(/<script/gi,'');
		string = string.replace(/<\/script>/gi,'');
		string = string.replace(/<iframe/gi,'');
		string = string.replace(/<\/iframe/gi,'');
		string = string.replace(/<a/gi,'');
		string = string.replace(/<\/a>/gi,'');
		return string;
	};
};
var singletonRockerCripter = new RockerCriptoer();
singletonRockerCripter.initialize();