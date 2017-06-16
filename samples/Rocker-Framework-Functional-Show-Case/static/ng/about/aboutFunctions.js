var AuthorForm = function(idAppenderForm){
	this.idAppenderForm = idAppenderForm;
	
	this.title = "The Rocker Framework Author/Creator";
	this.horizontalAlignFields = false;
	this.width = 440;// -1 for auto, > 0 to fixed size
	this.closable = false;
	this.modal = false;
	this.actionForm = "/";
	this.onclickSubmit = '';
	this.onRead = '';
	this.onclickCancel = '';
	this.textSubmit = '';
	this.textCancel = '';
	this.errorCode = '';
	this.jsonCode = '';
	this.posTop = -5;
	this.posLeft = 5;
	this.titleTable = '';	
	this.typeObject = '';
	this.aliasObject = ''; 
	this.additionalParamsAndValuesOnRequestTable = '';
	this.onclose = '';
	this.drawTableOnTop = false;
	this.minimizable = false;
	this.initialLineNumbersTable = 5;
	this.heightToggle = 100;
	this.visibleButtonsTable = 3;
	this.deleteAndEditButtonsOnTable = false; 
	this.tableOnNewTab = false;
	this.idToClickOnComplete = null;
	
	this.getInfoLabel = function(label,value,asLink){
		var inner = '';
		inner += '<span class="attrLabel">';
		inner += label;
		inner += '</span><br/><span class="attrValue">';
		if(asLink){
			inner += '<a href="' + value + '">';
		}
		inner += value;
		if(asLink){
			inner += '</a>';
		}
		inner += '</span>';
		return inner;
		
	};
	
	this.getPersonalInfo = function(){
		var info = '';
		info += this.getInfoLabel('Experienced System Analist/Developer and Programmer since 2009','',false);
		info += '<br/>';
		info += this.getInfoLabel('Linkedin','www.linkedin.com/in/daniel-krug-427646b9/',true);
		info += '<br/>';
		info += this.getInfoLabel('GitHub','https://github.com/DaanKrug/',true);
		return info;
	};
	
	this.getExperience = function(){
		var exp = '';
		exp += '<strong>Databases</strong>: PostgreSQL, MySQL, SQL Server, Oracle, Derby.<br/>';
		exp += '<strong>NoSQL</strong>: MongoDB, CouchDB, DynamoDB, CassandraDB.<br/>';
		exp += '<strong>Languages</strong>: SQL, PHP, JavaSE, JavaEE, HTML, HTML5, CSS3, Javascript, Ruby.<br/>';
		exp += '<strong>Tecnologies</strong>: CakePHP, JFreeChart, JSF, Richfaces, Primefaces, JSP, Servlets, Struts1, EJB3, Web Services,';
		exp += ' SOA, Rest, JDBC, Hibernate, Swing + AWT, SWT, JPA, Amazon S3, Route 53.<br/>';
		exp += '<strong>Application Servers</strong>: Tomcat, Jboss, WebSphere.<br/>';
		exp += '<strong>Others</strong>: Eclipse IDE, notepad++, SSH client terminal.<br/>';
		exp = this.getInfoLabel('Daniel Augusto Krug<br/>',exp,false);
		exp = '<div style="width: 380px; word-wrap: break-word;">' + exp + '<div>';
		return exp;
	};
	
	this.getArrayFields = function(){
		var arrayFields = [];
		var i = 0;
		arrayFields[i] = new Styler(['.attrLabel',
		                             '.attrValue',
		                             '.attrValue a'],
		                             ['font-weight: bold;',
		                              'font-family: verdana; font-size: 11px;',
		                              'color: #01f; text-decoration: underline;']);
	    i++;
		arrayFields[i] = new Appender('appenderAuthorPhoto',null,null,'','topFields',null,null,'col-sm-5',false);
	    i++;
	    arrayFields[i] = new Label(this.getPersonalInfo(),0,'col-sm-5',false);
	    i++;
	    arrayFields[i] = new Label(this.getExperience(),0,'',true);
	    i++;
		return arrayFields;
	};
	
	this.drawPhoto = function(){
		var inner = '<div style="';
		inner += 'width: 164px; height: 208px; ';
		inner += 'background: url(\'https://avatars3.githubusercontent.com/u/26380119?v=3&s=460\') no-repeat; ';
		inner += 'background-size: cover; ';
		inner += 'background-position: 2px 2px; ';
		inner += 'background-color: #ddd; ';
		inner += '';
		inner += '';
		inner += '" class="ui-widget-content ui-corner-all">';
		inner += '</div>';
		singletonRockerCommons.innerHtml('appenderAuthorPhoto',inner);
	};
	
	this.draw = function(){
		new RockerForm(this.title,this.idAppenderForm,this.horizontalAlignFields,this.width,this.closable,this.modal,this.getArrayFields(),
				this.actionForm,this.onclickSubmit,this.onclickCancel,this.textSubmit,this.textCancel,this.errorCode,this.jsonCode,
				this.posTop, this.posLeft, this.titleTable, null,this.typeObject,this.aliasObject,
				this.additionalParamsAndValuesOnRequestTable,this.onclose,this.drawTableOnTop,this.minimizable,
				this.initialLineNumbersTable,this.heightToggle,this.visibleButtonsTable,this.deleteAndEditButtonsOnTable,
				this.tableOnNewTab,this.onRead
				);
		
		this.drawPhoto();
	};
	
	this.draw();
};