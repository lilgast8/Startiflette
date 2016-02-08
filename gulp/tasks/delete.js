var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var del		= require( 'del' );



gulp.task( 'delete', function() {
	
	/* Prod */
	if ( options.deletePath === null && options.task == 'prod' )
		options.deletePath = [
			paths.env.dev + paths.assets.css.minAllFiles,
			paths.env.dev + paths.assets.svg.sprite.allFiles,
			paths.env.prod
		];
	
	
	/* SASS */
	else if ( options.deletePath === null && options.task == 'sass' )
		options.deletePath = [
			paths.env.dev + paths.assets.css.minAllFiles,
			paths.env.prod + paths.assets.css.dir
		];
	
	
	/* Files */
	else if ( options.deletePath === null && options.task == 'files' )
		options.deletePath = paths.env.prod + paths.assets.files.dir;
	
	
	/* JS & JS-min */
	else if ( options.deletePath === null && ( options.task == 'js' || options.task == 'js-min' ) )
		options.deletePath = paths.env.prod + paths.assets.js.dir;
	
	
	/* SVG */
	else if ( options.deletePath === null && options.task == 'svg' && options.env != 'dev' )
		options.deletePath = [
			paths.env.dev + paths.assets.svg.sprite.allFiles,
			paths.env.prod + paths.assets.svg.dir
		];
	
	
	/* JSON & JSON-min */
	else if ( options.deletePath === null && ( options.task == 'json' || options.task == 'json-min' ) )
		options.deletePath = [
			paths.env.prod + paths.assets.json.dir,
			paths.env.prod + paths.configs.dir
		];
	
	
	/* Image, Image-min & Image-move */
	else if ( options.deletePath === null && ( options.task == 'image' || options.task == 'image-min' || options.task == 'image-move' ) )
		options.deletePath = paths.env.prod + paths.assets.img.dir;
	
	
	/* Sounds */
	else if ( options.deletePath === null && options.task == 'sounds' )
		options.deletePath = paths.env.prod + paths.assets.sounds.dir;
	
	
	/* Videos */
	else if ( options.deletePath === null && options.task == 'videos' )
		options.deletePath = paths.env.prod + paths.assets.videos.dir;
	
	
	/* Server */
	else if ( options.deletePath === null && options.task == 'server' )
		options.deletePath = [
			paths.env.prod + paths.server.dir,
			paths.env.prod + paths.server.indexFile
		];
	
	
	
	if (options.deletePath !== null && options.subtask != 'prod-deleted' )
		del.sync( options.deletePath );
	
} );