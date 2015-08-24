var gulp	= require( 'gulp' );

var options	= require( '../utils/options' )
var paths	= require('../utils/paths');

var plumber	= require( 'gulp-plumber' );
var del		= require( 'del' );



gulp.task( 'delete', function() {
	
	if ( options.deletePath === null && options.tasks.init )
		options.deletePath = paths.emptyFiles;
	
	else if ( options.deletePath === null && options.tasks.prod ) {
		options.deletePath = [
			paths.assets.jsonJsFilesFile,
			paths.assets.jsFiles,
			'!' + paths.assets.jsHTML5Shiv,
			paths.assets.json,
			paths.assets.img
		];
	}
	
	
	del( options.deletePath )
	
});