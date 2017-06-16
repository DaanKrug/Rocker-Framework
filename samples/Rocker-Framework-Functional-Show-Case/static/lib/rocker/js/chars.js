var RockerConverterChars = function(){
	this.arrayCharsAndCodes = [
								['!','&#33;'], 
								['"','&#34;'], 
								['#','&#35;'], 
								['$','&#36;'], 
								['%','&#37;'], 
								['&','&#38;'], 
								['\'','&#39;'], 
								['(','&#40;'], 
								[')','&#41;'], 
								['*','&#42;'], 
								['+','&#43;'], 
								[',','&#44;'], 
								['-','&#45;'], 
								['.','&#46;'], 
								['/','&#47;'], 
								[':','&#58;'], 
								[';','&#59;'], 
								['<','&#60;'], 
								['=','&#61;'], 
								['>','&#62;'], 
								['?','&#63;'], 
								['@','&#64;'], 
								['[','&#91;'], 
								['\\','&#92;'], 
								[']','&#93;'], 
								['^','&#94;'], 
								['_','&#95;'], 
								['`','&#96;'], 
								['{','&#123;'], 
								['|','&#124;'], 
								['}','&#125;'], 
								['~','&#126;'], 
								['€','&#128;'], 
								['‚','&#130;'], 
								['ƒ','&#131;'], 
								['„','&#132;'], 
								['…','&#133;'], 
								['†','&#134;'], 
								['‡','&#135;'], 
								['ˆ','&#136;'], 
								['‰','&#137;'], 
								['Š','&#138;'], 
								['‹','&#139;'], 
								['Œ','&#140;'], 
								['Ž','&#142;'], 
								['‘','&#145;'], 
								['’','&#146;'], 
								['“','&#147;'], 
								['”','&#148;'], 
								['•','&#149;'], 
								['–','&#150;'], 
								['—','&#151;'], 
								['˜','&#152;'], 
								['™','&#153;'], 
								['š','&#154;'], 
								['›','&#155;'], 
								['œ','&#156;'], 
								['ž','&#158;'], 
								['Ÿ','&#159;'], 
								[' ','&#160;'], 
								['¡','&#161;'], 
								['¢','&#162;'], 
								['£','&#163;'], 
								['¤','&#164;'], 
								['¥','&#165;'], 
								['¦','&#166;'], 
								['§','&#167;'], 
								['¨','&#168;'], 
								['©','&#169;'], 
								['ª','&#170;'], 
								['«','&#171;'], 
								['¬','&#172;'], 
								['­','&#173;'], 
								['®','&#174;'], 
								['¯','&#175;'], 
								['°','&#176;'], 
								['±','&#177;'], 
								['²','&#178;'], 
								['³','&#179;'], 
								['´','&#180;'], 
								['µ','&#181;'], 
								['¶','&#182;'], 
								['·','&#183;'], 
								['¸','&#184;'], 
								['¹','&#185;'], 
								['º','&#186;'], 
								['»','&#187;'], 
								['¼','&#188;'], 
								['½','&#189;'], 
								['¾','&#190;'], 
								['¿','&#191;'], 
								['À','&#192;'], 
								['Á','&#193;'], 
								['Â','&#194;'], 
								['Ã','&#195;'], 
								['Ä','&#196;'], 
								['Å','&#197;'], 
								['Æ','&#198;'], 
								['Ç','&#199;'], 
								['È','&#200;'], 
								['É','&#201;'], 
								['Ê','&#202;'], 
								['Ë','&#203;'], 
								['Ì','&#204;'], 
								['Í','&#205;'], 
								['Î','&#206;'], 
								['Ï','&#207;'], 
								['Ð','&#208;'], 
								['Ñ','&#209;'], 
								['Ò','&#210;'], 
								['Ó','&#211;'], 
								['Ô','&#212;'], 
								['Õ','&#213;'], 
								['Ö','&#214;'], 
								['×','&#215;'], 
								['Ø','&#216;'], 
								['Ù','&#217;'], 
								['Ú','&#218;'], 
								['Û','&#219;'], 
								['Ü','&#220;'], 
								['Ý','&#221;'], 
								['Þ','&#222;'], 
								['ß','&#223;'], 
								['à','&#224;'], 
								['á','&#225;'], 
								['â','&#226;'], 
								['ã','&#227;'], 
								['ä','&#228;'], 
								['å','&#229;'], 
								['æ','&#230;'], 
								['ç','&#231;'], 
								['è','&#232;'], 
								['é','&#233;'], 
								['ê','&#234;'], 
								['ë','&#235;'], 
								['ì','&#236;'], 
								['í','&#237;'], 
								['î','&#238;'], 
								['ï','&#239;'], 
								['ð','&#240;'], 
								['ñ','&#241;'], 
								['ò','&#242;'], 
								['ó','&#243;'], 
								['ô','&#244;'], 
								['õ','&#245;'], 
								['ö','&#246;'], 
								['÷','&#247;'], 
								['ø','&#248;'], 
								['ù','&#249;'], 
								['ú','&#250;'], 
								['û','&#251;'], 
								['ü','&#252;'], 
								['ý','&#253;'], 
								['þ','&#254;'], 
								['ÿ','&#255;']
	];
	this.arrayHTMLTagsRemove = [
		'<script type="text/javascript">',
		'< script type="text/javascript">',
		'<script type="text/javascript" >',
		'< script type="text/javascript" >',
		'<script',
		'</script>',
		'<iframe',
		'</iframe',
		'<a',
		'</a>'
	];
	this.sizeCodes = this.arrayCharsAndCodes.length;
	this.sizeTags = this.arrayHTMLTagsRemove.length;
	this.getCharToFromDatabase = function(chara){
		if(!this.validate()){return '';}
		var charReturn = chara;
		charCodeString = "&#" + chara.charCodeAt(0) + ";";
		for(var i = 0; i < this.sizeCodes; i++){
			if(charCodeString == this.arrayCharsAndCodes[i][1]){
				charReturn = charCodeString;
				break;
			}
		}
		return charReturn;
	};
	this.convertToFromDatabase = function(string,toDatabase,scapeHtmlToo,toInput,maxCountNoSpaces){
		if(!this.validate()){return '';}
		var newString = "";
		if(null!=string && string.length > 0){
			string = this.removeHTMLtags(string);
			var size =  string.length;
			var toDatabase2 = (null!=toDatabase && (toDatabase == true || toDatabase == 'true')) ? true : false;
			var countNoSpaces = 0;
			if(toDatabase2){
				var sizeMaxNoSpaces = 5000;
				if(null!=maxCountNoSpaces && maxCountNoSpaces > 0){
					sizeMaxNoSpaces = maxCountNoSpaces;
				}
				if(scapeHtmlToo){
					for(var i = 0; i < size; i++){
						if(string.charAt(i) == ' '){
							newString += '&#160;';
							countNoSpaces = 0;
						}else{
							if(countNoSpaces > sizeMaxNoSpaces){
								newString += '&#160;';
								countNoSpaces = 0;
							}
							newString += this.getCharToFromDatabase(string.charAt(i));
							countNoSpaces ++;
						}
					}
				}else{
					var countOpenTag = 0;
					var countCloseTag = 0;
					var countOpenAspa = 0;
					var countCloseAspa = 0;
					countNoSpaces = 0;
					for(var i = 0; i < size; i++){
						var makeScape = true;
						var makeSpace = true;
						var letter = string.charAt(i);
						if(letter == '<' && countOpenTag == 0 && countOpenAspa == 0){
							countOpenTag = 1;
						}else if(letter == '"' && countOpenTag > 0){
							countOpenAspa = (countOpenAspa == 0) ? 1 : 0;
						}else if(letter == '>' && countOpenTag == 1 && countOpenAspa == 0){
							countOpenTag = 0;
							countCloseTag = 0;
							countOpenAspa = 0;
							countCloseAspa = 0;
						}
						if(((countOpenTag > countCloseTag) || letter == '>' || letter == '"') && (countOpenAspa == countCloseAspa)){
							makeScape = false;
							countNoSpaces = 0;
							makeSpace = false;
						}else if((countOpenTag > countCloseTag) && (countOpenAspa == 1)){
							makeSpace = false;
						}
						if(letter == ' ' || letter == '\n'){
							newString += '&#160;';
							countNoSpaces = 0;
						}else if(makeScape){
							if(makeSpace){
								if(countNoSpaces > sizeMaxNoSpaces){
									newString += '&#160;';
									countNoSpaces = 0;
								}
								countNoSpaces ++;
							}
							newString += this.getCharToFromDatabase(string.charAt(i));
						}else if(letter == '<'){
							newString += 'ooopenTttag';
						}else if(letter == '>'){
							newString += 'cccloseTttag';
						}else if(letter == '"'){
							newString += 'aaaspa';
						}else{
							if(makeSpace){
								if(countNoSpaces > sizeMaxNoSpaces){
									newString += '&#160;';
									countNoSpaces = 0;
								}
								countNoSpaces ++;
							}
							newString += letter;
						}
					}
				}
			}else{
				newString = string;
				newString = singletonRockerCommons.replaceAll(newString,'ooopenTttag','<');
				newString = singletonRockerCommons.replaceAll(newString,'cccloseTttag','>');
				newString = singletonRockerCommons.replaceAll(newString,'aaaspa','"');
				for(var i = 0; i < this.sizeCodes; i++){
					newString = singletonRockerCommons.replaceAll(newString,this.arrayCharsAndCodes[i][1],
							this.arrayCharsAndCodes[i][0]);
					newString = singletonRockerCommons.replaceAll(newString,this.arrayCharsAndCodes[i][1].substring(1),
							this.arrayCharsAndCodes[i][0]);
				}
			}
			if(null!=newString && newString!=''){
				var newStringAux = newString;
				try{
					if(null!=toInput && (toInput == 'true' || toInput == true)){
						return newString;
					}else{
						newString =  decodeURIComponent(escape(newString));
					}
				}catch(error){
					console.log('Error on convertToFromDatabase: ' + error);
					newString = newStringAux;
				}
			}
		}
		return newString;
	};
	this.removeHTMLtags = function(string){
		if(!this.validate()){return;}
		var pos = 0;
		var noTagString = string;
		while(pos!=-1){
			pos = noTagString.indexOf('  ');
			if(pos!=-1){
				noTagString = noTagString.replace('  ',' ');
			}
		}
		pos = 0;
		while(pos!=-1){
			for(var i = 0; i < this.sizeTags; i++){
				pos = noTagString.indexOf(this.arrayHTMLTagsRemove[i]);
				if(pos!=-1){
					noTagString = noTagString.replace(this.arrayHTMLTagsRemove[i],'');
					break;
				}
			}
		}
		return noTagString;
	};
	this.initialized = false;
	this.initialize = function(){
		this.initialized = true;
	};
	this.validate = function(){
		if(!this.initialized){
			console.log('You should use the singleton variable "singletonRockerConverterChars".');
			return false;
		}
		return true;
	};
};
var singletonRockerConverterChars = new RockerConverterChars();
singletonRockerConverterChars.initialize();