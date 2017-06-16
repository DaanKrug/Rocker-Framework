var singletonRockerCodeForm = null;
var RockerCodeForm = function(idAppenderForm, generatedCode, onclose, fileTitle){
	this.generatedCode = generatedCode;
	this.title = "Generated Code: Rocker Framework Visual Coding";
    this.idAppenderForm = idAppenderForm;
    this.horizontalAlignFields = false;
    this.width = 800;
    this.closable = true;
    this.modal = true;
    this.actionForm = "/";
    this.onclickSubmit = 'singletonRockerCodeForm.exportFile(); return false;';
    this.onRead = '';
    this.onclickCancel = '';
    this.textSubmit = 'Save to File';
    this.textCancel = '';
    this.errorCode = 'ERROR_606';
    this.jsonCode = 'JSON_767';
    this.posTop = 0;
    this.posLeft = 5;
    this.titleTable = "";	
    this.typeObject = 'RockerGeneratedCode'; 
    this.aliasObject = 'Rocker Generated Code';
    this.additionalParamsAndValuesOnRequestTable = '';
    this.onclose = onclose;
    this.drawTableOnTop = false;
    this.initialLineNumbersTable = 5;
    this.visibleButtonsTable = 3;
    this.deleteAndEditButtonsOnTable = false;
    this.tableOnNewTab = false;
    this.idToClickOnComplete = null;
    this.getArrayTableColumns = function(){};
    this.txtArea = null;
    this.txtFile = null;
    this.fileTitle = fileTitle;
    this.getArrayFields = function(){
		var arrayFields = [];
		var i = 0;
		arrayFields[i] = new TextArea('Generated Code of a RockerForm','generatedCodeOfRockerForm',this.generatedCode,
				50,3,this.width-20,null,false,
				false,false,'','col-sm-12',false);
		this.txtArea = arrayFields[i];
		i++;
		var validator = singletonRockerFormValidator.getTextAllowedsValidator(singletonRockerFormValidator.cssChars,-1,-1);
		arrayFields[i] = new InputText('Save As (file name)','saveAsNameRockerCodeForm',this.fileTitle,500,
				validator,'', false,'col-sm-10',false);
		i++;
		arrayFields[i] = new Appender('appenderDownloadFile',null,
				'','','bottomFields',null,null,'col-sm-12',false);
	    i++;
		return arrayFields;
	};
	this.setRichEditorsToBasic = function(){
		CKEDITOR.replace( this.txtArea.id, {
			toolbarGroups : [{ name: 'tools' }],
			height : '300px'
		});
	};
	this.draw = function(){
		var rockerFormCode = new RockerForm(this.title,this.idAppenderForm,
				this.horizontalAlignFields,this.width,this.closable,this.modal,this.getArrayFields(),
				this.actionForm,this.onclickSubmit,this.onclickCancel,this.textSubmit,this.textCancel,this.errorCode,this.jsonCode,
				this.posTop, this.posLeft, this.titleTable, this.getArrayTableColumns(),this.typeObject,this.aliasObject,
				this.additionalParamsAndValuesOnRequestTable,this.onclose,this.drawTableOnTop,
				this.initialLineNumbersTable,this.visibleButtonsTable,this.deleteAndEditButtonsOnTable,
				this.tableOnNewTab,this.onRead
				);
		this.setRichEditorsToBasic();
		rockerFormCode.readInOutRichEditors(false);
	};
	this.draw();
	singletonRockerCodeForm = this;
	this.exportFile = function(){
		if(null!=this.txtFile){
			window.URL.revokeObjectURL(this.txtFile);
		}
		var saveAsFileName = singletonRockerCommons.getElement('saveAsNameRockerCodeForm').value;
		var txt = singletonRockerCommons.getElement(this.txtArea.id).value;
		txt = singletonRockerCommons.replaceAll(txt,'&nbsp;',' ');
		txt = singletonRockerCommons.replaceAll(txt,'<br/>','\n');
		var data = new Blob([txt], {type: 'text/html'});
		this.txtFile = window.URL.createObjectURL(data);
		var parentNode = singletonRockerCommons.getElement('appenderDownloadFile');
		var node = document.createElementNS('http://www.w3.org/1999/xhtml','a');
		node.id = 'appenderDownloadFileLink';
		node.href = this.txtFile;
		node.target = '_blank';
		node.download = (null!=saveAsFileName && saveAsFileName != '') ? saveAsFileName : this.fileTitle;
		parentNode.appendChild(node);
		singletonRockerCommons.clickElementById(node.id);
		var thisThis = this;
		setTimeout(function(){
								window.URL.revokeObjectURL(thisThis.txtFile); 
								eval(thisThis.onclose);
							 },100);
	};
};