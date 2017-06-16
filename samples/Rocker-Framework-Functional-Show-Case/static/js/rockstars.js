
/**
     This function show how useful could be the use of RockerAjaxHandler object to make ajax requests in
     a simple way
*/
var ExampleOfUseOfAjaxHandler = function(actionForm){
	
	  this.actionForm = actionForm;
	  
	  console.log('');
	  console.log('exampleOfUseOfAjaxHandler: This function show how useful could be the use of RockerAjaxHandler object to make ajax requests in a simple way');
	  /**
	      Creates the ajax handler object
	   */
	  var url = this.actionForm + '?operation=exampleOfUseOfAjaxHandler&expected=OK';
	  var rajax = new RockerAjaxHandler(url,null);
	  /**
	        We should override the "handleSuceed" and the "handleUnsuceed"
	        methods. These methods are the callback handlers for sucessfull 
	        and unsucessfull results.
	        
	        if result becomes (equal to expectedResult) 
	        	or (expectedResult is null and the ajax request is complete [HttpStatus 200 or 0]) , executes the handleSuceed
	        else execute handleUnsuceed.
	        
	        These callback functions could be used for all that is imaginated, hide and show elements, append the result
	        into a DOM element, create new DOM elements, call events in elements whit predetermined ids, or split ids from result,
	        store the result into a variable to use in another moment and much more.
	   */
	  rajax.handleSuceed = function(result){
		  console.log('rajax.handleSuceed => ' + result);
	  };
	  rajax.handleUnsuceed = function(result){
		  console.log('rajax.handleUnsuceed => ' + result);
	  };
	  /**
	      now after override callback methods we should send the request
	   */
	  rajax.send();
	  
	  
	  var url2 = this.actionForm + '?operation=exampleOfUseOfAjaxHandler&expected=OKK';
	  var expectedResult2 = 'OK';
	  var rajax2 = new RockerAjaxHandler(url2,null);
	  rajax2.handleSuceed = function(result){
		  console.log('rajax2.handleSuceed => ' + result);
	  };
	  rajax2.handleUnsuceed = function(result){
		  console.log('rajax2.handleUnsuceed => ' + result);
	  };
	  rajax2.send();
	  rajax2 = new RockerAjaxHandler(url2,expectedResult2);
	  rajax2.handleSuceed = function(result){
		  console.log('rajax2.handleSuceed => ' + result);
	  };
	  rajax2.handleUnsuceed = function(result){
		  console.log('rajax2.handleUnsuceed => ' + result);
	  };
	  rajax2.send();
	  
	  var url3 = this.actionForm + '?operation=exampleOfUseOfAjaxHandler&expected=OK';
	  var expectedResult3 = 'OK';
	  var rajax3 = new RockerAjaxHandler(url3,expectedResult3);
	  rajax3.handleSuceed = function(result){
		  console.log('rajax3.handleSuceed => ' + result);
	  };
	  rajax3.handleUnsuceed = function(result){
		  console.log('rajax3.handleUnsuceed => ' + result);
	  };
	  rajax3.send();
	  
	  
	  var url4 = this.actionForm + '?operation=exampleOfUseOfAjaxHandler&expected=';
	  var expectedResult4 = 'OK';
	  var rajax4 = new RockerAjaxHandler(url4,expectedResult4);
	  rajax4.handleSuceed = function(result){
		  console.log('rajax4.handleSuceed => ' + result);
	  };
	  rajax4.handleUnsuceed = function(result){
		  console.log('rajax4.handleUnsuceed => ' + result);
	  };
	  rajax4.send();
	  
	  var url5 = this.actionForm + '?operation=exampleOfUseOfAjaxHandler&expected=ERROR';
	  var expectedResult5 = null;
	  var rajax5 = new RockerAjaxHandler(url5,expectedResult5);
	  rajax5.handleSuceed = function(result){
		  console.log('rajax5.handleSuceed => ' + result);
	  };
	  rajax5.handleUnsuceed = function(result){
		  console.log('rajax5.handleUnsuceed => ' + result);
	  };
	  rajax5.send();
	  
	  var url6 = this.actionForm + '?operation=exampleOfUseOfAjaxHandler&expected=';
	  var expectedResult6 = null;
	  var rajax6 = new RockerAjaxHandler(url6,expectedResult6);
	  rajax6.handleSuceed = function(result){
		  console.log('rajax6.handleSuceed => ' + result);
	  };
	  rajax6.handleUnsuceed = function(result){
		  console.log('rajax6.handleUnsuceed => ' + result);
	  };
	  rajax6.send();
};

var ShaffroindExampler = function(){
	
	this.shaf1 = new RockerShafroind();
	this.shaf2 = new RockerShafroindd();
	
	this.showExampleUse = function(){
		
		console.log('If you need use non encripted strings in HardCode mode, you can use a simple obfuscation mechanism, provided by Rocker.');
		console.log('Pay atention in following lines to "take" the tricks.');
		var data = 'Hello word is not a good password.';
		var shaf1Data = this.shaf1.c(data);//obtain a int array from a string
		var shaf2Data = this.shaf2.c(data);
		console.log('shaf1.c(\'' + data + '\') => ' + shaf1Data);
		console.log('shaf2.c(\'' + data + '\') => ' + shaf2Data);
		
		/**
		188,144,110,16,164, // H,e,l,l,o
		13,// ,
		168,164,258,142,// w,o,r,d,
		253,// ,
		240,291,// i,s,
		13,// ,
		181,164,294,// n,o,t, 
		13,// ,
		293,// a,
		13,// ,
		248,164,164,142,// g,o,o,d,
		253,// ,
		8,293,35,291,168,164,74,285,// p,a,s,s,w,o,r,d,
		1// .,
		*/
		var data1 = this.shaf1.a(shaf1Data);//obtain the original string value from a int array
		var data2 = this.shaf2.a(shaf2Data);
		console.log('shaf1.a(' + shaf1Data + ') => ' + data1);
		console.log('shaf2.a(' + shaf2Data + ') => ' + data2);
	};
	
	this.showExampleUse();	
};


/**
	Pay atention on this, will be important to understand some functionality
*/
var singletonInstance = null;
var RockstarForm = function(idAppenderForm,actionBase){
  this.title = "Manage Rockstars";
  this.idAppenderForm = idAppenderForm;
  this.horizontalAlignFields = false;
  this.width = 900;// -1 for auto, > 0 to fixed size
  this.closable = false;
  this.modal = false;
  this.actionForm = actionBase + '/rockstars';
  this.onclickSubmit = 'singletonInstance.showList();';
  this.onRead = 'singletonInstance.showForm();';
  this.onclickCancel = '';
  this.textSubmit = 'Submit';
  this.textCancel = 'Cancel';
  this.errorCode = 'ERROR_606';
  this.jsonCode = 'JSON_767';
  this.posTop = 0;
  this.posLeft = 30;
  this.titleTable = "Greatest Rockstars of World ( or some of them )";	
  this.typeObject = 'Rockstar'; // object class/name on the model
  this.aliasObject = 'Rockstar'; // the name that is presented on UI relative to 'typeObject' 
  this.additionalParamsAndValuesOnRequestTable = '';
  this.onclose = '';
  this.drawTableOnTop = false;// if the data table of the form should be draw before the form input elements (input, select, textarea) or after them.
  this.initialLineNumbersTable = 5;
  this.visibleButtonsTable = 3;
  this.deleteAndEditButtonsOnTable = true;
 
  this.tableOnNewTab = true;// true to put a form into one tab, and table in another - Bootstrap nav-bar 
  
  this.idToClickOnComplete = (this.tableOnNewTab ? ('showerTable_f_' + this.idAppenderForm) : null);// if using tabs, then click on 'List' tab when submit form is complete
  
  /**
		Pay atention on this, will be important to understand some functionality
  */
  this.singletonInstanceForm = null;
  this.owner = 'LoggedUserId';
  
  /**
   *  See the buttons on Form, the singletonInstance, singletonInstanceForm, the default 'Rockstars' on node.js.appserver.js
   *  
   *  - with the 'additionalParamsAndValuesOnRequestTable' parameter its possible change the range of the data on a same table 
   *    object component whit little work.
   */
  this.showOnlyRockstarsFromCurrentUser = function(){
	  this.additionalParamsAndValuesOnRequestTable = '';
	  this.additionalParamsAndValuesOnRequestTable += '&operation=filterAndLoad';
	  this.additionalParamsAndValuesOnRequestTable += '&additionalAtrr0=owner';
	  this.additionalParamsAndValuesOnRequestTable += '&valueAdditionalAtrr0=LoggedUserId';
	  this.additionalParamsAndValuesOnRequestTable += '&additionalAtrrEqual0=true';
	  // re-draw all form
	  //this.draw();
	  // re-draw only the table
	  this.singletonInstanceForm.additionalParamsAndValuesOnRequestTable = this.additionalParamsAndValuesOnRequestTable;
	  this.singletonInstanceForm.makeTable();
	  
	  this.showList();
  };
  
  /**
   *  See the buttons on Form, the singletonInstance, singletonInstanceForm, the default 'Rockstars' on node.js.appserver.js
   *  
   *  - with the 'additionalParamsAndValuesOnRequestTable' parameter its possible change the range of the data on a same table 
   *    object component whit little work.
   */
  this.showAllRockstarsFromAllUsers = function(){
	  this.additionalParamsAndValuesOnRequestTable = '';
	  // re-draw all form
	  //this.draw();
	  // re-draw only the table
	  this.singletonInstanceForm.additionalParamsAndValuesOnRequestTable = this.additionalParamsAndValuesOnRequestTable;
	  this.singletonInstanceForm.makeTable();
	  
	  this.showList();
  };
  
  this.showList = function(){
	  if(this.tableOnNewTab){
		  singletonRockerCommons.clickElementById('showerTable_f_' + this.idAppenderForm );
	  }
  };
  
  this.showForm = function(){
	  if(this.tableOnNewTab){
		  singletonRockerCommons.clickElementById('showerForm_f_' + this.idAppenderForm );
	  }
  };
  
  /**
   	 Method invoked by additional button in table
   */
  this.showBiography = function(loggedUser,rockstarId){
	  alert('Show biography of rockstarId => ' + rockstarId + ' loggedUser => ' + loggedUser);
  };
  
  /**
	 Method invoked by additional button in table
   */
  this.showPhoto = function(rockstarId){
	  alert('Show photo of rockstarId => ' + rockstarId);
  };
  
  this.getArrayFields = function(){
	  
	var arrayFields = [];
	var i = 0;

	/**
		Hidden = function (name,value) 
	 */
    arrayFields[i] = new Hidden('operation','store');
    i++;
    
    arrayFields[i] = new Hidden('id','');
    i++;
    
    /**
     * Here we simulate owner as the loged in user in system, or the user that was created each 'Rockstar' registry.
     */
    arrayFields[i] = new Hidden('owner',this.owner);
    i++;
    
    /**
     	Styler = function (classNames,styles)
     	
     	Creates a internal (internal to a RockerForm) CSS appender element, 
     		to add a new Style on execution time, when the RockerForm is created.
     	These dinamic styles will be applied to all elements ( that match CSS rules ) bottom them.
     	
     	The element Styler following bottom will create the <style> :
     	<style>
     		.stylerToAppender1,.stylerToAppender2,#appender3{
     			border-radius: 12px !important;
     			padding: 10px !important;
     			border: 1px solid #666;
     			cursor: pointer !important;
     			font-size: 11px !important;
     			font-family: verdana !important;
     		}
     		.stylerToAppender1{
     			color: #515377 !important; background-color: #eaffaa !important;
     		}
     		.stylerToAppender2{
     			color: #171605 !important; background-color: #aafffb !important;
     		}
     		#appender3{
     			color: #ff0047 !important; background-color: #aaebff !important;
     		}
     		.stylerToAppender1:hover,
     		.stylerToAppender2:hover,
     		#appender3:hover{
     			color: #f80 !important; 
     			background-color: #efefef !important;
     		}
     	</style>
     */
    var baseStyle = 'border: 1px solid #666 !important; border-radius: 12px !important; padding: 10px !important; '
    				+ 'cursor: pointer !important; font-size: 11px !important; font-family: verdana !important;';
    arrayFields[i] = new Styler(['.stylerToAppender1','.stylerToAppender2','#appender3',
                                 '.stylerToAppender5','.stylerToAppender6','#appender7',
                                 '#appender8 .rockerTableColumn',
                                 '.stylerToAppender1:hover,.stylerToAppender2:hover,#appender3:hover',
                                 '.stylerToAppender5:hover,.stylerToAppender6:hover,#appender7:hover'],
    							[ baseStyle + 'color: #515377 !important; background-color: #eaffaa !important;',
    							  baseStyle + 'color: #171605 !important; background-color: #aafffb !important;',
    							  baseStyle + 'color: #ff0047 !important; background-color: #aaebff !important;',
    							  baseStyle + 'color: #c5142c !important; background-color: #b9e62f !important; font-size: 14px !important; font-family: Segoe UI !important;',
    							  baseStyle + 'color: #171605 !important; background-color: #aafffb !important; font-size: 14px !important; font-family: Segoe UI !important;',
    							  baseStyle + 'color: #ff0047 !important; background-color: #aaebff !important; font-size: 14px !important; font-family: Segoe UI !important;',
    							  'border-right: 0px !important;',
    							  'color: #f80 !important; background-color: #efefef !important;',
    							  'color: #01f !important; background-color: #ffffff !important;'
    							]);
    i++;
    
    
    /**
        getTextAllowedsValidator = function(arrayCharAlloweds,maxChars,minChars)
        you can use your custom char array: var allowedChars = ['A','B','C','e', ... ];
     */
    var nameValidator = singletonRockerFormValidator.getTextAllowedsValidator(singletonRockerFormValidator.alfaNumsText,250,3);
    /**
	    InputText = function (label,name,defaultValue,width,validator,placeHolder,
			disabled,bootstrapClass,bootstrapNewLine)
	*/
    arrayFields[i] = new InputText('Rock Star Name','name','',130,nameValidator,
    							   'Rock Star Name Here',false,'col-md-2',true);
    i++;
    
    var nickNameValidator = new RockerCustomValidator();
    // you should override the 'validate' function to provide custom validations, otherwise this validate nothing.
    nickNameValidator.validate = function(stringValue){
		if(null == stringValue || singletonRockerCommons.trim(stringValue).length < 3){ // dont forget the validation message (i18n or not)
			nickNameValidator.validationMsg = 'Oh woow!! Nickname is required and need 3 or more chars!';
			return false;
		}
		return true;
	};
    arrayFields[i] = new InputText('Rockstar Nickname','nickname','',210,nickNameValidator,
			   'Rock Star Nickname',false,'col-md-3',false);
    i++;

    
    /**
	    getTextMaskValidator = function(arrayMaskCharPositions)
	    possible values in each array position:
	    	- simple chars 
	    	- null or * 
	    	- [0-9] 
	    	- [a-z]
	    	- [a-z][0-9] or [0-9][a-z]
	 */
	var dateValidator = singletonRockerFormValidator.getTextMaskValidator(['[0-9]','[0-9]','/','[0-9]','[0-9]','/','[0-9]','[0-9]','[0-9]','[0-9]']);
	// you can override the 'validate' function to provide custom validations
	dateValidator.validate = function(stringValue){
		var msg = singletonRockerValidatorData.validateDate(singletonRockerCommons.trim(stringValue));
		if(null != msg && msg != ''){ // dont forget the validation message (i18n or not)
			dateValidator.validationMsg = singletonRockerI18n.getMessage('InputText.invalidDate',['Date of Birth',msg]);
			return false;
		}
		return true;
	};
	/**
	    InputText = function (label,name,defaultValue,width,validator,placeHolder,
							disabled,bootstrapClass,bootstrapNewLine)
			
		You can use a custom place holder changing null to an value to use a custom place holder for masks.
	*/
	arrayFields[i] = new InputText('Date of Birth','birthdate','',130,dateValidator,null,
			false,'col-sm-2',false);
	i++;
    

    /**
       Select = function (label,name,arrayLabels,arrayValues,defaultValue,canBeEmpty,
						width,onchange,onclick,disabled,bootstrapClass,bootstrapNewLine)
    */
    arrayFields[i] = new Select('Musical Style','style',['Classic Rock','Pop Rock','Hard Rock','Metal','Heavy Metal'],
    											  ['classicrock','poprock','hardrock','metal','heavymetal'],'',false,
    											  120,'console.log(\'onchange\');','console.log(\'onclick\');',false,'col-md-2',false);
    i++;
    
    /**
       getTextIntValidator = function(americanFormat,maxChars,minChars)
    */
    var validator2 = singletonRockerFormValidator.getTextIntValidator(false,2,1);
    /** */
    arrayFields[i] = new InputText('Age','age','',50,validator2,false,
    		false,'col-md-1',false);
    i++;
    
    /**
	    getTextDoubleValidator = function(americanFormat,maxChars,minChars,integerDigits,decimalDigits)
	*/
	var validator3 = singletonRockerFormValidator.getTextDoubleValidator(false,5,2,3,2);
	/** */
	arrayFields[i] = new InputText('Rating','rating','',70,validator3,'100,88',
	 		false,'col-md-1',false);
	i++;
	
	
	/**
		RadioGroup = function (label,name,arrayLabels,arrayValues,defaultValue,nullable,bootstrapClass,bootstrapNewLine)
	 */
	arrayFields[i] = new RadioGroup('Was born in England?','bornengland',
			['Yes','No'],[true,false],
			false,false,'col-sm-3',true);
	i++;
	
	/**
		CheckGroup = function (label,name,arrayCheckLabels,arrayCheckNames,arrayCheckCheckeds,minChecks,bootstrapClass,bootstrapNewLine)
	 */
	arrayFields[i] = new CheckGroup('Preferences','preferences',
			['Pizza','Orange Juice', 'Milk', 'Apple'],['pizza','orangejuice', 'milk', 'apple'],
			[true,false,false,'true'],1,'col-sm-2',false);
	i++;
	
	
	/**
		UpperFile = function (id,label,value,width,height,appenderId,actionBaseForm,titleUploaderForm,top,left,
									hideInputField,validExtensions,onbeforeOpen,bootstrapClass,bootstrapNewLine)
									
		Creates a input file to upload, that simulates an 'ajax submit'
	 */
	var onbeforeOpen = 'if(singletonRockerCommons.getElement(\'id\').value <= 0){ alert(\'Rockstar yet dont was saved!\'); return false;}';
	//if a rockstar is new Object (dont have a id into a input hidden 'id'), dont open the photo upload form
	arrayFields[i] = new UpperFile('rockstarPhoto','Rock Star PHOTO','',200,180,
									'appenderBase',this.actionForm,'Choice a Rock Star Photo',20,30,
									false,['png','gif','pdf'],onbeforeOpen,'col-sm-3',false);
	i++;
	
	
	/**
	 	UpperFileS3 = function (id,label,value,width,height,appenderId,titleUploaderForm,top,left,hideInputField,validExtensions,onbeforeOpen,
								maxSize,delayTimeMsgs,s3user,s3password,s3region,s3bucket,s3BaseUrl,fixedFileName,fileNamePrefix,
								bootstrapClass,bootstrapNewLine)
								
		Creates a input file to upload, that simulates an 'ajax submit', to send files to an Amazon AWS S3 bucket
		
		this component need a AWS third party library:
		use <script src="https://sdk.amazonaws.com/js/aws-sdk-2.0.0-rc.20.min.js"></script>
		in your HTML page. (May be a newer version too).
		
		maxSize: in Bytes
		delayTimeMsgs: time to hide alert msgs after them are show - miliseconds
		s3user: S3 bucket acount user
		s3password: S3 bucket acount password
		s3region: S3 bucket region
		s3bucket: S3 bucket name
		s3BaseUrl: S3 bucket url 
		
		When in serious applications use other forms of obtain the 5 S3 parameters, for example a cripted web service.
		
		fixedFileName: set a value not null and not equal to '' , 
					   if you want keep the uploaded images whit same name in S3 bucket on each time upload
					   could be a javascript function result - use \\\' to scape the ' 
		fileNamePrefix: set a value not null and not equal to '' , 
		                if you want a prefix for each user that upload the file to identify the respective owner for example
		                could be a javascript function result - use \\\' to scape the ' 
	 */
	var onbeforeOpenS3 = 'if(singletonRockerCommons.getElement(\'id\').value <= 0){ alert(\'Rockstar yet dont was saved!\'); return false;}';
	//if a rockstar is new Object (dont have a id into a input hidden 'id'), dont open the photo upload form
	var s3user = ''; //your AWS S3 user. 
	var s3password = ''; //your AWS S3 password. 
	var s3region = 'us-west-2'; //your AWS S3 bucket region. 
	var s3bucket = ''; //your AWS S3 bucket name. 
	var s3BaseUrl = 'https://s3-us-west-2.amazonaws.com'; //your AWS S3 base url. 
	var fixedFileName = '\\\'rockstarPhotoOf_\\\' + singletonRockerCommons.getElement(\\\'id\\\').value'; 
	var fileNamePrefix = 'singletonRockerCommons.getElement(\\\'owner\\\').value + \\\'_\\\';';
	arrayFields[i] = new UpperFileS3('rockstarPhotos3','Rock Star PHOTO S3','',200,180,'appenderBase','Choice a Rock Star Photo',20,30,false,['png','gif','pdf'],
			  onbeforeOpenS3,
			 (1024 * 1024),2500,s3user,s3password,s3region,s3bucket,s3BaseUrl,fixedFileName,fileNamePrefix,
			'col-sm-3',false);
	i++;
	
    /**
       getTextForbiddenValidator = function(arrayCharForbidden,maxChars,minChars)
     */
    var forbiddenChars = ['!','@','&','%','+'];
    var validator3 = singletonRockerFormValidator.getTextForbiddenValidator(forbiddenChars,300,20);
    /**
	 	TextArea = function (label,name,defaultValue,cols,rows,width,validator,usingCompletation,
			richEditor,readonly,placeHolder,bootstrapClass,bootstrapNewLine)
	*/
    arrayFields[i] = new TextArea('Biography (Forbidden chars: !,@,&,%,+)','biography','',300,5,800,validator3,true,
			true,false,'Rock Star Biography','col-md-12',false);
    i++;
    
    /**
	 	Appender = function (id,style,clazz,onclick,position,newTabTitle,arrayFields,bootstrapClass,bootstrapNewLine) 
	 	
	 	Creates a internal DIV appender element (internal to a RockerForm).
	 	A Appender creates a DIV element whit the specified 'id', in the relative position to other elements of 'arrayFields'.  
	 	This is useful to create dinamic elements (add a new element on execution time) into a RockerForm, after he was created.
	 	Observe 'this.draw()' method to better understanding.
	 	
	 	Valid values to 'position' : ['topTable','bottomTable','topFields','bottomFields','bottomForm']
	 	try each one of them for better understanding
	 	
	 	- newTabTitle: title to draw the appender into a new BootstrapTab whit this title. 
	 	  If his value is null or the RockerForm[tableOnNewTab] is false, the appender is drawed according the 'position' 
	 	  rule.
	 	  
	 	- arrayFields: a list of components to append into appender and not directly in form.
	 	  Pay atention:
	 	  	- If the appender is outside of the form ( in a other tab for example ), these components are too outside of the form.
	 	  	- Use 'topFields' or 'bottomFields' to append input data elements whit the Appender into a form.
	 	  	- In all cases its strongly recommended that input data elements stay directly in main 'arrayFields' element of the form.
	 	  	- Recommended use of Appender is for special elements construction.
	*/
    arrayFields[i] = new Appender('appender1','background-color: #000;','stylerToAppender1','alert(\'click on: [appender1]\');','bottomTable',null,null,'col-sm-3',true);
    i++;
    
    arrayFields[i] = new Appender('appender2',null,'stylerToAppender2','alert(\'click on: [appender2]\');','bottomTable',null,null,'col-sm-3',false);
    i++;
    
    arrayFields[i] = new Appender('appender3',null,null,'alert(\'click on: [appender3]\');','bottomTable',null,null,'col-sm-3',false);
    i++;
    
    var j = 0;
    var arrayFieldsAppender4 = [];
    /**
		Spacer = function (height,hexColorCode)
		Creates a spacial element to help organize visually the layout/elements.
	*/
    arrayFieldsAppender4[j] = new Spacer(1,'36d43b','col-sm-1',true);
	j++;
	/**
	 	Label = function (value,Spacers,bootstrapClass,bootstrapNewLine)
	 */
	arrayFieldsAppender4[j] = new Label('<strong>Example of use of <span style="color: #01f; font-family: \'Segoe UI\'; font-size: 11px;">' 
								+ 'additionalParamsAndValuesOnRequestTable</span> parameter on form/table</strong>',0,'col-sm-10',false);
	j++;
	
	
	/** 
	  	Using a Spacer as a Line Separator.
	*/
	arrayFieldsAppender4[j] = new Spacer(1,'36d43b','col-sm-1',false);
	j++;
	
	
	/**
	 	Using a Spacer as element mover.
	 */
	arrayFieldsAppender4[j] = new Spacer(0,null,'col-sm-1',true);
	j++;
	
	/**
	 	Button = function (id,value,onclick,style,bootstrapClass,bootstrapNewLine)
	 	
	 	- Pay atention here, to understand the 'additionalParamsAndValuesOnRequestTable' parameter functionality
	 */
	arrayFieldsAppender4[j] = new Button('btRockstarsCurrentUser',
								'See Only Rock Stars Created by Me',
								'singletonInstance.showOnlyRockstarsFromCurrentUser(); ',
								'background-color: #ff0 !important; color: #f63 !important;',
								'col-sm-4',false);
	j++;
	
	/**
	 	Using a Spacer as element mover.
	 */
	arrayFieldsAppender4[j] = new Spacer(0,null,'col-sm-1',false);
	j++;
	
	/**
	 	Button = function (id,value,onclick,style,bootstrapClass,bootstrapNewLine)
	 	
	 	- Pay atention here, to understand the 'additionalParamsAndValuesOnRequestTable' parameter functionality
	 */
	arrayFieldsAppender4[j] = new Button('btAllRockstarsAllUsers',
			'See Rock Stars From All Users',
			'singletonInstance.showAllRockstarsFromAllUsers(); ',
			'background-color: #ff0 !important; color: #f63 !important;',
			'col-sm-4',false);
	j++;
	
	/** 
		Using a Spacer as a Line Separator.
	*/
	arrayFieldsAppender4[j] = new Spacer(2,'7fd0e2','col-sm-12',true);
	j++;
	
	
	/**
	 	Special Appender into another Appender
	 	Pay attention here will draw a table outside a form.
	 */
	arrayFieldsAppender4[j] = new Appender('appender8',null,null,'null',null,null,null,'col-sm-12',true);
	j++;

	
	/**
	 	Special Appender into another Appender
	 */
	arrayFieldsAppender4[j] = new Appender('appender5','background-color: #000;','stylerToAppender5','alert(\'click on: [appender5]\');',null,null,null,'col-sm-4',true);
    j++;
    
    /**
	 	Special Appender into another Appender
	 */
    arrayFieldsAppender4[j] = new Appender('appender6',null,'stylerToAppender6','alert(\'click on: [appender6]\');',null,null,null,'col-sm-4',false);
    j++;
    
    /**
	 	Special Appender into another Appender
	 */
    arrayFieldsAppender4[j] = new Appender('appender7',null,null,'alert(\'click on: [appender7]\');',null,null,null,'col-sm-4',false);
    j++;
    
	arrayFields[i] = new Appender('appender4',null,null,'alert(\'click on: [appender4]\');',null,'Miscelaneous',arrayFieldsAppender4,'col-sm-3',false);
    i++;
    
    arrayFields[i] = new Appender('appender9',null,null,'',null,'Rocker Visual Coder',null,'col-sm-3',false);
    i++;
    
    
    
    return arrayFields;
  };

  this.getArrayTableColumns = function(toBeInternalIntoForm){
	
	var arrayTableColumns = [];
	
	if(toBeInternalIntoForm){
		/**
		 * Column labels 
		 * 		- Last position is always destined for a "actions" column
		 */
	    arrayTableColumns[0] = ['Rockstar Name','Birth Date','Age' ,'Musical Style','Owner User','Actions'];
	    
		/**
		 * Attributes relateds to labels 
		 * 		- Last position is always destined for a "actions" column - use ''
		 */
	    arrayTableColumns[1] = ['name','birthdate','age','style','owner',''];
	    
	    /**
	     * width of each table column.
	     * 		- A negative value make the filter input disable whit same width received.
	     * 		- Zero value the input filter will not exists.
	     * 		- String values separated by ',' (comma) make the conversion of input filter to a select list filter
	     *      with this determined values. Example: 
	     *    		- 'classicrock,poprock,hardrock,metal,heavymetal' change into  ['classicrock','poprock','hardrock','metal','heavymetal']
	     *      - Last position is always destined for a "actions" column - use '0'
	     */
	    arrayTableColumns[2] = [290,-130,60,'classicrock,poprock,hardrock,metal,heavymetal',120,'0'];
	    
	    /**
	     * Use column ordering ASC and DESC
	     * 		- Last position is always reserved for a "actions" column - use 'false'
	     */
	    arrayTableColumns[3] = ['true','false','true','true','true','false'];
	    
	    /**
	     * Specific css class names for each column (when exists)
	     * 		- Last position is always destined for a "actions" column
	     */
	    arrayTableColumns[4] = ['','','','','font: Segoe UI italic 10px !important;',''];
	    
	    /**
	     * Inline css styles for each column (when required)
	     * 		- Last position is always destined for a "actions" column
	     */
	    arrayTableColumns[5] = [
	                            'width: 300px; text-align: left;',
	                            'width: 140px; text-align: left;',
	                            'width: 70px; text-align: right;',
	                            'width: 150px; text-align: left;',
	                            'width: 130px; text-align: left;',
	                            'width: 80px; text-align: left;'
	                           ];
	    /**
	     * Internal column text inline css styles for each column (when required) - text aligning
	     * 		- Last position is always destined for a "actions" column
	     */
	    arrayTableColumns[6] = ['margin-left: 10px;',
	                            'margin-left: 10px;',
	                            'margin-right: 15px;',
	                            'margin-left: 10px;',
	                            'margin-left: 10px;',
	                            'margin-left: 10px;'
	                            ];
	   
	    
	    /**
	    	Creates one or more aditional buttons on 'actions' column of the table.
	    	
	    	3 + 4 positions call the method [showBiography(this.owner,'id');] on object singletonInstance.
	     */
	    var arrayAditionalButtonsTable = [];
	  
	    var arrayBtAd0 = [];
	    arrayBtAd0[0] = '';// inline style - try background-color: #f1f0ec !important; border-color: #ccc !important; too see
	    arrayBtAd0[1] = 'ui-icon-search';// style class
	    arrayBtAd0[2] = 'Show biography';// title
	    arrayBtAd0[3] = 'singletonInstance.showBiography(' + this.owner + ');';//onclick: beetween ( and ) put the additional parameters name separated by ',' (comma)
	    arrayBtAd0[4] = ['id'];// atribute of json object returned, should be a column value of a table or 'id'. 
	    arrayAditionalButtonsTable[0] = arrayBtAd0;
	    
	    arrayTableColumns[7] = arrayAditionalButtonsTable;
	}else{
	    arrayTableColumns[0] = ['Rockstar Name','Biography','Actions'];
	    arrayTableColumns[1] = ['name','biography',''];
	    arrayTableColumns[2] = [290,-410,'0'];
	    arrayTableColumns[3] = ['true','false','false'];
	    arrayTableColumns[4] = ['','',''];
	    arrayTableColumns[5] = [
	                            'width: 300px; text-align: left;',
	                            'width: 420px; text-align: left;',
	                            'width: 50px; text-align: left;'
	                           ];
	    /**
	     * Internal column text inline css styles for each column (when required) - text aligning
	     * 		- Last position is always destined for a "actions" column
	     */
	    arrayTableColumns[6] = ['margin-left: 10px;',
	                            'margin-left: 10px;',
	                            'margin-left: 5px;'
	                            ];
	   
	    
	    /**
	    	Creates one or more aditional buttons on 'actions' column of the table.
	    	
	    	3 + 4 positions call the method [showBiography(this.owner,'id');] on object singletonInstance.
	     */
	    var arrayAditionalButtonsTable = [];
	  
	    var arrayBtAd0 = [];
	    arrayBtAd0[0] = '';// inline style - try background-color: #f1f0ec !important; border-color: #ccc !important; too see
	    arrayBtAd0[1] = 'ui-icon-search';// style class
	    arrayBtAd0[2] = 'Show biography';// title
	    arrayBtAd0[3] = 'singletonInstance.showPhoto();';//onclick: beetween ( and ) put the additional parameters name separated by ',' (comma)
	    arrayBtAd0[4] = ['id'];// atribute of json object returned, should be a column value of a table or 'id'. 
	    arrayAditionalButtonsTable[0] = arrayBtAd0;
	    
	    arrayTableColumns[7] = arrayAditionalButtonsTable;
	}
	
    return arrayTableColumns;  
  };

 
  this.drawAppenders = function(){
	  // 
	  var innerAppender1 = '<p>';
	  innerAppender1 += 'She\'s got a smile it seems to me<br/>';
	  innerAppender1 += 'Reminds me of childhood memories<br/>';
	  innerAppender1 += 'Where everything<br/>';
	  innerAppender1 += 'Was as fresh as the bright blue sky<br/>';
	  innerAppender1 += 'Now and then when I see her face<br/>';
	  innerAppender1 += 'She takes me away to that special place<br/>';
	  innerAppender1 += 'And if I\'d stare too long<br/>';
	  innerAppender1 += 'I\'d probably break down and cry<br/>';
	  innerAppender1 += '<br/>';
	  innerAppender1 += 'Sweet Child O\'Mine (Gun\'s Roses)<br/>';
	  innerAppender1 += '</p>';
	  
	  
	  var innerAppender2 = '<p>';
	  innerAppender2 += 'Shed a tear \'cause I\'m missin\' you<br/>';
	  innerAppender2 += 'I\'m still alright to smile<br/>';
	  innerAppender2 += 'Girl, I think about you every day now<br/>';
	  innerAppender2 += 'Was a time when I wasn\'t sure<br/>';
	  innerAppender2 += 'But you set my mind at ease<br/>';
	  innerAppender2 += 'There is no doubt you\'re in my heart now<br/>';
	  innerAppender2 += '<br/>';
	  innerAppender2 += '<em>Patience (Gun\'s Roses)</em><br/>';
	  innerAppender2 += '</p>';
	  
	  
	  var innerAppender3 = '<p>';
	  innerAppender3 += 'Born to raise hell, born to raise hell<br/>';
	  innerAppender3 += 'We know how to do it and we do it real well<br/>';
	  innerAppender3 += 'Born to raise hell, born to raise hell<br/>';
	  innerAppender3 += 'Voodoo medicine, cast my spell<br/>';
	  innerAppender3 += 'Born to raise hell, born to raise hell<br/>';
	  innerAppender3 += 'Play that guitar just like ringin\' a bell<br/>';
	  innerAppender3 += 'Take it or leave it<br/>';
	  innerAppender3 += '<br/>';
	  innerAppender3 += '<em>Born to raise hell (Motörhead)</em><br/>';
	  innerAppender3 += '</p>';
	  
	  singletonRockerCommons.innerHtml('appender1',innerAppender1);
	  singletonRockerCommons.innerHtml('appender2',innerAppender2);
	  singletonRockerCommons.innerHtml('appender3',innerAppender3);
	  
	  
	  singletonRockerCommons.innerHtml('appender5',innerAppender1);
	  singletonRockerCommons.innerHtml('appender6',innerAppender2);
	  singletonRockerCommons.innerHtml('appender7',innerAppender3);
	  
	  
	  //drawing a special table outside/independent of a RockerForm
	  /**
	    var RockerTable = function(idToInner,title,maxPageButtons,arrayTableColumns,baseActionFilterAndLoad,typeObject,
						deleteAndEditButtons,nameForm,idToInnerForm,requestUpdateOnSetRows,additionalParamsAndValuesOnRequest,printAllowed,onRead){
						
		For interaction whit a RockerForm, its strongly recommended use the RockerTable provided by a RockerForm.
	   */
	  
	  var rockerTable = new RockerTable('appender8','All Rockstars - On a independent RockerTable',
				2,this.getArrayTableColumns(false),
			this.actionForm,this.typeObject,false,null,
			null,true,this.additionalParamsAndValuesOnRequestTable,false,null);
	  
	  new RockerVisualCoder('appender9',this.width - 15);
	  singletonRockerCommons.hide('appender9');
  };
  
  this.draw = function(){
	  
	  // See the console log, this show a use of obfuscation string array
	  new ShaffroindExampler();
	  
	  // See the console log, this show a simple way to use RockerAjaxHandler to make ajax requests and handle 
	  // the result on callback functions
	  new ExampleOfUseOfAjaxHandler(this.actionForm);
	  
	  /**
	  		RockerForm = function(title,idAppenderForm,horizontalAlignFields,width,closable,modal,arrayFields,
							actionForm,onclickSubmit,onclickCancel,textSubmit,textCancel,errorCode,jsonCode,
							posTop, posLeft, titleTable, arrayTableColumns,typeObject,
							additionalParamsAndValuesOnRequestTable,onclose,drawTableOnTop,
							initialLineNumbersTable,visibleButtonsTable,deleteAndEditButtonsOnTable,
							tableOnNewTab,onRead
							)
							
	  		A RockerForm whitout a RockerTable is possible, then should pass a 'null' into a place of 'this.getArrayTableColumns(true)',
	  		but this no make sense in almost of cases.
	   */
	  this.singletonInstanceForm = new RockerForm(this.title,this.idAppenderForm,this.horizontalAlignFields,this.width,this.closable,this.modal,this.getArrayFields(),
				this.actionForm,this.onclickSubmit,this.onclickCancel,this.textSubmit,this.textCancel,this.errorCode,this.jsonCode,
				this.posTop, this.posLeft, this.titleTable, this.getArrayTableColumns(true),this.typeObject,this.aliasObject,
				this.additionalParamsAndValuesOnRequestTable,this.onclose,this.drawTableOnTop,
				this.initialLineNumbersTable,this.visibleButtonsTable,this.deleteAndEditButtonsOnTable,
				this.tableOnNewTab,this.onRead
				);
	  
	  this.drawAppenders();
  };
  
  this.draw();
  // this.drawAppenders(); - here works too - the important is the form already be drawed.
  
  singletonInstance = this;
  
};
