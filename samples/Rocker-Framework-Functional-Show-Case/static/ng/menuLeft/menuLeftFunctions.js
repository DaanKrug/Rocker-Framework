function setItemMenuLeftActive(btMenuLeftNumber){
	for(var i = 0; i < 26; i++){
		if(btMenuLeftNumber == i){
			singletonRockerCommons.setClass('btMenuLeft_' + i,'btn btn-default btn-xs btn-block active');
		}else{
			singletonRockerCommons.setClass('btMenuLeft_' + i,'btn btn-default btn-xs btn-block');
		}
		singletonRockerCommons.getElement('btMenuLeft_' + i).style.textAlign = 'left';
		singletonRockerCommons.getElement('btMenuLeft_' + i).style.paddingLeft = '20px';
		singletonRockerCommons.getElement('btMenuLeft_' + i).style.borderRadius = '0px';
		singletonRockerCommons.getElement('btMenuLeft_' + i).style.fontSize = '10px';
		singletonRockerCommons.getElement('btMenuLeft_' + i).style.fontFamily = 'Verdana';
	}
}