var RockerAmazonS3Handler = function(userId,userKey,region,bucketName,targetInputId,delayTimeMsgs,splashTargetId,
					  upperFileId,s3BaseUrl,fixedFileName,fileNamePrefix,nameImgToDelete,maxSizeBytes){
	this.userId = userId;
	this.userKey = userKey;
	this.region = region;
	this.bucketName = bucketName;
	this.targetInputId = targetInputId;
	this.delayTimeMsgs = delayTimeMsgs;
	this.splashTargetId = splashTargetId;
	this.splash = null;
	this.upperFileId = upperFileId;
	this.baseDir = s3BaseUrl;
	this.fixedFileName = (null!=fixedFileName) ? eval(fixedFileName) : null;
	this.fileNamePrefix = (null!=fileNamePrefix) ? eval(fileNamePrefix) : '';
	this.nameImgToDelete = (null!=nameImgToDelete && nameImgToDelete != '') ? nameImgToDelete : null;
	this.maxSizeBytes = (null!=maxSizeBytes && maxSizeBytes > 0) ? maxSizeBytes : 1024;
	
	this.onSucessFunction = function(fileName){
		singletonRockerStorage.updateAfterS3UploadComplete(this.upperFileId,(this.baseDir + '/' + this.bucketName + '/' + fileName));
	};
	this.finalize = function(){
		if(null!=this.splash){
			this.splash.removeSplash();
		}
		singletonRockerCommons.hide(this.splashTargetId);
		singletonRockerStorage.removeShadowMaskFromS3Upper(this.upperFileId);
	};
	this.uploadFile = function(file){
		var thisThis = this;
		if(file.size > this.maxSizeBytes){
			var msg = singletonRockerI18n.getMessage('RockerAmazonS3Handler.fileSizeOverflow',
													[(parseInt(file.size/1024)),(parseInt(this.maxSizeBytes/1024))]);
			singletonRockerAjax.innerDrawAlert(msg,(this.delayTimeMsgs * 4),null);
			thisThis.finalize();
			return;
		}
		var bucket = new AWS.S3({params: {Bucket: this.bucketName}});
		var nameArq = this.fileNamePrefix;
		if((null!=this.fixedFileName && this.fixedFileName != '')){
			nameArq += this.fixedFileName + file.name.substring(file.name.lastIndexOf('.'));
		}else{
			nameArq +=  file.name;
		}
		nameArq = nameArq.replace(/ /gi,'');
		var parameters = {Key: nameArq, ContentType: file.type, Body: file, ACL: 'public-read'};
		bucket.putObject(parameters, function (error, data) {
	        if(error){
	        	console.log('Error on bucket.putObject: ' + error);
	        	var msg = singletonRockerI18n.getMessage('RockerAmazonS3Handler.fileUploadError',null);
				singletonRockerAjax.innerDrawAlert(msg,this.delayTimeMsgs,null);
				thisThis.finalize();
	        }else{
	        	var msg = singletonRockerI18n.getMessage('RockerAmazonS3Handler.fileUploadSucess',null);
	        	thisThis.onSucessFunction(nameArq);
				singletonRockerAjax.innerDrawAlert(msg,this.delayTimeMsgs,null);
				try {
					if(null!=thisThis.nameImgToDelete && nameImgToDelete != nameArq){
						thisThis.deleteFile(nameImgToDelete);
		        	}
				} catch (e) {
					console.log('Error on deleteFile: ' + e);
				}
				thisThis.finalize();
	        }
	      });
	};
	this.handleUpload = function(){
		var file = singletonRockerCommons.getElement(this.targetInputId).files[0];
		if (file) {
			AWS.config.update({accessKeyId: this.userId, secretAccessKey: this.userKey});
			AWS.config.region = this.region;
			this.splash = new RockerSplashMask(this.splashTargetId, 300); 
			this.splash.makeSplash();
			this.uploadFile(file);
	    } else {
	    	var msg = singletonRockerI18n.getMessage('RockerAmazonS3Handler.noFileToUpload',null);
			singletonRockerAjax.innerDrawAlert(msg,this.delayTimeMsgs,null);
			this.finalize();
	    }
	};
	this.deleteFile = function(fileName){
		try {
			var bucket = new AWS.S3({params: {Bucket: this.bucketName}});
			fileName = fileName.replace(/ /gi,'');
			var parametros = {Key: fileName};
			bucket.deleteObject(parametros, function (err, data) {
		        if(err){
		        	var msg = 'Error, file dont deleted: ' + fileName ;
					console.log(msg + ' : ' + err);
		        }
		    });
		} catch (error) {
			console.log('Error on deleteFile: ' + error);
		}
	};
	try {
		this.handleUpload();
	} catch (error) {
		this.finalize();
		console.log('Error on handleUpload: ' + error);
	}
};

var RockerAmazonS3Deleter = function(userId,userKey,region,bucketName,upperFileId,fileName,delayTimeMsgs){
	this.userId = userId;
	this.userKey = userKey;
	this.region = region;
	this.bucketName = bucketName;
	this.upperFileId = upperFileId;
	this.fileName =  fileName.replace(/ /gi,'');
	this.delayTimeMsgs = delayTimeMsgs;
	this.handleDeletion = function(){
		try {
			AWS.config.update({accessKeyId: this.userId, secretAccessKey: this.userKey});
			AWS.config.region = this.region;
			var bucket = new AWS.S3({params: {Bucket: this.bucketName}});
			var parameters = {Key: this.fileName};
			var thisThis = this;
			bucket.deleteObject(parameters, function (err, data) {
		        if(err){
					var msg = singletonRockerI18n.getMessage('RockerAmazonS3Handler.fileNoDeleted',[thisThis.fileName,err]);
					singletonRockerAjax.innerDrawAlert(msg,thisThis.delayTimeMsgs,null);
					console.log(msg + ' : ' + err);
		        }else{
					var msg = singletonRockerI18n.getMessage('RockerAmazonS3Handler.fileDeleted',[thisThis.fileName]);
					singletonRockerAjax.innerDrawAlert(msg,thisThis.delayTimeMsgs,null);
					singletonRockerStorage.updateAfterS3UploadComplete(thisThis.upperFileId,'');
				}
		    });
		} catch (error) {
			console.log('Error on handleDeletion: ' + error);
		}
	};
	try {
		this.handleDeletion();
	} catch (error) {
		this.finalize();
		console.log('Error on handleDeletion: ' + error);
	}
};

