var RockerFormTemplate = function(){
	this.template = '';
	this.tableTemplate = new RockerTableTemplate();
	this.initialize = function(){
		var n = 0;
		this.template += 'var MyForm = function(idAppenderForm){\\n';
		n++;
		this.template += getTabulation(n);
		this.template += 'this.idAppenderForm = idAppenderForm;\\n';
		this.template += getTabulation(n);
		this.template += 'this.title = "My Form Title";\\n';
		this.template += getTabulation(n);
		this.template += 'this.horizontalAlignFields = false;\\n';
		this.template += getTabulation(n);
		this.template += 'this.width = -1;\\n';
		this.template += getTabulation(n);
		this.template += 'this.closable = false;\\n';
		this.template += getTabulation(n);
		this.template += 'this.modal = false;\\n';
		this.template += getTabulation(n);
		this.template += 'this.actionForm = "/";\\n';
		this.template += getTabulation(n);
		this.template += 'this.onclickSubmit = \'\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.onclickCancel = \'\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.onRead = \'\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.textSubmit = \'Submit\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.textCancel = \'Cancel\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.errorCode = \'ERROR_606\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.jsonCode = \'JSON_767\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.posTop = 0;\\n';
		this.template += getTabulation(n);
		this.template += 'this.posLeft = 5;\\n';
		this.template += getTabulation(n);
		this.template += 'this.titleTable = \'My Form Objects\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.typeObject = \'MyObject\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.aliasObject = \'My Object\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.additionalParamsAndValuesOnRequestTable = \'\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.onclose = \'\';\\n';
		this.template += getTabulation(n);
		this.template += 'this.drawTableOnTop = false;\\n';
		this.template += getTabulation(n);
		this.template += 'this.initialLineNumbersTable = 5;\\n';
		this.template += getTabulation(n);
		this.template += 'this.visibleButtonsTable = 3;\\n';
		this.template += getTabulation(n);
		this.template += 'this.deleteAndEditButtonsOnTable = false;\\n';
		this.template += getTabulation(n);
		this.template += 'this.tableOnNewTab = true;\\n';
		this.template += getTabulation(n);
		this.template += 'this.idToClickOnComplete = null;\\n\\n';
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
		this.template += getTabulation(n);
		this.template += 'this.getArrayFields = function(){\\n';
		n++;
		this.template += getTabulation(n);
		this.template += 'var arrayFields = [];\\n';
		this.template += getTabulation(n);
		this.template += 'var i = 0;';
		this.template += '{arrayFields}\\n';
		this.template += getTabulation(n);
		this.template += 'return arrayFields;\\n';
		n--;
		this.template += getTabulation(n);
		this.template += '};\\n';
		//
		this.template += getTabulation(n);
		this.template += 'this.draw = function(){\\n';
		n++;
		this.template += getTabulation(n);
		this.template += 'new RockerForm(this.title,this.idAppenderForm,this.horizontalAlignFields,\\n';
		n++;
		this.template += getTabulation(n);
		this.template += 'this.width,this.closable,this.modal,this.getArrayFields(),\\n';
		this.template += getTabulation(n);
		this.template += 'this.actionForm,this.onclickSubmit,this.onclickCancel,this.textSubmit,\\n';
		this.template += getTabulation(n);
		this.template += 'this.textCancel,this.errorCode,this.jsonCode,this.posTop,this.posLeft,\\n';
		this.template += getTabulation(n);
		this.template += 'this.titleTable, this.getArrayTableColumns(),this.typeObject,this.aliasObject,\\n';
		this.template += getTabulation(n);
		this.template += 'this.additionalParamsAndValuesOnRequestTable,this.onclose,this.drawTableOnTop,\\n';
		this.template += getTabulation(n);
		this.template += 'this.initialLineNumbersTable,this.visibleButtonsTable,this.deleteAndEditButtonsOnTable,\\n';
		this.template += getTabulation(n);
		this.template += 'this.tableOnNewTab,this.onRead';
		this.template += ');\\n';
		n--;
		n--;
		this.template += getTabulation(n);
		this.template += '};\\n';
		this.template += getTabulation(n);
		this.template += 'this.draw();\\n';
		n--;
		this.template += getTabulation(n);
		this.template += '};';
	};		
	this.generateRockerFormCode = function(arrayRockerFormElements){
		var tab = getTabulation(2);
		var elementsCode = '';
		elementsCode += '\\n';
		for(var i = 0; i < arrayRockerFormElements.length; i++){
			if(arrayRockerFormElements[i][1][1] == 'tableColumn' || arrayRockerFormElements[i][1][1] == 'tableButton'){
				continue;
			}
			var elemDoc = arrayRockerFormElements[i][1][3];
			var elemCod = arrayRockerFormElements[i][1][2];
			elemDoc = singletonRockerCommons.replaceAll(elemDoc,'\\n','');
			elemCod = singletonRockerCommons.replaceAll(elemCod,'\\n','');
			elemCod = singletonRockerCommons.replaceAll(elemCod,'i++;','');
			elementsCode += tab;
			elementsCode += elemDoc;
			elementsCode += '\\n';
			elementsCode += tab;
			elementsCode += elemCod;
			elementsCode += '\\n';
			elementsCode += tab;
			elementsCode += 'i++;';
			if(i < (arrayRockerFormElements.length - 1)){
				elementsCode += '\\n';
			}
		}
		var generatedCode = singletonRockerCommons.replaceAll(this.template,'{arrayFields}',elementsCode);
		generatedCode = singletonRockerCommons.replaceAll(generatedCode, '{arrayTableColumns}', 
											this.tableTemplate.getTableColumnsElementsString(arrayRockerFormElements));
		generatedCode = singletonRockerCommons.replaceAll(generatedCode, '\\n', '<br/>');
		return generatedCode;
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