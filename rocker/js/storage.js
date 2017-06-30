var RockerStorage = function(){
	this.initialized = false;
	this.initialize = function(){
		this.initialized = true;
	};
	this.validate = function(){
		if(!this.initialized){
			console.log('You should use the singleton variable "singletonRockerStorage" ');
			return false;
		}
		return true;
	};
	var formsStorage = new Array();
	var tablesStorage = new Array();
	var inputTextStorage = new Array();
	var visualCoderStorage = new Array();
	this.storeVisualCodeObject = function (id,object){
		if(!this.validate()){return false;}
		this.addToStorage(id,object,visualCoderStorage);
	};
	this.getVisualCodeObject = function (id){
		if(!this.validate()){return false;}
		return this.getFromStorage(id,visualCoderStorage,null);
	};
	this.getVisualCoderStorage = function (page,rows){
		if(!this.validate()){return false;}
		var validObjects = [];
		for(var i = 0; i < visualCoderStorage.length; i++){
			if(null!=visualCoderStorage[i][1]){
				validObjects[validObjects.length] = visualCoderStorage[i];
			}
		}
		visualCoderStorage = validObjects;
		if(page > 0){
			var objs = '';
			var total = 0;
			var initialIdx = (page - 1) * rows;
			var finalIdx = initialIdx + rows;
			for(var i = 0; i < visualCoderStorage.length; i++){
				if(null!=visualCoderStorage[i][1]){
					total ++;
					if(rows > 0 && !(i >= initialIdx && i < finalIdx)){
						continue;
					}
					var elemType = visualCoderStorage[i][1][1];
					var propertyOf = ((elemType != 'tableColumn' && elemType != 'tableButton') ? 'RockerForm' : 'RockerTable');
					var elemCode = ((elemType != 'tableColumn' && elemType != 'tableButton') 
							? visualCoderStorage[i][1][2] 
								: singletonRockerCommons.replaceAll(singletonRockerCommons.arrayToString(visualCoderStorage[i][1][2]), '\'', '\\\''));
					elemCode = singletonRockerCommons.replaceAll(elemCode,',','&#44;');
					elemCode = singletonRockerCommons.replaceAll(elemCode,'\'','&#39;');
					elemCode = singletonRockerCommons.replaceAll(elemCode,'"','&#34;');
					elemCode = singletonRockerCommons.replaceAll(elemCode,':','&#58;');
					elemCode = singletonRockerCommons.replaceAll(elemCode,';\\n',';<br/>');
					elemCode = singletonRockerCommons.replaceAll(elemCode,'\\n','');
					objs += '{';
					objs += '"id":"' + visualCoderStorage[i][1][0] + '",';
					objs += '"elementType":"' + elemType + '",';
					objs += '"propertyOf":"' + propertyOf + '",';
					objs += '"elementCode":"' +  elemCode+ '",';
					objs += '}';
				}
			}
			jsonString  = '{"totalObjects":"' + total + '","objects":';
			jsonString  += objs;
			jsonString  += '}';
			return jsonString;
		}
		return visualCoderStorage;
	};
	this.clearVisualCoderStorage = function(){
	    if(null!=visualCoderStorage && visualCoderStorage.length > 0){
	    	var msgConfirm = singletonRockerI18n.getMessage('RockerStorage.confirmVisualCodeStorageClearMsg',null);
	    	if(confirm(msgConfirm)){
	    		visualCoderStorage = new Array();
	    	}
	    }
	};
	this.storeRockerTable = function (id,rockerTable){
		if(!this.validate()){return false;}
		this.addToStorage(id,rockerTable,tablesStorage);
	};
	this.getRockerTable = function (id){
		if(!this.validate()){return false;}
		return this.getFromStorage(id,tablesStorage,null);
	};
	this.previousPageTable = function(id){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.splashShow();
			table.previousPage();
		}
	};
	this.nextPageTable = function(id){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.splashShow();
			table.nextPage();
		}
	};
	this.navigatePageTable = function(id,page){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.splashShow();
			table.setSelectedPage(page);
		}
	};
	this.setSelectedRowsPageTable = function(id,rows){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.splashShow();
			table.changeSelectedRows(rows);
		}
	};
	this.sortTableAsc = function(id,attribute){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.splashShow();
			table.sortTableAsc(attribute);
		}
	};
	this.sortTableDesc = function(id,attribute){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.splashShow();
			table.sortTableDesc(attribute);
		}
	};
	this.filterTable = function(id){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.splashShow();
			table.filterTable();
		}
	};
	this.setJsonObjectListTable = function(id,json){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.setJsonObjectList(json);
			table.splashHide();
		}				
	};
	this.setInnerBodyTable = function(id,inner){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.splashShow();
			table.setInnerBodyTable(inner);
		}				
	};
	this.setInnerSubHeaderTable = function(id,inner){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.setInnerSubHeaderTable(inner);
		}				
	};
	this.setInnerSubFooterTable = function(id,inner){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.setInnerSubFooterTable(inner);
		}				
	};
	this.printTable = function(id){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.print();
		}				
	};
	this.makeRequestDataReadTable = function(id,idObject){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.makeRequestDataRead(idObject);
		}	
	};
	this.makeRequestDataDeleteTable = function(id,idObject){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.splashShow();
			table.makeRequestDataDelete(idObject);
		}	
	};
	this.mousePressedTable = function(id,pressed){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			table.mousePressed = pressed;
		}	
	};
	this.isMousePressedTable = function(id){
		if(!this.validate()){return false;}
		var table = this.getRockerTable(id);
		if(null!=table){
			return table.mousePressed;
		}	
		return false;
	};
	this.scrollBodyTableBottom = function(idTable,idContent,defaultTam){
		if(!(this.isMousePressedTable(idTable))){
			singletonRockerCommons.scrollBottom(idContent,defaultTam);
		}
	};
	this.storeJsInputText = function (id,jsInputText){
		if(!this.validate()){return false;}
		this.addToStorage(id,jsInputText,inputTextStorage);
	};
	this.getJsInputText = function (id){
		if(!this.validate()){return false;}
		return this.getFromStorage(id,inputTextStorage,null);
	};
	this.validateJsInputText = function(id,value){
		if(!this.validate()){return false;}
		var result = "";
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText){
			result = jsInputText.adjustValueOnKeyUp(value);
		}
		return result;
	};
	this.generateInnerFormUpLoad = function(id){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText){
			jsInputText.generateInnerFormUpLoad();
		}
	};
	this.clearExtensionValidation = function(id,idToInnerMsg){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText){
			if(null!=jsInputText.validExtensions || jsInputText.validExtensions.length > 0){
				singletonRockerCommons.innerHtml(idToInnerMsg,'');
			}
		}
	};
	this.validateExtensionUpload = function(id,fileName,idToInnerMsg){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText){
			if(null==jsInputText.validExtensions || jsInputText.validExtensions.length == 0){
				return true;
			}
			var idx = fileName.lastIndexOf('.');
			var ext = fileName.substring(idx + 1);
			var validated = false;
			for(var i = 0; i < jsInputText.validExtensions.length; i++){
				if(null!=jsInputText.validExtensions[i] && jsInputText.validExtensions[i] == ext){
					validated = true;
					break;
				}
			}
			if(!validated){
				var msg = singletonRockerI18n.getMessage('RockerStorage.invalidExtension',[ext,jsInputText.validExtensions]);
				var inner = '';
				inner += '<div class="rockerError ui-state-error ui-corner-all">';
				inner += '<span class="ui-icon ui-icon-alert"></span>';
				inner += msg;
				inner += '</div>';
				singletonRockerCommons.innerHtml(idToInnerMsg,inner);
				return false;
			}
			return true;
		}
	};
	this.uploadSended = function(id){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText){
			jsInputText.uploadSended = true;
		}
	};
	this.uploadComplete = function(id){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText && jsInputText.uploadSended == true){
			setTimeout(function(){jsInputText.uploadComplete();},2000);
		}
	};
	this.updateAfterS3UploadComplete = function(id,value){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText){
			jsInputText.update(value);
		}
	};
	this.removeUploadedFile = function(id){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText){
			jsInputText.deleteFile();
		}
	};
	this.showUploadedFilePath = function(id){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText){
			jsInputText.showUploadedFilePath();
		}
	};
	this.removeShadowMaskFromS3Upper = function(id){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText){
			jsInputText.removeShadow();
		}
	};
	this.generateCompletationData = function(id,value,width,height){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText && null!=jsInputText.validator && jsInputText.usingCompletation){
			value = (jsInputText.richEditor ? jsInputText.removeHtmls(value) : value);
			var completation = jsInputText.validator.getCompletation(width,height,value);
			singletonRockerCommons.innerHtml(('div_completationData_' + id),completation);
		}
	};
	this.generateCompletationDataRichEditor = function(id,width,height){
		if(!this.validate()){return false;}
		var jsInputText = this.getJsInputText(id);
		if(null!=jsInputText && null!=jsInputText.validator && jsInputText.usingCompletation){
			var completation = jsInputText.validator.getCompletationDigits(width,height,jsInputText.atualLength);
			singletonRockerCommons.innerHtml(('div_completationData_' + id),completation);
		}
	};
	this.storeJsForm = function (id,jsForm){
		if(!this.validate()){return false;}
		this.addToStorage(id,jsForm,formsStorage);
	};
	this.getJsForm = function (id){
		if(!this.validate()){return false;}
		return this.getFromStorage(id,formsStorage,null);
	};
	this.deselectAllTabTabForm = function(id){
		if(!this.validate()){return false;}
		var form = this.getJsForm(id);
		for(var i = 0; i < form.arrayFields.length; i++){
			if(form.arrayFields[i].type == 'appender' && null!=form.arrayFields[i].newTabTitle){
				singletonRockerCommons.setClass('selectorTab_' + form.arrayFields[i].id,'');
				singletonRockerCommons.hide(form.arrayFields[i].id);
			}
		}
	};
	this.selectFormTabForm = function(id){
		if(!this.validate()){return false;}
		this.deselectAllTabTabForm(id);
		singletonRockerCommons.setClass('showerForm_' + id,'active');
		singletonRockerCommons.setClass('showerTable_' + id,'');
		singletonRockerCommons.hide('divTable_' + id);
		singletonRockerCommons.show('divForm_' + id);
	};
	this.selectTableTabForm = function(id){
		if(!this.validate()){return false;}
		this.deselectAllTabTabForm(id);
		singletonRockerCommons.setClass('showerForm_' + id,'');
		singletonRockerCommons.setClass('showerTable_' + id,'active');
		singletonRockerCommons.hide('divForm_' + id);
		singletonRockerCommons.show('divTable_' + id);
	};
	this.selectTabTabForm = function(id,formId){
		if(!this.validate()){return false;}
		this.deselectAllTabTabForm(formId);
		singletonRockerCommons.setClass('showerForm_' + formId,'');
		singletonRockerCommons.setClass('showerTable_' + formId,'');
		singletonRockerCommons.hide('divForm_' + formId);
		singletonRockerCommons.hide('divTable_' + formId);
		singletonRockerCommons.setClass('selectorTab_' + id,'active');
		singletonRockerCommons.show(id);
	};
	this.submitJsForm = function(id){
		if(!this.validate()){return false;}
		var jsForm = this.getJsForm(id);
		if(null!=jsForm){
			jsForm.submitJsFormAjax();
		}
	};
	this.resetJsForm = function(id){
		if(!this.validate()){return false;}
		var jsForm = this.getJsForm(id);
		if(null!=jsForm){
			jsForm.resetJsFormAjax();
			jsForm.clearMessagesValidation();
		}
	};
	this.closeJsForm = function(id){
		if(!this.validate()){return false;}
		var jsForm = this.getJsForm(id);
		if(null!=jsForm){
			jsForm.closeForm();
		}
	};
	this.onafterToggleForm = function(id){
		if(!this.validate()){return false;}
		var jsForm = this.getJsForm(id);
		if(null!=jsForm){
			jsForm.onafterToggle();
		}
	};
	this.reloadTableJsForm = function(id){
		if(!this.validate()){return false;}
		var jsForm = this.getJsForm(id);
		if(null!=jsForm && null!=jsForm.rockerTable){
			this.navigatePageTable(jsForm.rockerTable.id,1);
		}
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
var singletonRockerStorage = new RockerStorage();
singletonRockerStorage.initialize();