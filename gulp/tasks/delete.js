var gulp	= require( 'gulp' );

var options	= require( '../utils/options' )
var paths	= require('../utils/paths');

var plumber	= require( 'gulp-plumber' );
var del		= require( 'del' );



gulp.task( 'delete', function() {
	
	/* Init */
	if ( options.deletePath === null && options.task == 'init' )
		options.deletePath = paths.emptyFiles;
	
	
	/* Default */
	else if ( options.deletePath === null && options.task == 'default' && options.subtask == 'default-json' )
		options.deletePath = paths.src.json.routes.concatAllFiles;
	
	
	/* Prod */
	else if ( options.deletePath === null && options.task == 'prod' )
		options.deletePath = [
			paths.assets.css.allFiles,
			paths.assets.js.allFiles,
			'!' + paths.assets.js.HTML5ShivFile,
			paths.src.json.routes.concatAllFiles,
			paths.assets.json.allFiles,
			paths.assets.img.dir
		];
	
	
	/* Direct task */
	else if ( options.deletePath === null && options.task == 'sass' )
		options.deletePath = paths.assets.css.allFiles;
	
	else if ( options.deletePath === null && ( options.task == 'js' || options.task == 'js-min' ) )
		options.deletePath = [
			paths.assets.js.allFiles,
			'!' + paths.assets.js.HTML5ShivFile
		];
	
	else if ( options.deletePath === null && ( options.task == 'json' || options.task == 'json-min' ) )
		options.deletePath = [
			paths.src.json.routes.concatAllFiles,
			paths.assets.json.allFiles
		];
	
	else if ( options.deletePath === null && ( options.task == 'image' || options.task == 'image-min' || options.task == 'image-move') )
		options.deletePath = paths.assets.img.dir;
	
	
	
	if (options.deletePath !== null && options.subtask != 'prod-deleted' )
		del.sync( options.deletePath );
	
} );