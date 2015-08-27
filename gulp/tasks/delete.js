var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require('../utils/paths');

var plumber	= require( 'gulp-plumber' );
var del		= require( 'del' );



gulp.task( 'delete', function() {
	
	/* Init */
	if ( options.deletePath === null && options.task == 'init' )
		options.deletePath = paths.emptyFiles;
	
	
	/* Default */
	else if ( options.deletePath === null && options.task == 'default' && options.subtask == 'default-json' )
		options.deletePath = paths.env.dev + paths.assets.json.routes.concatAllFiles;
	
	
	/* Prod */
	else if ( options.deletePath === null && options.task == 'prod' )
		options.deletePath = [
			paths.env.dev + paths.assets.css.minAllFiles,
			paths.env.prod + paths.assets.css.minAllFiles,
			paths.env.prod + paths.assets.js.allFiles,
			'!' + paths.env.prod + paths.assets.js.HTML5ShivFile,
			paths.env.dev + paths.assets.json.routes.concatAllFiles,
			paths.env.prod + paths.assets.json.allFiles,
			paths.env.prod + paths.assets.img.dir
		];
	
	
	/* Direct task */
	else if ( options.deletePath === null && options.task == 'sass:prod' )
		options.deletePath = [
			paths.env.dev + paths.assets.css.minAllFiles,
			paths.env.prod + paths.assets.css.minAllFiles
		];
	
	
	else if ( options.deletePath === null && ( options.task == 'js' || options.task == 'js-min' ) )
		options.deletePath = [
			paths.env.prod + paths.assets.js.allFiles,
			'!' + paths.env.prod + paths.assets.js.HTML5ShivFile
		];
	
	else if ( options.deletePath === null && ( options.task == 'json' || options.task == 'json-min' ) )
		options.deletePath = [
			paths.env.dev + paths.assets.json.routes.concatAllFiles,
			paths.env.prod + paths.assets.json.allFiles
		];
	
	else if ( options.deletePath === null && ( options.task == 'image' || options.task == 'image-min' || options.task == 'image-move') )
		options.deletePath = paths.env.prod + paths.assets.img.dir;
	
	
	
	console.log('——— delete func ———');
	if (options.deletePath !== null && options.subtask != 'prod-deleted' ) {
		console.log('--------> deletePath:', options.deletePath);
		
		del.sync( options.deletePath );
	}
	
} );