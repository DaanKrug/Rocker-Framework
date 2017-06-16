var RockerCustomValidator = function(){
	this.validationMsg = '';
	this.validateMinLenght = function(stringValue){
		return true;
	};
	this.adjustValue = function (stringValue){
		return stringValue;
	};
	this.validate = function(stringValue){return true;};
	this.getValidationMessage = function(){return this.validationMsg;};
};
var RockerValidator = function(isInt,isDouble,americanFormat,arrayCharAlloweds,arrayCharForbidden,arrayMaskCharPositions){
	this.rangeInt = false;
	this.rangeDouble = false;
	this.milharSeparator = "";
	this.decimalSeparator = "";
	this.charsAlloweds = new Array();
	this.charsForbidden = new Array();
	this.maskCharPositions = new Array();
	this.enable = false;
	this.maxLenght = -1;
	this.minLenght = -1;
	this.textAlign = 'left';
	this.integerDigits = -1;
	this.decimalDigits = -1;
	this.placeHolderMask = false;
	this.ignoreCountingOnAdjustValue = false;
	this.validationMsg = '';
	this.makeEnable = function(maxLenght,minLenght,integerDigits,decimalDigits,placeHolderMask){
		this.maxLenght = ((null!=maxLenght && maxLenght > 0) ? maxLenght : -1);
		this.minLenght = ((null!=minLenght && minLenght > 0) ? minLenght : -1);
		this.integerDigits = ((null!=integerDigits && integerDigits > 0 && this.rangeDouble ==  true) ? integerDigits : -1);
		this.decimalDigits = ((null!=decimalDigits && decimalDigits > 0 && this.rangeDouble ==  true) ? decimalDigits : -1);
		this.placeHolderMask = ((null!=placeHolderMask && (placeHolderMask == 'true' || placeHolderMask ==  true)) ? true : false);
		this.enable = true;
		if(this.rangeInt ==  true || this.rangeDouble ==  true ){
			this.textAlign = 'right';
		}
	};
	this.inUtf8CharCodes = function(string){
		var size = singletonRockerFormValidator.utf8CharCodes.length;
		for(var i =0; i< size; i++){
			if(string.charCodeAt(0) == singletonRockerFormValidator.utf8CharCodes[i]){
				return true;
			}
		}
		return false;
	};
	this.inSingleChars = function(char){
		var size = singletonRockerFormValidator.singleChars.length;
		for(var i =0; i< size; i++){
			if(char == singletonRockerFormValidator.singleChars[i]){
				return true;
			}
		}
		return false;
	};
	this.inAlloweds = function(char){
		if(this.inUtf8CharCodes(char)){return true;}
		var size = this.charsAlloweds.length;
		for(var i =0; i< size; i++){
			if(char == this.charsAlloweds[i]){
				return true;
			}
		}
		return false;
	};
	this.inForbidden = function(char){
		var size = this.charsForbidden.length;
		for(var i =0; i< size; i++){
			if(char == this.charsForbidden[i]){
				return true;
			}
		}
		return false;
	};
	this.adjustLetterByMask = function(letter,iPos){
		if(this.maskCharPositions.length > 0){
			if((this.maskCharPositions.length > iPos)){
				var maskChar = this.maskCharPositions[iPos];
				if(maskChar == '' || maskChar == ' '){
					maskChar = '[0-9][a-z]';
				}
				if((maskChar == '[0-9][a-z]' || maskChar == '[a-z][0-9]') && (singletonRockerFormValidator.inNumbers(letter) || singletonRockerFormValidator.inLetters(letter))){
					return letter;
				}else if(maskChar == '[0-9]' && singletonRockerFormValidator.inNumbers(letter)){
					return letter;
				}else if(maskChar == '[a-z]' && singletonRockerFormValidator.inLetters(letter)){
					return letter;
				}else if(maskChar == letter){
					return letter;
				}else{
					if(maskChar == '[0-9][a-z]' || maskChar == '[a-z][0-9]' || maskChar == '[a-z]'){
						return "A";
					}else if(maskChar == '[0-9]'){
						return "0";
					}else{
						return maskChar.substr(0,1);
					}
				}
			}
			return "";
		}else{
			if(null!=this.charsForbidden &&  this.charsForbidden.length > 0){
				if(this.inForbidden(letter)){
					return "";
				}
				return letter;
			}else if(null!=this.charsAlloweds &&  this.charsAlloweds.length > 0){
				if(!this.inAlloweds(letter)){
					return "";
				}
				return letter;
			}
			return letter;
		}
	};
	this.validate = function(stringValue){return true;};// for  use on custom functions by RockerCustomValidator
	this.getValidationMessage = function(){return this.validationMsg;};// for  use on custom functions by RockerCustomValidator
	this.validateMinLenght = function(stringValue){
		if(!this.enable){
			console.log('Hey ... you should use the singleton variable "singletonRockerFormValidator" to obtain a validator !');
			return stringValue;
		}
		if(this.minLenght > 0){
			var size = stringValue.length;
			if(size < this.minLenght){
				return false;
			}	
		}
		return true;
	};
	this.adjustValue = function (stringValue){
		if(!this.enable){
			console.log('Hey ... you should use the singleton variable "singletonRockerFormValidator" to obtain a validator !');
			return stringValue;
		}
		var negativSign = ( ( (this.rangeDouble || this.rangeInt) && (stringValue.substr(0,1) == '-') ) ? '-' : '');
		
		stringValue = singletonRockerCommons.replaceAll(stringValue,'&nbsp;',' ');
		stringValue = singletonRockerCommons.replaceAll(stringValue,'  ',' ');
		
		if(this.maxLenght > 0){
			var stringValueAux = stringValue;
			if((this.rangeDouble || this.rangeInt)){
				stringValueAux = stringValueAux.replace(/-/g,"");
			}
			var stringValueAux2 = "";
			var size2 = stringValueAux.length;
			var countSize = 0;
			for(var i = 0; i < size2; i ++){
				var letter = stringValueAux.substr(i,1);
				if(this.rangeDouble && ( letter == this.milharSeparator || letter == this.decimalSeparator ) ){
					countSize += 0;
				}else if(this.rangeInt && ( letter == this.milharSeparator ) ){
					countSize += 0;
				}else {
					countSize += 1;
				}
				if(!this.ignoreCountingOnAdjustValue && countSize > this.maxLenght){
					return (negativSign + stringValueAux2);
				}
				stringValueAux2 += letter;
			}
		}
		var size = stringValue.length;
		var stringValueAdjusted = "";
		if(this.rangeDouble || this.rangeInt){
			for(var i=0; i < size; i++){
				var letter = stringValue.substr(i,1);
				if(letter == this.decimalSeparator && stringValueAdjusted.indexOf(this.decimalSeparator) != -1){
					continue;
				}
				letter = singletonRockerFormValidator.adjustLetterDoubleInt(letter,this.rangeDouble,this.decimalSeparator);
				stringValueAdjusted += letter;
			}
			stringValueAdjusted = singletonRockerFormValidator.adjustThousand(stringValueAdjusted,this.milharSeparator,this.decimalSeparator,this.integerDigits,this.decimalDigits);
			stringValueAdjusted = negativSign + stringValueAdjusted;
		}else{
			for(var i =0; i < size; i++){
				var letter = stringValue.substr(i,1);
				letter = this.adjustLetterByMask(letter,i);
				stringValueAdjusted += letter;
			}
		}
		return stringValueAdjusted;
	};
	this.setMaskCharPositions = function(arrayMaskCharPositions){
		if(null!=arrayMaskCharPositions && arrayMaskCharPositions.length > 0){
			var charPositions = new Array();
			var size = arrayMaskCharPositions.length;
			for(var i = 0; i < size; i++){
				var valcharMask = '';
				if(null!=arrayMaskCharPositions[i]){
					valcharMask = arrayMaskCharPositions[i];
				}
				charPositions[i] = valcharMask;
			}
			if(charPositions.length > 0){
				this.maskCharPositions = charPositions;
			}
		}
	};
	this.getPlaceHolderMask = function(){
		var maskEx = '';
		if(null!=this.maskCharPositions && this.maskCharPositions.length > 0){
			var size = this.maskCharPositions.length;
			alfaNums = ['0','9','A','a','Z','z'];
			nums = ['1','2','3'];
			chars = ['B','b','C','c','E','e','K','k','W','w'];
			for(var i = 0; i < size; i++){
				var valcharMask = '';
				if(null!=this.maskCharPositions[i]){
					valcharMask = this.maskCharPositions[i];
					if(valcharMask == '[a-z][0-9]' || valcharMask == '[0-9][a-z]'){
						valcharMask = alfaNums[i%6];
					}else if(valcharMask == '[a-z]'){
						valcharMask = chars[i%10];
					}else if(valcharMask == '[0-9]'){
						valcharMask = nums[i%3];
					}
				}else{
					valcharMask = '*';
				}
				maskEx += valcharMask;
			}
		}
		return maskEx;
	};
	this.getCompletationDigits = function(widthView,heightView,digited){
		if(null==widthView || widthView < 100){
			widthView = 100;
		}
		if(null==heightView || heightView < 5){
			heightView = 5;
		}
		var pcomp = 0;
		var clazz = '';
		var message = '';
		if(this.maxLenght > 0 && this.minLenght > 0){
			if(digited >= this.minLenght){
				message = digited + ' / ' + this.maxLenght + ' max.';
			}else{
				message = digited + ' / ' + this.minLenght + ' min.';
			}
			pcomp  = parseInt((digited / this.maxLenght) * 100);
			if(digited >= this.minLenght && digited <= this.maxLenght){
				clazz = 'rockerCompletationOk';
			}else{
				clazz = 'rockerCompletationError';
			}
		}else if(this.maxLenght > 0){
			pcomp = parseInt((digited / this.maxLenght) * 100);
			if(digited <= this.maxLenght){
				clazz = 'rockerCompletationOk';
			}else{
				clazz = 'rockerCompletationError';
			}
			message = digited + ' / ' + this.maxLenght + ' max.';
		}else if(this.minLenght > 0){
			pcomp = parseInt((digited / this.minLenght) * 100);
			if(digited >= this.minLenght){
				clazz = 'rockerCompletationOk';
			}else{
				clazz = 'rockerCompletationError';
			}
			message = digited + ' / ' + this.minLenght + ' min.';
		}

		if(pcomp > 100){
			pcomp = 100;
		}
		var comp = '';
		comp += '<div class="rockerCompletationContainerIntern ui-progressbar" style="width: ';
		comp += (widthView) + 'px; height: '+ heightView + 'px;  padding: 0px;">';
		comp += '<div class="ui-widget-content ui-state-default" style="height: ';
		comp += heightView + 'px; width: ' + (widthView - 10) + 'px; margin: 0px 4px; padding: 0px;" >';
		comp += '<div class="ui-progressbar-value '+ clazz +'" style="height: '+ heightView + 'px; width: '+ pcomp + '%;"></div>';
		comp += '</div>';
		comp += '<div class="rockerCompletationMessage">';
		comp += message;
		comp += '</div>';
		comp += '<div style="clear: both;"></div>';
		comp += '</div>';
		return comp;
	};
	this.getCompletation = function(widthView,heightView,stringValue){
		if(null==stringValue || stringValue == ''){
			stringValue = '';
		}
		stringValue = singletonRockerCommons.replaceAll(stringValue,'&nbsp;',' ');
		stringValue = singletonRockerCommons.replaceAll(stringValue,'  ',' ');
		var digited = stringValue.length;
		return this.getCompletationDigits(widthView,heightView,digited);
	};
	this.setThousandAndDecimalSeparators = function(americanFormat){
		if(null!=americanFormat && (americanFormat == true || americanFormat == 'true') ){
			this.milharSeparator = ",";
			this.decimalSeparator = ".";
		}else{
			this.milharSeparator = ".";
			this.decimalSeparator = ",";
		}
	};
	this.setRange = function(isInt,isDouble){
		if(null!=isDouble  && (isDouble == true || isDouble == 'true') ){
			this.rangeInt = false;
			this.rangeDouble = true;
		}else if(null!=isInt  && (isInt == true || isInt == 'true')){
			this.rangeInt = true;
			this.rangeDouble = false;
		}else{
			this.rangeInt = false;
			this.rangeDouble = false;
		}
	};
	this.setAlloweds = function(arrayAlloweds){
		if(null!=arrayAlloweds && arrayAlloweds.length > 0){
			var newAlloweds = new Array();
			var size = arrayAlloweds.length;
			for(var i = 0; i < size; i++){
				var valchar = arrayAlloweds[i];
				if(null!=valchar && valchar != ''){
					newAlloweds[newAlloweds.length] = valchar;
				}
			}
			if(newAlloweds.length > 0){
				this.charsAlloweds = newAlloweds;
				this.charsForbidden = new Array();
			}
		}
	};
	this.setForbiddens = function(arrayForbiddens){
		if(null!=arrayForbiddens && arrayForbiddens.length > 0){
			var newForbiddens = new Array();
			var size = arrayForbiddens.length;
			for(var i = 0; i < size; i++){
				var valchar = arrayForbiddens[i];
				if(null!=valchar && valchar != ''){
					newForbiddens[newForbiddens.length] = valchar;
				}
			}
			if(newForbiddens.length > 0){
				this.charsAlloweds = new Array();
				this.charsForbidden = newForbiddens;
			}
		}
	};
	this.setThousandAndDecimalSeparators(americanFormat);
	this.setRange(isInt,isDouble);
	this.setAlloweds(arrayCharAlloweds);
	this.setForbiddens(arrayCharForbidden);
	this.setMaskCharPositions(arrayMaskCharPositions);
};
var RockerFormValidatorUtil = function() {
	this.utf8CharCodes = [
						  192,193,194,195,196,//A
						  224,225,226,227,228,//a
						  200,201,202,203,//E
						  232,233,234,235,//e
						  204,205,206,207,//I
						  236,237,238,239,//i
						  210,211,212,213,214,//O
						  242,243,244,245,246,//o
						  217,218,219,220,//U
						  249,250,251,252,//u
						  209,241,199,231//Ñ ñ Ç ç
						  ];
	this.singleChars = [
						'0','1','2','3','4','5','6','7','8','9',
						'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
						'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
	];	
	this.labelChars = [
						'0','1','2','3','4','5','6','7','8','9',
						'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
						'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
						' '
	];	
	this.hexadecimalChars = [
	                         '0','1','2','3','4','5','6','7','8','9',
	 						 'A','B','C','D','E','F',
	 						 'a','b','c','d','e','f'
	 						];
	this.cssChars = [
						'0','1','2','3','4','5','6','7','8','9',
						'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
						'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
						'-','*','#','.',',',':',';','{','}','(',')','"','\\',' ','/','_'
	                 ];
	this.numbers = ['0','1','2','3','4','5','6','7','8','9'];
	this.letters =  ['A','B','C','Ç','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z',
					   'a','b','c','ç','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z',
					   'Ä','Á','À','Â','Ã','ä','á','à','â','ã',
					   'Ë','É','È','Ê','ë','é','è','ê',
					   'Ï','Í','Ì','Î','ï','í','ì','î',
					   'Ö','Ó','Ò','Ô','Õ','ö','ó','ò','ô','õ',
					   'Ü','Ú','Ù','Û','ü','ú','ù','û',
					   ' ',',',';','.',':','-','_','+','=','/','(',')','[',']','\n',
					   '@','!','%','#','&','*','?','|','$',
					   '´','`','^','~','¨'
					   ,'\'','\\','"','{','}'
					   ,'<','>'
					   ];
	this.alfaNumsText = ['0','1','2','3','4','5','6','7','8','9','A','B','C','Ç','D','E','F','G','H','I','J','K','L','M',
					 'N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z',
	                 'a','b','c','ç','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z',
					 'Ä','Á','À','Â','Ã','ä','á','à','â','ã',
				     'Ë','É','È','Ê','ë','é','è','ê',
				     'Ï','Í','Ì','Î','ï','í','ì','î',
				     'Ö','Ó','Ò','Ô','Õ','ö','ó','ò','ô','õ',
				     'Ü','Ú','Ù','Û','ü','ú','ù','û',
				     ' ',',',';','.',':','-','_','+','=','/','(',')','[',']','\n',
					 '@','!','%','#','&','*','?','|','$',
					 '´','`','^','~','¨'
					 ,'\'','\\','"','{','}'
					 ,'<','>'
					 ];
	this.inLetters = function(char){
		var size = this.letters.length;
		for(var i =0; i< size; i++){
			if(char == this.letters[i]){
				return true;
			}
		}
		return false;
	};
	this.inNumbers =  function(char){
		var size = this.numbers.length;
		for(var i =0; i< size; i++){
			if(char == this.numbers[i]){
				return true;
			}
		}
		return false;
	};
	this.adjustLetterDoubleInt = function(char,isDouble,decimalSeparator){
		if(( (isDouble == true || isDouble == 'true') && char == decimalSeparator) || this.inNumbers(char)){
			return char;
		}
		return "";
	};
	this.adjustThousands = function(value,thousandSeparator,integerDigits){
		if(null==value){
			return value;
		}
		value = value.replace(thousandSeparator,"");
		if(value == ''){
			return value;
		}
		var size = value.length;
		if(integerDigits > 0 && size > integerDigits){
			size = integerDigits;
		}
		var result = "";
		var count = 0;
		for(var i = (size -1); i >= 0 ; i--){
			result = (value.substr(i,1) + result);
			count ++;
			if(count == 3){
				count = 0;
				if(i > 0){
					result = (thousandSeparator + result);
				}
			}
		}
		return result;
	};
	this.adjustThousand = function(value,thousandSeparator,decimalSeparator,integerDigits,decimalDigits){
		var result = "";
		var indexDecimal = value.indexOf(decimalSeparator);
		var beforeDecimal = "";
		var afterDecimal = "";
		if(indexDecimal==-1){
			result = this.adjustThousands(value,thousandSeparator,integerDigits);
		} else{
			beforeDecimal = value.substring(0,indexDecimal);
			afterDecimal = value.substring(indexDecimal+1);
			result = this.adjustThousands(beforeDecimal,thousandSeparator,integerDigits);
			if(result == '' || result.length == 0){
				result = '0';
			}
			result += decimalSeparator;
			if(decimalDigits > 0 && afterDecimal.length > decimalDigits){
				afterDecimal = afterDecimal.substr(0,decimalDigits);
			}
			result += afterDecimal;
		}
		return result;
	};
	this.getTextIntValidator = function(americanFormat,maxChars,minChars){
		var validator = new RockerValidator(true,false,americanFormat,null,null,null);
		validator.makeEnable(maxChars,minChars,-1,-1,false);
		return validator;
	};
	this.getTextDoubleValidator = function(americanFormat,maxChars,minChars,integerDigits,decimalDigits){
		var validator = new RockerValidator(false,true,americanFormat,null,null,null);
		validator.makeEnable(maxChars,minChars,integerDigits,decimalDigits,false);
		return validator;
	};
	this.getTextAllowedsValidator = function(arrayCharAlloweds,maxChars,minChars){
		if(null==arrayCharAlloweds || arrayCharAlloweds.length < 1){
			return null;
		}
		var validator = new RockerValidator(false,false,false,arrayCharAlloweds,null,null);
		validator.makeEnable(maxChars,minChars,-1,-1,false);
		return validator;
	};
	this.getTextForbiddenValidator = function(arrayCharForbidden,maxChars,minChars){
		if(null==arrayCharForbidden || arrayCharForbidden.length < 1){
			return null;
		}
		var validator = new RockerValidator(false,false,false,null,arrayCharForbidden,null);
		validator.makeEnable(maxChars,minChars,-1,-1,false);
		return validator;
	};
	this.getTextMaskValidator = function(arrayMaskCharPositions){
		if(null==arrayMaskCharPositions || arrayMaskCharPositions.length < 1){
			return null;
		}
		var validator = new RockerValidator(false,false,false,null,null,arrayMaskCharPositions);
		validator.makeEnable(-1,arrayMaskCharPositions.length,-1,-1,true);
		return validator;
	};
};
var singletonRockerFormValidator = new RockerFormValidatorUtil();
