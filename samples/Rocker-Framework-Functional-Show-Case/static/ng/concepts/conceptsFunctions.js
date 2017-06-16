var h3Clazz = 'ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-collapsed ui-corner-all';
var h3SelectedClazz = 'ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active';
var icoClazz = 'ui-accordion-header-icon ui-icon ui-icon-triangle-1-e';
var icoSelectedClazz = 'ui-accordion-header-icon ui-icon ui-icon-triangle-1-s';
var contentClazz = 'ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content';
var contentSelectedClazz = 'ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content ui-accordion-content-active';

var conceptsTabs = ['co1a','co1b','co2','co3','co4','co5','co6','co7','co8','co9','co10','co11','co12'];

function initializeContent(hid,hidico,cont){
	singletonRockerCommons.hide(cont);
	singletonRockerCommons.setClass(hid,h3Clazz);
	singletonRockerCommons.setClass(hidico,icoClazz);
	singletonRockerCommons.setClass(cont,contentClazz);
	singletonRockerCommons.getElement(cont).style.maxHeight = '200px';
	singletonRockerCommons.getElement(cont).style.overflowX = 'hidden';
	singletonRockerCommons.getElement(cont).style.overflowY = 'auto';
}

function closeAllConceptsTabs(){
	for(var i= 0; i < conceptsTabs.length; i++){
		var hid = 'tabHeader_' + conceptsTabs[i];
		var hidico = 'tabHeaderIcon_' + conceptsTabs[i];
		var cont = 'tabContent_' +  conceptsTabs[i];
		initializeContent(hid,hidico,cont);
	}
}
function showConceptTab(id){
	var hid = 'tabHeader_' + id;
	var hidico = 'tabHeaderIcon_' + id;
	var cont = 'tabContent_' +  id;
	if(singletonRockerCommons.isBlock(cont)){
		initializeContent(hid,hidico,cont);
	}else{
		closeAllConceptsTabs();
		singletonRockerCommons.setClass(hid,h3SelectedClazz);
		singletonRockerCommons.setClass(hidico,icoSelectedClazz);
		singletonRockerCommons.setClass(cont,contentSelectedClazz);
		singletonRockerCommons.show(cont);
	}
}




