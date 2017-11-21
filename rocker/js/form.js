var RockerForm = function(title,idAppenderForm,horizontalAlignFields,width,closable,modal,arrayFields,
							actionForm,onclickSubmit,onclickCancel,textSubmit,textCancel,errorCode,jsonCode,
							posTop, posLeft, titleTable, arrayTableColumns,typeObject,aliasObject,
							additionalParamsAndValuesOnRequestTable,onclose,drawTableOnTop,
							initialLineNumbersTable,visibleButtonsTable,deleteAndEditButtonsOnTable,
							tableOnNewTab,onRead
							){	
	this.title = (null!=title ? title : '');
	this.idAppenderForm = idAppenderForm;
	this.horizontalAlignFields = (null!=horizontalAlignFields && (horizontalAlignFields == true || horizontalAlignFields == 'true')) ? true : false;
	this.width = ((null!=width && width > 0) ? width : -1);
	this.closable = (null!=closable && (closable == 'true' || closable == true)) ? true : false;
	this.modal = (null!=modal && (modal == 'true' || modal == true)) ? true : false;
	this.arrayFields = ((null!=arrayFields) ? arrayFields : new Array());
	this.actionForm = ((null!=actionForm && actionForm != '') ? actionForm : "/");
	this.onclickSubmit = ((null!=onclickSubmit && onclickSubmit != '') ? onclickSubmit : "");
	this.onclickCancel = ((null!=onclickCancel && onclickCancel != '') ? onclickCancel : "");
	this.textSubmit = ((null!=textSubmit) ? textSubmit : singletonRockerI18n.getMessage('RockerForm.textSubmitForm',null));
	this.textCancel = ((null!=textCancel) ? textCancel : singletonRockerI18n.getMessage('RockerForm.textCancelForm',null));
	this.nameForm = 'f_' + idAppenderForm;
	this.idContainerForm = this.idAppenderForm + '_containerForm';
	this.arrayFieldsRollback = [];
	this.errorCode = ((null!=errorCode && errorCode != '') ? errorCode : "500");
	this.jsonCode = ((null!=jsonCode && jsonCode != '') ? jsonCode : "JSON");
	this.posTop = ((null!=posTop && posTop >= 0) ? posTop : -1);
	this.posLeft = ((null!=posLeft && posLeft >=0) ? posLeft : -1);
	this.titleTable = titleTable;
	this.arrayTableColumns = arrayTableColumns;
	this.typeObject = typeObject;
	this.aliasObject = aliasObject;
	this.additionalParamsAndValuesOnRequestTable = ((null!=additionalParamsAndValuesOnRequestTable) ? additionalParamsAndValuesOnRequestTable : '');
	this.onclose = ((null != onclose && onclose != '') ? onclose : '');
	this.drawTableOnTop = ((null!=drawTableOnTop && drawTableOnTop == true) ? true : false);
	this.initialLineNumbersTable = ((null!=initialLineNumbersTable && initialLineNumbersTable > 5) ? (initialLineNumbersTable - (initialLineNumbersTable%5)) : 5);
	this.visibleButtonsTable = ((null!=visibleButtonsTable && visibleButtonsTable > 0) ? visibleButtonsTable : 7);
	this.arrayFields[this.arrayFields.length] = new Hidden('typeObject',this.typeObject);
	this.richEditors = [];
	this.idInnerMsgs = 'div_msgs'+ this.nameForm;
	this.divInnerTable  = 'divInnerTable' + this.nameForm;
	this.divInnerTableTop  = 'divInnerTableTop' + this.nameForm;
	this.idContainerButtons = 'containerButtons' + this.nameForm;
	this.rockerTable = null;
	this.dragAndDrop = null;
	this.timeToHideSplash = 1280;
	this.timeToWaitMsgAlert = 3500;
	this.rockerSplashMask = new RockerSplashMask(this.idContainerForm,this.timeToHideSplash);
	this.idToClickOnComplete = null;
	this.tableOnNewTab = (null!=tableOnNewTab && (tableOnNewTab == 'true' || tableOnNewTab == true)) ? true : false;
	this.deleteAndEditButtonsOnTable = (null!=deleteAndEditButtonsOnTable && (deleteAndEditButtonsOnTable == 'false' || deleteAndEditButtonsOnTable == false)) ? false : true;
	this.cipherData = true;
	this.scapeHtmlToo = true;
	this.onRead = (null!=onRead ? onRead : '');
	this.hideContainerButtons = function(){
		singletonRockerCommons.hide(this.idContainerButtons);
	};
	this.showContainerButtons = function(){
		singletonRockerCommons.show(this.idContainerButtons);
		singletonRockerCommons.clickElementById('anchor_' + this.idContainerButtons);
	};
	this.readInOutRichEditors = function(out){
		try {
	    	var size = this.arrayFields.length;
	    	for(var i = 0; i < size; i ++){
	    		if(null!=this.arrayFields[i] && this.arrayFields[i].type == 'textarea' ){
	    			if(this.arrayFields[i].richEditor){
	    				if(out == true || out == 'true'){
	    					var text = this.richEditors[i].getData();
	    					text = this.arrayFields[i].adjustValueOnKeyUp(text);
	    					singletonRockerCommons.getElement(this.arrayFields[i].id).value = text;
	    				}else{
	    					var text = singletonRockerCommons.getElement(this.arrayFields[i].id).value;
	    					this.richEditors[i].setData(text);
	    					if(this.arrayFields[i].usingCompletation){
	    						this.arrayFields[i].adjustValueOnKeyUpRichEditor(this.richEditors[i]);
	    	    			}
	    				}
	    			}else if(!out){
	    				if(this.arrayFields[i].usingCompletation){
	    					this.arrayFields[i].adjustValueOnKeyUpRichEditor(this.richEditors[i]);
		    			}
	    			}
	    		}
	    	}
		} catch (error) {
			console.log('Error on readInOutRichEditors: ' + error);
		}
	};
	this.setRichEditors = function(){
	    try {
	    	var size = this.arrayFields.length;
	    	for(var i = 0; i < size; i ++){
	    		if(null!=this.arrayFields[i] && this.arrayFields[i].type == 'textarea' ){
	    			if(this.arrayFields[i].richEditor){
	    				var configEditor = {};
	    				var textEditor = '';
	    				var idAppender = 'divAppenderRichEditor_' + this.arrayFields[i].id;
	    				this.richEditors[i] = CKEDITOR.appendTo(idAppender,configEditor,textEditor);
	    				if(this.arrayFields[i].usingCompletation){
	    					var txtArea = this.arrayFields[i];
	    					var editor = this.richEditors[i];
	    					this.richEditors[i].on('change',
    							function(ev) {
	    							txtArea.adjustValueOnKeyUpRichEditor(editor);
    							}
	    					);
	    				}
	    			}else{
	    				this.richEditors[i] = null;
	    			}
	    		}else{
					this.richEditors[i] = null;
				}
	    	}
		} catch (error) {
			console.log('Error on setRichEditors: ' + error);
		}
	};
	this.initializeComponents = function(){
		var size = this.arrayFields.length;
		var form = singletonRockerCommons.getElement(this.nameForm);
		for(var i = 0; i < size; i++){
			var typeC = this.arrayFields[i].type;
			if(typeC == "textarea" && this.arrayFields[i].usingCompletation){
				var nameC = this.arrayFields[i].name;
				var value = form.elements[nameC].value;
				singletonRockerStorage.generateCompletationData(this.arrayFields[i].id,value,this.arrayFields[i].width,10);
			}
		}
	};
	this.validateForm = function(){
		var validated = true;
		var allMsgs = '';
		var msgIni = '<div class="rockerError ui-state-error ui-corner-all"><span class="ui-icon ui-icon-alert"></span>';
		var form = singletonRockerCommons.getElement(this.nameForm);
		var size = this.arrayFields.length;
		var countMessages = 0;
		for(var i = 0; i < size; i++){
			var typeC = this.arrayFields[i].type;
			if(typeC == "text" || typeC == "textarea" || typeC == "select"){
				var nameC = this.arrayFields[i].name;
				var value = form.elements[nameC].value;
				this.arrayFields[i].validateInput(value);
				if(!this.arrayFields[i].validated){
					validated = false;
					allMsgs +=  msgIni + this.arrayFields[i].validationMsg + '</div>';
					countMessages ++;
				}
			}else if(typeC == "checkbox"){
				this.arrayFields[i].validateInput(form);
				if(!this.arrayFields[i].validated){
					validated = false;
					allMsgs +=  msgIni + this.arrayFields[i].validationMsg + '</div>';
					countMessages ++;
				}
			}else if(typeC == "radio"){
				this.arrayFields[i].validateInput();
				if(!this.arrayFields[i].validated){
					validated = false;
					allMsgs +=  msgIni + this.arrayFields[i].validationMsg + '</div>';
					countMessages ++;
				}
			}
		}
		if(!validated && allMsgs != ''){
			allMsgs = '<div class="rockerErrorContainer ui-widget">' + allMsgs + '</div>';
			singletonRockerCommons.innerHtml(this.idInnerMsgs,allMsgs);
			singletonRockerCommons.show(this.idInnerMsgs);
		}
		else{
			this.clearMessagesValidation();
		}
		return validated;
	};
	this.clearMessagesValidation = function(){
		singletonRockerCommons.innerHtml(this.idInnerMsgs,'');
		singletonRockerCommons.hide(this.idInnerMsgs);
		var size = this.arrayFields.length;
		for(var i = 0; i < size; i++){
			if(this.arrayFields[i].type == 'text' && this.arrayFields[i].disabled){
				singletonRockerCommons.setClass(this.arrayFields[i].id,this.arrayFields[i].disableValidationClass);
			}else if(this.arrayFields[i].type != 'hidden' && this.arrayFields[i].type != 'styler'
					 && this.arrayFields[i].type != 'appender' && this.arrayFields[i].type != 'button'
					 && null!=this.arrayFields[i].normalValidationClass 
					 && this.arrayFields[i].normalValidationClass != ''){
				singletonRockerCommons.setClass(this.arrayFields[i].id,this.arrayFields[i].normalValidationClass);
			}
		}
	};
	this.submitJsFormAjax = function(){
		try{
			this.readInOutRichEditors(true);
			if(!this.validateForm()){
				return;
			}
			this.rockerSplashMask.makeSplash();
			this.arrayFieldsRollback = this.getFieldsRollback();
			var url = this.prepareAjaxUrl();
			this.clearData(false);
			this.onbeforeSubmitObject();
			singletonRockerAjax.makeRequest2(url,this.nameForm,this.idInnerMsgs,this.idToClickOnComplete);
		}catch(error){console.log('Error on submitJsFormAjax: ' + error);}
	};
	this.onbeforeSubmitObject = function(){};//external use
	this.onbeforeSetJsonObject = function(jsonArray){};//external use
	this.onafterSetJsonObject = function(jsonArray){};//external use
	this.onafterToggle = function(){};//external use
	this.setJsonObject = function(jsonString){
		var needOnAfter = false;
		try{
			if(null==jsonString){return;}
			var json = eval('(' + jsonString + ')');
			this.onbeforeSetJsonObject(json);
			needOnAfter = true;
			var newObject = false;
			var size = this.arrayFields.length;
			var form = singletonRockerCommons.getElement(this.nameForm);
			for(var i = 0; i < size; i++){
				var typeC = this.arrayFields[i].type;
				var nameC = this.arrayFields[i].name;
				if(undefined == json[nameC]){
					continue;
				}else if(typeC == 'radio'){ 
					this.arrayFields[i].setValue(json[nameC]);
				}else if(typeC == 'checkbox'){
					var arrayValues = eval(json[nameC]);
					this.arrayFields[i].setValues(arrayValues);
				}else{
					var value = '';
					if(null!=json[nameC]){
						value = json[nameC];
						if(typeC == "textarea" && this.cipherData && (value.indexOf(singletonRockerCripter.sinalizer) != -1)){
							value = singletonRockerCripter.decriptTrunk(value);
							value = singletonRockerCommons.replaceAll(value,'&ccedil;','ç');
							value = singletonRockerCommons.replaceAll(value,'ccedil;','ç');
							value = singletonRockerCommons.replaceAll(value,'&Ccedil;','Ç');
							value = singletonRockerCommons.replaceAll(value,'Ccedil;','Ç');
							/*
							value = singletonRockerCommons.replaceAll(value,'','');
							value = singletonRockerCommons.replaceAll(value,'','');
							value = singletonRockerCommons.replaceAll(value,'','');
							*/
						}else{
							value = singletonRockerConverterChars.convertToFromDatabase(value,false,false,false,0);
						}
					}
					form.elements[nameC].value = value;
					if(this.arrayFields[i].usingCompletation){
						singletonRockerStorage.generateCompletationData(
								this.arrayFields[i].id,
								value,
								this.arrayFields[i].width,
								10);
					}
					if(typeC == 'hidden' && nameC == 'id' && (null==value || singletonRockerCommons.trim(value) == '')){
						newObject = true;
					}
					try {
						if(null!=this.arrayFields[i].typeAux && 
											(this.arrayFields[i].typeAux == "image" || this.arrayFields[i].typeAux == "imageS3")){
							if(null==value){
								value = '';
							}
							value = singletonRockerCommons.trim(value);
							value = singletonRockerCommons.replaceAll(value,' ','');
							this.arrayFields[i].update(value);
						}
					} catch (error) {
						console.log(error);
					}
				}
			}
			this.readInOutRichEditors(false);
			if(needOnAfter){
				this.onafterSetJsonObject(json);
			}
		}catch(error2){
			needOnAfter = false;
			console.log('Error on setJsonObject: ' + error2); 
		}
	};
	this.rollbackSubmitForm = function(){
		this.clearData(true);
	};
	this.clearData = function(rollback){
		var shouldEmptyArrayFieldsRollback = false;
		if(null==this.arrayFieldsRollback || this.arrayFieldsRollback.length == 0){
			this.arrayFieldsRollback = this.getFieldsRollback();
			shouldEmptyArrayFieldsRollback = true;
		}
		if(null!=this.arrayFieldsRollback && this.arrayFieldsRollback.length > 0){
			var size = this.arrayFieldsRollback.length;
			var form = singletonRockerCommons.getElement(this.nameForm);
			for(var i = 0; i < size; i++){
				var typeC = this.arrayFieldsRollback[i][0];
				var nameC = this.arrayFieldsRollback[i][1];
				var valueC = this.arrayFieldsRollback[i][2];
				if(typeC == 'checkbox' || typeC == 'radio'){
					form.elements[nameC].checked = (rollback ? valueC : false);
				}
				else if(typeC == 'text' && null!=this.arrayFieldsRollback[i][3]){
					if(null==valueC || !rollback){
						valueC = '';
					}else{
						valueC = singletonRockerCommons.trim(valueC);
						valueC = singletonRockerCommons.replaceAll(valueC,' ','');
					}
					this.arrayFieldsRollback[i][3].update(valueC);
					form.elements[nameC].value = valueC;
				}
				else{
					form.elements[nameC].value = ((rollback || (typeC == 'hidden' && nameC != 'id') ) ? valueC : '');
				}
			}
		}
		if(shouldEmptyArrayFieldsRollback){
			this.arrayFieldsRollback = [];
		}
		if(!rollback){
			this.readInOutRichEditors(false);
		}
	};
	this.resetJsFormAjax = function(){
		var size = this.arrayFields.length;
		for(var i = 0; i < size; i++){
			this.arrayFields[i].validationMsg = '';
		}
		this.clearData(false);
		if(null!=this.rockerTable){
			this.rockerTable.setSelectedPage(1);
		}
	};
	this.getFieldsRollback = function(){
		var arrayFieldsRollback = [];
		try{ 
			var form = singletonRockerCommons.getElement(this.nameForm);
			var size = this.arrayFields.length;
			for(var i = 0; i < size; i++){
				var typeC = this.arrayFields[i].type;
				var nameC = "";
				if(typeC == "hidden"){
					if(null==this.arrayFields[i].name || undefined==this.arrayFields[i].name || this.arrayFields[i].name == ''){
						continue;
					}
					nameC = this.arrayFields[i].name;
					arrayFieldsRollback[arrayFieldsRollback.length] = [typeC,nameC,form.elements[nameC].value,null];
				} else if(typeC == "text" || typeC == "textarea" || typeC == "select"){
					nameC = this.arrayFields[i].name;
					if(this.arrayFields[i].typeAux == 'image' || this.arrayFields[i].typeAux == 'imageS3'){
						arrayFieldsRollback[arrayFieldsRollback.length] = [typeC,nameC,form.elements[nameC].value,this.arrayFields[i]];
					}else{
						arrayFieldsRollback[arrayFieldsRollback.length] = [typeC,nameC,form.elements[nameC].value,null];
					}
				} else if(typeC == "radio"){
					nameC = this.arrayFields[i].name;
					var size2 = this.arrayFields[i].arrayValues.length;
					for(var j = 0; j < size2; j++){
						var idC = nameC + '_' + j;
						arrayFieldsRollback[arrayFieldsRollback.length] = [typeC,idC,singletonRockerCommons.checked(idC),null];
					}
				} else if(typeC == "checkbox"){
					var size2 = this.arrayFields[i].arrayCheckNames.length;
					for(var j = 0; j < size2; j++){
						nameC = this.arrayFields[i].arrayCheckNames[j];
						arrayFieldsRollback[arrayFieldsRollback.length] = [typeC,nameC,form.elements[nameC].checked,null];
					}
				}
			}
		} catch(error){console.log('Error on getFieldsRollback: ' + error);}
		return arrayFieldsRollback;
	};
	this.prepareAjaxUrl = function(){
		var urlForm = "";
		try{ 
			var form = singletonRockerCommons.getElement(this.nameForm);
			urlForm = form.action += "?";
			var size = this.arrayFields.length;
			var count = 0;
			for(var i = 0; i < size; i++){
				var typeC = this.arrayFields[i].type;
				var nameC = this.arrayFields[i].name;
				if(null==this.arrayFields[i].name || undefined==this.arrayFields[i].name || this.arrayFields[i].name == ''){
					continue;
				}
				if(typeC == "hidden"){
					urlForm += ((count>0) ? '&': '') + nameC + '=' + (form.elements[nameC].value);
				} else if(typeC == "text" || typeC == "textarea" || typeC == "select"){
					var valueOri = form.elements[nameC].value;
					var coded = '';
					if(typeC == "textarea" && this.cipherData){
						coded = singletonRockerCripter.cript(valueOri);
					}else{//prepareAjaxUrl
						coded = singletonRockerConverterChars.convertToFromDatabase(valueOri,true,this.scapeHtmlToo,false,(typeC == "text" ? 50 : 0));
					}
					urlForm += ((count>0) ? '&': '') + nameC + '=' + encodeURIComponent(coded);
				} else if(typeC == "radio"){
					var size2 = this.arrayFields[i].arrayValues.length;
					var encontrou = false;
					for(var j = 0; j < size2; j++){
						var idC = nameC + '_' + j;
						if(singletonRockerCommons.checked(idC)){
							urlForm +=  ((count>0 || j>0) ? '&': '') + nameC + '=' + this.arrayFields[i].arrayValues[j];
							encontrou = true;
							break;
						}
					}
					if(!encontrou){
						urlForm +=  ((count>0 || j>0) ? '&': '') + nameC + '=';
					}
				} else if(typeC == "checkbox"){
					var size2 = this.arrayFields[i].arrayCheckNames.length;
					for(var j = 0; j < size2; j++){
						nameC = this.arrayFields[i].arrayCheckNames[j];
						var value_nameC = ((form.elements[nameC].checked) ? "true" : "false");
						urlForm +=  ((count>0 || j>0) ? '&': '') + nameC + '=' + value_nameC;
					}
				}
				count ++;
			}
		} catch(error){console.log('Error on prepareAjaxUrl: ' + error);}
		urlForm +=  "&errorCode=" + this.errorCode;
		return urlForm;
	};
	this.makeForm = function(){
		if(null==this.idAppenderForm || this.idAppenderForm == ''){
			console.log('Hey... id of anchor element of RockerForm is required! \n RockerForm not created.');
			return null;
		}
		this.removeSplashMask();
		this.cancelDragAndDrop();
		if(this.closable && this.modal){
			this.createSplashMask();
		}
		var inner = '';
		inner += '<div class="rockerContainer ui-widget ui-widget-content ui-corner-all">';
		if(this.closable){
			inner += '<div onmousedown="return singletonRockerCommons.stopPropagation(event);" ';
			inner += ' onmouseup="return singletonRockerCommons.stopPropagation(event);" ';
			inner += 'onclick="return singletonRockerCommons.stopPropagation(event);" ';
			inner += ' style="padding: 0px;" >';
			if(this.modal){
				var formContainer = singletonRockerCommons.getElement(this.idAppenderForm);
				formContainer.style.position = 'absolute';
				formContainer.style.zIndex = '10000';
				inner += '<div id="div_drag_'+ this.idAppenderForm +'" class="rockerDragHeader" >';
				
			}else{
				inner += '<div id="div_drag_'+ this.idAppenderForm +'" >';
			}
			inner += '<div class="rockerHeaderForm ui-widget-header ui-corner-top">' + this.title;
			inner += '<div class="rockerCloseForm ui-button ui-corner-all" ';
			if(null!=this.onclose && this.onclose != ''){
				inner += ' onclick="if(!(singletonRockerClickTimeControl.validateClick(\'formCloseButton\',1000))){return;} '+ this.onclose +'">';
			}else{
				inner += ' onclick="if(!(singletonRockerClickTimeControl.validateClick(\'formCloseButton\',1000))){return;} singletonRockerStorage.closeJsForm(\'' + this.nameForm +'\');">';
			}
			inner += '<span>x</span></div>';
			inner += '<div style="clear: both;"></div></div></div>';
			inner += '</div>';
		}else{
			inner += '<div id="div_drag_'+ this.idAppenderForm +'" >';
			inner += '<div class="rockerHeaderForm ui-widget-header ui-corner-top">' + this.title;
			inner += '</div></div>';
		}
		inner += '<div style="clear: both; margin-top: 0px;"></div>';
		for(var i = 0; i < this.arrayFields.length; i++){
			if(this.arrayFields[i].type == 'styler'){
				inner += this.arrayFields[i].makeField(this.horizontalAlignFields);
			}
		}
		if(this.tableOnNewTab){
			var formEditNew = singletonRockerI18n.getMessage('RockerForm.formEditNew',null);
			var formList = singletonRockerI18n.getMessage('RockerForm.formList',null);
			inner += '';
			inner += '<nav class="navbar navbar-default" style="border-radius: 0px !important;">';
			inner += '<div class="container-fluid">';
			inner += '<div class="collapse navbar-collapse">';
			inner += '<ul class="nav navbar-nav">';
			inner += '<li id="showerForm_' + this.nameForm + '" class=""';
			inner += ' onclick="singletonRockerStorage.selectFormTabForm(\'' + this.nameForm  + '\');">';
			inner += ' <a href="#">' + formEditNew + ' <span class="sr-only">(current)</span></a></li>';
			inner += '<li id="showerTable_' + this.nameForm + '" class="active"';
			inner += ' onclick="singletonRockerStorage.selectTableTabForm(\'' + this.nameForm  + '\');">';
			inner += ' <a href="#">' + this.aliasObject + ' ' + formList + '<span class="sr-only">(current)</span></a></li>';
			for(var i = 0; i < this.arrayFields.length; i++){
				if(this.arrayFields[i].type == 'appender' && null!=this.arrayFields[i].newTabTitle){
					inner += '<li id="selectorTab_' + this.arrayFields[i].id + '" class=""';
					inner += ' onclick="singletonRockerStorage.selectTabTabForm(\'' + this.arrayFields[i].id + '\',\'' + this.nameForm + '\');">';
					inner += ' <a href="#">' + this.arrayFields[i].newTabTitle + '<span class="sr-only">(current)</span></a></li>';
				}
			}
			inner += '</ul>';
			inner += '</div>';
			inner += '</div>';
			inner += '</nav>';
			inner += '<div id="divForm_' + this.nameForm + '" style="display: none;">';
			inner += this.generateInnerFormForm();
			inner += '</div>';
			inner += '<div id="divTable_' + this.nameForm + '">';
			inner += this.generateInnerTableForm(true);
			inner += '</div>';
			for(var i = 0; i < this.arrayFields.length; i++){
				if(this.arrayFields[i].type == 'appender' && null!=this.arrayFields[i].newTabTitle){
					inner += '<div id="' + this.arrayFields[i].id + '" style="display: none;">';
					inner += this.arrayFields[i].generateInternalFields();
					inner += '</div>';
				}
			}
		}else{
			inner += this.generateInnerTableForm(true);
			inner += this.generateInnerFormForm();
			inner += this.generateInnerTableForm(false);
		}
		//
		inner += '<div style="clear: both;"></div>';
		inner += '</div>';
		var inner2 = '<div style="';// 
		if(this.width > 0){
			inner2 += 'width: '+ this.width + 'px;';
		}
		if(!this.modal){
			if(this.posTop > 0){
				inner2 += 'margin-top: ' + this.posTop + 'px;';
			}
			if(this.posLeft > 0){
				inner2 += 'margin-left: ' + this.posLeft + 'px;';
			}
		}
		inner2 += '">';
		inner2 += inner;
		inner2 += '</div>';
		try{
			singletonRockerCommons.innerHtml(this.idAppenderForm,inner2);
		}catch(error){console.log('Error on makeForm: ' + error);}
		singletonRockerCommons.show(this.idAppenderForm);
		this.addDragEffect();
		this.adjustInitialPosition();
		this.setRichEditors();
	};
	this.generateInnerFormForm = function(){
		var inner = '';
		inner += '<div style="clear: both;"></div>';
		inner += '<div id="'+ this.idContainerForm + '" class="rockerFormContainer ui-widget ui-corner-all" >';
		inner += '<form id="'+ this.nameForm +  '" name="'+ this.nameForm +  '" action="'+ this.actionForm +'" method="post">';
		inner += '<div class="container-fluid">';
		inner += '<div class="row">';
		for(var i = 0; i < this.arrayFields.length; i++){
			if(this.arrayFields[i].type == 'appender' && this.arrayFields[i].position == 'topFields'){
					inner += this.arrayFields[i].makeField(this.horizontalAlignFields);
			}
		}
		for(var i = 0; i < this.arrayFields.length; i++){
			if(this.arrayFields[i].type != 'appender' && this.arrayFields[i].type != 'styler'){
				inner += this.arrayFields[i].makeField(this.horizontalAlignFields);
			}
		}
		for(var i = 0; i < this.arrayFields.length; i++){
			if(this.arrayFields[i].type == 'appender' && this.arrayFields[i].position == 'bottomFields'){
					inner += this.arrayFields[i].makeField(this.horizontalAlignFields);
			}
		}
		inner += '</div>';
		inner += '<div style="clear: both;"></div>';
		inner += '</div>';
		inner += '<div id="'+ this.idInnerMsgs +'" class="ui-widget ui-corner-all" style="display: none;"></div>';
		if((null!=this.textCancel && this.textCancel != '') || (null!=this.textSubmit && this.textSubmit != '') ){
			inner += '<div id="' + this.idContainerButtons + '" class="rockerFormButtonsContainer ui-widget-header ui-corner-all" style="text-align: center;">';
			inner += '<a href="#anchor_' + this.idContainerButtons + '" id="anchor_' + this.idContainerButtons +'"></a>';
			inner += '<span class="ui-widget ui-corner-all">';
			if(null!=this.textCancel && this.textCancel != ''){
				inner += '<input class="ui-button ui-corner-all" type="button" value="'+ this.textCancel;
				inner += '" onclick="if(!(singletonRockerClickTimeControl.validateClick(\'formClearButton\',1000))){return;}'+ this.onclickCancel;
				inner += ';singletonRockerStorage.resetJsForm(\'' + this.nameForm +'\');" />';
			}
			if(null!=this.textSubmit && this.textSubmit != ''){
				inner += '<input class="ui-button ui-corner-all" type="button" value="'+ this.textSubmit;
				inner += '" onclick="if(!(singletonRockerClickTimeControl.validateClick(\'formSubmitButton\',2000))){return;}' + this.onclickSubmit;
				inner += 'singletonRockerStorage.submitJsForm(\''+ this.nameForm +'\');" />';
			}
			inner += '</span>';
			inner += '</div>';
			inner += '<div class="container"><div class="row">';
			for(var i = 0; i < this.arrayFields.length; i++){
				if(this.arrayFields[i].type == 'appender' && this.arrayFields[i].position == 'bottomForm'){
						inner += this.arrayFields[i].makeField(this.horizontalAlignFields);
				}
			}
			inner += '</div></div>';
		}
		inner += '</form>';
		inner += '</div>';
		return inner;
	};
	this.generateInnerTableForm = function(toTop){
		var inner = '';
		var inner2 = '';
		var inner3 = '';
		if(this.tableOnNewTab || (this.drawTableOnTop && toTop) || (!this.drawTableOnTop && !toTop)){
			inner2 += '<div class="container"><div class="row">';
			for(var i = 0; i < this.arrayFields.length; i++){
				if(this.arrayFields[i].type == 'appender' && this.arrayFields[i].position == 'topTable'){
					inner2 += this.arrayFields[i].makeField(this.horizontalAlignFields);
				}
			}
			inner2 += '</div></div>';
		}
		if(this.tableOnNewTab || (this.drawTableOnTop && toTop) || (!this.drawTableOnTop && !toTop)){
			inner3 += '<div class="container"><div class="row">';
			for(var i = 0; i < this.arrayFields.length; i++){
				if(this.arrayFields[i].type == 'appender' && this.arrayFields[i].position == 'bottomTable'){
					inner3 += this.arrayFields[i].makeField(this.horizontalAlignFields);
				}
			}
			inner3 += '</div></div>';
		}
		if(this.tableOnNewTab){
			inner += inner2;
			inner += '<div id="'+ this.divInnerTable +'"></div>';
			inner += inner3;
		}else if(this.drawTableOnTop){
			inner += inner2;
			inner += '<div id="'+ this.divInnerTableTop +'"></div>';
			inner += inner3;
		}else if(!this.drawTableOnTop){
			inner += '<div style="clear: both; margin-top: 5px;"></div>';
			inner += inner2;
			inner += '<div id="'+ this.divInnerTable +'"></div>';
			inner += inner3;
		}
		return inner;
	};
	this.addDragEffect = function(){
		if(this.closable){
			try{
				this.dragAndDrop = new RockerDragAndDrop('div_drag_'+ this.idAppenderForm,this.idAppenderForm);
			}catch(error){console.log('Error on addDragEffect: ' + error);}
		}
	};
	this.cancelDragAndDrop = function(){
		if(null!=this.dragAndDrop){
			this.dragAndDrop.cancelEffect();
		}
	};
	this.restoreDragAndDropEffect = function(){
		if(null!=this.dragAndDrop){
			this.dragAndDrop.restoreEffect();
		}
	};
	this.adjustInitialPosition = function(){
		if(this.closable){
			try{
				var elemThis = singletonRockerCommons.getElement(this.idAppenderForm);
				if(this.posLeft == -1){
					elemThis.style.left = ((window.innerWidth - elemThis.offsetWidth) /2) + 'px';
				}else{
					elemThis.style.left = this.posLeft + 'px';
				}
				if(this.posTop == -1){
					elemThis.style.top = ((window.innerHeight - elemThis.offsetHeight)/2) + 'px';
				}else{
					elemThis.style.top = this.posTop + 'px';
				}
			}catch(error){console.log('Error on adjustInitialPosition: ' + error);}
		}
	};
	this.closeForm = function(){
		if(this.closable){
			try{
				this.cancelDragAndDrop();
				singletonRockerCommons.innerHtml(this.idAppenderForm,'');
				document.getElementById(this.idAppenderForm).style.display = 'none';
				this.removeSplashMask();
			}catch(error){console.log('Error on closeForm: ' + error);}
		}
	};
	this.createSplashMask = function(){
		if(this.modal && this.closable){
			try{
				var node = document.createElement("div");
				node.id = ('splashmask_' + this.idAppenderForm);
				node.className = 'rockerMaskDiv';
				node.style.width = '100%';
				node.style.height = '100%';
				var firstChild = document.body.childNodes[0];
				if(null!=firstChild){
					document.body.insertBefore(node,firstChild);
				}else{
					document.body.appendChild(node);
				}
				singletonRockerCommons.show(('splashmask_' + this.idAppenderForm));
			}catch(error){console.log('Error on createSplashMask: ' + error);}
		}
	};
	this.removeSplashMask = function(){
		if(this.modal){
			try{
				singletonRockerCommons.hide(('splashmask_' + this.idAppenderForm));
				var node = document.getElementById(('splashmask_' + this.idAppenderForm));
				if(null!=node){
					node.parentNode.removeChild(node);
				}
			}catch(error){console.log('Error on removeSplashMask: ' + error);}
		}
	};
	this.makeTable = function(){
		try{
			if(null!=this.arrayTableColumns && this.arrayTableColumns.length > 0){
				this.rockerTable = new RockerTable((this.drawTableOnTop ? this.divInnerTableTop : this.divInnerTable),this.titleTable,
						this.visibleButtonsTable,this.arrayTableColumns,
					this.actionForm,this.typeObject,this.deleteAndEditButtonsOnTable,this.nameForm,
					this.idInnerMsgs,true,this.additionalParamsAndValuesOnRequestTable,true,this.onRead);
				this.makeInnerClickTableOnComplete();
			}
		}catch(error){console.log('Error on makeTable: ' + error);}
	};
	this.makeInnerClickTableOnComplete = function(){
		var inner = '';
		inner += '<div id="divLoader_' + this.divInnerTable + '" ';
		inner += ' onclick="singletonRockerStorage.navigatePageTable(\'table_'+ this.divInnerTable +'\',1);" style="display: none;"></div>';
		var node = document.createElement("div");
		node.innerHTML = inner;
		singletonRockerCommons.getElement(this.divInnerTable).appendChild(node);
		this.idToClickOnComplete = 'divLoader_' + this.divInnerTable;
	};
	this.makeForm();
	this.initializeComponents();
	this.makeTable();
	singletonRockerStorage.storeJsForm(this.nameForm,this);
	this.rockerSplashMask.makeSplash();
	this.rockerSplashMask.removeSplash();
};