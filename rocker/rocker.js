var scriptUrls = ['/rocker/vendors/jquery-3.2.1/jquery-3.2.1.min.js',
                  '/rocker/vendors/jquery-ui-1.12.1/jquery-ui.min.js',
                  '/rocker/vendors/bootstrap-3.3.7-dist/js/bootstrap.min.js',
                  '/rocker/vendors/ckeditor/ckeditor.js',
                  '/rocker/js/shafroind.js',
                  '/rocker/js/commons.js',
                  '/rocker/js/i18n.js',
                  '/rocker/js/storage.js',
                  '/rocker/js/validatordata.js',
                  '/rocker/js/validatorfields.js',
                  '/rocker/js/chars.js',
                  '/rocker/js/criptoer.js',
                  '/rocker/js/dragdrop.js',
                  '/rocker/js/fields.js',
                  '/rocker/js/splashmask.js',
                  '/rocker/js/clickcontrol.js',
                  '/rocker/js/ajax.js',
                  '/rocker/js/ajaxhandler.js',
                  '/rocker/js/amazonS3.js',
                  '/rocker/js/table.js',
                  '/rocker/js/form.js',
                  '/rocker/js/templates/tableTemplate.js',
                  '/rocker/js/templates/formTemplate.js',
                  '/rocker/js/templates/codeForm.js',
                  '/rocker/js/visualCoder.js',
                  ];

var styleUrls = ['/rocker/vendors/bootstrap-3.3.7-dist/css/bootstrap.min.css',
                '/rocker/vendors/jquery-ui-1.12.1/jquery-ui.min.css',
                '/rocker/css/rocker.css',
               ];

function initRocker(path){
	var vnow = '?v=' + new Date().getTime();
	for(var i = 0; i < styleUrls.length; i++){
		document.writeln('<link href="' + path + '' + styleUrls[i] + vnow + '" rel="stylesheet"></link>');
	}
	for(var i = 0; i < scriptUrls.length; i++){
		document.writeln('<script src="' + path + '' + scriptUrls[i] +  vnow + '"></script>');
	}
}



