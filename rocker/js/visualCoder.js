var singletonRockerVisualCoder = null;
var RockerVisualCoder = function(idAppenderForm,width){
	
	this.inputPrefix = 'rocker_visual_coder_';
	
	this.title = 'Rocker Framework Visual Coding';
    this.idAppenderForm = idAppenderForm;
    this.horizontalAlignFields = false;
    this.width = width;// -1 for auto, > 0 to fixed size
    this.closable = false;
    this.modal = false;
    this.actionForm = "/";
    this.onclickSubmit = 'singletonRockerVisualCoder.showList();';
    this.onRead = 'singletonRockerVisualCoder.showForm();';
    this.onclickCancel = '';
    this.textSubmit = 'Save/Add Element';
    this.textCancel = 'Reset Fields';
    this.errorCode = 'ERROR_606';
    this.jsonCode = 'JSON_767';
    this.posTop = 0;
    this.posLeft = 5;
    this.titleTable = 'Rocker Elements';	
    this.typeObject = 'RockerElement'; 
    this.aliasObject = 'Rocker Element';
    this.additionalParamsAndValuesOnRequestTable = '';
    this.onclose = '';
    this.drawTableOnTop = false;
    this.initialLineNumbersTable = 5;
    this.visibleButtonsTable = 3;
    this.deleteAndEditButtonsOnTable = false;
    this.tableOnNewTab = true;
    this.idToClickOnComplete = null;
    
    this.fileTitle = '';
    this.codeType = null;
    
    
    this.validateForm = function(form){
		var validated = true;
		var allMsgs = '';
		var msgIni = '<div class="rockerError ui-state-error ui-corner-all"><span class="ui-icon ui-icon-alert"></span>';
		var size = form.arrayFields.length;
		var countMessages = 0;
		for(var i = 0; i < size; i++){
			var typeC = form.arrayFields[i].type;
			if(typeC == "text" || typeC == "textarea" || typeC == "select"){
				var value = singletonRockerCommons.getElement(form.arrayFields[i].id).value;
				form.arrayFields[i].validateInput(value);
				if(!form.arrayFields[i].validated){
					validated = false;
					allMsgs +=  msgIni + form.arrayFields[i].validationMsg + '</div>';
					countMessages ++;
				}
			}else if(typeC == "checkbox"){
				form.arrayFields[i].validateInput(form);
				if(!form.arrayFields[i].validated){
					validated = false;
					allMsgs +=  msgIni + form.arrayFields[i].validationMsg + '</div>';
					countMessages ++;
				}
			}else if(typeC == "radio"){
				form.arrayFields[i].validateInput();
				if(!form.arrayFields[i].validated){
					validated = false;
					allMsgs +=  msgIni + form.arrayFields[i].validationMsg + '</div>';
					countMessages ++;
				}
			}
		}
		if(!validated && allMsgs != ''){
			allMsgs = '<div class="rockerErrorContainer ui-widget">' + allMsgs + '</div>';
			singletonRockerCommons.innerHtml('appenderValidationMessagesForm',allMsgs);
			singletonRockerCommons.show('appenderValidationMessagesForm');
		} else{
			this.clearMessagesValidation(form);
		}
		return validated;
	};
	
	this.clearMessagesValidation = function(form){
		singletonRockerCommons.innerHtml('appenderValidationMessagesForm','');
		singletonRockerCommons.hide('appenderValidationMessagesForm');
		var size = form.arrayFields.length;
		for(var i = 0; i < size; i++){
			if(form.arrayFields[i].type == 'text' && form.arrayFields[i].disabled){
				singletonRockerCommons.setClass(form.arrayFields[i].id,form.arrayFields[i].disableValidationClass);
			}else if(form.arrayFields[i].type != 'hidden' && form.arrayFields[i].type != 'styler'
					 && form.arrayFields[i].type != 'appender' && form.arrayFields[i].type != 'button'
					 && null!=form.arrayFields[i].normalValidationClass 
					 && form.arrayFields[i].normalValidationClass != ''){
				singletonRockerCommons.setClass(form.arrayFields[i].id,form.arrayFields[i].normalValidationClass);
			}
		}
	};
    
    this.generateElementCode = function(elementType){
    	
    	var id = singletonRockerCommons.getElement(this.inputPrefix + 'element_component_id').value;
    	if(null==id || id == ''){
    		id = singletonRockerCommons.generateRandomString();
    	}
    	var elementCode = '';
    	var elementDoc = '';
    	var form = singletonRockerStorage.getJsForm('f_appenderCompFormInternal');
    	
    	if(!this.validateForm(form)){
    		return false;
    	}
    	
    	var bootstrapClass = '';
		var bootstrapNewLine = '';
		for(var i = 0; i < form.arrayFields.length; i++){
			var inputId = form.arrayFields[i].id;
			if(form.arrayFields[i].name == (this.inputPrefix + 'bootstrap_class')){
				bootstrapClass = singletonRockerCommons.getElement(inputId).value;
			}else if(form.arrayFields[i].name == (this.inputPrefix + 'bootstrap_new_line')){
				bootstrapNewLine = singletonRockerCommons.getElement(inputId).value;
			}
		}
		if(elementType == 'appender'){
			var appenderId = '';
    		var appenderStyle = '';
    		var appenderClass = '';
    		var appenderPosition = '';
    		var appenderTabTitle = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'appender_id')){
    				appenderId = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'appender_style')){
    				appenderStyle = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'appender_css_class')){
    				appenderClass = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'appender_position')){
    				appenderPosition = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'appender_tab_title')){
    				appenderTabTitle = singletonRockerCommons.getElement(inputId).value;
    			}
    		}
    		elementCode += '\\narrayFields[i] = new Appender(\'' + appenderId + '\',';
    		elementCode += '\'' + appenderStyle + '\',';
    		elementCode += '\'' + appenderClass + '\',';
    		elementCode += '\'\',';
    		elementCode += '\'' + appenderPosition + '\',';
    		elementCode += '\'' + appenderTabTitle + '\',';
    		elementCode += 'null,';
    		elementCode += '\'' + bootstrapClass + '\',';
    		elementCode += '' + bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
			elementDoc = '\\n\\n/** new Appender(id,style,clazz,onclick,position,newTabTitle,arrayFields,bootstrapClass,bootstrapNewLine); */\\n';
		}else if(elementType == 'styler'){
			var classNames = '';
			var styleOfClasses = '';
			for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'styler_class_names')){
    				classNames = singletonRockerCommons.stringToArrayString(singletonRockerCommons.getElement(inputId).value,false);
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'styler_css_classes')){
    				styleOfClasses = singletonRockerCommons.stringToArrayString(singletonRockerCommons.getElement(inputId).value,false);
    			}
    		}
			elementCode += '\\narrayFields[i] = new Styler(' + classNames + ',' + styleOfClasses + ');\\n';
    		elementCode += 'i++;\\n\\n';
			elementDoc = '\\n\\n/** new Styler(classNames,styles); */\\n';
		}else if(elementType == 'hidden'){
    		var name = '';
    		var value = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'hidden_name')){
    				name = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'hidden_value')){
    				value = singletonRockerCommons.getElement(inputId).value;
    			}
    		}
    		elementCode += '\\narrayFields[i] = new Hidden(\'' + name + '\',\'' + value + '\');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new Hidden(name,value); */\\n';
    	}else if(elementType == 'spacer'){
    		var height = '';
    		var hexColorCode = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'spacer_height')){
    				height = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'spacer_bg_color')){
    				hexColorCode = singletonRockerCommons.getElement(inputId).value;
    			}
    		}
    		elementCode += '\\narrayFields[i] = new  Spacer('+ height + ','+ hexColorCode;
    		elementCode += ',\''+ bootstrapClass + '\','+ bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new Spacer(height,hexColorCode,bootstrapClass,bootstrapNewLine); */\\n';
    	}else if(elementType == 'button'){
    		var buttonId = '';
    		var buttonValue = '';
    		var buttonStyle = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'button_id')){
    				buttonId = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'button_value')){
    				buttonValue = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'button_style')){
    				buttonStyle = singletonRockerCommons.getElement(inputId).value;
    			}
    		}
    		elementCode += '\\narrayFields[i] = new  Button(\''+ buttonId + '\',\''+ buttonValue;
    		elementCode += '\',\'\',\'' + buttonStyle + '\',\''+ bootstrapClass + '\','+ bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new Button(id,value,onclick,style,bootstrapClass,bootstrapNewLine); */\\n';
    	}else if(elementType == 'label'){
    		var labelValue = '';
    		var labelLineBreaks = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'label_value')){
    				labelValue = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'label_line_breaks')){
    				labelLineBreaks = singletonRockerCommons.getElement(inputId).value;
    			}
    		}
    		elementCode += '\\narrayFields[i] = new  Label(\''+ labelValue + '\','+ labelLineBreaks;
    		elementCode += ',\''+ bootstrapClass + '\','+ bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new Label(value,lineBreaks,bootstrapClass,bootstrapNewLine); */\\n';
    	}else if(elementType == 'inputtext'){
    		var inputLabel = '';
    		var inputName = '';
    		var inputWidth = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'input_label')){
    				inputLabel = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'input_name')){
    				inputName = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'input_width')){
    				inputWidth = singletonRockerCommons.getElement(inputId).value;
    			}
    		}
    		elementCode += '\\nvar validator_' + inputName + ' = ';
    		elementCode += 'singletonRockerFormValidator.getTextAllowedsValidator(singletonRockerFormValidator.letters,50,1);';
    		elementCode += '\\narrayFields[i] = new  InputText(\''+ inputLabel + '\',\''+ inputName;
    		elementCode += '\',\'\','+ inputWidth +',validator_' + inputName + ',\'\',false,\''+ bootstrapClass + '\','+ bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new InputText(label,name,defaultValue,width,validator,placeHolder,disabled,bootstrapClass,bootstrapNewLine); */\\n';
    	} else if(elementType == 'textarea'){
    		var textareaLabel = '';
    		var textareaName = '';
    		var textareaColumns = '';
    		var textareaRows = '';
    		var textareaWidth = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'textarea_label')){
    				textareaLabel = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'textarea_name')){
    				textareaName = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'textarea_columns')){
    				textareaColumns = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'textarea_rows')){
    				textareaRows = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'textarea_width')){
    				textareaWidth = singletonRockerCommons.getElement(inputId).value;
    			}
    		}
    		elementCode += '\\nvar validator_' + textareaName + ' = ';
    		elementCode += 'singletonRockerFormValidator.getTextAllowedsValidator(singletonRockerFormValidator.letters,50,10);';
    		elementCode += '\\narrayFields[i] = new  TextArea(\''+ textareaLabel + '\',\''+ textareaName;
    		elementCode += '\',\'\','+ textareaColumns +','+ textareaRows +','+ textareaWidth +',validator_' + textareaName + ',true,true,false,\'\',\''+ bootstrapClass + '\','+ bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new TextArea(label,name,defaultValue,cols,rows,width,validator,usingCompletation,richEditor,readonly,placeHolder,bootstrapClass,bootstrapNewLine); */\\n';
    	}else if(elementType == 'radiogroup'){
    		var radiogroupLabel = '';
    		var radiogroupName = '';
    		var radiogroupLabels = '';
    		var radiogroupValues = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'radiogroup_label')){
    				radiogroupLabel = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'radiogroup_name')){
    				radiogroupName = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'radiogroup_labels')){
    				radiogroupLabels = singletonRockerCommons.stringToArrayString(singletonRockerCommons.getElement(inputId).value,false);
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'radiogroup_values')){
    				radiogroupValues = singletonRockerCommons.stringToArrayString(singletonRockerCommons.getElement(inputId).value,false);
    			}
    		}
    		elementCode += '\\narrayFields[i] = new  RadioGroup(\''+ radiogroupLabel + '\',\''+ radiogroupName;
    		elementCode += '\','+ radiogroupLabels +','+ radiogroupValues +',\'\',false,\''+ bootstrapClass + '\','+ bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new RadioGroup(label,name,arrayLabels,arrayValues,defaultValue,nullable,bootstrapClass,bootstrapNewLine); */\\n';
    	}else if(elementType == 'checkgroup'){
    		var checkgroupLabel = '';
    		var checkgroupName = '';
    		var checkgroupLabels = '';
    		var checkgroupValues = '';
    		var size = 0;
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'checkgroup_label')){
    				checkgroupLabel = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'checkgroup_name')){
    				checkgroupName = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'checkgroup_labels')){
    				checkgroupLabels = singletonRockerCommons.stringToArrayString(singletonRockerCommons.getElement(inputId).value,false);
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'checkgroup_values')){
    				var chkValues = singletonRockerCommons.getElement(inputId).value;
    				size = chkValues.split(',').length;
    				checkgroupValues = singletonRockerCommons.stringToArrayString(chkValues,false);
    			}
    		}
    		var arrayCheckCheckeds = '';
    		var comma = '';
    		for(var i = 0; i < size; i++){
    			arrayCheckCheckeds += comma + 'false';
    			comma = ',';
    		}
    		arrayCheckCheckeds = '[' + arrayCheckCheckeds + ']';
    		elementCode += '\\narrayFields[i] = new  CheckGroup(\''+ checkgroupLabel + '\',\''+ checkgroupName;
    		elementCode += '\','+ checkgroupLabels +','+ checkgroupValues +','+ arrayCheckCheckeds + ',1,\''+ bootstrapClass + '\','+ bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new CheckGroup(label,name,arrayCheckLabels,arrayCheckNames,arrayCheckCheckeds,minChecks,bootstrapClass,bootstrapNewLine); */\\n';
    	}else if(elementType == 'select'){
    		var selectLabel = '';
    		var selectName = '';
    		var selectWidth = '';
    		var selectLabels = '';
    		var selectValues = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'select_label')){
    				selectLabel = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'select_name')){
    				selectName = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'select_width')){
    				selectWidth = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'select_labels')){
    				selectLabels = singletonRockerCommons.stringToArrayString(singletonRockerCommons.getElement(inputId).value,false);
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'select_values')){
    				selectValues = singletonRockerCommons.stringToArrayString(singletonRockerCommons.getElement(inputId).value,false);
    			}
    		}
    		elementCode += '\\narrayFields[i] = new  Select(\''+ selectLabel + '\',\''+ selectName;
    		elementCode += '\','+ selectLabels +','+ selectValues +',\'\',false,' + selectWidth + ',\'\',\'\',false,\''+ bootstrapClass + '\','+ bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new Select(label,name,arrayLabels,arrayValues,defaultValue,canBeEmpty,width,onchange,onclick,disabled,bootstrapClass,bootstrapNewLine); */\\n';
    	}else if(elementType == 'upperfile'){
    		var upperId = '';
    		var upperLabel = '';
    		var upperAppenderId = '';
    		var upperUrlBase = '';
    		var upperFormTitle = '';
    		var upperWidth = '';
    		var upperHeigth = '';
    		var upperTop = '';
    		var upperLeft = '';
    		var upperExtensions = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_id')){
    				upperId = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_label')){
    				upperLabel = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_appenderid')){
    				upperAppenderId = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_urlbase')){
    				upperUrlBase = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_formtitle')){
    				upperFormTitle = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_width')){
    				upperWidth = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_heigth')){
    				upperHeigth = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_top')){
    				upperTop = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_left')){
    				upperLeft = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_extensions')){
    				upperExtensions = singletonRockerCommons.stringToArrayString(singletonRockerCommons.getElement(inputId).value,false);
    			}
    		}
    		elementCode += '\\narrayFields[i] = new  UpperFile(\''+ upperId + '\',\''+ upperLabel + '\',\'\',';
    		elementCode += upperWidth + ',' + upperHeigth + ',\'' + upperAppenderId + '\',\'' + upperUrlBase + '\',';
    		elementCode += '\'' + upperFormTitle + '\',' + upperTop + ',' + upperLeft + ',false,' + upperExtensions + ',\'\',';
    		elementCode += '\''+ bootstrapClass + '\','+ bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new UpperFile(id,label,value,width,height,appenderId,actionBaseForm,';
    		elementDoc += 'titleUploaderForm,top,left,hideInputField,validExtensions,onbeforeOpen,bootstrapClass,bootstrapNewLine); */\\n';
    	}else if(elementType == 'upperfiles3'){
    		var upperId = '';
    		var upperLabel = '';
    		var upperAppenderId = '';
    		var upperFormTitle = '';
    		var upperWidth = '';
    		var upperHeigth = '';
    		var upperTop = '';
    		var upperLeft = '';
    		var upperExtensions = '';
    		var upperMaxSize = '';
    		var upperFixedName = '';
			var upperNamePrefix = '';
			var upperS3Region = '';
			var upperS3Bucket = '';
			var upperS3BaseUrl = '';
    		for(var i = 0; i < form.arrayFields.length; i++){
    			var inputId = form.arrayFields[i].id;
    			if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_id')){
    				upperId = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_label')){
    				upperLabel = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_appenderid')){
    				upperAppenderId = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_formtitle')){
    				upperFormTitle = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_width')){
    				upperWidth = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_heigth')){
    				upperHeigth = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_top')){
    				upperTop = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_left')){
    				upperLeft = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_extensions')){
    				upperExtensions = singletonRockerCommons.stringToArrayString(singletonRockerCommons.getElement(inputId).value,false);
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_maxsize')){
    				upperMaxSize = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_fixedname')){
    				upperFixedName = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_nameprefix')){
    				upperNamePrefix = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_s3region')){
    				upperS3Region = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_s3bucket')){
    				upperS3Bucket = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'upperfile_s3BaseUrl')){
    				upperS3BaseUrl = singletonRockerCommons.getElement(inputId).value;
    			}
    		}
    		elementCode += '\\narrayFields[i] = new  UpperFileS3(\''+ upperId + '\',\''+ upperLabel + '\',\'\',';
    		elementCode += upperWidth + ',' + upperHeigth + ',\'' + upperAppenderId + '\',';
    		elementCode += '\'' + upperFormTitle + '\',' + upperTop + ',' + upperLeft + ',false,' + upperExtensions + ',\'\',';
    		elementCode += upperMaxSize + ',1000,\'\',\'\',\'' + upperS3Region + '\',\'' + upperS3Bucket + '\',';
    		elementCode += '\'' + upperS3BaseUrl + '\',\'' + upperFixedName + '\',\'' + upperNamePrefix + '\',';
    		elementCode += '\''+ bootstrapClass + '\','+ bootstrapNewLine + ');\\n';
    		elementCode += 'i++;\\n\\n';
    		elementDoc = '\\n\\n/** new UpperFileS3(id,label,value,width,height,appenderId,titleUploaderForm,';
    		elementDoc += 'top,left,hideInputField,validExtensions,onbeforeOpen,';
    		elementDoc += 'maxSize,delayTimeMsgs,s3user,s3password,s3region,s3bucket,s3BaseUrl,fixedFileName,fileNamePrefix,';
    		elementDoc += 'bootstrapClass,bootstrapNewLine); */\\n';
    	}else if(elementType == 'tableColumn'){
    		var columnLabel = '';
    		var columnAttr = '';
    		var columnWidth = '';
    		var columnSortBy = '';
    		var columnClazz = '';
    		var columnCss = '';
    		var columnContentCss = '';
			for(var i = 0; i < form.arrayFields.length; i++){
				var inputId = form.arrayFields[i].id;
				if(form.arrayFields[i].name == (this.inputPrefix + 'tablecolum_label')){
					columnLabel = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'tablecolum_object_attribute')){
    				columnAttr = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'tablecolumn_width')){
    				columnWidth = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'tablecolumn_sortby')){
    				columnSortBy = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'tablecolumn_class')){
    				columnClazz = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'tablecolumn_inline_css')){
    				columnCss = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'tablecolumn_content_inline_css')){
    				columnContentCss = singletonRockerCommons.getElement(inputId).value;
    			}
			}
    		elementCode = [columnLabel,columnAttr,columnWidth,
    		               columnSortBy,columnClazz,columnCss,columnContentCss];
    		elementDoc = null;
		}else if(elementType == 'tableButton'){
    		var buttonCss = '';
    		var buttonCssClass = '';
    		var buttonTitle = '';
    		var buttonOnclick = '';
    		var buttonParameters = '';
			for(var i = 0; i < form.arrayFields.length; i++){
				var inputId = form.arrayFields[i].id;
				if(form.arrayFields[i].name == (this.inputPrefix + 'tablebutton_inline_css')){
					buttonCss = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'tablebutton_css_class')){
    				buttonCssClass = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'tablebutton_title')){
    				buttonTitle = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'tablebutton_onclick')){
    				buttonOnclick = singletonRockerCommons.getElement(inputId).value;
    			}else if(form.arrayFields[i].name == (this.inputPrefix + 'tablebutton_parameters')){
    				buttonParameters = singletonRockerCommons.getElement(inputId).value;
    			}
			}
    		elementCode = [buttonCss,buttonCssClass,buttonTitle,buttonOnclick,buttonParameters];
    		elementDoc = null;
		}
		var metadataComp = [];
		for(var i = 0; i < form.arrayFields.length; i++){
			if(form.arrayFields[i].name.indexOf(this.inputPrefix) != -1){
				var inputId = form.arrayFields[i].id;
				if(null==inputId){
					continue;
				}
				var inputValue = singletonRockerCommons.getElement(inputId).value;
				metadataComp[metadataComp.length] = [inputId,inputValue];
			}
		}
    	//elementDoc = '\\n\\n/** --- */\\n';
    	var obj = [id,elementType,elementCode,elementDoc,metadataComp];
    	this.saveObject(id,obj);
    	
    	return true;
    };
    
    this.getLabelValidator = function(maxDigits,required){
    	return singletonRockerFormValidator.getTextAllowedsValidator(singletonRockerFormValidator.labelChars,maxDigits,(required ? 5 : 0));
    };
    
    this.getLettersValidator = function(maxDigits,minDigits){
    	return singletonRockerFormValidator.getTextAllowedsValidator(singletonRockerFormValidator.singleChars,maxDigits,minDigits);
    };
    
    this.getNumberValidator = function(maxDigits,minDigits){
    	return singletonRockerFormValidator.getTextIntValidator(false,maxDigits,minDigits);
    };
    
    this.getHexValidator = function(maxLength,minLength){
    	return singletonRockerFormValidator.getTextAllowedsValidator(singletonRockerFormValidator.hexadecimalChars,maxLength,minLength);
    };
    
    this.getCssValidator = function(maxLength,minLength){
    	return singletonRockerFormValidator.getTextAllowedsValidator(singletonRockerFormValidator.cssChars,
    			(maxLength > 0 ? maxLength : -1),(minLength > 0 ? minLength : -1));
    };
    
    this.drawElementsForm = function(elementType,visualCodeObject){
    	var bootstrapStyle = !((elementType == 'styler' || elementType == 'hidden' 
    							|| elementType == 'tableColumn' || elementType == 'tableButton' ));
    	var arrayFields = [];
    	var i = 0;
    	arrayFields[i] =  new Hidden((this.inputPrefix + 'element_component_id'),(null!=visualCodeObject ? visualCodeObject[0] : '') );
    	i++;
    	if(elementType == 'appender'){
    		arrayFields[i] = new InputText('Appender Id',this.inputPrefix + 'appender_id','',255,this.getLettersValidator(80,10),'appenderDinamicContent',
					false,'col-sm-4',false);
    		i++;
    		arrayFields[i] = new Select('Position',this.inputPrefix + 'appender_position',
    				['topTable','bottomTable','topFields','bottomFields','bottomForm'],
    				['topTable','bottomTable','topFields','bottomFields','bottomForm'],
    				'bottomTable',
			        false,115,'','',false,'col-sm-2',false);
			i++;
			arrayFields[i] = new InputText('Tab Title',this.inputPrefix + 'appender_tab_title','',390,this.getLabelValidator(40,true),'Miscelaneous',
					false,'col-sm-5',false);
    		i++;
    		arrayFields[i] = new TextArea('CSS Inline Style',this.inputPrefix + 'appender_style','',
    				50,3,390,this.getCssValidator(0,0),false,
    				false,false,'width: 200px; height: 200px; overflow-x:hidden; overflow-y: auto;','col-sm-6',false);
    		i++;
    		arrayFields[i] = new TextArea('CSS Class Style',this.inputPrefix + 'appender_css_class','',
    				50,3,390,this.getCssValidator(0,0),false,
    				false,false,'ui-widget-content divRed','col-sm-6',false);
    		i++;
    	} else if(elementType == 'styler'){
    		arrayFields[i] = new TextArea('Class Names (separed whit \',\')',this.inputPrefix + 'styler_class_names','',
    				50,3,390,this.getCssValidator(0,1),false,
    				false,false,'divRed,divBlue','col-sm-6',false);
    		i++;
    		arrayFields[i] = new TextArea('CSS Styles (separed whit \',\')',this.inputPrefix + 'styler_css_classes','',
    				50,3,390,this.getCssValidator(0,1),false,
    				false,false,'background: #f00;,background: #00f; text-align: right;','col-sm-6',false);
    		i++;
    	}
    	else if(elementType == 'hidden'){
    		arrayFields[i] = new InputText('Input Hidden Name',this.inputPrefix + 'hidden_name','',240,this.getLettersValidator(25,10),'id',
					false,'col-sm-4',false);
    		i++;
    		arrayFields[i] = new InputText('Input Hidden Value',this.inputPrefix + 'hidden_value','',240,this.getLabelValidator(25,false),'-1',
					false,'col-sm-4',false);
    		i++;
    	} else if(elementType == 'spacer'){
    		arrayFields[i] = new InputText('Height',this.inputPrefix + 'spacer_height','',60,this.getNumberValidator(2,1),'0',
					false,'col-sm-1',false);
    		i++;
    		arrayFields[i] = new InputText('Bg Color (hex)',this.inputPrefix + 'spacer_bg_color','',120,this.getHexValidator(6,0),'ff98aa',
					false,'col-sm-2',false);
    		i++;
    	} else if(elementType == 'button'){
    		arrayFields[i] = new InputText('Button Id',this.inputPrefix + 'button_id','',250,this.getLettersValidator(40,10),'buttonShowPhoto',
					false,'col-sm-4',false);
    		i++;
    		arrayFields[i] = new InputText('Button Value',this.inputPrefix + 'button_value','',515,this.getLabelValidator(120, true),'Show Photo',
					false,'col-sm-6',false);
    		i++;
    		arrayFields[i] = new TextArea('CSS Inline Style',this.inputPrefix + 'button_style','',
    				80,3,790,this.getCssValidator(0,0),false,
    				false,false,'font-size: 30px !important;','col-sm-12',true);
    		i++;
    	} else if(elementType == 'label'){
    		arrayFields[i] = new InputText('Label Value',this.inputPrefix + 'label_value','',660,this.getLabelValidator(160, true),'Alert: Pay Atention for text on bottom!',
					false,'col-sm-10',false);
    		i++;
    		arrayFields[i] = new Select('Line Breaks',this.inputPrefix + 'label_line_breaks',
    				['0','1','2','3','4','5','6','7','8','9'],
    				['0','1','2','3','4','5','6','7','8','9'],
    				'0',
			        false,100,'','',false,'col-sm-2',false);
			i++;
    	}else if(elementType == 'inputtext'){
    		arrayFields[i] = new InputText('Input Label',this.inputPrefix + 'input_label','',320,this.getLabelValidator(60,true),'Rock Star Name',
					false,'col-sm-5',false);
    		i++;
    		arrayFields[i] = new InputText('Input Name',this.inputPrefix + 'input_name','',320,this.getLettersValidator(60,10),'rockstarName',
					false,'col-sm-5',false);
    		i++;
    		arrayFields[i] = new InputText('Width (px)',this.inputPrefix + 'input_width','',90,this.getNumberValidator(3,1),'300',
					false,'col-sm-2',false);
    		i++;
    	}else if(elementType == 'textarea'){
    		arrayFields[i] = new InputText('TextArea Label',this.inputPrefix + 'textarea_label','',190,this.getLabelValidator(30,true),'Your Biography',
					false,'col-sm-3',false);
    		i++;
    		arrayFields[i] = new InputText('TextArea Name',this.inputPrefix + 'textarea_name','',190,this.getLettersValidator(30,10),'yourBiography',
					false,'col-sm-3',false);
    		i++;
    		arrayFields[i] = new InputText('Columns',this.inputPrefix + 'textarea_columns','50',120,this.getNumberValidator(3,1),'',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Rows',this.inputPrefix + 'textarea_rows','3',120,this.getNumberValidator(2,1),'',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Width (px)',this.inputPrefix + 'textarea_width','400',120,this.getNumberValidator(3,1),'',
					false,'col-sm-2',false);
    		i++;
    	}else if(elementType == 'radiogroup'){
    		arrayFields[i] = new InputText('RadioGroup Label',this.inputPrefix + 'radiogroup_label','',390,this.getLabelValidator(40,true),'Was Born on England?',
					false,'col-sm-6',false);
    		i++;
    		arrayFields[i] = new InputText('RadioGroup Name',this.inputPrefix + 'radiogroup_name','',390,this.getLettersValidator(40,10),'bornOnEngland',
					false,'col-sm-6',false);
    		i++;
    		arrayFields[i] = new TextArea('Option Labels (separed whit \',\')',this.inputPrefix + 'radiogroup_labels','',
    				50,3,390,this.getCssValidator(0,3),false,
    				false,false,'Yes,No','col-sm-6',true);
    		i++;
    		arrayFields[i] = new TextArea('Option Values (separed whit \',\')',this.inputPrefix + 'radiogroup_values','',
    				50,3,390,this.getCssValidator(0,3),false,
    				false,false,'true,false','col-sm-6',false);
    		i++;
    	}else if(elementType == 'checkgroup'){
    		arrayFields[i] = new InputText('CheckGroup Label',this.inputPrefix + 'checkgroup_label','',390,this.getLabelValidator(40,true),'Preferred Food',
					false,'col-sm-6',false);
    		i++;
    		arrayFields[i] = new InputText('CheckGroup Name',this.inputPrefix + 'checkgroup_name','',390,this.getLettersValidator(40,10),'preferredFood',
					false,'col-sm-6',false);
    		i++;
    		arrayFields[i] = new TextArea('Option Labels (separed whit \',\')',this.inputPrefix + 'checkgroup_labels','',
    				50,3,390,this.getCssValidator(0,3),false,
    				false,false,'Apple,Orange,Cheese,Cake,Pig Meat,Hot Dog','col-sm-6',true);
    		i++;
    		arrayFields[i] = new TextArea('Option Values (separed whit \',\')',this.inputPrefix + 'checkgroup_values','',
    				50,3,390,this.getCssValidator(0,3),false,
    				false,false,'apple,orange,cake,pigmeat,hotdog','col-sm-6',false);
    		i++;
    	}else if(elementType == 'select'){
    		arrayFields[i] = new InputText('Select Label',this.inputPrefix + 'select_label','',320,this.getLabelValidator(40,true),'Select One Fruit',
					false,'col-sm-5',false);
    		i++;
    		arrayFields[i] = new InputText('Select Name',this.inputPrefix + 'select_name','',320,this.getLettersValidator(40,10),'fruitSelect',
					false,'col-sm-5',false);
    		i++;
    		arrayFields[i] = new InputText('Width (px)',this.inputPrefix + 'select_width','200',115,this.getNumberValidator(3,1),'',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new TextArea('Option Labels (separed whit \',\')',this.inputPrefix + 'select_labels','',
    				50,3,390,this.getCssValidator(0,3),false,
    				false,false,'Apple,Grappe,Oranje,Pinneaple','col-sm-6',true);
    		i++;
    		arrayFields[i] = new TextArea('Option Values (separed whit \',\')',this.inputPrefix + 'select_values','',
    				50,3,390,this.getCssValidator(0,3),false,
    				false,false,'apple,grappe,orange,pinneaple','col-sm-6',false);
    		i++;
    	}else if(elementType == 'upperfile'){
    		arrayFields[i] = new InputText('Upper File Id',this.inputPrefix + 'upperfile_id','',120,this.getLettersValidator(30,10),'upperFileDoc',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Upper File Label',this.inputPrefix + 'upperfile_label','',120,this.getLabelValidator(30,true),
    				'File 1',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Appender to (id)',this.inputPrefix + 'upperfile_appenderid','',120,this.getLettersValidator(90,1),
    				'appenderFileUpload',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('URL base Up.',this.inputPrefix + 'upperfile_urlbase','',180,this.getCssValidator(0,1),'./uploads/',
					false,'col-sm-3',false);
    		i++;
    		arrayFields[i] = new InputText('Title Up. Form',this.inputPrefix + 'upperfile_formtitle','',180,this.getLabelValidator(40,true),
    				'Choice a File to Upload',
					false,'col-sm-3',false);
    		i++;
    		arrayFields[i] = new InputText('Width (px)',this.inputPrefix + 'upperfile_width','170',120,this.getNumberValidator(3,1),'',
					false,'col-sm-2',true);
    		i++;
    		arrayFields[i] = new InputText('Heigth (px)',this.inputPrefix + 'upperfile_heigth','170',120,this.getNumberValidator(3,1),'',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Up.F.Top (px)',this.inputPrefix + 'upperfile_top','20',120,this.getNumberValidator(3,1),'',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Up.F.Left (px)',this.inputPrefix + 'upperfile_left','20',120,this.getNumberValidator(3,1),'',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Valid Ext. (separate by \',\')',this.inputPrefix + 'upperfile_extensions','',245,
    				this.getLettersValidator(150,3),'jpg,png,xls,doc,pdf,txt,zip,rar',
					false,'col-sm-3',false);
    		i++;
    	}else if(elementType == 'upperfiles3'){
    		arrayFields[i] = new InputText('Upper File Id',this.inputPrefix + 'upperfile_id','',120,this.getLettersValidator(30,10),'upperPhoto',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Upper File Label',this.inputPrefix + 'upperfile_label','',190,this.getLabelValidator(30,true),'Profile Photo',
					false,'col-sm-3',false);
    		i++;
    		arrayFields[i] = new InputText('Appender to (id)',this.inputPrefix + 'upperfile_appenderid','',120,this.getLettersValidator(90,1),
    				'divAppenderPhoto',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Title Upload Form',this.inputPrefix + 'upperfile_formtitle','',315,this.getLabelValidator(40,true),
    				'Choice a Photo to Upload',
					false,'col-sm-5',false);
    		i++;
    		arrayFields[i] = new InputText('Width (px)',this.inputPrefix + 'upperfile_width','170',120,this.getNumberValidator(3,1),'',
					false,'col-sm-2',true);
    		i++;
    		arrayFields[i] = new InputText('Heigth (px)',this.inputPrefix + 'upperfile_heigth','170',120,this.getNumberValidator(3,1),'',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Up.F.Top (px)',this.inputPrefix + 'upperfile_top','20',120,this.getNumberValidator(3,1),'',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Up.F.Left (px)',this.inputPrefix + 'upperfile_left','20',120,this.getNumberValidator(3,1),'',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Valid Ext. (separate by \',\')',this.inputPrefix + 'upperfile_extensions','',245,
    				this.getLettersValidator(150,3),'jpg,jpeg,png,gif,bmp,pdf,txt',
					false,'col-sm-4',false);
    		i++;
    		arrayFields[i] = new InputText('Max. Size Bytes',this.inputPrefix + 'upperfile_maxsize','',255,this.getNumberValidator(9,1),
    				'1.048.576 (= 1 MB)',
					false,'col-sm-4',true);
    		i++;
    		arrayFields[i] = new InputText('Fixed File Name',this.inputPrefix + 'upperfile_fixedname','',255,this.getCssValidator(0,0),'echo.jpg',
					false,'col-sm-4',false);
    		i++;
    		arrayFields[i] = new InputText('File Name Prefix',this.inputPrefix + 'upperfile_nameprefix','',245,
    				this.getCssValidator(0,0),'john_file_',
					false,'col-sm-4',false);
    		i++;
    		arrayFields[i] = new InputText('S3 Region',this.inputPrefix + 'upperfile_s3region','',120,this.getCssValidator(0,3),'us-west-2',
					false,'col-sm-2',true);
    		i++;
    		arrayFields[i] = new InputText('S3 Bucket',this.inputPrefix + 'upperfile_s3bucket','',185,this.getCssValidator(0,10),'bucket_name',
					false,'col-sm-3',false);
    		i++;
    		arrayFields[i] = new InputText('S3 Base URL',this.inputPrefix + 'upperfile_s3BaseUrl','',450,this.getCssValidator(0,10),
    				'https://s3-us-west-2.amazonaws.com',
					false,'col-sm-7',false);
    		i++;
    	} else if(elementType == 'tableColumn'){
    		arrayFields[i] = new InputText('Table Col. Label',this.inputPrefix + 'tablecolum_label','',
    				130,this.getLabelValidator(30,true),'Column Label',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Col. Obj. Attr.',this.inputPrefix + 'tablecolum_object_attribute','',
    				130,this.getLettersValidator(30,1),'Object Attribute',
					false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new InputText('Col. Width (px)',this.inputPrefix + 'tablecolumn_width','',120,this.getNumberValidator(3,1),
    				'',false,'col-sm-2',false);
    		i++;
    		arrayFields[i] = new Select('Sort by?',this.inputPrefix + 'tablecolumn_sortby',
    				['true','false'],
    				['true','false'],
    				'true',
			        false,110,'','',false,'col-sm-2',false);
			i++;
			arrayFields[i] = new InputText('Column Class',this.inputPrefix + 'tablecolumn_class','',255,this.getCssValidator(0,0),
    				'',false,'col-sm-4',false);
    		i++;
    		arrayFields[i] = new TextArea('Column inline CSS',this.inputPrefix + 'tablecolumn_inline_css','',
    				50,3,390,this.getCssValidator(0,0),false,
    				false,false,'background-color: #ff0;','col-sm-6',true);
    		i++;
    		arrayFields[i] = new TextArea('Column content inline CSS',this.inputPrefix + 'tablecolumn_content_inline_css','',
    				50,3,390,this.getCssValidator(0,0),false,
    				false,false,'margin-left: 10px; font-family: verdana; font-size: 10px;','col-sm-6',false);
    		i++;
    	}else if(elementType == 'tableButton'){ 
    		arrayFields[i] = new TextArea('Table Button inline CSS',this.inputPrefix + 'tablebutton_inline_css','',
    				50,3,390,this.getCssValidator(0,0),false,
    				false,false,'background-color: #ff0;','col-sm-6',false);
    		i++;
    		arrayFields[i] = new TextArea('Table Button CSS Class',this.inputPrefix + 'tablebutton_css_class','',
    				50,3,390,this.getCssValidator(0,8),false,
    				false,false,'ui-icon-pencil/ui-icon-trash','col-sm-6',false);
    		i++;
    		arrayFields[i] = new InputText('Button Title',this.inputPrefix + 'tablebutton_title','',
    				120,this.getLabelValidator(100,false),'Button Title',
					false,'col-sm-2',true);
    		i++;
    		arrayFields[i] = new InputText('Button Onclick Function Parameter Names ( separe with \',\')',
    				this.inputPrefix + 'tablebutton_parameters','',
    				663,this.getCssValidator(0,2),'id,name,age',
					false,'col-sm-10',false);
    		i++;
    		arrayFields[i] = new TextArea('Table Button Onclick Function (whitout parameters)',this.inputPrefix + 'tablebutton_onclick','',
    				50,3,797,this.getCssValidator(0,5),false,
    				false,false,'readPerson(id,name,age); // invalid construction\nreadPerson(); // valid construction','col-sm-12',true);
    		i++;
    	}
    	if(bootstrapStyle){
    		var arrayBootstrapBase = ['col-xs-','col-sm-','col-md-','col-lg-','col-xl-'];
        	var arrayBootstrapClasses = [];
        	for(var j=0; j < arrayBootstrapBase.length; j++){
        		for(var k = 1; k < 13; k++){
        			arrayBootstrapClasses[arrayBootstrapClasses.length] = (arrayBootstrapBase[j] + k);
        		}
        	}
    		arrayFields[i] = new Select('Bootstrap class',this.inputPrefix + 'bootstrap_class',
    				arrayBootstrapClasses,
    				arrayBootstrapClasses,
    				'col-sm-3',
			        false,110,'','',false,'col-sm-2',true);
			i++;
			arrayFields[i] = new Select('Bootstrap new line',this.inputPrefix + 'bootstrap_new_line',
			        ['true','false'],['true','false'],'',false,130,'','',false,'col-sm-3',false);
			i++;
    	}
    	
    	
    	arrayFields[i] = new Appender('appenderValidationMessagesForm',null,
				'','','bottomFields',null,null,
				'col-sm-12',false);
	    i++;
    	
    	var onclickCancel = 'singletonRockerVisualCoder.drawElementsForm(\'' + elementType + '\',null);return;';
    	var onclickSubmit = 'if(!(singletonRockerVisualCoder.generateElementCode(\'' + elementType + '\'))){return false;}' + onclickCancel;
    	new RockerForm('Attributes Definition',
 	    		'appenderCompFormInternal',false,this.width-60,false,false,arrayFields,
 				this.actionForm,onclickSubmit,onclickCancel,this.textSubmit,this.textCancel,this.errorCode,this.jsonCode,
 				0, 0, null, null,this.typeObject,this.aliasObject,
 				'','',false,false,3,0,3,false,false,null
 				);
    	
    	if(null!=visualCodeObject){
    		var metadataComp = visualCodeObject[4];
    		if(null!=metadataComp){
    			for(var i = 0; i < metadataComp.length; i++){
    				singletonRockerCommons.getElement(metadataComp[i][0]).value = metadataComp[i][1];
    			}
    		}
    	}
    };
    
    this.showElementsForm = function(type){
    	var arrayFields = [];
		var i = 0;
		arrayFields[i] = new Appender('appenderCompForm',null,
				'','','bottomFields',null,
				((type == 'rockerForm') ? this.getArrayFieldsRockerForm() : this.getArrayFieldsRockerTable()),
				'col-sm-12',false);
	    i++;
	    
	    new RockerForm((type == 'rockerForm') ? 'RockerForm Elements' : 'RockerTable Elements',
	    		'appenderComp',true,this.width - 25 ,false,false,arrayFields,
				'','','','','',this.errorCode,this.jsonCode,
				0, 0, null, null,this.typeObject,this.aliasObject,
				'','',false,false,3,0,3,false,false,null
				);
	    
	    this.codeType = type;
	    if(type == 'rockerForm'){
	    	this.drawElementsForm('appender',null);
	    	this.fileTitle = 'MyRockerForm_'+ new Date().getTime() +'.js';
	    }else{
	    	this.drawElementsForm('tableColumn',null);
	    	this.fileTitle = 'MyRockerTable_'+ new Date().getTime() +'.js';
	    }
	    singletonRockerStorage.clearVisualCoderStorage();
	    this.drawElementsTable();
    };
    
    this.getArrayFieldsRockerForm = function(){
		  
		var arrayFields = [];
		var i = 0;
		
		
		arrayFields[i] = new Select('Rocker Form Element','formElemType',
				  ['Appender','Button','CheckGroup','Hidden','InputText','Label','RadioGroup',
				   'Select','Spacer','Styler','TextArea','UpperFile','UpperFileS3',
				   'Table Column','Table Button'],
				  ['appender','button','checkgroup','hidden','inputtext','label',
					   'radiogroup','select','spacer','styler','textarea','upperfile','upperfiles3',
					   'tableColumn','tableButton'],
				  '',
				  false,
				  120,'singletonRockerVisualCoder.drawElementsForm(this.value,null);','',false,'col-sm-12',false);
		i++;
		
		arrayFields[i] = new Appender('appenderCompFormInternal',null,
				'','','bottomFields',null,null,'col-sm-12',true);
	    i++;
		
		return arrayFields;
		
	};
	
	this.getArrayFieldsRockerTable = function(){
		var arrayFields = [];
		var i = 0;
		
		arrayFields[i] = new Select('Rocker Table Element','formElemType',
				  ['Table Column','Table Button'],
				  ['tableColumn','tableButton'],
				  '',
				  false,
				  120,'singletonRockerVisualCoder.drawElementsForm(this.value,null);','',false,'col-sm-12',false);
		i++;
		
		arrayFields[i] = new Appender('appenderCompFormInternal',null,
				'','','bottomFields',null,null,'col-sm-12',true);
	    i++;
		
		return arrayFields;
	};

	this.getArrayFields = function(){
		  
		var arrayFields = [];
		var i = 0;
		
		arrayFields[i] = new Styler(['#appenderComp .rockerContainer'],['margin: 0px !important; padding: 0px !important;']);
		i++;
		
		arrayFields[i] = new Select('Rocker Type','type', ['RockerForm','RockerTable'],
				                    ['rockerForm','rockerTable'],'',false,
				                    120,'singletonRockerVisualCoder.showElementsForm(this.value);','',false,'col-sm-12',false);
		i++;
		
		arrayFields[i] = new Appender('appenderComp',null,
				'','','bottomFields',null,null,'col-sm-12',false);
	    i++;
	    
	    arrayFields[i] = new Appender('appenderElementsTable',null,
				'','','bottomTable',null,null,'col-sm-9',false);
	    i++;
	    
	    arrayFields[i] = new Appender('appenderGenerateCodeWhitElementsTable',null,
				'','','bottomTable',null,null,'col-sm-9',false);
	    i++;
	    
		return arrayFields;
		
	};
	
	this.getArrayTableColumnsComponents = function(){
		var arrayTableColumns = [];
		arrayTableColumns[0] = ['Element Type','Property Of','Element Code/Properties','Actions'];
	    arrayTableColumns[1] = ['elementType','propertyOf','elementCode',''];
	    arrayTableColumns[2] = [-130,-90,-500,'0'];
	    arrayTableColumns[3] = ['false','false','false','false'];
	    arrayTableColumns[4] = ['','','',''];
	    arrayTableColumns[5] = [
	                            'width: 140px; text-align: left;',
	                            'width: 100px; text-align: left;',
	                            'width: 510px; text-align: left;',
	                            'width: 40px; text-align: left;'
	                           ];
	    arrayTableColumns[6] = ['margin-left: 10px;',
	                            'margin-left: 10px;',
	                            'margin-left: 10px; font-size: 9px; font-family: verdana;',
	                            'margin-left: 10px;'
	                            ];
	    var arrayAditionalButtonsTable = [];
	  
	    var arrayBtAd0 = [];
	    arrayBtAd0[0] = '';// inline style - try background-color: #f1f0ec !important; border-color: #ccc !important; too see
	    arrayBtAd0[1] = 'ui-icon-pencil';// style class
	    arrayBtAd0[2] = '';// title
	    arrayBtAd0[3] = 'singletonRockerVisualCoder.editObject();';//onclick: beetween ( and ) put the additional parameters name separated by ',' (comma)
	    arrayBtAd0[4] = ['id'];// atribute of json object returned, should be a column value of a table or 'id'. 
	    arrayAditionalButtonsTable[0] = arrayBtAd0;
	    
	    var arrayBtAd1 = [];
	    arrayBtAd1[0] = '';// inline style - try background-color: #f1f0ec !important; border-color: #ccc !important; too see
	    arrayBtAd1[1] = 'ui-icon-trash';// style class
	    arrayBtAd1[2] = '';// title
	    arrayBtAd1[3] = 'singletonRockerVisualCoder.removeObject();';//onclick: beetween ( and ) put the additional parameters name separated by ',' (comma)
	    arrayBtAd1[4] = ['id'];// atribute of json object returned, should be a column value of a table or 'id'. 
	    arrayAditionalButtonsTable[1] = arrayBtAd1;
	    
	    arrayTableColumns[7] = arrayAditionalButtonsTable;
	    
	    return arrayTableColumns;
	};
	
	this.drawElementsTable = function(){
		var rockerTable = new RockerTable('appenderElementsTable','Rocker Elements',5,this.getArrayTableColumnsComponents(),'/',
				null,false,null,null,false,null,false,null);
		rockerTable.tableFooter.makeRequestDataUpdate = function(){
			var json = singletonRockerStorage.getVisualCoderStorage(rockerTable.tableFooter.selectedPage,rockerTable.tableFooter.selectedRows);
			singletonRockerStorage.setJsonObjectListTable(rockerTable.id,json);
		};
		rockerTable.tableFooter.requestUpdateOnSetRows = true;
		singletonRockerStorage.navigatePageTable(rockerTable.id,1,rockerTable.tableFooter.selectedRows);
	};
	
	this.drawAppenderGenerateCodeWhitElementsTable = function(){
		var inner = '';
		inner += '<div class="rockerFormButtonsContainer ui-widget-header ui-corner-all" ';
		inner += ' style="text-align: center;">';
		inner += '<span class="ui-widget ui-corner-all">';
		inner += '<input class="ui-button ui-corner-all" type="button" value="Generate Code!" ';
		inner += 'onclick="singletonRockerVisualCoder.generateRockerCode();" />';
		inner += '</span>';
		inner += '</div>';
		singletonRockerCommons.innerHtml('appenderGenerateCodeWhitElementsTable',inner);
	};
	
    this.getArrayTableColumns = function(){
    	return null;
    };
	
	this.draw = function(){
		new RockerForm(this.title,this.idAppenderForm,true,this.width,this.closable,this.modal,this.getArrayFields(),
				this.actionForm,'','','','',this.errorCode,this.jsonCode,
				this.posTop, this.posLeft, this.titleTable, this.getArrayTableColumns(),this.typeObject,this.aliasObject,
				this.additionalParamsAndValuesOnRequestTable,this.onclose,this.drawTableOnTop,
				this.initialLineNumbersTable,this.visibleButtonsTable,this.deleteAndEditButtonsOnTable,
				this.tableOnNewTab,this.onRead
				);
		this.showElementsForm('rockerForm');
		this.drawElementsTable();
		this.drawAppenderGenerateCodeWhitElementsTable();
	};
	
	this.draw();
	singletonRockerVisualCoder = this;
	
	
	
	this.saveObject = function(id,object){
		singletonRockerStorage.storeVisualCodeObject(id,object);
		this.drawElementsTable();
	};
	
	this.editObject = function(id){
		var comp = singletonRockerStorage.getVisualCodeObject(id);
		this.drawElementsForm(comp[1],comp);
		singletonRockerStorage.selectFormTabForm('f_appender9');
	};
	
	this.removeObject = function(id){
		var comp = singletonRockerStorage.getVisualCodeObject(id);
		if(!confirm('Remove the element {' + comp[1] + ',' + comp[2] + '} ?')){
			return;
		}
		this.saveObject(id,null);
		this.drawElementsForm('appender',null);
	};
	
	this.generateRockerCode = function(){
		var comps = singletonRockerStorage.getVisualCoderStorage(0,0);
		if(null!=comps){
			var generatedCode = '';
			if(this.codeType == 'rockerForm'){
				generatedCode = new RockerFormTemplate().generateRockerFormCode(comps);
			}else{
				generatedCode = new RockerTableTemplate().generateRockerTableCode(comps);
			}
			if(null!=generatedCode){
				if(singletonRockerCommons.createAppenderBeforeOf(this.idAppenderForm,'appenderGeneratedCode')){
					var onclose = 'singletonRockerCommons.removeAppenderBeforeOf(\'appenderGeneratedCode\');';
					new RockerCodeForm('appenderGeneratedCode', generatedCode,onclose,this.fileTitle);
				}
			}
		}
	};
	
};











