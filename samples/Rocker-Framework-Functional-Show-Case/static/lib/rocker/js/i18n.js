var RockerI18n = function(){
	this.initialized = false;
	this.initialize = function(){
		this.initializeDefaulMessages();
		this.initialized = true;
	};
	this.validate = function(){
		if(!this.initialized){
			console.log('You should use the singleton variable "singletonRockerI18n" ');
			return false;
		}
		return true;
	};
	this.setMessages = function(messagesArray){
		if(!this.validate()){return;}
		this.messages = messagesArray;
	};
	this.replaceMessagePoints = function(message,arrayParams){
		if(null!=arrayParams && arrayParams.length > 0){
			for(var i = 0; i < arrayParams.length; i++){
				value = (null!=arrayParams[i]) ? arrayParams[i] : '';
				message = singletonRockerCommons.replaceAll(message,('{' + i + '}'),value);
			}
		}
		return message;
	};
	this.getMessage = function(key,arrayParams){
		if(!this.validate()){return null;}
		if(null==this.messages || this.messages.length == 0){
			console.log('singletonRockerI18n i18n messages is null or empty. Use singletonRockerI18n.setMessages(messagesArray);');
			return null;
		}
		for(var i = 0; i < this.messages.length; i++){
			if(this.messages[i][0] == key){
				var msg = this.messages[i][1];
				msg = this.replaceMessagePoints(msg,arrayParams);
				return msg;
			}
		}
		return null;
	};
	this.initializeDefaulMessages = function(){
		var fileSizeOverflow = 'The file couldn\'t be uploaded.<br/>File size to long: ';
		fileSizeOverflow += '{0} KB.<br/>Maximum valid file size: {1} KB.';
		var fileUploadError = 'The file wasn\'t uploaded.';
		var fileUploadSucess = 'File sucessfull uploaded!';
		var noFileToUpload = 'First choice a file to upload!';
		var invalidExtension = 'Invalid file extension: {0}. Extension should be one of [{1}].';
		var invalidDay = 'The day should be between {0} and {1}';
		var invalidMonth = 'The month should be between {0} and {1}';
		var confirmExclusionLabel = 'Confirm exclusion of {0}?';
		var confirmExclusionId = 'Confirm exclusion of {0} whit id {1}?';
		var formEditNew = 'Edit/New';
		var formList = 'list';
		var textSubmitForm = 'Submit';
		var textCancelForm = 'Cancel';
		var inputMinChars = ' The input <strong>{0}</strong> need {1} or more characters.';
		var invalidDate = ' The input <strong>{0}</strong> contains a error on date format: {1}';
		var radioSelectOne = ' The input <strong>{0}</strong> need contain a valid value selected.';
		var minChecks = ' The input <strong>{0}</strong> should contain {1} or more options selected.';
		var selectSelectOne = ' Select a valid option value for a input <strong>{0}</strong>.';
		var upperDefaultTitle = 'Choice File to Upload';
		var uploadUploadForm = 'Upload';
		var uploadOKForm = 'OK';
		var uploadCancelForm = 'Cancel';
		var confirmVisualCodeStorageClearMsg = 'You wish clear the Rocker Elements collection?';
		this.messages = [
		                 ['RockerAmazonS3Handler.fileSizeOverflow',fileSizeOverflow],
		                 ['RockerAmazonS3Handler.fileUploadError',fileUploadError],
		                 ['RockerAmazonS3Handler.fileUploadSucess',fileUploadSucess],
		                 ['RockerAmazonS3Handler.noFileToUpload',noFileToUpload],
		                 ['RockerStorage.invalidExtension',invalidExtension],
		                 ['RockerValidatorData.invalidDay',invalidDay],
		                 ['RockerValidatorData.invalidMonth',invalidMonth],
		                 ['RockerTable.confirmExclusionLabel',confirmExclusionLabel],
		                 ['RockerTable.confirmExclusionId',confirmExclusionId],
		                 ['RockerForm.formEditNew',formEditNew],
		                 ['RockerForm.formList',formList],
		                 ['RockerForm.textSubmitForm',textSubmitForm],
		                 ['RockerForm.textCancelForm',textCancelForm],
		                 ['InputText.inputMinChars',inputMinChars],
		                 ['InputText.invalidDate',invalidDate],
		                 ['RadioGroup.radioSelectOne',radioSelectOne],
		                 ['CheckGroup.minChecks',minChecks],
		                 ['Select.selectSelectOne',selectSelectOne],
		                 ['UpperFile.upperDefaultTitle',upperDefaultTitle],
		                 ['UpperFile.uploadUploadForm',uploadUploadForm],
		                 ['UpperFile.uploadCancelForm',uploadCancelForm],
		                 ['UpperFile.uploadOKForm',uploadOKForm],
		                 ['RockerStorage.confirmVisualCodeStorageClearMsg',confirmVisualCodeStorageClearMsg]
		                 ];
	};
};
// var msg = singletonRockerI18n.getMessage('RockerStorage.confirmVisualCodeStorageClearMsg',null);
var singletonRockerI18n = new RockerI18n();
singletonRockerI18n.initialize();