/**
   The application server based on Node JS tecnology.
   
   Go the command pront and type
   node <path to this file> then this server should be running.
   The message on command prompt should be 'Node JS server initiated on server:port.'
*/
var nodeJsHttp = require('http');
var urlHandler = require('url');
var qs = require('querystring');
var fs = require('fs');
var formidable = require('./custom_node_libs/formidable/incoming_form.js');
var util = require('util');
var contentTypes = require('./utils/content-types');
var sysInfo      = require('./utils/sys-info');
var responseHeaders = { 'Content-Type': 'text/html; charset=utf-8',
						'Access-Control-Allow-Origin':'*',
						'Access-Control-Allow-Headers':'X-Requested-With'
					  };
var serverPort = (4040);
var serverHost = ('localhost');
var nodeJsHttpServer = nodeJsHttp.createServer();
nodeJsHttpServer.on('request', 
	  function(req,res) {
			if (req.url == '/health') {
				res.writeHead(200);
				res.end();
				return;
			}
			var urlObject = urlHandler.parse(req.url);
	        var pathname = urlObject.pathname;
			var dataQuery = null;
	        var result = '';
			if (pathname == '/') {
				pathname = '/static/index.html';
			}
			if(pathname.indexOf('static') == 0){
				pathname = '/' + pathname;
			}
			if (pathname.indexOf('/static') == 0 && pathname.indexOf('/uploads') == -1) {
				pathname = '.' + pathname;
				if(pathname.indexOf('?') != -1){
					pathname = pathname.substring(0,pathname.indexOf('?'));
				}
				fs.readFile(pathname, function (err, data) {
				  if (err) {
					res.writeHead(404);
					res.end('Not found: ' + err + ' | pathname => ' + pathname);
				  } else {
					var path = require('path');
					var ext = path.extname(pathname).slice(1);
					if (contentTypes[ext]) {
					  res.setHeader('Content-Type', contentTypes[ext]);
					}
					if (ext === 'html') {
					  res.setHeader('Cache-Control', 'no-cache, no-store');
					}
					res.end(data);
				  }
				});
			}else if(req.method=='POST') {
				if( (pathname.indexOf('/uploadResult') == -1) && (pathname.indexOf('/upload') > 0) ){
					handleUpload(req,res,pathname);
				}else if(pathname.indexOf('/rockstars/static/uploads') == 0){
					serveStaticFile(pathname,res);
				} else{
					var body='';
			        req.on('data', function (data) {
			            body +=data;
			        });
			        req.on('end',function(){
			        	body = replaceAll(body,'?','');
			        	dataQuery =  qs.parse(body);
			        	result = handleData(pathname,dataQuery);
			        	res.writeHead(200, responseHeaders); 
						res.end(result);
			        });
				}
			}else if(req.method=='GET') {
				if(pathname.indexOf('/rockstars/static/uploads') == 0){
					serveStaticFile(pathname,res);
				}else{
					dataQuery = urlHandler.parse(req.url,true).query;
				    result = handleData(pathname,dataQuery);
				    res.writeHead(200, responseHeaders); 
					res.end(result);
				}
			}
	  }
);
nodeJsHttpServer.listen(serverPort,serverHost,function () {
  console.log(`Rocker Show Case Server ${process.pid} started...`);
});

function serveStaticFile(pathname,res){
	var urlFile = '/static/' + pathname.substring(pathname.indexOf('/uploads'));
	var path = require('path');
	var filePath = path.join(__dirname, '' + urlFile);
	//console.log('filePath => ' + filePath);
	try{
		filePath = replaceAll(filePath,'\\','/');
		filePath = replaceAll(filePath,'//','/');
		var stat = fs.statSync(filePath);
		res.writeHead(200, {
				'Content-Type': getExtensionMime(urlFile),
				'Content-Length': stat.size
		});
		var readStream = fs.createReadStream(filePath);
		readStream.pipe(res);
	}catch(error){
		console.log('Error on serveStaticFile: ' + error);
		res.end();
	}
}

function getExtensionMime(path){
	var idx = path.lastIndexOf('.');
	var ext = path.substring(idx + 1);
	var mime = '';
	if(ext == 'jpg' || ext == 'jpeg'){
		mime = 'image/jpeg';
	}else if(ext == 'png'){
		mime = 'image/png';
	}else if(ext == 'gif'){
		mime = 'image/gif';
	}else if(ext == 'bmp'){
		mime = 'image/bmp';
	}else if(ext == 'pdf'){
		mime = 'application/pdf';
	}else if(ext == 'doc' || ext == 'docx'){
		mime = 'application/msword';
	}
	//console.log('mime => ' + mime);
	return mime;
};
/**
 * Auxiliar functions
 */
function replaceAll(str, searched, replacer){
	var pos = str.indexOf(searched);
	while (pos != -1){
		str = str.replace(searched, replacer);
		pos = str.indexOf(searched);
	}
	return str;
};

function showFilesDir(path,recursive){
	fs.readdir(path, function(err, files) {
		if (err) {
			console.log(err.toString());
		}else {
			var files = fs.readdirSync(path);
		    if (files.length > 0) {
				for (var i = 0; i < files.length; i++) {
					var filePath = path + '/' + files[i];
				    //if (fs.statSync(filePath).isFile()){
					    //fs.unlinkSync(filePath);
					    console.log(filePath);
				    //}
					if (recursive && !(fs.statSync(filePath).isFile())){
						showFilesDir(filePath,true);
					}
				}
		    }
	    }
    });
}


/**
 	See https://www.npmjs.com/package/formidable
 */
function handleUpload(req,res,pathname){
    var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	var baseDir = '';
	if(pathname.indexOf('/rockstars') == 0){
		baseDir = "/static/uploads/rockstars";
	}else{
		baseDir = "/static/uploads";
	}
	form.uploadDir = '.' + baseDir;
	form.keepExtensions = true;
	form.maxFieldsSize = 2 * 1024 * 1024;// in bytes
	form.maxFields = 100; 
	form.type = 'multipart';
	form.multiples = false;
	//
	var formid = '';
	var typeObject = '';
	form.on('field', function(name, value) {
		if(name=='typeObject'){
			typeObject = value;
		}else if(name=='formid'){
			formid = value;
		}
	});
	
	var filenames = new Array();
	form.on('file', function(name, file) {
		filenames[filenames.length] = name;
	});
	
	form.parse(req, function(err, fields, files) {
		if(null!=filenames && filenames.length > 0){
			var fPath = files[filenames[0]].path;
			fPath = replaceAll(fPath,'\\','/');
			for(var i = 0; i < filenames.length; i++){
				var urlFile = baseDir + '/' + (fPath.substring(fPath.lastIndexOf('/') + 1));
				//console.log('urlFile => ' + urlFile);
				storeUploadResult(formid,typeObject,urlFile);
			}
		}
		res.writeHead(200, responseHeaders); 
		res.end('Upload received.');
    });
};

function storeUploadResult(formid,typeObject,filepath){
	var uploadInfo = [
			              formid,
			              typeObject,
			              filepath
			             ];
	storeData(uploadInfo);
};


/**
 *  Emulation of a [Controller] for simplification
 */
function handleData(pathname,dataQuery){
	var result = '';
	if(dataQuery.operation == 'exampleOfUseOfAjaxHandler'){
		result = '';
		if(null==dataQuery.expected || undefined==dataQuery.expected || dataQuery.expected==''){
			result = 'null';
		}else if(dataQuery.expected == 'OK'){
			result = 'OK';
		}else if(dataQuery.expected == 'ERROR'){
			result = 'ERROR';
		}else {
			result = 'returning another data result ...';
		}
		return result;
	}
	if(dataQuery.operation == 'uploadResult'){
		//console.log(dataQuery);
		var dataArrayUpload = getData(dataQuery.formid,dataQuery.typeObject);
		if(null!=dataArrayUpload && null!=dataArrayUpload[0]){
			result = dataArrayUpload[0][2];
			result = replaceAll(result,'\\','/');
			dropData(dataQuery.formid,dataQuery.typeObject);//remove from data array
		}else{
			result = '';
		}
		return result;// the upload component wait for a string containing the relativePath of a uploaded file relative to the server root.
	}
	if(pathname.indexOf('/rockstars') == 0){
		if(null!=dataQuery.operation){
			if(dataQuery.operation == 'store'){
				result = 'Rockstar sucessfully ' + storeData(createDataArray(dataQuery)) + '!';
			}else if(dataQuery.operation == 'filterAndLoad'){
				var sortTableAsc = (null!=dataQuery.sortTableAsc && dataQuery.sortTableAsc == 'true');
				var sortTableDesc = (null!=dataQuery.sortTableDesc && dataQuery.sortTableDesc == 'true');
				var selectedPage = dataQuery.selectedPage;
				var selectedRows = dataQuery.selectedRows;
				var numberFilterParams = dataQuery.numberFilterParams;
				var filterParams = new Array();
				for(var i = 0; i < numberFilterParams; i++){// dinamic filter according input fields on table header
					filterParams[filterParams.length] = [dataQuery[ 'attr' + i],dataQuery[ 'valueAttr' + i],null];
				}
				for(var i = 0; i < 100; i++){// fixed filterParams (hard code) on request. 
											 // see [additionalParamsAndValuesOnRequest] on RockerFom/RockerTable constructor call. 
					if(undefined==dataQuery[ 'additionalAtrr' + i] || null==dataQuery[ 'additionalAtrr' + i]){
						break;
					}
					filterParams[filterParams.length] = [
					                                     dataQuery[ 'additionalAtrr' + i],
					                                     dataQuery[ 'valueAdditionalAtrr' + i],
					                                     ((dataQuery[ 'additionalAtrrEqual' + i] == 'true') ? true : false)
					                                     ];
				}
				//console.log(filterParams);
				var allDataArray = getData(null,dataQuery.typeObject);
				var idxBegin = selectedRows * (selectedPage - 1);
				var idxEnd = idxBegin + selectedRows - 1;
				var jsonReturn = '';
				if(null!=allDataArray){
					var filteredData = new Array();
					var sortedData = new Array();
					var paginatedData = new Array();
					for(var i = 0; i < allDataArray.length; i++){
						if(passOnFilterData(allDataArray[i],dataQuery.typeObject,filterParams)){
							filteredData[filteredData.length] = allDataArray[i];
						}
					}
					// sorting block 
					if(sortTableAsc){
						sortedData = sortData(filteredData, dataQuery.typeObject, dataQuery.attributeAsc, true);
					}else if(sortTableDesc){
						sortedData = sortData(filteredData, dataQuery.typeObject, dataQuery.attributeDesc, false);
					}else {
						sortedData = filteredData;
					}
					//console.log(sortedData);
					// sorting block end
					for(var i = idxBegin; i <= idxEnd; i++){
						if(sortedData.length < (i + 1)){
							break;
						}
						paginatedData[paginatedData.length] = sortedData[i];
					}
					jsonReturn += '{"totalObjects":"' + filteredData.length + '","objects":';
					for(var i = 0; i < paginatedData.length; i++){
						jsonReturn += dataToJsonTable(paginatedData[i],dataQuery.typeObject);
					}
					jsonReturn += '}';
				}
				
				result = jsonReturn;
			} else if(dataQuery.operation == 'read'){
				var jsonReturn = '';
				var dataArray = getData(dataQuery.id,dataQuery.typeObject);
				if(null!=dataArray && dataArray.length > 0 && null!=dataArray[0]){
					jsonReturn += dataQuery.jsonCode + dataToJsonForm(dataArray[0],dataQuery.typeObject);
				}else{
					jsonReturn += dataQuery.errorCode + ' Error on read: object whit id => ' + dataQuery.id + ' dont exists.';
				}
				result = jsonReturn;
			} else if(dataQuery.operation == 'delete'){
				if(dropData(dataQuery.id,dataQuery.typeObject)){
					result = 'Sucess on delete!';
				}else{
					result = dataQuery.errorCode + 'Error on delete: object whit id => ' + dataQuery.id + ' dont exists.';
				}
			}
		}
	}
	return result;
};

var sortIdx = -1;
function sortData(dataArray, typeObject, attribute, asc){
	if(typeObject == 'Rockstar'){
		var attrsPos = ['','','name','','style','age','','','','','','','','owner',''];
		sortIdx = -1;
		for(var i = 0; i < attrsPos.length; i++){
			if(attrsPos[i] == attribute){
				sortIdx = i;
				break;
			}
		}
		if(sortIdx >= 0){
			dataArray = dataArray.sort(sortArrayColumn);
			if(!asc){
				dataArray = dataArray.reverse();
			}
		}
	}
	return dataArray;
}
function sortArrayColumn(a, b) {
    if (a[sortIdx] === b[sortIdx]) {
        return 0;
    } else if(a[sortIdx] < b[sortIdx]){
    	return -1;
    } else {
        return  1;
    }
}



/**
 *  Emulation of a [Model][DAO]/[Database storage] for simplification
 */
function generateRandomString(){
    var chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','z','w','y'];
    var randString = '';
    for(var i = 0; i < 15; i++){
      var rand = Math.random();
      var index = parseInt('0' + (rand * 26));
      if(index > 25){
        index = 25;
      }
      randString += chars[index];
    }
    return (new Date().getTime() + '_' + randString);
};

function createDataArray(dataQuery){
	var id = (null!=dataQuery.id && dataQuery.id != '') ? dataQuery.id : generateRandomString();
	if(dataQuery.typeObject == 'Rockstar'){
		var objectArray = [
		              id,
		              dataQuery.typeObject,
		              dataQuery.name,
		              dataQuery.birthdate,
		              dataQuery.style,
		              dataQuery.age,
		              dataQuery.rating,
		              dataQuery.bornengland,
		              dataQuery.pizza,
		              dataQuery.orangejuice,
		              dataQuery.milk,
		              dataQuery.apple,
		              dataQuery.biography,
		              dataQuery.owner,
		              dataQuery.nickname,
					  dataQuery.rockstarPhoto,
					  dataQuery.rockstarPhotos3
		             ];
		return objectArray;
	}
	return null;
}

function passOnFilterData(objectDataArray,typeObject,filterParams){
	var passOnFilter = true;
	if(typeObject == 'Rockstar'){
		var name = objectDataArray[2];
		var age = objectDataArray[5];
		var birthdate = objectDataArray[3];
		var style = objectDataArray[4];
		var owner = objectDataArray[13];
		if(null!=filterParams && filterParams.length > 0){
			for(var i = 0; i < filterParams.length; i++){
				if(null!=filterParams[i] 
						&& null!=filterParams[i][0]
						&& filterParams[i][0] != ''
						&& null!=filterParams[i][1]
						&& filterParams[i][1] != ''
							){
					
					if(filterParams[i][0] == 'name' 
									&& (
									(null==filterParams[i][2] && name.indexOf(filterParams[i][1]) == -1)//dinamic [name like '%name%']
									|| (filterParams[i][2] == false && name.indexOf(filterParams[i][1]) == -1)// fixed [name like '%name%']
									|| (filterParams[i][2] == true && name != filterParams[i][1])// fixed [name = 'name']
									)
					){
						passOnFilter = false;
						break;
					}
					
					if(filterParams[i][0] == 'age' 
									&& (
									(null==filterParams[i][2] && age != filterParams[i][1])
									|| (filterParams[i][2] == false && age.indexOf(filterParams[i][1]) == -1)
									|| (filterParams[i][2] == true && age != filterParams[i][1])
									)
					){
						passOnFilter = false;
						break;
					}
					
					if(filterParams[i][0] == 'birthdate' 
									&& (
									(null==filterParams[i][2] && birthdate.indexOf(filterParams[i][1]) == -1)
									|| (filterParams[i][2] == false && birthdate.indexOf(filterParams[i][1]) == -1)
									|| (filterParams[i][2] == true && birthdate != filterParams[i][1])
									)
									
					){
						passOnFilter = false;
						break;
					}
					
					if(filterParams[i][0] == 'style' 
									&& (
									(null==filterParams[i][2] && style.indexOf(filterParams[i][1]) == -1)
									|| (filterParams[i][2] == false && style.indexOf(filterParams[i][1]) == -1)
									|| (filterParams[i][2] == true && style != filterParams[i][1])
									)
									
					){
						passOnFilter = false;
						break;
					}
					
					if(filterParams[i][0] == 'owner' 
									&& (
									(null==filterParams[i][2] && owner.indexOf(filterParams[i][1]) == -1)
									|| (filterParams[i][2] == false && owner.indexOf(filterParams[i][1]) == -1)
									|| (filterParams[i][2] == true && owner != filterParams[i][1])
									)
									
					){
						//console.log('owner => ' + owner + ' | filter => [' + filterParams[i][2] + ']');
						passOnFilter = false;
						break;
					}
					
				}
			}
		}
	}
	return passOnFilter;
}

/**
 * Take care whit object data that could break the JSON format.
 * Special chars should be correctly handled before the call of methods like [dataToJsonTable] and [dataToJsonForm]
 */
function dataToJsonForm(objectDataArray,typeObject){
	var json = '';
	if(typeObject == 'Rockstar'){
		var id = objectDataArray[0];
		var name = objectDataArray[2];
		var birthdate = objectDataArray[3];
		var style = objectDataArray[4];
		var age = objectDataArray[5];
		var rating = objectDataArray[6];
		var bornengland = objectDataArray[7];
        var pizza = objectDataArray[8];
        var orangejuice = objectDataArray[9];
        var milk = objectDataArray[10];
        var apple = objectDataArray[11];
        var biography = objectDataArray[12];
        var nickname = objectDataArray[14];
		var rockstarPhoto = objectDataArray[15];
		var rockstarPhotoS3 = objectDataArray[16];
        var preferencesArray = '[' + pizza + ',' + orangejuice + ',' + milk + ',' + apple + ']';
		json += '{';
		json += '"id":"' + id + '"';
		json += ',"name":"' + name  + '"';
		json += ',"age":"' + age  + '"';
		json += ',"birthdate":"' + birthdate  + '"';
		json += ',"style":"' + style + '"';
		json += ',"rating":"' + rating + '"';
		json += ',"bornengland":"' + bornengland + '"';
		json += ',"preferences":"' + preferencesArray + '"';
		json += ',"biography":"' + biography + '"';
		json += ',"nickname":"' + nickname + '"';
		json += ',"rockstarPhoto":"' + rockstarPhoto + '"';
		json += ',"rockstarPhotos3":"' + rockstarPhotoS3 + '"';
		json += '}';
	}
	return json;
}

/**
 * Take care whit object data that could break the JSON format.
 * Special chars should be correctly handled before the call of methods like [dataToJsonTable] and [dataToJsonForm]
 */
function dataToJsonTable(objectDataArray,typeObject){
	var json = '';
	if(typeObject == 'Rockstar'){
		var id = objectDataArray[0];
		var name = objectDataArray[2];
		var age = objectDataArray[5];
		var birthdate = objectDataArray[3];
		var style = objectDataArray[4];
		var owner = objectDataArray[13];
		var biography = objectDataArray[12];
		json += '{';
		json += '"id":"' + id + '"';
		json += ',"name":"' + name  + '"';
		json += ',"age":"' + age  + '"';
		json += ',"birthdate":"' + birthdate  + '"';
		json += ',"style":"' + style + '"';
		json += ',"owner":"' + owner + '"';
		json += ',"biography":"' + biography + '"';
		json += '}';
	}
	return json;
}



var dataStorage = new Array();
function createInitialData(){
	var rocker1 = ['1','Rockstar','John Winston Lennon','09/10/1940','classicrock','40','100.00',
			       'true','true','false','true','false',
			       'became involved in the skiffle craze as a teenager; his first band, the Quarrymen, first became the Silver Beatles, and finally, evolved into the Beatles in 1960.',
			       'SYSTEM','John Lennon','',''];
	var rocker2 = ['2','Rockstar','James Paul McCartney','18/06/1942','classicrock','75','100.01',
			       'true','true','true','false','false',
			       'McCartney has been recognised as one of the most successful composers and performers of all time',
			       'SYSTEM','Paul McCartney','',''];
	var rocker3 = ['3','Rockstar','Lewis Brian Hopkin Jones','28/02/1942','hardrock','27','85.23',
			       'true','false','false','true','false',
			       'Jones\'s fellow band members Mick Jagger and Keith Richards took over the band\'s musical direction, especially after they became a successful songwriting team',
			       'SYSTEM','Brian Jones','',''];
	var rocker4 = ['4','Rockstar','Michael Philip (Mick) Jagger','26/06/1946','hardrock','69','130.33',
			       'true','true','true','true','true',
			       'Jagger\'s career has spanned over 55 years, and he has been described as \'one of the most popular and influential frontmen in the history of rock &amp; roll\'',
			       'SYSTEM','Mick Jagger','',''];
	var rocker5 = ['5','Rockstar','Ian Fraiser (Lemmy) Kilmister','24/12/1945','heavymetal','60','220.66',
			       'true','false','false','false','true',
			       'better known as Lemmy, was an English musician, singer, and songwriter who founded and fronted the rock band Motorhead.',
			       'SYSTEM','Lemmy Kilmister','',''];
	var rocker6 = ['6','Rockstar','James Marshall (Jimi) Hendrix','27/11/1942','poprock','27','110.32',
			       'false','false','true','false','false',
			       'Born in Seattle, Washington, Hendrix began playing guitar at the age of 15. In 1961, he enlisted in the U.S. Army',
			       'SYSTEM','Jimi','',''];
	var rocker7 = ['7','Rockstar','Willian Axl Rose','06/02/1962','hardrock','55','300.99',
			       'false','true','true','true','false',
			       'Willian Axl Rose is an American singer, songwriter, record producer and musician. He is the lead vocalist of the hard rock band Guns N\' Roses',
			       'SYSTEM','Axl Rose','',''];
	var rocker8 = ['8','Rockstar','Eric Patrick Clapton','30/03/1945','hardrock','72','290.88',
			       'true','true','true','true','false',
			       'Clapton has been referred to as one of the most important and influential guitarists of all time.',
			       'SYSTEM','Clapton','',''];
	
	storeData(rocker1);
	storeData(rocker2);
	storeData(rocker3);
	storeData(rocker4);
	storeData(rocker5);
	storeData(rocker6);
	storeData(rocker7);
	storeData(rocker8);
	
}
createInitialData();


function storeData(dataObject){
	return addToStorage(dataObject,dataStorage);
}
function getData(id,typeObject){
	return getFromStorage(id,typeObject,dataStorage);
}
function dropData(id,typeObject){
	return dropFromStorage(id,typeObject,dataStorage);
}
function getFromStorage(id,typeObject,array){
	var results = [];
	var size = array.length;
	for(var i = 0; i < size; i++){
		if(null==array[i]){
			continue;
		}
		if(null!=array[i][1] && array[i][1] == typeObject){
			if(null!=id && (null==array[i][0] || array[i][0] != id)){
				continue;
			}
			if(null!=array[i][2]){
				results[results.length] = array[i][2];// load all objects of a typeObject, and whit a id (if specified)
			}
		}
	}
	return results;
};
function dropFromStorage(id,typeObject,array){
	if(null==id){
		return false;
	}
	var size = array.length;
	for(var i = 0; i < size; i++){
		if(null==array[i]){
			continue;
		}
		if(null!=array[i][1] && array[i][1] == typeObject){
			if(null==array[i][0] || array[i][0] != id){
				continue;
			}
			array[i][2] = null;// delete
			return true;
		}
	}
	return false;
};
function addToStorage(object,array){
	var pos = -1;
	var size = array.length;
	for(var i = 0; i < size; i++){
		if(null==array[i]){
			continue;
		}
		if(array[i][0] == object[0]){
			pos = i;
			break;
		}
	}
	if(pos >= 0){ // update
		array[pos][1] = object[1];
		array[pos][2] = object;
		return 'Updated';
	}else{ // create new
		array[size] = [object[0], object[1], object];
		return 'Created';
	}
};

