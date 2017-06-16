/**
//==================================================================
//BaseElement: all elements extends of this
//==================================================================
*/
var BaseElement = function(){
	this.name = "";
	this.type = "";
	this.typeAux = "";
	this.validationMsg = "";
	this.horizontalAlignFields = false;
	this.validated = true;
	this.usingCompletation = false;
	this.disableValidationClass = "rockerInputDisabled ui-corner-all";
	this.normalValidationClass = "rockerInput ui-corner-all";
	this.validationErrorClass = "rockerInputError ui-corner-all";
	this.idToClasserValidate = "";
	this.bootstrapClass = "col";
	this.bootstrapNewLine = false;
	this.setValidationClass = function(validated){
		if((null!=this.idToClasserValidate && this.idToClasserValidate != '')
			&& (null!=this.normalValidationClass && this.normalValidationClass != '')
			&& (null!=this.validationErrorClass && this.validationErrorClass != '')){
			if(validated == true || validated == 'true'){
				singletonRockerCommons.setClass(this.idToClasserValidate,this.normalValidationClass);
			}else if(validated == false || validated == 'false'){
				singletonRockerCommons.setClass(this.idToClasserValidate,this.validationErrorClass);
			}
		}
	};
	this.getOpenBootstrapCol = function(){
		var inner = '';
		if(this.bootstrapNewLine){
			inner += '</div><div class="row">';
		}
		inner += '<div class="rockerFieldContainer ' + this.bootstrapClass + '">';
		return inner;
	};
	this.getCloseBootstrapCol = function(){
		var inner = '</div>';
		return inner;
	};
	this.makeField = function(horizontalAlignFields){
		this.horizontalAlignFields = horizontalAlignFields;
		return this.generateDrawContent();
	};
	this.generateDrawContent = function(){
		return "";
	};
	this.validateBuild = function(){
		return this.triggerValidationMsg();
	};
	this.triggerValidationMsg = function(){
		if(this.validationMsg!=''){
			alert('Hey ... this element require following attributes:' + this.validationMsg);
			this.validationMsg = '';
			return false;
		}
		return true;
	};
	this.validateInput = function(value){
		this.validated = true;
		this.validationMsg = '';
	};
};
/**
//==============================================================================
//Creates a internal DIV appender element, to add a new element on execution time
//==============================================================================
*/
var Appender = function (id,style,clazz,onclick,position,newTabTitle,arrayFields,bootstrapClass,bootstrapNewLine) {
	this.id = id;
	this.style = style;
	this.clazz = clazz;
	this.type = "appender";
	this.position = position;
	this.arrayFields = (null!=arrayFields ? arrayFields : new Array());
	this.newTabTitle = (null!=newTabTitle && newTabTitle!='') ? newTabTitle : null;
	this.onclick = (null!=onclick && onclick != '') ? onclick : '';
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
};
Appender.prototype = new BaseElement();
Appender.prototype.constructor = Appender;
Appender.prototype.generateDrawContent = function(){
	var inner = this.getOpenBootstrapCol();
	inner += '<div id="'+ this.id +'" style="'+ this.style +'" class="'+ this.clazz +'" onclick="'+ this.onclick +'">';
	inner += this.generateInternalFields();
	inner += '</div>';
	inner += this.getCloseBootstrapCol();
	return inner;
};
Appender.prototype.generateInternalFields = function(){
	var inner = '';
	var size = (null!=this.arrayFields) ? this.arrayFields.length : 0;
	if(size > 0){
		inner += '<div class="container-fluid">';
		inner += '<div class="row">';
		for(var i = 0; i < size; i++){
			inner += this.arrayFields[i].makeField(this.horizontalAlignFields);
		}
		inner += '</div>';
		inner += '<div style="clear: both;"></div>';
		inner += '</div>';
	}
	return inner;
};
/**
//==============================================================================
//Creates a internal CSS appender element, to add a new Style on execution time
//==============================================================================
*/
var Styler = function (classNames,styles) {
	this.classNames = classNames;
	this.styles = styles;
	this.type = "styler";
};
Styler.prototype = new BaseElement();
Styler.prototype.constructor = Styler;
Styler.prototype.generateDrawContent = function(){
	var inner = '<style>';
	var size = this.classNames.length;
	for(var i = 0; i < size; i++){
		if(null!=this.classNames[i] && this.classNames[i] != ''){
			inner += this.classNames[i] + '{';
			inner += (null!=this.styles[i] ? this.styles[i] : '');
			inner += '}';
		}
	}
	inner += '</style>';
	return inner;
};
/**
//==============================================================================
//Creates a Hidden input
//==============================================================================
*/
var Hidden = function (name,value) {
	this.name = name;
	this.value = value;
	this.type = "hidden";
};
Hidden.prototype = new BaseElement();
Hidden.prototype.constructor = Hidden;
Hidden.prototype.validateBuild = function(){
	if(null==this.name || this.name==''){
		this.validationMsg += '\n  Name of element Hidden is required!';
	}
	return this.triggerValidationMsg();
};
Hidden.prototype.generateDrawContent = function(){
	var inner = '';
	if(this.validateBuild()){
		inner += '<input type="hidden" id="'+ this.name + '" name="'+ this.name + '" ';
		inner += ' value="' + this.value + '" ';
		inner += '/>';
	}
	return inner;
};
/**
//==============================================================================
//Creates a Line Break element
//==============================================================================
*/
var Spacer = function (height,hexColorCode,bootstrapClass,bootstrapNewLine) {
	this.type = "hidden";
	this.height = ((null!=height && height > 0) ? height : 0);
	this.hexColorCode = (null!=hexColorCode) ? hexColorCode : '';
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
};
Spacer.prototype = new BaseElement();
Spacer.prototype.constructor = Spacer;
Spacer.prototype.generateDrawContent = function(){
	var inner = this.getOpenBootstrapCol();
	inner += '<div style="';
	if(this.height > 0 && this.hexColorCode != ''){
		inner += 'clear: both; margin: 0.6em;';
	}
	if(this.height > 0){
		inner += 'height: ' + this.height + 'px; ';
	}
	if(this.hexColorCode != ''){
		inner += 'background-color: #' + this.hexColorCode + ';';
	}
	inner += '" ></div>';
	inner += this.getCloseBootstrapCol();
	return inner;
};
/**
//==============================================================================
//Creates a Button
//==============================================================================
*/
var Button = function (id,value,onclick,style,bootstrapClass,bootstrapNewLine) {
	this.id = id;
	this.value = value;
	this.onclick = onclick;
	this.style = style;
	this.type = "button";
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
};
Button.prototype = new BaseElement();
Button.prototype.constructor = Button;
Button.prototype.generateDrawContent = function(){
	var inner = this.getOpenBootstrapCol();
	inner += '<input id="'+ this.id +'" class="ui-button ui-widget ui-corner-all" style="';
	inner += this.style +'" type="button" value="'+ this.value +'" onclick="'+ this.onclick +'" />';
	inner += this.getCloseBootstrapCol();
	return inner;
};
/**
//==============================================================================
// Creates a Label
//==============================================================================
*/
var Label = function (value,lineBreaks,bootstrapClass,bootstrapNewLine) {
	this.name = 'rockerLabel_' + new Date().getTime();
	this.value = value;
	this.type = "hidden";
	this.lineBreaks = (null!=lineBreaks && lineBreaks > 0) ? lineBreaks : 0;
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
};
Label.prototype = new BaseElement();
Label.prototype.constructor = Label;
Label.prototype.validateBuild = function(){
	if(null==this.value || this.value==''){
		this.validationMsg += '\n  Label value attribute is required!';
	}
	return this.triggerValidationMsg();
};
Label.prototype.generateDrawContent = function(){
	var inner = '';
	if(this.validateBuild()){
		inner += this.getOpenBootstrapCol();
		inner += '<input type="hidden" name="'+ this.name + '" value="" />';
		inner += '<span class="rockerContainer" ';
		if(this.horizontalAlignFields){
			inner += 'style="float: left;" ';
		}
		inner += ' >';
		inner += '<span class="rockerLabel">' + this.value + '</span>';
		inner += '</span>';
		if(this.lineBreaks > 0){
			for(var i = 0; i < this.lineBreaks; i++){
				inner += '<br/>' ;
			}
		}
		inner += this.getCloseBootstrapCol();
	}
	return inner;
};
/**
//==============================================================================
// Creates a input type text
//==============================================================================
*/
var InputText = function (label,name,defaultValue,width,validator,placeHolder,
											disabled,bootstrapClass,bootstrapNewLine) {
	this.id = name;
	this.label = label;
	this.name = name;
	this.type = "text";
	this.typeInput = "text";
	this.value = defaultValue;
	this.width = (null!=width && width > 0) ? (' width: ' + width + 'px;') : '';
	this.validator = validator;
	this.placeHolder = ((null!=placeHolder && placeHolder!='') ? placeHolder : null);
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
	this.idToClasserValidate = this.id;
	this.disabled = ((null!=disabled &&(disabled == true || disabled == 'true')) ? true : false);
	this.adjustValueOnKeyUp = function(value){
		var adjustedValue = value;
		if(null!=this.validator){
			adjustedValue = this.validator.adjustValue(value);
		}
		return adjustedValue;
	};
	singletonRockerStorage.storeJsInputText(this.id,this);
};
InputText.prototype = new BaseElement();
InputText.prototype.constructor = InputText;
InputText.prototype.validateBuild = function(){
	if(null==this.label || this.label==''){
		this.validationMsg += '\n  Label of InputText is required!';
	}
	if(null==this.name || this.name==''){
		this.validationMsg += '\n  Name of InputText is required!';
	}
	return this.triggerValidationMsg();
};
InputText.prototype.generateDrawContent = function(){
	var inner = '';
	if(this.validateBuild()){
		inner += this.getOpenBootstrapCol();
		inner += '<span class="rockerContainer" ';
		if(this.horizontalAlignFields){
			inner += 'style="float: left;" ';
		}
		inner += ' >';
		inner += '<span class="rockerLabel">' + this.label + '</span>';
		inner +=  (!this.horizontalAlignFields ? '<br/>' : '');
		inner += '<div>';
		inner +=  '<input type="'+ this.typeInput +'" id="'+ this.id + '" name="'+ this.name + '"';
		inner += ' value="'+ this.value + '" '; 
		if(this.disabled){
			inner +=  ' class="rockerInputDisabled ui-corner-all" ';
			inner += ' onkeydown="return false;" ';
		}else{
			inner +=  ' class="rockerInput ui-corner-all" ';
			inner += ' onkeyup="singletonRockerCommons.setAdjustedValueIfNeeded(this.id,this.value);" ';
		}
		if(null!=this.validator && this.validator.textAlign == 'right'){
			inner += ' style="text-align: right; padding-right: 8px;' + this.width + '" ';
		}
		else{
			inner += ' style="text-align: left; padding-left: 8px;' + this.width + '" ';
		}
		if(null!=this.placeHolder){
			inner += ' placeholder="';
			inner += this.placeHolder;
			inner += '" ';
		}else if(null!=this.validator && this.validator.placeHolderMask){
			inner += ' placeholder="';
			inner += this.validator.getPlaceHolderMask();
			inner += '" ';
		}
		inner +=  ' />';
		inner += '</div>';
		inner += '</span>';
		inner += this.getCloseBootstrapCol();
	}
	return inner;
};
InputText.prototype.validateInput = function(value){
	this.validated = true;
	this.setValidationClass(true);
	if(this.disabled || null==this.validator){
		return;
	}
	this.validationMsg = '';
	this.validated = this.validator.validateMinLenght(value);
	if(!this.validated){
		this.validationMsg = singletonRockerI18n.getMessage('InputText.inputMinChars',[this.label,this.validator.minLenght]);
		this.setValidationClass(false);
	}else{
		if(!this.validator.validate(value)){
			this.validationMsg = this.validator.getValidationMessage();
			this.validated = false;
			this.setValidationClass(false);
		}
	}
};
/**
//==============================================================================
// Creates a TextArea
//==============================================================================
*/
var TextArea = function (label,name,defaultValue,cols,rows,width,validator,usingCompletation,
		richEditor,readonly,placeHolder,bootstrapClass,bootstrapNewLine) {
	this.id = name + '_txtArea';
	this.label = label;
	this.name = name;
	this.type = "textarea";
	this.value = (null!=defaultValue) ? defaultValue : '';
	this.cols = ((null!=cols && cols > 9) ? cols : 10);
	this.rows = ((null!=rows && rows > 2) ? rows : 3);
	this.usingCompletation = ((null!=usingCompletation && (usingCompletation == true || usingCompletation == 'true')) ? true : false);
	this.width = (null!=width && width > 0) ?  width : ((this.usingCompletation) ? 100 : '');
	this.validator = validator;
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
	this.placeHolder = ((null!=placeHolder && placeHolder!='') ? placeHolder : '');
	this.readonly = ((null!=readonly && (readonly == true || readonly == 'true')) ? true : false);;
	this.richEditor = ((null!=richEditor && (richEditor == true || richEditor == 'true')) ? true : false);
	this.atualLength = 0;
	this.oldLength = 0;
	this.oldValue = '';
	if(null==this.validator || (this.validator.minLenght < 1 && this.validator.maxLenght < 1)){
		this.usingCompletation = false;
	}
	this.idToClasserValidate = this.id;
	this.adjustValueOnKeyUp = function(value){
		var adjustedValue = value;
		if(null!=this.validator){
			adjustedValue = this.validator.adjustValue(value);
		}
		this.atualLength = adjustedValue.length;
		return adjustedValue;
	};
	this.adjustValueOnKeyUpRichEditor = function(ckEditor){
		var text = ckEditor.getData();
		if(text != ''){
			var needChange = false;
			var ecom = '&';
			var ecomTag = '<ecomTag>';
			var pBegin = '<p>';
			var pEnd = '</p>';
			var blankspace = '&nbsp;';
			var txtNew = '';
			var arr = text.split(pBegin);
			var totChars = 0;
			for(var i = 0; i < arr.length; i++){
				var str = arr[i];
				if(str != ''){
					var idx = str.lastIndexOf(pEnd);
					if(idx!=-1){
						str = str.substring(0,idx);
					}
					var len = str.length;
					var idx2 = str.lastIndexOf(blankspace);
					if(str != blankspace){
						var strAdjusted = '';
						if(null!=this.validator){
							var ignoreCountingOnAdjustValue = this.validator.ignoreCountingOnAdjustValue;
							this.validator.ignoreCountingOnAdjustValue = true;
							str = singletonRockerCommons.replaceAll(str,ecom, ecomTag);
							strAdjusted = this.adjustValueOnKeyUp(str);
							
							this.validator.ignoreCountingOnAdjustValue = ignoreCountingOnAdjustValue;
							str = singletonRockerCommons.replaceAll(str,ecomTag,ecom);
							strAdjusted = singletonRockerCommons.replaceAll(strAdjusted,ecomTag,ecom);
							if(strAdjusted != str){
								needChange = true;
							}
							var totalizerChars = singletonRockerCommons.replaceAll(strAdjusted,blankspace,' ');
							totChars += singletonRockerCommons.trim(totalizerChars).length;
						}
						if(singletonRockerCommons.trim(strAdjusted) != ''){
							txtNew +=  singletonRockerCommons.trim(strAdjusted);
							
						}
						if(idx2 != -1){
							if(idx2 == (len - 6)){
								txtNew += blankspace; 
							}
						}
					}
				}
			}
			this.atualLength = totChars;
			if(null!=this.validator && this.validator.maxLenght > 0 && ((this.atualLength > this.validator.maxLenght))){
				this.atualLength = this.oldLength;
				var thisThis = this;
				ckEditor.setData('',function(){ ckEditor.insertHtml(thisThis.oldValue);});
			}else {
				this.oldValue = txtNew;
				this.oldLength = this.atualLength;
				if(needChange){
					ckEditor.setData('',function(){ ckEditor.insertHtml(txtNew);});
				}
			}
		}else{
			this.atualLength = 0;
		}
		singletonRockerStorage.generateCompletationDataRichEditor(this.id,this.width,10);
	};
	this.removeHtmls = function(value){
		value = value.replace(/<.*?>/gi,'');
		value = value.replace(/<.*\/.*?>/gi,'');
		return value;
	};
	singletonRockerStorage.storeJsInputText(this.id,this);
};
TextArea.prototype = new BaseElement();
TextArea.prototype.constructor = TextArea;
TextArea.prototype.validateBuild = function(){
	if(null==this.label || this.label==''){
		this.validationMsg += '\n  Label of TextArea is required!';
	}
	if(null==this.name || this.name==''){
		this.validationMsg += '\n  Name of TextArea is required!';
	}
	return this.triggerValidationMsg();
};
TextArea.prototype.generateDrawContent = function(){
	var inner = '';
	if(this.validateBuild()){ 
		inner += this.getOpenBootstrapCol();
		inner += '<span class="rockerContainer" id="container_' + this.id + '" ';
		if(this.horizontalAlignFields){
			inner += 'style="float: left;" ';
		}
		inner += ' >';
		inner += '<span class="rockerLabel">';
		inner += this.label + '</span>';
		inner += (!this.horizontalAlignFields ? '<br/>' : '');
		if(this.readonly){
			inner += '<input type="hidden" id="' + this.id + '" name="'+ this.name + '" value="" />';
			inner += '<div id="' + this.id + '_display" class="rockerInputDisabled ui-corner-all" ';
			inner += ' style="width: ' + this.width + 'px; height: ' + (this.rows * 15) + 'px; overflow-x: hidden; overflow-y: auto; clear: both;" ';
			inner += '></div>';
		}else{
			inner += '<textarea id="'+ this.id + '" name="'+ this.name + '"';
			inner += ' rows="' + this.rows + '" cols="' + this.cols + '" ';
			inner += ' style="width: ' + this.width + 'px;'+ (this.richEditor ? ' display: none;' : '' ) + '"';
			if(this.placeHolder != ''){
				inner += ' placeholder="' + this.placeHolder + '" ';
			}
			inner += ' onkeyup="singletonRockerCommons.setAdjustedValueIfNeeded(this.id,this.value);';
			if(this.usingCompletation){
				inner += ' singletonRockerStorage.generateCompletationData(this.id,this.value,' + this.width + ',10);';
			}
			inner += '" class="rockerInput ' + ((this.richEditor || !this.usingCompletation) ? 'ui-corner-all' : 'ui-corner-top') + '" ';
			inner += '>' + this.value + '</textarea>';
			if(this.richEditor){
				inner += '<div id="divAppenderRichEditor_'+  this.id +'" style="width: ' + (this.width) + 'px; margin: 0px;"></div>';
			}
			if(this.usingCompletation){
				if(this.richEditor){
					inner += '<div id="div_completationData_'+ this.id +'" style="';
					inner += 'width: ' + (this.width);
					inner += 'px;" class="rockerCompletationRichContainer ui-widget-header ui-corner-bottom"></div>';
				}else{
					inner += '<div id="div_completationData_'+ this.id +'" style="';
					inner += 'width: ' + (this.width);
					inner += 'px;" class="rockerCompletationContainer ui-widget-header"></div>';
				}
			}
		}
		inner += '</span>';
		if(this.usingCompletation){
			inner += '<div style="clear: both;"></div>';
		}
		inner += this.getCloseBootstrapCol();
	}
	return inner;
};
TextArea.prototype.validateInput = function(value){
	this.validated = true;
	this.validationMsg = '';
	if(null!=this.validator){
		this.validated = this.validator.validateMinLenght((this.richEditor ? this.removeHtmls(value) : value));
	}
	if(!this.validated){
		this.validationMsg = singletonRockerI18n.getMessage('InputText.inputMinChars',[this.label,this.validator.minLenght]);
		this.setValidationClass(false);
	}else{
		this.setValidationClass(true);
	}
};
/**
//==============================================================================
//Creates a Radio Button Group input
//==============================================================================
*/
var RadioGroup = function (label,name,arrayLabels,arrayValues,defaultValue,nullable,bootstrapClass,bootstrapNewLine) {
	this.id = name + '_' + new Date().getTime();
	this.label = label;
	this.name = name;
	this.type = "radio";
	this.value = defaultValue;
	this.arrayLabels = ((null!=arrayLabels) ? arrayLabels : new Array());
	this.arrayValues = ((null!=arrayValues) ? arrayValues : new Array());
	this.nullable = (null!=nullable && (nullable == true || nullable == 'true')) ? true : false;
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
	this.idToClasserValidate = this.id;
	this.disableValidationClass = "rockerFieldsetDisabled ui-corner-all";
	this.normalValidationClass = "rockerFieldset ui-corner-all";
	this.validationErrorClass = "rockerFieldsetError ui-corner-all";
	this.setValue = function(value){
		var size = this.arrayValues.length;
		for(var i = 0; i < size; i++){
			if(singletonRockerCommons.trim('' + value) 
				== singletonRockerCommons.trim('' + this.arrayValues[i])){
				singletonRockerCommons.getElement(this.name + '_' + i).checked = true;
			}else{
				singletonRockerCommons.getElement(this.name + '_' + i).checked = false;
			}
		}
	};	
};
RadioGroup.prototype = new BaseElement();
RadioGroup.prototype.constructor =RadioGroup;
RadioGroup.prototype.validateBuild = function(){
	if(null==this.label || this.label==''){
		this.validationMsg += '\n  Label of RadioGroup is required!';
	}
	if(null==this.name || this.name==''){
		this.validationMsg += '\n  Name of RadioGroup is required!';
	}
	if(this.arrayValues.length < 2){
		this.validationMsg += '\n  RadioGroup need 2 or more values!';
	}
	if(this.arrayLabels.length < 2){
		this.validationMsg += '\n  RadioGroup need a label for each value!';
	}
	return this.triggerValidationMsg();
};
RadioGroup.prototype.generateDrawContent = function(){
	var inner = '';
	if(this.validateBuild()){
		inner += this.getOpenBootstrapCol();
		inner += '<span class="rockerContainer" ';
		if(this.horizontalAlignFields){
			inner += 'style="float: left;" ';
		}
		inner += ' >';
		inner += '<span class="rockerLabel">' + this.label + '</span>';
		inner += '<br/>' ;
		inner += '<div id="'+ this.idToClasserValidate +'" class="rockerFieldset ui-corner-all">';
		var size = this.arrayValues.length;
		var hasChecked = false;
		for(var i = 0; i < size; i++){
			inner +=  ((!this.horizontalAlignFields &&  i > 0) ? '<br/>' : (i > 0 ? '&nbsp;&nbsp;' : ''));
			inner +=  '<input type="radio" name="'+ this.name + '"';
			inner += ' value="'+ this.arrayValues[i] + '" ';
			inner += ' id="'+ (this.name + '_' + i) + '" ';
			if(!hasChecked && this.arrayValues[i] == this.value ){
				hasChecked = true;
				inner += ' checked="checked" ';
			}
			inner +=  ' style="float: left;" />';
			inner += '<span class="rockerLabel" style="margin-left: 3px;">' + this.arrayLabels[i] + '</span>';
		}
		inner += '<div style="clear: both;"></div>';
		inner += '</div>';
		inner += '</span>';
		inner += this.getCloseBootstrapCol();
	}
	return inner;
};
RadioGroup.prototype.validateInput = function(){
	this.validated = true;
	this.validationMsg = '';
	if(!this.nullable){
		var hasChecked = false;
		var size = this.arrayValues.length;
		for(var i = 0; i < size; i++){
			var idRadioOption = (this.name + '_' + i);
			if(singletonRockerCommons.checked(idRadioOption)){
				hasChecked = true;
				break;
			}
		}
		this.validated = hasChecked;
	}
	if(!this.validated){
		this.validationMsg = singletonRockerI18n.getMessage('RadioGroup.radioSelectOne',[this.label]);
		this.setValidationClass(false);
	}else{
		this.setValidationClass(true);
	}
};
/**
//==============================================================================
// Creates a Checkbox group
//==============================================================================
*/
var CheckGroup = function (label,name,arrayCheckLabels,arrayCheckNames,arrayCheckCheckeds,minChecks,bootstrapClass,bootstrapNewLine) {
	this.id = name + '_' + new Date().getTime();
	this.name = name;
	this.label = label;
	this.type = "checkbox";
	this.arrayCheckNames = ((null!=arrayCheckNames) ? arrayCheckNames : new Array());
	this.arrayCheckLabels = ((null!=arrayCheckLabels) ? arrayCheckLabels : new Array());
	this.arrayCheckCheckeds = ((null!=arrayCheckCheckeds) ? arrayCheckCheckeds : new Array());
	this.minChecks = ((null!=minChecks && minChecks > 0) ? minChecks : -1);
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
	this.idToClasserValidate = this.id;
	this.disableValidationClass = "rockerFieldsetDisabled ui-corner-all";
	this.normalValidationClass = "rockerFieldset ui-corner-all";
	this.validationErrorClass = "rockerFieldsetError ui-corner-all";
	this.setValues = function(arrayValues){
		var size = this.arrayCheckNames.length;
		for(var i = 0; i < size; i++){
			singletonRockerCommons.getElement(this.name + '_' + i).checked = false;
		}
		if(null==arrayValues || arrayValues.length == 0 || arrayValues.length != size){
			return;
		}
		for(var i = 0; i < size; i++){
			singletonRockerCommons.getElement(this.name + '_' + i).checked 
						= (null!=arrayValues[i] && (arrayValues[i] == true || arrayValues[i] == 'true'));
		}
	};
};
CheckGroup.prototype = new BaseElement();
CheckGroup.prototype.constructor = CheckGroup;
CheckGroup.prototype.validateBuild = function(){
	if(null==this.name || this.name==''){
		this.validationMsg += '\n  Name of CheckGroup is required!';
	}
	if(null==this.label || this.label==''){
		this.validationMsg += '\n  Label of CheckGroup is required!';
	}
	if(this.arrayCheckLabels.length < 1){
		this.validationMsg += '\n  CheckGroup need 1 or more values!';
	}
	if(this.arrayCheckNames.length == 0 || this.arrayCheckNames.length != this.arrayCheckLabels.length){
		this.validationMsg += '\n  CheckGroup need one name for each value!';
	}
	return this.triggerValidationMsg();
};
CheckGroup.prototype.generateDrawContent = function(){
	var inner = '';
	if(this.validateBuild()){
		inner += this.getOpenBootstrapCol();
		inner += '<span class="rockerContainer" ';
		if(this.horizontalAlignFields){
			inner += 'style="float: left;" ';
		}
		inner += ' >';
		inner += '<span class="rockerLabel">' + this.label + '</span>';
		inner += '<br/>' ;
		inner += '<div id="'+ this.idToClasserValidate +'" class="rockerFieldset ui-corner-all">';
		var size = this.arrayCheckLabels.length;
		for(var i = 0; i < size; i++){
			inner +=  ((!this.horizontalAlignFields &&  i > 0) ? '<br/>' : (i > 0 ? '&nbsp;&nbsp;' : ''));
			var labelV = this.arrayCheckLabels[i];
			var nameC = this.arrayCheckNames[i];
			var isChecked = ( (null!=this.arrayCheckCheckeds[i] && (this.arrayCheckCheckeds[i] == 'true' || this.arrayCheckCheckeds[i] == true) ) ? true : false);
			inner +=  '<input id="'+ this.name + '_' + i +'" type="checkbox" name="'+ nameC + '"';
			inner += ' value="'+ labelV + '" ';
			if(isChecked){
				inner += ' checked="checked" ';
			}
			inner += ' style="float: left;" />';
			inner += '<span class="rockerLabel" style="margin-left: 3px;">' + labelV + '</span>';
		}
		inner += '<div style="clear: both;"></div>';
		inner += '</div>';
		inner += '</span>';
		inner += this.getCloseBootstrapCol();
	}
	return inner;
};
CheckGroup.prototype.validateInput = function(form){
	this.validated = true;
	this.validationMsg = '';
	var minCheckeds = 0;
	if(this.minChecks > 0){
		this.validated = false;
		var countChecks = 0;
		var size = this.arrayCheckLabels.length;
		minCheckeds = ((this.minChecks > (size - 1)) ? (size -1) : this.minChecks); 
		for(var i = 0; i < size; i++){
			var checked = form.elements[this.arrayCheckNames[i]].checked;
			if(checked){
				countChecks ++;
			}
		}
		if(countChecks >= minCheckeds){
			this.validated = true;
		}
	}
	if(!this.validated){
		this.validationMsg = singletonRockerI18n.getMessage('CheckGroup.minChecks',[this.label,minCheckeds]);
		this.setValidationClass(false);
	}else{
		this.setValidationClass(true);
	}
};
/**
//==============================================================================
// Creates a Combobox / Select
//==============================================================================
*/
var Select = function (label,name,arrayLabels,arrayValues,defaultValue,canBeEmpty,
						width,onchange,onclick,disabled,bootstrapClass,bootstrapNewLine) {
	this.id = name; 
	this.label = label;
	this.name = name;
	this.type = "select";
	this.value = defaultValue;
	this.arrayValues = ((null!=arrayValues) ? arrayValues : new Array());
	this.arrayLabels = ((null!=arrayLabels) ? arrayLabels : new Array());
	this.canBeEmpty = (null!=canBeEmpty &&(canBeEmpty == true || canBeEmpty == 'true')) ? true : false;
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
	this.onchange = ((null!=onchange && onchange!='') ? onchange : '');
	this.width = (null!=width && width > 1) ? width : null;
	this.onclick = ((null!=onclick && onclick!='') ? onclick : '');
	this.disabled = (null!=disabled &&(disabled == true || disabled == 'true')) ? true : false;
	this.idToClasserValidate = 'div_' + this.id;
};
Select.prototype = new BaseElement();
Select.prototype.constructor = Select;
Select.prototype.validateBuild = function(){
	if(null==this.label || this.label==''){
		this.validationMsg += '\n  Label of Select is required!';
	}
	if(null==this.name || this.name==''){
		this.validationMsg += '\n  Name of Select is required!';
	}
	if(this.arrayValues.length < 1){
		this.validationMsg += '\n  Select need one or more selection values!';
	}
	return this.triggerValidationMsg();
};
Select.prototype.generateDrawContent = function(){
	var inner = '';
	if(this.validateBuild()){
		inner += this.getOpenBootstrapCol();
		inner += '<span class="rockerContainer" ';
		if(this.horizontalAlignFields){
			inner += 'style="float: left;" ';
		}
		inner += ' >';
		inner += '<span class="rockerLabel">' + this.label + '</span>';
		inner += (!this.horizontalAlignFields ? '<br/>' : '');
		inner += '<div id="'+ this.idToClasserValidate + '"  class="' + (this.disabled ? 'rockerInputDisabled' : 'rockerInput') + ' ui-corner-all"';
		inner += ' style="display: inline; float: left;" >';
		inner += '<select id="'+ this.id  +'" name="'+ this.name + '" ';
		if(null!=this.onchange && this.onchange != ''){
			inner += ' onchange="' + this.onchange + '" ';
		}
		if(null!=this.onclick && this.onclick != ''){
			inner += ' onclick="' + this.onclick + '" ';
		}
		if(this.disabled){
			inner += ' disabled="disabled" ';
			if(null!=this.width && this.width != '' && this.width > 0){
				inner += ' style="width: ' + (this.width -1) + 'px;" ';
			}else{
				inner += ' style="background-color: #ddb;" ';
			}
		}else if(null!=this.width && this.width != '' && this.width > 0){
			inner += ' style="width: ' + (this.width -1) + 'px;" ';
		}
		inner += '>';
		var innerOptions = '';
		var innerOptionsEmpty = '';
		var size = this.arrayValues.length;
		var valueSelect = '';//- Select -
		var hasEmpty = false;
		for(var i = 0; i < size; i++){
			var valueV = this.arrayValues[i];
			var labelV = '';
			var hasLabel = (null!=this.arrayLabels[i] && this.arrayLabels[i] != '');
			if(valueV != '' && valueV.length > 0 ){
				labelV = (hasLabel ? this.arrayLabels[i] : valueV) ;
			}else if(this.aceitarEmBranco){
				labelV = (hasLabel ? this.arrayLabels[i] : '');
			}else{
				labelV = valueSelect;
			}
			if(labelV == ''){
				hasEmpty = true;
			}
			var innerOption = '';
			innerOption +=  '<option value="'+ valueV + '"';
			if(valueV == this.value){
				innerOption += ' selected="selected" ';
			}
			innerOption +=  ' >';
			innerOption += labelV;
			innerOption += '</option>';
			if(labelV == valueSelect || labelV == ''){
				innerOptionsEmpty = innerOption;
			}else{
				innerOptions += innerOption;
			}
		}
		if(this.disabled){
			innerOptions = '<option value="" selected="selected"></option>';
		}else{
			innerOptions = (innerOptionsEmpty + innerOptions);
		}
		if(this.canBeEmpty && !this.disabled && !hasEmpty){
			inner += '<option value=""></option>';
		}
		inner += innerOptions;
		inner += '</select>';
		inner += '</div>';
		inner += '</span>';
		inner += this.getCloseBootstrapCol();
	}
	return inner;
};
Select.prototype.validateInput = function(value){
	this.validated = true;
	if(this.disabled){
		this.setValidationClass(true);
		return;
	}
	this.validationMsg = '';
	if(!this.canBeEmpty && !(value.length > 0)){
		this.validated = false;
		this.validationMsg = singletonRockerI18n.getMessage('Select.selectSelectOne',[this.label]);
		this.setValidationClass(false);
	}else{
		this.setValidationClass(true);
	}
};
/**
//==============================================================================
// Creates an File Uploader
//==============================================================================
*/
var UpperFile = function (id,label,value,width,height,appenderId,actionBaseForm,titleUploaderForm,top,left,
								hideInputField,validExtensions,onbeforeOpen,bootstrapClass,bootstrapNewLine) {
	this.id = id;
	this.shadowId = 'shadowMask_upper_' + this.id;
	this.name = id;
	this.label = label;
	this.value = value;
	this.width = ((null!=width && width >= 150) ? width : 150);
	this.height = ((null!=height && height >= 150) ? height : 150);
	this.appenderId = appenderId;
	this.actionBaseForm = actionBaseForm;
	this.actionUpload = actionBaseForm + '/upload';
	this.actionUploadResult = actionBaseForm + '/uploadResult';
	this.formId = singletonRockerCommons.generateRandomString();
	this.titleUploaderForm = (null!=titleUploaderForm && titleUploaderForm != '') 
						?  titleUploaderForm : singletonRockerI18n.getMessage('UpperFile.upperDefaultTitle',null);
	this.top = ((null!=top && top >= 0) ? top : 0);
	this.left = ((null!=left && left >= 0) ? left :  ((window.innerWidth - 500) / 2));
	this.type = "text";
	this.typeAux = "image";
	this.hideInputField = ((null!=hideInputField && (hideInputField == true || hideInputField == 'true')) ? true : false);
	this.validExtensions = (null!=validExtensions && validExtensions.length > 0) ? validExtensions : new Array();
	this.onbeforeOpen = (null!=onbeforeOpen) ? onbeforeOpen : '';
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
	this.onclick = this.onbeforeOpen + ' singletonRockerStorage.generateInnerFormUpLoad(\'' + this.id + '\');';
	this.uploadSended = false;
	singletonRockerStorage.storeJsInputText(this.id,this);
};
UpperFile.prototype = new BaseElement();
UpperFile.prototype.constructor = UpperFile;
UpperFile.prototype.generateDrawContent = function(){
	var inner = '';
	inner += this.getOpenBootstrapCol();
	inner += '<div class="rockerContainer ui-widget-content ui-corner-all" style="width: '+ (this.width) +'px; height: ' + (this.height) + 'px; float: left;">';
	inner += '<div style="clear: both;"></div>';
	inner += '<div class="rockerLabel ui-widget-header ui-corner-top" style="padding: 3px; width: 100%; margin-top: -1px;">&nbsp;' + this.label + '</div>';
	inner += '';
	inner += '<div id="imagePanel_'+ this.id +'" style="width: 100%; height: ' + (this.height - 37);
	inner += 'px; margin: 0px;" class="rockerInputDisable" >';
	inner += '';
	inner += '</div>';
	inner += '<div  class="ui-widget ui-widget-header ui-corner-bottom" >';
	inner += '<input type="hidden" id="checker_'+ this.id +'" name="checker_'+ this.id +'" value="" />';
	inner += '<input id="'+ this.id + '" name="'+ this.id + '" ';
	inner += ' type="text" style="width: '+ (((this.width/3) - 10) * 2) +'px; margin:  4px  4px  6px  4px;" ';
	if(this.hideInputField){
		inner += ' class="rockerInput ui-corner-all" ';
	}else{
		inner += ' class="rockerInputDisabled ui-corner-all" onkeydown="return false;" ';
	}
	inner += ' value="' + this.value +'" />';
	//
	inner += '<input style="font-size: 11px; font-family: verdana; margin-top: -4px;" ';
	var uploadUploadForm = singletonRockerI18n.getMessage('UpperFile.uploadUploadForm',null);
	inner += ' class="ui-button ui-corner-all" type="button" value="' + uploadUploadForm + '" onclick="'+ this.onclick +'" />';
	inner += '<div style="clear: both;"></div>';
	inner += '</div>';
	inner += '<div style="clear: both;"></div>';
	inner += '</div>';
	inner += this.getCloseBootstrapCol();
	return inner;
};
UpperFile.prototype.adjustUrl = function(value){
	if(!((value.indexOf('https://') == 0) || (value.indexOf('http://') == 0))){
		value = this.actionBaseForm + value;
	}
	var prefix = '';
	if((value.indexOf('https://') == 0) || (value.indexOf('http://') == 0)){
		var idx = (value.indexOf('//') != -1) ? (value.indexOf('//') + 2) : null;
		if(null!=idx){
			prefix = value.substring(0,idx);
			value = value.substring(idx);
		}
	}
	value = singletonRockerCommons.replaceAll(value,'\\','/');
	value = singletonRockerCommons.replaceAll(value,'//','/');
	value = prefix + value;
	return value;
};
UpperFile.prototype.update = function(value){
	var inner = '';
	if(value != ''){
		value = this.adjustUrl(value);
		var idx = value.lastIndexOf('.');
		var ext = value.substring(idx + 1);
		if(ext == 'png' || ext == 'bmp'  || ext == 'jpeg'  || ext == 'jpg'  || ext == 'gif'){
			inner += '<div style="width: 100%; height: 100%; background: url(\'';
			inner += value;
			inner += '\'); background-size: cover;">';
			inner += '</div>';
		}else{
			inner += '<embed style="width: 100%; height: 100%;" src="';
			inner += value;
			inner += '">';
			inner += '</embed>';
		}
		singletonRockerCommons.getElement(this.id).value = value;
	}
	singletonRockerCommons.innerHtml('imagePanel_'+ this.id, inner);
};
UpperFile.prototype.hideUploaderForm = function(){
	singletonRockerCommons.hide('container_upper_' + this.appenderId);
	singletonRockerCommons.removeShadowMask(this.shadowId);
};
UpperFile.prototype.uploadComplete = function(){
	this.uploadSended = false;
	var url = this.actionUploadResult + '?operation=uploadResult&typeObject=uploadFile&formid=' + this.formId;
	var rockerAjaxHandler = new RockerAjaxHandler(url,null);//expectedResult
	var thisThis = this;
	rockerAjaxHandler.handleSuceed = function(result){
		if(null!=result && result != '' && result != 'error'){
			thisThis.update(result);
			thisThis.hideUploaderForm();
		}else{
			thisThis.hideUploaderForm();
		}
	};
	rockerAjaxHandler.handleUnsuceed = function(result){
		thisThis.hideUploaderForm();
	};
	rockerAjaxHandler.send();
};
UpperFile.prototype.generateInnerFormUpLoad = function(){
	try{
		var id = 'upper_' + this.appenderId;
		var idIndicator = 'div_drag_container_' + id;
		var idDrag = 'container_' + id;
		// id != this.id
		var inner = '<div id="container_'+ id +'" style="position: absolute;  z-index: 1000000; width: 500px; top: ';
		inner += this.top +'px; left: '+ this.left +'px;" class="ui-widget ui-widget-content ui-corner-all">';
		inner += '<div class="rockerContainerIntern">';
		inner += '<div id="div_drag_container_'+ id +'"  class="rockerDragHeader">';
		inner += '<div class="rockerHeaderForm ui-widget-header">' + this.titleUploaderForm;
		inner += '<div class="rockerCloseForm ui-button ui-corner-all" onclick="singletonRockerCommons.hide(\'container_';
		inner += id +'\'); singletonRockerCommons.removeShadowMask(\'' + this.shadowId + '\');"> <span>X</span></div>';
		inner += '</div>';
		inner += '</div>';
		inner += '<div class="rockerUploaderChoiceFileContainer">';
		inner += '<form id="formUpLoad_'+ id + '" name="formUpLoad_';
		inner += id;
		inner += '" action="' + this.actionUpload + '"';
		inner += ' enctype="multipart/form-data" method="post" ';
		inner += ' target="iframeUpload_' + id + '">';
		inner += ' <input id="btFileUp_'+ id +'" class="rockerInput" ';
		inner += ' name="file"';
		inner += ' type="file" style="width: 100%;" ';
		inner += ' onclick="singletonRockerStorage.clearExtensionValidation(\'' + this.id + '\',\'divMsgs_' + id + '\');" ';
		inner += ' />';
		inner += '<input type="hidden" id="operation" name="operation" value="fileUpload" />';
		inner += '<input type="hidden" id="formid" name="formid" value="' + this.formId + '" />';
		inner += '<input type="hidden" id="typeObject" name="typeObject" value="uploadFile" />';
		inner += '<div style="clear: both;" ></div>';
		inner += '<div id="divMsgs_' + id + '" ></div>';
		inner += '<div class="rockerFormUploadButtonsContainer ui-widget-header ui-corner-bottom">';
		var uploadOKForm = singletonRockerI18n.getMessage('UpperFile.uploadOKForm',null);
		var uploadCancelForm = singletonRockerI18n.getMessage('UpperFile.uploadCancelForm',null);
		inner += '<input id="btSubmitUp_'+ id +'" value="'+ uploadOKForm + '" type="submit" class="ui-button ui-corner-all" onclick="';
		inner += 'if(!singletonRockerStorage.validateExtensionUpload(\'' + this.id + '\',singletonRockerCommons.getElement(\'btFileUp_'+ id +'\').value,\'divMsgs_' + id + '\')){return false;}';
		inner += 'var splash = new RockerSplashMask(\'container_';
		inner += id +'\', 500); splash.makeSplash(); singletonRockerStorage.uploadSended(\'' + this.id + '\');"/>';
		inner += '<input id="btResetUp_'+ id +'" value="' + uploadCancelForm + '" type="reset" class="ui-button ui-corner-all" style="margin-left: 5px;"';
		inner += ' onclick="singletonRockerCommons.hide(\'container_' + id +'\');';
		inner += ' singletonRockerCommons.removeShadowMask(\'' + this.shadowId + '\');"/>';
		inner += '</div>';
		inner += '</form>';
		inner += '<iframe name="iframeUpload_';
		inner += id;
		inner += '" style="display:none;" onload="';
		inner += 'singletonRockerStorage.uploadComplete(\'' + this.id + '\');';
		inner += '" />';
		inner += '</div>';
		inner += '</div>';
		inner += '</div>';
		singletonRockerCommons.getElement(this.appenderId).innerHTML = inner;
		new RockerDragAndDrop(idIndicator,idDrag);
		singletonRockerCommons.createShadowMask(this.shadowId,1000000);
	}catch(ex){
		console.log('generateInnerFormUpLoad error: ' + ex);
	}
};
/**
//==============================================================================
//Creates an File Uploader to Amazon AWS S3
//==============================================================================
*/
var UpperFileS3 = function (id,label,value,width,height,appenderId,titleUploaderForm,top,left,hideInputField,validExtensions,onbeforeOpen,
								maxSize,delayTimeMsgs,s3user,s3password,s3region,s3bucket,s3BaseUrl,fixedFileName,fileNamePrefix,
								bootstrapClass,bootstrapNewLine) {
	this.id = id;
	this.shadowId = 'shadowMask_upperS3_' + this.id;
	this.name = id;
	this.label = label;
	this.value = value;
	this.width = ((null!=width && width >= 150) ? width : 150);
	this.height = ((null!=height && height >= 150) ? height : 150);
	this.appenderId = appenderId;
	this.titleUploaderForm = (null!=titleUploaderForm && titleUploaderForm != '') 
									?  titleUploaderForm : singletonRockerI18n.getMessage('UpperFile.upperDefaultTitle',null);
	this.top = ((null!=top && top >= 0) ? top : 0);
	this.left = ((null!=left && left >= 0) ? left :  ((window.innerWidth - 500) / 2));
	this.type = "text";
	this.typeAux = "imageS3";
	this.hideInputField = ((null!=hideInputField && (hideInputField == true || hideInputField == 'true')) ? true : false);
	this.validExtensions = (null!=validExtensions && validExtensions.length > 0) ? validExtensions : new Array();
	this.onbeforeOpen = (null!=onbeforeOpen) ? onbeforeOpen : '';
	this.maxSize = ((null!=maxSize && maxSize > 0) ? maxSize : 1024);
	this.delayTimeMsgs = ((null!=delayTimeMsgs && delayTimeMsgs > 100) ? delayTimeMsgs : 2500);
	this.s3user = s3user;
	this.s3password = s3password;
	this.s3region = s3region;
	this.s3bucket = s3bucket;
	this.s3BaseUrl = s3BaseUrl;
	this.fixedFileName = fixedFileName;
	this.fileNamePrefix = fileNamePrefix;
	this.bootstrapClass = ((null!=bootstrapClass && bootstrapClass!='') ? bootstrapClass : 'col');
	this.bootstrapNewLine = ((null!=bootstrapNewLine && (bootstrapNewLine == true || bootstrapNewLine == 'true')) ? true : false);
	this.onclick = this.onbeforeOpen + ' singletonRockerStorage.generateInnerFormUpLoad(\'' + this.id + '\');';
	this.uploadSended = false;
	singletonRockerStorage.storeJsInputText(this.id,this);
};
UpperFileS3.prototype = new BaseElement();
UpperFileS3.prototype.constructor = UpperFileS3;
UpperFileS3.prototype.generateDrawContent = function(){
	var inner = '';
	inner += this.getOpenBootstrapCol();
	inner += '<span class="rockerContainer ui-widget-content ui-corner-all" style="width: '+ (this.width) +'px; height: ' + (this.height) + 'px; float: left;">';
	inner += '<div style="clear: both;"></div>';
	inner += '<div class="rockerLabel ui-widget-header ui-corner-top" style="padding: 3px; width: 100%; margin-top: -1px;">&nbsp;' + this.label + '</div>';
	inner += '';
	inner += '<div id="imagePanel_'+ this.id +'" style="width: 100%; height: ' + (this.height - 37);
	inner += 'px; margin: 0px;" class="rockerInputDisable" >';
	inner += '';
	inner += '</div>';
	inner += '<div  class="ui-widget ui-widget-header ui-corner-bottom" >';
	inner += '<input type="hidden" id="checker_'+ this.id +'" name="checker_'+ this.id +'" value="" />';
	inner += '<input id="'+ this.id + '" name="'+ this.id + '" ';
	inner += ' type="text" style="width: '+ (((this.width/3) - 10) * 2) +'px; margin:  4px  4px  6px  4px;" ';
	if(this.hideInputField){
		inner += ' class="rockerInput ui-corner-all" ';
	}else{
		inner += ' class="rockerInputDisabled ui-corner-all" onkeydown="return false;" ';
	}
	inner += ' value="' + this.value +'" />';
	//
	var uploadUploadForm = singletonRockerI18n.getMessage('UpperFile.uploadUploadForm',null);
	inner += '<input style="font-size: 11px; font-family: verdana; margin-top: -4px;" ';
	inner += ' class="ui-button ui-corner-all" type="button" value="' + uploadUploadForm + '" onclick="'+ this.onclick +'" />';
	inner += '<div style="clear: both;"></div>';
	inner += '</div>';
	inner += '<div style="clear: both;"></div>';
	inner += '</span>';
	inner += this.getCloseBootstrapCol();
	return inner;
};
UpperFileS3.prototype.update = function(value){
	var inner = '';
	if(value != ''){
		var idx = value.lastIndexOf('.');
		var ext = value.substring(idx + 1);
		if(ext == 'png' || ext == 'bmp'  || ext == 'jpeg'  || ext == 'jpg'  || ext == 'gif'){
			inner += '<div style="width: 100%; height: 100%; background: url(\'';
			inner += value;
			inner += '\'); background-size: cover;">';
			inner += '</div>';
		}else{
			inner += '<embed style="width: 100%; height: 100%;" src="';
			inner += value;
			inner += '">';
			inner += '</embed>';
		}
		singletonRockerCommons.getElement(this.id).value = value;
	}
	singletonRockerCommons.innerHtml('imagePanel_'+ this.id, inner);
};
UpperFileS3.prototype.removeShadow = function(){
	singletonRockerCommons.removeShadowMask(this.shadowId);
};
UpperFileS3.prototype.generateInnerFormUpLoad = function(){
	try{
		var id = 'upper_' + this.appenderId;
		var idIndicator = 'div_drag_container_' + id;
		var idDrag = 'container_' + id;
		// id != this.id
		var targetInputId = 'btFileUp_'+ id;
		var splashTargetId = 'container_' + id;
		var nameImgToDelete = singletonRockerCommons.getElement(this.id).value;
		
		var onclickS3 = '';
		onclickS3 += 'new RockerAmazonS3Handler(\'' + this.s3user + '\',\'' +  this.s3password + '\',\'' + this.s3region + '\',\'' + this.s3bucket + '\',\'';
		onclickS3 += targetInputId + '\',' + this.delayTimeMsgs + ',\'' + splashTargetId;
		onclickS3 += '\',\'' + this.id + '\',\'' + this.s3BaseUrl + '\',\'';
		onclickS3 += this.fixedFileName + '\',\'' + this.fileNamePrefix + '\',\'' + nameImgToDelete + '\',' + this.maxSize + ');';
		
		var inner = '<div id="container_'+ id +'" style="position: absolute;  z-index: 1000000; width: 500px; top: ';
		inner += this.top +'px; left: '+ this.left +'px;" class="ui-widget ui-widget-content ui-corner-all">';
		inner += '<div class="rockerContainerIntern">';
		inner += '<div id="div_drag_container_'+ id +'"  class="rockerDragHeader">';
		inner += '<div class="rockerHeaderForm ui-widget-header">' + this.titleUploaderForm;
		inner += '<div class="rockerCloseForm ui-button ui-corner-all" onclick="singletonRockerCommons.hide(\'container_';
		inner += id +'\'); singletonRockerCommons.removeShadowMask(\'' + this.shadowId + '\');"> <span>X</span></div>';
		inner += '</div>';
		inner += '</div>';
		inner += '<div class="rockerUploaderChoiceFileContainer">';
		inner += '<form id="formUpLoad_'+ id + '" name="formUpLoad_'+ id + '" action="/"';
		inner += ' enctype="multipart/form-data" method="post" >';
		inner += ' <input id="btFileUp_'+ id +'" class="rockerInput" ';
		inner += ' name="file" type="file" style="width: 100%;" ';
		inner += ' onclick="singletonRockerStorage.clearExtensionValidation(\'' + this.id + '\',\'divMsgs_' + id + '\');" />';
		inner += '<div style="clear: both;" ></div>';
		inner += '<div id="divMsgs_' + id + '" ></div>';
		inner += '<div class="rockerFormUploadButtonsContainer ui-widget-header ui-corner-bottom">';
		var uploadOKForm = singletonRockerI18n.getMessage('UpperFile.uploadOKForm',null);
		var uploadCancelForm = singletonRockerI18n.getMessage('UpperFile.uploadCancelForm',null);
		inner += '<input id="btSubmitUp_'+ id +'" value="'+ uploadOKForm + '" type="button" class="ui-button ui-corner-all" onclick="';
		inner += 'if(!singletonRockerStorage.validateExtensionUpload(\'' + this.id + '\',singletonRockerCommons.getElement(\'btFileUp_'+ id +'\').value,\'divMsgs_' + id + '\')){return false;}';
		inner += onclickS3 + '"/>';
		inner += '<input id="btResetUp_'+ id +'" value="'+ uploadCancelForm +'" type="reset" class="ui-button ui-corner-all" style="margin-left: 5px;"';
		inner += ' onclick="singletonRockerCommons.hide(\'container_' + id +'\');';
		inner += ' singletonRockerCommons.removeShadowMask(\'' + this.shadowId + '\');"/>';
		inner += '</div>';
		inner += '</form>';
		inner += '</div>';
		inner += '</div>';
		inner += '</div>';
		singletonRockerCommons.getElement(this.appenderId).innerHTML = inner;
		new RockerDragAndDrop(idIndicator,idDrag);
		singletonRockerCommons.createShadowMask(this.shadowId,1000000);
	}catch(ex){
		console.log('Error on generateInnerFormUpLoad: ' + ex);
	}
};

