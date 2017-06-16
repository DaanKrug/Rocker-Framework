var tableFooter = function(idTable,idToInner,maxPageButtons,arrayTableColumns,baseActionFilterAndLoad,typeObject,
				deleteAndEditButtons,nameForm,idToInnerForm,requestUpdateOnSetRows,additionalParamsAndValuesOnRequest,onRead){
	this.idTable = idTable;
	this.baseInputFilters = this.idTable + '_inputFilter_';
	this.idToInner = idToInner;
	this.selectedPage = 1;
	this.pages = 1;
	this.rows = null;
	this.maxPageButtons = (null!=maxPageButtons && maxPageButtons >= 1) ? maxPageButtons : 5;
	this.arrayLines = new Array();
	this.initialPage = 1;
	this.finalPage = 1;
	this.selectedRows = null;
	this.hasNext = false;
	this.hasPrevious = false;
	this.columnNumber = null;
	this.colNames = null;
	this.colAtrributes = null;
	this.colUserFilters = null;
	this.colUseOrdering = null;
	this.colClasses = null;
	this.colStyles = null;
	this.arrayAditionalButtonsTable = null;
	this.internalColStyles = null;
	this.baseActionFilterAndLoad = baseActionFilterAndLoad;
	this.typeObject = typeObject;
	this.deleteAndEditButtons = deleteAndEditButtons;
	this.nameForm = nameForm;
	this.idToInnerForm = idToInnerForm;
	this.urlOrder = '&sortTableAsc=false&sortTableDesc=false';
	this.urlFilter = null;
	this.requestUpdateOnSetRows = requestUpdateOnSetRows;
	this.additionalParamsAndValuesOnRequest = additionalParamsAndValuesOnRequest;
	this.typeObjectAlias = null;
	this.onRead = onRead;
	if((null!=arrayTableColumns && arrayTableColumns.length > 0)){
		this.columnNumber = (null!=arrayTableColumns[0] && arrayTableColumns[0].length > 0) ? arrayTableColumns[0].length : 0;
		this.colNames = arrayTableColumns[0];
		this.colAtrributes = arrayTableColumns[1];
		this.colUserFilters = arrayTableColumns[2];
		this.colUseOrdering = arrayTableColumns[3];
		this.colClasses = arrayTableColumns[4];
		this.colStyles = arrayTableColumns[5];
		this.internalColStyles = arrayTableColumns[6];
		this.arrayAditionalButtonsTable = arrayTableColumns[7];
		if(null!=arrayTableColumns[8]){
			this.typeObjectAlias = arrayTableColumns[8];
		}
	}
	this.getInnerActionsColumn = function(columnNumber,id,label,obj){
		var inner = '';
		var aditionalScript = null;
		var aditionalnner = ''; 
		var size = 0;
		var sClick = '';
		if(null!=this.arrayAditionalButtonsTable && this.arrayAditionalButtonsTable.length > 0){
			size = this.arrayAditionalButtonsTable.length;
			for(var i = 0; i < size; i++){
				var style = '';
				var clazz = '';
				var title = '';
				var onclick = '';
				var attrsParam = null;
				if(null!=this.arrayAditionalButtonsTable[i] && this.arrayAditionalButtonsTable[i].length > 0){
					var col = 0;
					style = (null!=this.arrayAditionalButtonsTable[i][col] 
						&& this.arrayAditionalButtonsTable[i][col] != '') ? this.arrayAditionalButtonsTable[i][col] : '';
					col ++;
					clazz = (null!=this.arrayAditionalButtonsTable[i][col] 
						&& this.arrayAditionalButtonsTable[i][col] != '') ? this.arrayAditionalButtonsTable[i][col] : '';
					col ++;
					title = (null!=this.arrayAditionalButtonsTable[i][col] 
						&& this.arrayAditionalButtonsTable[i][col] != '') ? this.arrayAditionalButtonsTable[i][col] : '';
					col ++;
					onclick = (null!=this.arrayAditionalButtonsTable[i][col] 
						&& this.arrayAditionalButtonsTable[i][col] != '') ? this.arrayAditionalButtonsTable[i][col] : '';
					col ++;
					attrsParam = (null!=this.arrayAditionalButtonsTable[i][col] 
						&& this.arrayAditionalButtonsTable[i][col].length > 0) ? this.arrayAditionalButtonsTable[i][col] : null;
				}
				sClick = '';
				if(onclick!=''){
					try{
						var additionalParams = '';
						var idxp1 = onclick.indexOf('(');
						var idxp2 = onclick.indexOf(')');
						if(idxp1 != -1){
							if(idxp2 != -1 && ((idxp2 - idxp1) > 1)){
								var additionalParamsAux = onclick.substring(onclick.indexOf('('),onclick.indexOf(')'));
								additionalParamsAux = additionalParamsAux.replace('(','');
								additionalParamsAux = additionalParamsAux.replace(')','');
								if(additionalParamsAux.indexOf(',') != -1){
									var arr = additionalParamsAux.split(',');
									var size = arr.length;
									var countAux = 0;
									for(var j = 0; j < size; j++){
										if(null!=arr[j] && arr[j] != ''){
											if(countAux > 0){
												additionalParams += ',';
											}
											additionalParams += '\'' + arr[j] + '\'';
											countAux ++;
										}
									}
								}else{
									additionalParams = '\'' + additionalParamsAux + '\'';
								}
							}
							sClick = onclick.substring(0,onclick.indexOf('('));
						}else{
							sClick = onclick;
						}
						if(null!=attrsParam || additionalParams != ''){
							var sizeParams = attrsParam.length;
							sClick += "(";
							var comma = false;
							if(additionalParams != ''){
								comma = true;
								sClick += additionalParams;
							}
							if(null!=attrsParam){
								var count = 0;
								for(var j =0; j < sizeParams; j++){
									var attrName = attrsParam[j];
									if(null!=attrName && attrName!=''){
										var size3 = obj.length;
										for(var k = 0; k < size3; k++){
											if(attrName == obj[k][0]){
												if(count > 0 || comma){
													sClick += ",";
												}
												sClick +=  ('\'' + obj[k][1] + '\'');
												count ++;
												break;
											}
										}		
									}
								}
							}
							sClick += ");";
						}else{
							sClick += "();";
						}
					}catch(error){console.log(error);}
				}
				aditionalnner += '<div id="bt_' + i + '_' + this.idTable +  '_' + id + '" ';
				if(title!=''){
					aditionalnner += ' title="'+ title +'" ';
				}
				if(clazz!=''){
					aditionalnner += ' class="rockerTableButton ui-widget-content ui-icon '+ clazz +' ui-corner-all"';
				}
				if(sClick!=''){
					aditionalnner += ' onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tableActionButton\',500))){return;} '+ sClick +'" ';
				}
				aditionalnner += ' style="'+ style +'">';
				aditionalnner += '</div>';
			}
		}
		inner += '<div style="display: inline; float: left;" class="rockerTableColumnActions" onclick="return singletonRockerCommons.stopPropagation(event);">';
		var innerAux = '';
		if(this.deleteAndEditButtons){
			innerAux += '<div class="rockerTableButton ui-widget-content ui-icon ui-icon-pencil ui-corner-all" ';
			innerAux += ' onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tableActionButton\',500))){return;} singletonRockerStorage.makeRequestDataReadTable(\''+ this.idTable +'\',\''+ id +'\');';
			innerAux += 'setTimeout(function(){' + this.onRead + '},300);"></div>';
			innerAux += '<div class="rockerTableButton ui-widget-content ui-icon ui-icon-trash ui-corner-all"  ';
			if(null!=label && label!= ''){
				var msgDeleteLabel = singletonRockerI18n.getMessage('RockerTable.confirmExclusionLabel',[label]);
				innerAux += ' onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tableActionButton\',500))){return;} if(!confirm(\''+ msgDeleteLabel +'\')){return false;}';
			}else{
				var msgDeleteId = singletonRockerI18n.getMessage('RockerTable.confirmExclusionId',[this.typeObject,id]);
				innerAux += ' onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tableActionButton\',500))){return;} if(!confirm(\'' + msgDeleteId + '\')){return false;}';
			}
			innerAux += ' singletonRockerStorage.makeRequestDataDeleteTable(\''+ this.idTable +'\',\''+ id +'\');"></div>';
			if(aditionalnner!=''){
				innerAux += aditionalnner;
			}
		}else if(aditionalnner!=''){
			innerAux += aditionalnner;
			if(size == 1){
				aditionalScript = sClick;
			}
		}
		if(null!=this.internalColStyles && this.internalColStyles.length > columnNumber){
			if(null!=this.internalColStyles[columnNumber] && this.internalColStyles[columnNumber] != ''){
				inner += '<div style="'+ this.internalColStyles[columnNumber] +'">';
				inner += innerAux;
				inner += '</div>';
			}else{
				inner += innerAux;
			}
		}else{
			inner += innerAux;
		}
		inner += '</div>';
		var result = [];
		result[0] = inner;
		if(null!=aditionalScript){
			result[1] = aditionalScript;
		}
		return result;
	};
	this.getInnerColumnData = function(columnNumber,value){
		try{
			value = singletonRockerCripter.decriptTrunk(value);
			var inner = '';
			var clazz = (null!=this.colClasses && null!=this.colClasses[columnNumber]) ? this.colClasses[columnNumber] : '';
			var style = ' style="display: inline; float: left;';
			style += (null!=this.colStyles && null!=this.colStyles[columnNumber]) ? this.colStyles[columnNumber]  : '';
			style += '" ';
			inner += '<div class="rockerTableColumn '+ clazz +'" '+ style +'>';
			if(null!=this.internalColStyles && this.internalColStyles.length > columnNumber){
				if(null!=this.internalColStyles[columnNumber] && this.internalColStyles[columnNumber] != ''){
					inner += '<div style="'+ this.internalColStyles[columnNumber] +'">';
					inner += value;
					inner += '</div>';
				}else{
					inner += value;
				}
			}else{
				inner += value;
			}
			inner += '</div>';
			return inner;
		}catch(error){console.log('Error on getInnerColumnData: '+ error);}
	};
	this.getArrayObjectsFromJson = function(jsonString){
		try{
			if(null==jsonString){
				return null;
			}
			var objectsArraySplit = jsonString.split('objects');
			var data = objectsArraySplit[1];
			if(null==data || data == ''){return null;}
			data = data.replace(':','');
			data = data.replace('"','');
			data = data.substring(0,data.length - 1);
			var objects = data.split("{");
			var size = objects.length;
			var resultObjects = [];
			for(var i = 0; i < size; i++){
				if(null!=objects[i] && objects[i]!='' && objects[i].length > 0){
					var sData = objects[i].substring(0,objects[i].length - 1);
					var arrAux1 = sData.split(',');
					var arrayAttr = [];
					if(null!=arrAux1 && arrAux1!='' && arrAux1.length > 0){
						var size2 = arrAux1.length;
						for(var j = 0; j < size2; j++){
							var arrAux2 = arrAux1[j].split(':');
							if(null!=arrAux2 && arrAux2!='' && arrAux2.length > 0){
								var key = '';
								var value = '';
								if(null!=arrAux2[0] && arrAux2[0] != '' && arrAux2[0].length > 2){
									key = arrAux2[0].substring(1,arrAux2[0].length - 1);
									if(null!=arrAux2[1] && arrAux2[1] != '' && arrAux2[1].length > 2){
										value = arrAux2[1].substring(1,arrAux2[1].length - 1);
										value = singletonRockerConverterChars.convertToFromDatabase(value,false,false,false,0);
									}
									arrayAttr[arrayAttr.length] = [key,value];
								}
							}
						}
					}
					if(null!=arrayAttr && arrayAttr!='' && arrayAttr.length > 0){
						resultObjects[resultObjects.length] = arrayAttr;
					}
				}
			}
			return resultObjects;
		}catch(error){console.log('Error on getArrayObjectsFromJson: '+ error);}
	};
	this.getNumberObjectsFromJson = function(jsonString){
		var arrObjectNumberSplit = jsonString.split('objects');
		var numberObjects = arrObjectNumberSplit[0];
		numberObjects = numberObjects.split(':');
		numberObjects = numberObjects[1].substring(1,numberObjects[1].length - 3);
		return numberObjects;
	};
	this.getInnerSubHeaderTable = function(valueTextSubHeader){
		var inner = '';
		if(null!=valueTextSubHeader){
			valueTextSubHeader = singletonRockerCommons.trim(valueTextSubHeader);
			if(valueTextSubHeader != ''){
				inner += '<div class="rockerTableSubHeader ui-widget-header">';
				inner += valueTextSubHeader;
				inner += '<div>';
			}
		}
		return inner;
	};
	this.getInnerSubFooterTable = function(valueTextSubFooter){
		var inner = '';
		if(null!=valueTextSubFooter){
			valueTextSubFooter = singletonRockerCommons.trim(valueTextSubFooter);
			if(valueTextSubFooter != ''){
				inner += '<div class="rockerTableSubFooter ui-widget-header">';
				inner += valueTextSubFooter;
				inner += '<div>';
			}
		}
		return inner;
	};
	this.setJsonObjectList = function(jsonString){
		if(null==this.colAtrributes || !(this.colAtrributes.length > 0) ){
			return;
		}
		try{
			if(null==jsonString){return;}
			var objects = this.getArrayObjectsFromJson(jsonString);
			if(null==objects){
				return;
			}
			var innerSubHeader = null;
			var innerSubFooter = null;
			var size = objects.length;
			var inner = '';
			for(var i = 0; i < size; i++){
				if(null!=objects[i] ){
					var obj = objects[i];
					if(null!=obj && obj.length > 0){
						var innerActions = '';
						var findInnerActions = false;
						var findInnerSubHeader = false;
						var findInnerSubFooter = false;
						var onclickOnRow = null;
						var innerAux = '';
						inner += '<div class="rockerRowTable'+ (i%2) +' ui-widget-content ' + ((i%2) == 0 ? '' : 'ui-state-default') + ' " ';
						var size2 = this.colAtrributes.length;
						for(var j = 0; j < size2; j++){
							var size3 = obj.length;
							for(var k = 0; k < size3; k++){
								if(!findInnerActions){
									if(null!=obj[k] && obj[k][0] == 'id' && obj[k][0].indexOf('id') == 0 && obj[k][0].length == 2){
										var label = ' ' + ((null!=this.typeObjectAlias && this.typeObjectAlias != '') ? this.typeObjectAlias : (' ' + this.typeObject) );
										var arrayResult = this.getInnerActionsColumn((size2-1),obj[k][1],label,obj);
										innerActions += arrayResult[0];
										if(arrayResult.length > 1){
											if(null!=arrayResult[1]){
												//onclickOnRow = ' onclick="' + arrayResult[1] + ' return singletonRockerCommons.stopPropagation(event);" ';
												// TODO
											}
										}
										findInnerActions = true;
									}
								}
								if(null!=obj[k]){
									if(null!=obj[k] && obj[k][0] == 'headerRockerTable' && obj[k][0].indexOf('headerRockerTable') == 0){//TODO
										if(!findInnerSubHeader){
											innerSubHeader = this.getInnerSubHeaderTable(obj[k][1]);
											findInnerSubHeader = true;
										}
									}else if(null!=obj[k] && obj[k][0] == 'footerRockerTable' && obj[k][0].indexOf('footerRockerTable') == 0){//TODO
										if(!findInnerSubFooter){
											innerSubFooter = this.getInnerSubFooterTable(obj[k][1]);
											findInnerSubFooter = true;
										}
									}
									else if(this.colAtrributes[j] == obj[k][0]){
										innerAux += this.getInnerColumnData(j,obj[k][1]);
									}
								}
							}
						}
						if(null!=onclickOnRow){
							inner += onclickOnRow;
							inner += ' style="cursor: pointer;" ';
						}
						inner += ' > ';
						inner += innerAux;
						inner += innerActions;
						inner += '<div style="clear: both;"></div>';
						inner += '</div>';
						inner += '<div style="clear: both;"></div>';
					}
				}
			}
			var numberObjects = this.getNumberObjectsFromJson(jsonString);
			if(!(numberObjects > 0)){
				numberObjects = 1;
			}
			this.arrayLines = new Array();
			var paginatorIncrement = 5;
			for(var i = 5; i < (numberObjects + paginatorIncrement); i+= paginatorIncrement){
				if(i > 0 && i%50 == 0){
					paginatorIncrement += 50;
				}
				this.arrayLines[this.arrayLines.length] = i;
				if(i > 1000 || i > numberObjects){
					break;
				}
			}
			this.setRowsNoRequest(numberObjects);
			singletonRockerStorage.setInnerBodyTable(this.idTable,inner);
			if(null!=innerSubHeader && innerSubHeader != ''){
				singletonRockerStorage.setInnerSubHeaderTable(this.idTable,innerSubHeader);
			}
			if(null!=innerSubFooter && innerSubFooter != ''){
				singletonRockerStorage.setInnerSubFooterTable(this.idTable,innerSubFooter);
			}
		}catch(error){console.log('Error on setJsonObjectList: ' + error);}
	};
	this.draw = function(){
		try{
			this.setSelectedPageAndAdjustNavigation(this.selectedPage);
			var inner = '<div class="rockerTableFooter ui-widget-header ui-corner-bottom">';
			inner += '<div';
			if(this.hasPrevious){
				inner += ' class="rockerScrollerTableButton ui-widget-content ui-icon ui-icon-triangle-1-w ui-corner-all" onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tableNavButton\',1000))){return;}';
				inner += ' singletonRockerStorage.previousPageTable(\''+ this.idTable +'\');" ';
			}else{
				inner += ' class="rockerScrollerTableButtonDisabled ui-widget-content ui-icon ui-icon-triangle-1-w ui-corner-all" ';
			}
			inner+= '></div>';
			for(var i = this.initialPage; i <= this.finalPage; i++){
				if(i == this.selectedPage){
					inner += '<div class="rockerScrollerTableButtonSelected ui-widget-content ui-corner-all" onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tableNavButton\',1000))){return;}';
					inner += ' singletonRockerStorage.navigatePageTable(\'';
					inner += this.idTable +'\','+ i +');">'+ i +'</div>';
				}else{
					inner += '<div class="rockerScrollerTableButton ui-widget-content ui-corner-all" onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tableNavButton\',1000))){return;}';
					inner += ' singletonRockerStorage.navigatePageTable(\'';
					inner += this.idTable +'\','+ i +');">'+ i +'</div>';
				}
			}
			inner += '<div';
			if(this.hasNext){
				inner += ' class="rockerScrollerTableButton ui-widget-content ui-icon ui-icon-triangle-1-e ui-corner-all" onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tableNavButton\',1000))){return;}';
				inner += ' singletonRockerStorage.nextPageTable(\''+ this.idTable +'\');" ';
			}else{
				inner += ' class="rockerScrollerTableButtonDisabled ui-widget-content ui-icon ui-icon-triangle-1-e ui-corner-all" ';
			}
			inner+= '></div>';
			inner += '<div class="rockerInput ui-corner-all">';
			inner += '<select name="selectRows'+ this.idTable +'" onchange="singletonRockerStorage.setSelectedRowsPageTable(\'';
			inner += this.idTable +'\',this.value);">';
			var size = this.arrayLines.length;
			for(var i = 0; i < size; i++){
				inner += '<option value="' + this.arrayLines[i] + '" ';
				inner += ((this.arrayLines[i] == this.selectedRows) ? ' selected="selected" ' : '');
				inner += ' >';
				inner += this.arrayLines[i];
				inner += '</option>';
			}
			inner += '</select>';
			inner += '</div>';
			inner += '<div id="div_clearAndReloaderNavigator_'+ this.idTable;//
			inner += '" style="clear: both;" onclick="singletonRockerStorage.resetJsForm(\''+ this.nameForm +'\');"></div>';
			inner += '</div>';
			singletonRockerCommons.getElement(this.idToInner).innerHTML = inner;
		}catch(error){
			console.log('Error on draw:' + error);
		}
	};
	this.setSelectedRowsNoRequest = function(selectedRows){
		this.selectedRows = selectedRows;
		this.pages = (parseInt(this.rows/this.selectedRows)) + (((this.rows%this.selectedRows ) != 0) ? 1 : 0);
		if(this.pages <= this.maxPageButtons){
			this.initialPage = 1;
			this.finalPage = this.pages;
		}else{
			var div = parseInt((this.maxPageButtons/2));
			var mod = (this.maxPageButtons%2);
			if(this.selectedPage < div){
				this.initialPage = 1;
				this.finalPage = this.maxPageButtons;
				if(this.finalPage > this.pages){
					this.finalPage = this.pages;
				}
			}else{
				this.finalPage = this.selectedPage + div + mod;
				if(this.finalPage > this.pages){
					this.finalPage = this.pages;
				}
				this.initialPage = (this.finalPage - this.maxPageButtons) + 1;
			}
		}
		this.draw();
	};
	this.makeUrlFilter = function(){
		this.urlFilter = '';
		if(null!=this.colAtrributes && this.colAtrributes.length > 0 && null!=this.colUserFilters){
			var size = this.colAtrributes.length;
			var countAttrs = 0;
			for(var i = 0; i < size; i++){
				if(null!=this.colAtrributes[i] && this.colAtrributes[i] != ''){
					if(null!=this.colUserFilters[i]){
						if(
							(singletonRockerCommons.isNumber(this.colUserFilters[i]) && this.colUserFilters[i] > 0)
							||
							(!(singletonRockerCommons.isNumber(this.colUserFilters[i])) && singletonRockerCommons.trim(this.colUserFilters[i]).length > 0)
						){
							var idCampo = this.baseInputFilters + this.colAtrributes[i];
							var elem = singletonRockerCommons.getElement(idCampo);
							if(null!=elem){
								var value = singletonRockerCommons.trim(elem.value);
								if(null!=value && value!=''){
									value = singletonRockerConverterChars.convertToFromDatabase(value,true,false,false,0);
									value = encodeURIComponent(value);
									this.urlFilter += ( '&attr' + countAttrs + '=' + this.colAtrributes[i] + '&valueAttr' + countAttrs + '=' + value);
									countAttrs ++;
								}
							}
						}
					}
				}
			}
			this.urlFilter = '&numberFilterParams='+ countAttrs + this.urlFilter;
		}
	};
	this.makeRequestDataRead = function(objectId){
		var url = this.baseActionFilterAndLoad + '?v=' + new Date().getTime();
		url += '&operation=read&id=' + objectId + '&typeObject=' + this.typeObject;
		var form = singletonRockerStorage.getJsForm(this.nameForm);
		url += '&errorCode=' + form.errorCode;
		url += '&jsonCode=' + form.jsonCode;
		url += this.additionalParamsAndValuesOnRequest;
		singletonRockerAjax.makeRequest(url,this.nameForm,this.idToInnerForm);
	};
	this.makeRequestDataDelete = function(objectId){
		var url = this.baseActionFilterAndLoad + '?v=' + new Date().getTime();
		url += '&operation=delete&id=' + objectId + '&typeObject=' + this.typeObject;
		var form = singletonRockerStorage.getJsForm(this.nameForm);
		url += '&errorCode=' + form.errorCode;
		url += '&jsonCode=' + form.jsonCode;
		url += this.additionalParamsAndValuesOnRequest;
		var idToClickOnComplete = 'div_clearAndReloaderNavigator_'+ this.idTable;
		singletonRockerAjax.makeRequest2(url,this.nameForm,this.idToInnerForm,idToClickOnComplete);
	};
	this.makeRequestDataUpdate = function(){
		this.makeUrlFilter();
		var url = this.baseActionFilterAndLoad + '?v=' + new Date().getTime();
		if(!(this.additionalParamsAndValuesOnRequest.indexOf('operation') != -1)){
			url += '&operation=filterAndLoad';
		}
		if(null!=this.urlOrder){
			url += this.urlOrder;
		}
		if(null!=this.urlFilter){
			url += this.urlFilter;
		}
		url += '&selectedPage=' + this.selectedPage;
		url += '&selectedRows=' + this.selectedRows;
		url += '&typeObject=' + this.typeObject;
		url += this.additionalParamsAndValuesOnRequest;
		singletonRockerAjax.makeRequestTableScroller(url,this.idTable,null);
	};
	this.tIntervalPrintComplete = null;
	this.wasPrint = function(doc,div,actualRows,node,allRootElements){
		if(null!=this.tIntervalPrintComplete){
			clearInterval(this.tIntervalPrintComplete);
			this.tIntervalPrintComplete = null;
			this.showHideElementsOnPrint(allRootElements,false);
			if(null!=div){
				div.style.display = 'none';
			}
			if(null!=doc){
				doc.style.display = 'block';
			}
			if(null!=node){
				document.body.removeChild(node);
			}
			this.setSelectedRows(actualRows);
		}
	};
	this.showHideElementsOnPrint = function(allRootElements,toHide){
		for(var i = 0; i < allRootElements.length; i++){
			allRootElements[i].style.display = (toHide) ? 'none' : 'block';
		}
	};
	this.print = function(actualRows,selectedRows,idExtern,mainDocElementId,allRootElements){
		this.setSelectedRowsNoRequest(selectedRows);
		this.makeUrlFilter();
		var url = this.baseActionFilterAndLoad + '?v=' + new Date().getTime();
		if(!(this.additionalParamsAndValuesOnRequest.indexOf('operation') != -1)){
			url += '&operation=filterAndLoad';
		}
		if(null!=this.urlOrder){
			url += this.urlOrder;
		}
		if(null!=this.urlFilter){
			url += this.urlFilter;
		}
		url += '&selectedPage=' + this.selectedPage;
		url += '&selectedRows=' + this.selectedRows;
		url += '&typeObject=' + this.typeObject;
		url += this.additionalParamsAndValuesOnRequest;
		var footerThis = this;
		var wasSendNull = false;
		var http_request = singletonRockerAjax.getHttpRequest();
		http_request.open("GET", url, true);
		http_request.onreadystatechange = function(){
			if (http_request.readyState == 4) { 
				if (http_request.status == 200 || http_request.status == 0){ 
					try{
						var inner = http_request.responseText;
						if(null!=inner && inner!=''){
							var json = singletonRockerCommons.trim(inner);
							footerThis.setJsonObjectList(json);
							var doc =  document.getElementById(mainDocElementId);
							var divToPrint =  document.getElementById(idExtern);
							var idTemp = 'div_tempImpress_' + new Date().getTime();
							var node = null;
							var div = null;
							try{
								node = document.createElement("div");
								node.id = idTemp;
								node.className = 'rockerPrintDiv';
								document.body.insertBefore(node,doc);
								div = node;
								doc.style.display = 'none';
								div.innerHTML = divToPrint.innerHTML;
								div.style.display = 'block';
								footerThis.showHideElementsOnPrint(allRootElements,true);
								window.print();
								footerThis.tIntervalPrintComplete = setInterval( function(){footerThis.wasPrint(doc,div,actualRows,node,allRootElements);},10);
							}catch(error){
								footerThis.tIntervalPrintComplete = setInterval( function(){footerThis.wasPrint(doc,div,actualRows,node,allRootElements);},10);
								alert('RockerTable print problem: ' + error);
							}
						}
					}catch(error){alert('Error on RockerTable print: ' + error);}
				} else { 
					console.log('Error whit your request => status:' + http_request.status);
				} 
			} 
		};
		if(!wasSendNull){
			try{
				http_request.send(null);
			}catch(error){console.log(error);}
		}
	};
	this.setSelectedRowsRequest = function(selectedRows){
		this.setSelectedRowsNoRequest(selectedRows);
		if(this.requestUpdateOnSetRows){
			this.makeRequestDataUpdate();
		}
	};
	this.setSelectedRows = function(selectedRows){
		this.setSelectedRowsRequest(selectedRows);
	};
	this.setSelectedPageAndAdjustNavigation = function(page){
		this.selectedPage = page;
		this.hasPrevious = (this.selectedPage > 1);
		this.hasNext = ((this.selectedPage < this.pages) && (this.pages > 1));
	};
	this.setSelectedPage = function(page){
		if((page <= 0) || (page > this.pages)){return;}
		this.setSelectedPageAndAdjustNavigation(page);
		this.setSelectedRows(this.selectedRows);
	};
	this.setRows = function(rows){
		this.rows = rows;
		this.setSelectedRows(this.selectedRows);
	};
	this.setRowsNoRequest = function(rows){
		this.rows = rows;
		this.setSelectedRowsNoRequest(this.selectedRows);
	};
	this.changeSelectedRows = function(numRowsSelected){
		this.pages = (parseInt(this.rows/numRowsSelected)) + (((this.rows%numRowsSelected) != 0) ? 1 : 0);
		this.setSelectedPageAndAdjustNavigation(1);
		this.setSelectedRows(numRowsSelected);
	};
	this.init = function(rows){
		this.rows = rows;
		this.changeSelectedRows(this.arrayLines[0]);
	};
	this.sortTableAsc = function(attribute){
		this.urlOrder = '&sortTableDesc=false&sortTableAsc=true&attributeAsc='+attribute;
		this.setSelectedPage(1);
	};
	
	this.sortTableDesc = function(attribute){
		this.urlOrder = '&sortTableAsc=false&sortTableDesc=true&attributeDesc='+attribute;
		this.setSelectedPage(1);
	};
	this.filterTable = function(){
		this.setSelectedPage(1);
	};
	this.next = function(){
		var pag = (this.selectedPage + this.maxPageButtons);
		if(pag > this.pages){
			pag = this.pages;
		}
		this.setSelectedPage(pag);
	};
	this.previous = function(){
		var pag = (this.selectedPage - this.maxPageButtons + 1);
		if(pag <= 0){
			pag = 1;
		}
		this.setSelectedPage(pag);
	};
};
var tableHeader = function(title,arrayTableColumns,idToInner,idTable,printAllowed){
	this.title = title;
	this.idToInner = idToInner;
	this.idTable = idTable;
	this.baseInputFilters = this.idTable + '_inputFilter_';
	this.columnNumber = null;
	this.colNames = null;
	this.colAtrributes = null;
	this.colUserFilters = null;
	this.colUseOrdering = null;
	this.colClasses = null;
	this.colStyles = null;
	if((null!=arrayTableColumns && arrayTableColumns.length > 0)){
		this.columnNumber = (null!=arrayTableColumns[0] && arrayTableColumns[0].length > 0) ? arrayTableColumns[0].length : 0;
		this.colNames = arrayTableColumns[0];
		this.colAtrributes = arrayTableColumns[1];
		this.colUserFilters = arrayTableColumns[2];
		this.colUseOrdering = arrayTableColumns[3];
		this.colClasses = arrayTableColumns[4];
		this.colStyles = arrayTableColumns[5];
	}
	this.draw = function(){
		if((null==this.columnNumber || this.columnNumber < 1)){
			return;
		}
		var inner = '<div class="rockerTableHeader ui-widget-header ui-corner-top">';
		if(null!=this.title && this.title != ''){
			inner += '<div class="rockerTableHeaderTitle">';
			inner += this.title;
			if(null!=printAllowed && (printAllowed == 'true' ||  printAllowed == true)){
				inner += '<div class="rockerPrintTableButton ui-icon ui-icon-print ui-corner-all" title="print" ';
				inner += ' onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tablePrintButton\',4000))){return;} singletonRockerStorage.printTable(\''+ this.idTable +'\');" ></div>';
			}
			inner += '</div>';
		}
		if(null!=this.colNames && this.colNames.length > 0){
			inner += '<div class="rockerTableHeaderColumns">';
			var size = this.colNames.length;
			for(var i = 0; i < size; i++){
				try{
					if(null==this.colNames[i] || this.colNames[i] == ''){
						continue;
					}
					var clazz = (null!=this.colClasses && null!=this.colClasses[i]) ? this.colClasses[i] : '';
					if(i == (size - 1)){
						clazz += ' rockerTableHeaderColumnActions ';
					}
					var style = (null!=this.colStyles && null!=this.colStyles[i]) ? (' style="' + this.colStyles[i] + '" ') : '';
					inner += '<div class="rockerTableColumnHeader '+ clazz +'" '+ style +'>';
					inner += '<div class="rockerTitleTableColumn">';
					if(null!=this.colUseOrdering && null!=this.colUseOrdering[i] 
						&& (this.colUseOrdering[i] == true || this.colUseOrdering[i] == 'true')
						&& null!=this.colAtrributes && null!=this.colAtrributes[i] && this.colAtrributes[i] != ''){
						inner += '<div class="rockerSortTableButtonAsc ui-icon ui-icon-triangle-1-n ui-corner-all" title="asc" ';
						inner += ' onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tableOrderButton\',1000))){return;} singletonRockerStorage.sortTableAsc(\''+ this.idTable +'\',\''+ this.colAtrributes[i] +'\');"></div>';
						inner += '<div style="display: inline; float: left; margin-left: 5px;">';
						inner += this.colNames[i];
						inner += '</div>';
						inner += '<div class="rockerSortTableButtonDesc ui-icon ui-icon-triangle-1-s ui-corner-all" title="desc" ';
						inner += ' onclick="if(!(singletonRockerClickTimeControl.validateClick(\'tableOrderButton\',1000))){return;} singletonRockerStorage.sortTableDesc(\''+ this.idTable +'\',\''+ this.colAtrributes[i] +'\');"></div>';
						inner += '<div style="clear: both;"></div>';
					}else{
						inner += this.colNames[i];
					}
					inner += '</div>';
					if(null!=this.colUserFilters && null!=this.colUserFilters[i]){
						var nFilter = this.colUserFilters[i];
						if(null!=this.colAtrributes && this.colAtrributes.length > 0 && null!=this.colAtrributes[i] && this.colAtrributes[i] != ''){
							if(singletonRockerCommons.isNumber(nFilter)){
								if(nFilter > 0){
									inner += '<div class="rockerFilterTableColumn">';
									inner += '<input type="text" id="'+ (this.baseInputFilters + this.colAtrributes[i]);
									inner += '" style="width: '+ this.colUserFilters[i] +'px;" class="rockerInput ui-corner-all" value=""  ';
									inner += ' onkeyup="singletonRockerStorage.filterTable(\''+ this.idTable +'\');" />';
									inner += '</div>';
								}else if(nFilter < 0){
									var reverseFiltersSize = (this.colUserFilters[i] * -1);
									inner += '<div class="rockerFilterTableColumn">';
									inner += '<input type="text" id="'+ (this.baseInputFilters + this.colAtrributes[i]);
									inner += '" style="width: '+ reverseFiltersSize +'px;" class="rockerInputDisabled ui-corner-all" value="" ';
									inner += ' disabled="disabled" />';
									inner += '</div>';
								}
							}else {
								nFilter = singletonRockerCommons.trim(nFilter);
								if(nFilter.length > 0 && nFilter.indexOf(',') != -1){
									var arrayOptions = nFilter.split(',');
									var size2 = arrayOptions.length;
									if(size2 > 1){
										var nameIdSelect = (this.baseInputFilters + this.colAtrributes[i]);
										inner += '<div class="rockerInput ui-corner-all">';
										inner += '<select name="'+ nameIdSelect +'" id="'+ nameIdSelect +'" style="width: 99%;" ';
										inner += ' onchange="singletonRockerStorage.filterTable(\''+ this.idTable +'\');" >';
										inner += '<option value="" selected="selected"></option>';
										for(var j = 0; j < size2; j++){
											if(null!=arrayOptions[j]){
												var vOption = singletonRockerCommons.trim(arrayOptions[j]);
												if(vOption != ''){
													inner += '<option value="'+ vOption +'" >'+ vOption +'</option>';
												}
											}
										}
										inner += '</select>';
										inner += '</div>';
										
									}
								}
							}
						}
					}
					inner += '</div>';
				}catch(error){console.log(error);}
			}
			inner += '<div style="clear: both;"></div>';
			inner += '</div>';
		}
		inner += '</div>';
		singletonRockerCommons.getElement(this.idToInner).innerHTML = inner;
	};
};

var RockerTable = function(idToInner,title,maxPageButtons,arrayTableColumns,baseActionFilterAndLoad,typeObject,
						deleteAndEditButtons,nameForm,idToInnerForm,requestUpdateOnSetRows,additionalParamsAndValuesOnRequest,printAllowed,onRead){
	this.idToInner = idToInner;
	this.id = 'table_' + idToInner;
	this.idExtern = this.id + '_extern';
	this.footerId = this.id + '_footer';
	this.idContent = this.id + '_content';
	this.idHeader = this.id + '_header';
	this.idSubHeader = this.id + '_subHeader';
	this.idSubFooter = this.id + '_subFooter';
	this.maxPageButtons = maxPageButtons;
	this.initialRows = 5;
	this.tableHeader = null;
	this.tableFooter = null;
	this.title = title;
	this.arrayTableColumns = arrayTableColumns;
	this.baseActionFilterAndLoad = baseActionFilterAndLoad;
	this.typeObject = typeObject;
	this.deleteAndEditButtons = (null!=deleteAndEditButtons && (deleteAndEditButtons == 'true' || deleteAndEditButtons == true)) ? true : false;
	this.nameForm = nameForm;
	this.idToInnerForm = idToInnerForm;
	this.requestUpdateOnSetRows = (null!=requestUpdateOnSetRows && (requestUpdateOnSetRows!=true && requestUpdateOnSetRows!='true')) ? false : true;
	this.additionalParamsAndValuesOnRequest = ((null!=additionalParamsAndValuesOnRequest) ? additionalParamsAndValuesOnRequest : '');
	this.printAllowed =  (null!=printAllowed && (printAllowed == 'true' || printAllowed == true)) ? true : false;
	this.mousePressed = false;
	this.rockerSplashMask = null;
	this.atualRows = 0;
	this.mainDocElementId = null;
	this.allRootElements = new Array();
	this.onRead = onRead;
	this.setRows = function(rows){
		this.tableFooter = new tableFooter(this.id,this.footerId,this.maxPageButtons,this.arrayTableColumns,
			this.baseActionFilterAndLoad,this.typeObject,this.deleteAndEditButtons,
				this.nameForm,this.idToInnerForm,this.requestUpdateOnSetRows,this.additionalParamsAndValuesOnRequest,this.onRead);
		this.tableFooter.init(rows);
		this.tableFooter.setSelectedRowsNoRequest(rows);
		this.tableFooter.setSelectedPage(1);
		this.atualRows = rows;
	};
	this.init = function(){
		try{
			if(this.printAllowed){
				this.setMainDocElementId();
			}
			var inner = '<div id="'+ this.idExtern +'" >';
			inner += '<div id="'+ this.id +'" class="rockerTableContainer ui-corner-all"  ';
			inner += ' onmouseover="return singletonRockerCommons.stopPropagation(event);" ';
			inner += ' onmouseout="return singletonRockerCommons.stopPropagation(event);" ';
			inner += ' onclick="return singletonRockerCommons.stopPropagation(event);" >';
			inner += '<div id="'+ this.idHeader +'"></div>';
			inner += '<div id="'+ this.idSubHeader +'"></div>';
			inner += '<div id="'+ this.idContent + '" class="rockerTableBodyContent ui-widget-content"';
			inner += ' onmouseover="singletonRockerStorage.mousePressedTable(\'' + this.id + '\',true);"';
			inner += ' onmouseout="singletonRockerStorage.mousePressedTable(\'' + this.id + '\',false);"></div>';
			inner += '<div id="'+ this.idSubFooter +'"></div>';
			inner += '<div id="'+ this.footerId + '"></div>';
			inner += '<div style="clear: both;" ></div>';
			inner += '</div>';
			inner += '</div>';
			singletonRockerCommons.getElement(this.idToInner).innerHTML = inner;
			this.tableHeader = new tableHeader(this.title,this.arrayTableColumns,this.idHeader,this.id,this.printAllowed);
			this.tableHeader.draw();
			this.setRows(this.initialRows);
			singletonRockerStorage.storeRockerTable(this.id,this);
			this.rockerSplashMask = new RockerSplashMask(this.idContent,10000);
		}catch(error){console.log('Error on init rockerTable: ' + error);}
	};
	this.splashShow = function(){
		if(null!=this.rockerSplashMask){
			this.rockerSplashMask.makeSplash();
		}
	};
	this.splashHide = function(){
		if(null!=this.rockerSplashMask){
			this.rockerSplashMask.removeSplash();
		}
	};
	this.setSelectedPage = function(page){
		this.tableFooter.setSelectedPage(page);
	};
	this.nextPage = function(){
		this.tableFooter.next();
	};
	this.previousPage = function(){
		this.tableFooter.previous();
	};
	this.changeSelectedRows = function(numRowsSelected){
		this.tableFooter.changeSelectedRows(numRowsSelected);
	};
	this.sortTableAsc = function(attribute){
		this.tableFooter.sortTableAsc(attribute);
	};
	this.sortTableDesc = function(attribute){
		this.tableFooter.sortTableDesc(attribute);
	};
	this.filterTable = function(){
		this.tableFooter.filterTable();
	};
	this.setJsonObjectList = function(json){
		this.tableFooter.setJsonObjectList(json);
	};	
	this.setInnerBodyTable = function(inner){
		try{
			singletonRockerCommons.getElement(this.idContent).innerHTML = inner;
		}catch(error){console.log(error);}
	};
	this.setInnerSubHeaderTable = function(inner){
		try{
			singletonRockerCommons.getElement(this.idSubHeader).innerHTML = inner;
		}catch(error){console.log(error);}
	};
	this.setInnerSubFooterTable = function(inner){
		try{
			singletonRockerCommons.getElement(this.idSubFooter).innerHTML = inner;
		}catch(error){console.log(error);}
	};
	this.makeRequestDataRead = function(id){
		this.tableFooter.makeRequestDataRead(id);
	};
	this.makeRequestDataDelete = function(id){
		this.tableFooter.makeRequestDataDelete(id);
	};	
	this.setMainDocElementId = function(){
		this.allRootElements = new Array();
		var nodes = document.body.childNodes;
		for(var i = 0; i < nodes.length; i++){
			if(null!=nodes[i] && undefined!=nodes[i].id && null!=nodes[i].id){
				this.mainDocElementId = nodes[i].id;
				break;
			}
		}
		for(var i = 0; i < nodes.length; i++){
			if(null!=nodes[i]){
				if(undefined!=nodes[i].id && null!=nodes[i].id && nodes[i].id == this.mainDocElementId){
					continue;
				}
				if((nodes[i].tagName == 'div' || nodes[i].tagName == 'DIV') && nodes[i].style.display == 'block'){
					this.allRootElements[this.allRootElements.length] = nodes[i];
				}
			}
		}
	};
	this.print = function(){
		if(null!=this.mainDocElementId && singletonRockerCommons.trim(this.mainDocElementId) != ''){
			var factor = (1000 * 1000 * 1000);
			this.tableFooter.print(this.atualRows,factor,this.idExtern,this.mainDocElementId,this.allRootElements);
		}	
	};
	this.init();
};



