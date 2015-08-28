var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require('../utils/paths');

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
			paths.env.dev + paths.assets.json.routes.concatAllFiles,
			paths.env.prod + paths.assets.allFiles,
			paths.env.prod + paths.server.dir
		];
	
	
	/* SASS */
	else if ( options.deletePath === null && options.task == 'sass' )
		options.deletePath = [
			paths.env.dev + paths.assets.css.minAllFiles,
			paths.env.prod + paths.assets.css.dir
		];
	
	
	/* JS & JS-min */
	else if ( options.deletePath === null && ( options.task == 'js' || options.task == 'js-min' ) )
		options.deletePath = paths.env.prod + paths.assets.js.dir;
	
	
	/* JSON & JSON-min */
	else if ( options.deletePath === null && ( options.task == 'json' || options.task == 'json-min' ) )
		options.deletePath = [
			paths.env.dev + paths.assets.json.routes.concatAllFiles,
			paths.env.prod + paths.assets.json.dir
		];
	
	
	/* Image, Image-min & Image-move */
	else if ( options.deletePath === null && ( options.task == 'image' || options.task == 'image-min' || options.task == 'image-move' ) )
		options.deletePath = paths.env.prod + paths.assets.img.dir;
	
	
	/* Server */
	else if ( options.deletePath === null && options.task == 'server' )
		options.deletePath = paths.env.prod + paths.server.dir;
	
	
	
	if (options.deletePath !== null && options.subtask != 'prod-deleted' )
		del.sync( options.deletePath );
	
} );