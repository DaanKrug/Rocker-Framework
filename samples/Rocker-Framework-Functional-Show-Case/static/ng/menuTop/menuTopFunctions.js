function closeAllPages(){
	singletonRockerCommons.setClass('home','');
	singletonRockerCommons.setClass('concepts','');
	singletonRockerCommons.setClass('components','');
	singletonRockerCommons.setClass('sourcecode','');
	singletonRockerCommons.setClass('about','');
	singletonRockerCommons.setClass('downloads','');
	singletonRockerCommons.hide('root');
	singletonRockerCommons.hide('divConcepts');
	singletonRockerCommons.hide('divComponents');
	singletonRockerCommons.hide('divSourceCode');
	singletonRockerCommons.hide('divAbout');
	singletonRockerCommons.hide('divDownloads');
};
function homePage(){
	closeAllPages();
	singletonRockerCommons.hide('divMenuLeft');
	singletonRockerCommons.setClass('home','active');
	singletonRockerCommons.show('root');
	new RockstarForm('root','http://localhost:4040');
};
function conceptsPage(){
	closeAllPages();
	singletonRockerCommons.hide('divMenuLeft');
	singletonRockerCommons.setClass('concepts','active');
	singletonRockerCommons.show('divConcepts');
};
function sourceCodePage(){
	closeAllPages();
	singletonRockerCommons.hide('divMenuLeft');
	singletonRockerCommons.setClass('sourcecode','active');
	singletonRockerCommons.show('divSourceCode');
};
function aboutPage(){
	closeAllPages();
	singletonRockerCommons.hide('divMenuLeft');
	singletonRockerCommons.setClass('about','active');
	singletonRockerCommons.show('divAbout');
	new AuthorForm('authorRoot');
};
function componentsPage(){
	closeAllPages();
	singletonRockerCommons.show('divMenuLeft');
	singletonRockerCommons.setClass('components','active');
	singletonRockerCommons.show('divComponents');
};
function downloadsPage(){
	closeAllPages();
	singletonRockerCommons.hide('divMenuLeft');
	singletonRockerCommons.setClass('downloads','active');
	singletonRockerCommons.show('divDownloads');
};