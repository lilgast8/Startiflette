var gulp	= require( 'gulp' );

var options	= require( '../utils/options' )
var paths	= require('../utils/paths');

var plumber	= require( 'gulp-plumber' );
var del		= require( 'del' );



gulp.task( 'delete', function() {
	
	console.log('DELETE');
	
	if ( options.deletePath === null && options.tasks.default )
		options.deletePath = paths.src.jsonRoutesConcatFiles;
	
	else if ( options.deletePath === null && options.tasks.init )
		options.deletePath = paths.emptyFiles;
	
	else if ( options.deletePath === null && options.tasks.prod ) {
		options.deletePath = [
			paths.assets.jsFiles,
			'!' + paths.assets.jsHTML5Shiv,
			// paths.assets.json,
			// paths.assets.jsonConfigFiles,
			paths.assets.jsonRoutesFiles,
			paths.assets.img
		];
	}
	
	console.log(options.deletePath);
	// del( options.deletePath );
	
	// del( options.deletePath, false, function() {
	// 	console.log('DELETE COMPLETE');
	// } );
	
	del.sync( options.deletePath );
	
} );