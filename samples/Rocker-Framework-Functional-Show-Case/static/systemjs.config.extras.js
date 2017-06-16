/**
 * Add barrels and stuff
 * Adjust as necessary for your application needs.
 */
// (function (global) {
//   System.config({
//     packages: {
//       // add packages here
//     }
//   });
// })(this);

 (function (global) {
   System.config({
     packages: {
    	 app: {
	        defaultExtension: 'js',
	        meta: {
	          './ng/concepts/*.js,./ng/menuTop/*.js,': {
	            loader: 'systemjs-angular-loader.js'
	          }
	        }
	      }
     }
   });
 })(this);