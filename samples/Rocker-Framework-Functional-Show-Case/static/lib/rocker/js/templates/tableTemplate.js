var RockerTableTemplate = function(){
	this.template = '';
	this.getTableColumnsElementsString = function(arrayRockerFormElements){
		var tab = getTabulation(2);
		var tableColumnsElements = [];
		var tableColumnsElementsString = '';
		var virgula = '';
		for(var i = 0; i < arrayRockerFormElements.length; i++){
			if(arrayRockerFormElements[i][1][1] != 'tableColumn'){
				continue;
			}
			tableColumnsElements[tableColumnsElements.length] = arrayRockerFormElements[i][1][2];
		}
		virgula = '';
		tableColumnsElementsString += tab + 'arrayTableColumns[0] = [';
		for(var i = 0; i < tableColumnsElements.length; i++){
			tableColumnsElementsString +=  virgula + '\''  + tableColumnsElements[i][0] + '\'';
			virgula = ',';
		}
		tableColumnsElementsString += ',\'Actions\'];\\n';
		virgula = '';
		tableColumnsElementsString += tab + 'arrayTableColumns[1] = [';
		for(var i = 0; i < tableColumnsElements.length; i++){
			tableColumnsElementsString +=  virgula + '\'' + tableColumnsElements[i][1] + '\'';
			virgula = ',';
		}
		tableColumnsElementsString += ',\'\'];\\n';
		virgula = '';
		tableColumnsElementsString += tab + 'arrayTableColumns[2] = [';
		for(var i = 0; i < tableColumnsElements.length; i++){
			var w = tableColumnsElements[i][2];
			if(null==w){
				w = 0;
			}
			tableColumnsElementsString += virgula + '' + w + '';
			virgula = ',';
		}
		tableColumnsElementsString += ',\'0\'];\\n';
		virgula = '';
		tableColumnsElementsString += tab + 'arrayTableColumns[3] = [';
		for(var i = 0; i < tableColumnsElements.length; i++){
			tableColumnsElementsString += virgula + '\'' + tableColumnsElements[i][3] + '\'';
			virgula = ',';
		}
		tableColumnsElementsString += ',\'false\'];\\n';
		virgula = '';
		tableColumnsElementsString += tab + 'arrayTableColumns[4] = [';
		for(var i = 0; i < tableColumnsElements.length; i++){
			tableColumnsElementsString += virgula + '\'' + tableColumnsElements[i][4] + '\'';
			virgula = ',';
		}
		tableColumnsElementsString += ',\'\'];\\n';
		virgula = '';
		tableColumnsElementsString += tab + 'arrayTableColumns[5] = [';
		for(var i = 0; i < tableColumnsElements.length; i++){
			var w = tableColumnsElements[i][2];
			if(null==w){
				w = 0;
			}
			w = parseInt(w);
			if(w < 0){
				w = w * -1;
			}
			tableColumnsElementsString += virgula + '\'width: '+ (w + 10) + 'px; text-align: left; ' + tableColumnsElements[i][5] + '\'';
			virgula = ',';
		}
		tableColumnsElementsString += ',\'width: 40px; text-align: left;\'];\\n';
		virgula = '';
		tableColumnsElementsString += tab + 'arrayTableColumns[6] = [';
		for(var i = 0; i < tableColumnsElements.length; i++){
			tableColumnsElementsString += virgula + '\'' + tableColumnsElements[i][6] + '\'';
			virgula = ',';
		}
		tableColumnsElementsString += ',\'margin-left: 10px;\'];\\n';
		tableColumnsElementsString +=  tab + 'var arrayAditionalButtonsTable = [];\\n';
		var countBt = 0;
		for(var i = 0; i < arrayRockerFormElements.length; i++){
			if(arrayRockerFormElements[i][1][1] != 'tableButton'){
				continue;
			}
			var arrValues = arrayRockerFormElements[i][1][2];
			tableColumnsElementsString +=  tab + 'var arrayBtAd' + countBt + ' = [];\\n';
			tableColumnsElementsString +=  tab + 'arrayBtAd' + countBt + '[0] = \'' + arrValues[0] + '\';\\n';
			tableColumnsElementsString +=  tab + 'arrayBtAd' + countBt + '[1] = \'' + arrValues[1] + '\';\\n';
			tableColumnsElementsString +=  tab + 'arrayBtAd' + countBt + '[2] = \'' + arrValues[2] + '\';\\n';
			tableColumnsElementsString +=  tab + 'arrayBtAd' + countBt + '[3] = \'' + arrValues[3] + '\';\\n';
			tableColumnsElementsString +=  tab + 'arrayBtAd' + countBt + '[4] = ';
			tableColumnsElementsString += singletonRockerCommons.stringToArrayString(arrValues[4], false)+ ';\\n';
			tableColumnsElementsString +=  tab + 'arrayAditionalButtonsTable[' + countBt + '] = arrayBtAd' + countBt + ';\\n';
			countBt ++;
		}
		tableColumnsElementsString +=  tab + 'arrayTableColumns[7] = arrayAditionalButtonsTable;';
		return tableColumnsElementsString;
	};
	this.generateRockerTableCode = function(arrayRockerFormElements){
		var generatedCode = singletonRockerCommons.replaceAll(this.template, '{arrayTableColumns}', 
				this.getTableColumnsElementsString(arrayRockerFormElements));
		generatedCode = singletonRockerCommons.replaceAll(generatedCode, '\\n', '<br/>');
		return generatedCode;
	};
	this.initialize = function(){
		var n = 0;
		this.template += getTabulation(n);
		this.template = 'var MyTable = function(idToInner){\\n';
		n++;
		this.template += getTabulation(n);
		this.template += 'this.idToInner = idToInner;\\n';
		this.template += getTabulation(n);
		this.template += 'this.title = \'My Rocker Objects\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.maxPageButtons = 5;\\n';
		this.template += getTabulation(n);
		this.template += 'this.baseActionFilterAndLoad = \'/\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.typeObject = \'MyObject\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.deleteAndEditButtons = \'false\';';
		this.template += '//For interaction whit a RockerForm (true for this parameter), ';
		this.template += ' its strongly recommended use the RockerTable provided by a RockerForm.\\n';
		this.template += getTabulation(n);
		this.template += 'this.nameForm = null;//outside a RockerForm! - Dont change it.\\n';
		this.template += getTabulation(n);
		this.template += 'this.idToInnerForm = null;//outside a RockerForm! - Dont change it.\\n';
		this.template += getTabulation(n);
		this.template += 'this.requestUpdateOnSetRows = true;\\n';
		this.template += getTabulation(n);
		this.template += 'this.additionalParamsAndValuesOnRequest = \'\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.printAllowed = true;\\n';
		this.template += getTabulation(n);
		this.template += 'this.onRead = \'\';//outside a RockerForm! - Dont change it.\\n';
		this.template += getTabulation(n);
		this.template += 'this.getArrayTableColumns = function(){\\n';
		n++;
		this.template += getTabulation(n);
		this.template += 'var arrayTableColumns = [];\\n';
		this.template += '{arrayTableColumns}\\n';
		this.template += getTabulation(n);
		this.template += 'return arrayTableColumns;\\n';
		n--;
		this.template += getTabulation(n);
		this.template += '};\\n';
		//
		this.template += getTabulation(n);
		this.template += 'this.draw = function(){\\n';
		n++;
		this.template += getTabulation(n);
		this.template += 'new RockerTable(this.idToInner,this.title,this.maxPageButtons,this.arrayTableColumns,\\n';
		n++;
		this.template += getTabulation(n);
		this.template += 'this.baseActionFilterAndLoad,this.typeObject,this.deleteAndEditButtons,\\n';
		this.template += getTabulation(n);
		this.template += 'this.nameForm,this.idToInnerForm,this.requestUpdateOnSetRows,\\n';
		this.template += getTabulation(n);
		this.template += 'this.additionalParamsAndValuesOnRequest,this.printAllowed,this.onRead\\n';
		this.template += getTabulation(n);
		this.template += ');\\n';
		n--;
		n--;
		this.template += getTabulation(n);
		this.template += '};\\n';
		this.template += getTabulation(n);
		this.template += 'this.draw();\\n';
		n--;
		this.template += '};';
	};
	function getTabulation(n){
		var tabulation = '&nbsp;&nbsp;&nbsp;';
		var tabs = '';
		for(var i = 0; i < n; i++){
			tabs += tabulation;
		}
		return tabs;
	};
	this.initialize();
};