var RockerShafroind = function(){
	this.b =[
	         	'*','.','_','8','Õ','7','ö','!','p','.','q','$','x',' ',
	         	'0','´','l','`','*','N','2','f','7','!','8','"','#','ô',
	         	'1','õ','3','!','~','.','¨','s','3','ù','!','I','4',';',
	         	'Ü',',','y','.','Ì','!','%','*','Ç','!','D','-','_','É',
	         	'6','Á','ó','!','\\','','S','V','!','.','\'','Y','/','2',
	         	'.','E','Î','!','r','0','s','!','Z','!','c','f','ç','c',
	         	'U','9','J','!','5','â','l','#','c','f',']','G','#','y',
	         	'W','.','!','9','#','A','#','+','.','4','Ë','@','l','T',
	         	'@','[','h','Â','?',':','4','m',':','n','z','ñ','/','2',
	         	'A','#','é','5','!','ï','z','y','|','Ê','ë','8','X',']',
	         	'5','.','d','!','e','û','C','?','@','t','Ú','c','=','h',
	         	'È','.','Ö','#','f','Ó','7','Ò','K','#','o','è','%','ê',
	         	'w','Ô','#','^','Ä','#','Ï','(','!',')','Ù','k','Û','n',
	         	'8','<','D','ä','!','á','H','$','I','.','s','L','!','2',
	         	'.','#','?','c','*','!','à',')','3','*','1','@','k','*',
	         	'$','>','9','#','g','-','$','M','.','3','a',':','b','}',
	         	'(','!','|','ü','g','ú','#','{','î','8','c','&','!','R',
	         	'h','_','i','&','j','Ñ','6','O','-','F','g','#','.','B',
	         	'Ã',' ','7','b','&','5','r',':','6','@','x','*',':','0',
	         	'#','ì',':','t','{','!','v','#','í',',','5','Í','?','ò',
	         	'P','m','7','.','À','d','f','$','ã','#',';','s','.','a',
	         	't','6','j','Q','.','|','u','$','v','!','$','*','|','&'
			 ];
	this.a = function(a){
		var b = a.length;
		var d = a;
		var a = '';
		for(var c = 0; c < b; c++){
			a += this.b[d[c]];
		}
		return a;
	};
	this.d = function(a,b,c){
		var j = this.b.length;
		if(a){
			for(var i = j -1; i >= 0; i--){
				if(b){if((this.b[i] == c)){return i;}}else {if(i == c){return this.b[i];}}
			}
		}else{
			for(var i = 0; i < j; i++){
				if(b){if((this.b[i] == c)){return i;}}else {if(i == c){return this.b[i];}}
			}
		}
		return null;
	};
	this.c = function(s){
		var a = [];
		if(null!=s && s.length > 0){
			var j = s.length;
			for(var i = 0; i < j; i++){
				a[a.length] = this.d((i%2 == 0),true,s.substr(i,1));
			}
		}
		return a;
	};
	return this;
};
var RockerShafroindd = function(){
	this.b =[' ','"','%',':','1','e','U','.','M','4','(','E',';','i','=','0','F',':','o','.','v','Z','f',',','.','x','.','-','N','D','+','n','*','.','T',',','d','_','V','L',
			 '-','l','@','2','a','G','s','#','8','t','$','z','+','S','r','.','C','w','5','c','K','<','O','%','/','g','*',')','9','%','H','#','W','m','%','$',
			 '3','(','B','Y','p','*','b','J',')','q','@','-','>','u','j','I','@','k','#','P','7','$','#','Q','A','.','R','.','h','*','.','y','(','6','-','%',
			 ':','=','"',':','*'];
	this.a = function(a){
		var b = a.length;
		var d = a;
		var a = '';
		for(var c = 0; c < b; c++){
			a += this.b[d[c]];
		}
		return a;
	};
	this.d = function(a,b,c){
		var j = this.b.length;
		if(a){
			for(var i = j -1; i >= 0; i--){
				if(b){if((this.b[i] == c)){return i;}}else {if(i == c){return this.b[i];}}
			}
		}else{
			for(var i = 0; i < j; i++){
				if(b){if((this.b[i] == c)){return i;}}else {if(i == c){return this.b[i];}}
			}
		}
		return null;
	};
	this.c = function(s){
		var a = [];
		if(null!=s && s.length > 0){
			var j = s.length;
			for(var i = 0; i < j; i++){
				a[a.length] = this.d((i%2 == 0),true,s.substr(i,1));
			}
		}
		return a;
	};
	return this;
};