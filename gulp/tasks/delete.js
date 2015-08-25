var gulp	= require( 'gulp' );

var options	= require( '../utils/options' )
var paths	= require('../utils/paths');

var plumber	= require( 'gulp-plumber' );
var del		= require( 'del' );



gulp.task( 'delete', function() {
	
	console.log('DELETE PATH:', options.deletePath);
	console.log('task:', options.task + ' / ' + options.subtask);
	
	if ( options.deletePath === null && options.task == 'init' )
		options.deletePath = paths.emptyFiles;
	
	else if ( options.deletePath === null && options.task == 'default' && options.subtask == 'default-json' )
		options.deletePath = paths.src.jsonRoutesConcatFiles;
	
	else if ( options.deletePath === null && options.task == 'prod' )
		options.deletePath = [
			paths.assets.cssFiles,
			paths.assets.jsFiles,
			'!' + paths.assets.jsHTML5Shiv,
			/*paths.assets.json,
			paths.assets.jsonConfigFiles,*/
			paths.src.jsonRoutesConcatFiles,
			paths.assets.jsonAllFiles
			// paths.assets.img
		];
	
	else if ( options.deletePath === null && options.task == 'sass' )
		options.deletePath = paths.assets.cssFiles;
	
	else if ( options.deletePath === null && ( options.task == 'js' || options.task == 'js-min' ) )
		options.deletePath = [
			paths.assets.jsFiles,
			'!' + paths.assets.jsHTML5Shiv
		];
	
	else if ( options.deletePath === null && ( options.task == 'json' || options.task == 'json-min' ) )
		options.deletePath = [
			paths.src.jsonRoutesConcatFiles,
			paths.assets.jsonAllFiles
		];
	
	
	if (options.deletePath !== null)
		del.sync( options.deletePath );
	
	
	
	/*if ( options.deletePath === null && options.tasks.default )
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
	
	del.sync( options.deletePath );*/
	
} );