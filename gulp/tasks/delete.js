var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var del		= require( 'del' );



gulp.task( 'delete', function() {
	
	var deletePath = null;
	
	/* Prod */
	if ( options.task == 'prod' || options.htmlify )
		deletePath = [
			paths.env.dev + paths.assets.css.allMinFiles,
			paths.env.dev + paths.assets.svg.sprite.allFiles,
			paths.env.prod
		];
	
	
	/* SASS */
	else if ( options.task == 'sass' )
		deletePath = [
			paths.env.dev + paths.assets.css.allMinFiles,
			paths.env.dev + paths.assets.css.maps.allFiles,
			paths.env.prod + paths.assets.css.dir
		];
	
	
	/* Favicons */
	else if ( options.task == 'default' && options.subtask == 'default-favicons' )
		deletePath = paths.env.dev + paths.assets.favicons.dir;
	else if ( options.task == 'favicons' )
		deletePath = [
			paths.env.dev + paths.assets.favicons.dir,
			paths.env.prod + paths.assets.favicons.dir
		];
	
	
	/* Files */
	else if ( options.task == 'files' )
		deletePath = paths.env.prod + paths.assets.files.dir;
	
	
	/* JS-concat */
	else if ( options.task == 'js-concat' )
		deletePath = [
			paths.env.dev + paths.assets.js.allRootJsFiles,
			paths.env.dev + paths.assets.js.maps.allFiles
		];
	
	
	/* JS & JS-min */
	else if ( options.task == 'js' || options.task == 'js-min' )
		deletePath = paths.env.prod + paths.assets.js.dir;
	
	
	/* SVG */
	else if ( options.task == 'svg' )
		deletePath = [
			paths.env.dev + paths.assets.svg.sprite.allFiles,
			paths.env.prod + paths.assets.svg.dir
		];
	
	
	/* JSON & JSON-min */
	else if ( options.task == 'json' || options.task == 'json-min' )
		deletePath = [
			paths.env.prod + paths.assets.json.dir,
			paths.env.prod + paths.configs.dir
		];
	
	
	/* Image, Image-min & Image-move */
	else if ( options.task == 'image' || options.task == 'image-min' || options.task == 'image-move' )
		deletePath = paths.env.prod + paths.assets.img.dir;
	
	
	/* Sounds */
	else if ( options.task == 'sounds' )
		deletePath = paths.env.prod + paths.assets.sounds.dir;
	
	
	/* Videos */
	else if ( options.task == 'videos' )
		deletePath = paths.env.prod + paths.assets.videos.dir;
	
	
	/* Server */
	else if ( options.task == 'server' )
		deletePath = [
			paths.env.prod + paths.server.dir,
			paths.env.prod + paths.indexFile
		];
	
	
	
	if ( deletePath !== null && options.subtask != 'prod-deleted' )
		del.sync( deletePath );
	
} );