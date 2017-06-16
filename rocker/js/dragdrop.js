var initiatorDragDrop = function(dragDrop){
	singletonRockerCommons.addEvent(dragDrop.idIndicator, 'mousedown', function(ev){dragDrop.downEffect(ev);});
	singletonRockerCommons.addEvent(document, 'mousemove', function(ev){dragDrop.moveEffect(ev);});
	singletonRockerCommons.addEvent(document, 'mouseup',function(ev){dragDrop.upEffect(ev);});
};
var RockerDragAndDrop = function(idIndicator,idDrag){
	this.idIndicator = idIndicator;
	this.objSelected = idDrag;
	this.mouseOffset = null;
	this.ative = true;
	this.finalized = false;
	this.elem = null;
	this.maxX = null;
	this.maxY = null;
	this.downEffect = function(ev){
		if(this.finalized){return;}
		this.ative = true;
		this.mouseOffset = singletonRockerCommons.getPosition(this.objSelected, ev);
		this.elem = singletonRockerCommons.getElement(this.objSelected);
		this.maxX = window.innerWidth - this.elem.offsetWidth;
		this.maxY = window.innerHeight - this.elem.offsetHeight;
	};
	this.moveEffect = function(ev){
		if(this.finalized || !this.ative || null==this.mouseOffset){return;}
		try{
			var event = (ev || window.event);
			var mousePos = singletonRockerCommons.mouseCoords(event);
			var posX = (mousePos.x - this.mouseOffset.x);
			var posY = (mousePos.y - this.mouseOffset.y);
			if(posX <= 3){
				posX = 3;
			}else if(posX >= (this.maxX - 3)){
				posX = this.maxX - 3;
			}
			if(posY <= 3){
				posY = 3;
			}else if(posY >= (this.maxY - 3)){
				posY = this.maxY - 3;
			}
			this.elem.style.left = posX + 'px';
			this.elem.style.top = posY + 'px';
		}catch(error){console.log(error);}
	};
	this.upEffect = function(ev){
		this.ative = false;
	};
	this.cancelEffect = function(){
		this.finalized = true;
	};
	this.restoreEffect = function(){
		this.ative = true;
	};
	new initiatorDragDrop(this);
};
