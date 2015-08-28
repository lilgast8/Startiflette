var gulp	= require('gulp');

var options	= require( '../utils/options' );
var paths	= require('../utils/paths');

var plumber	= require('gulp-plumber');



gulp.task( 'move', function() {
	
	/* Prod */
	if ( options.moveFromPath === null && options.task == 'prod' ) {
		options.moveFromPath	= [
			paths.env.dev + paths.assets.css.minAllFiles,
			paths.env.dev + paths.assets.css.fonts.allFiles,
			paths.env.dev + paths.assets.js.vendors.HTML5ShivFile,
			paths.env.dev + paths.php.allFiles,
		];
		options.moveToPath		= [
			paths.env.prod + paths.assets.css.dir,
			paths.env.prod + paths.assets.css.fonts.dir,
			paths.env.prod + paths.assets.js.vendors.dir,
			paths.env.prod + paths.php.dir
		];
	}
	
	
	/* SASS */
	else if ( options.moveFromPath === null && options.task == 'sass' ) {
		options.moveFromPath	= [
			paths.env.dev + paths.assets.css.minAllFiles,
			paths.env.dev + paths.assets.css.fonts.allFiles
		];
		options.moveToPath		= [
			paths.env.prod + paths.assets.css.dir,
			paths.env.prod + paths.assets.css.fonts.dir
		];
	}
	
	
	/* JS & JS-min */
	else if ( options.moveFromPath === null && ( options.task == 'js' || options.task == 'js-min' ) ) {
		options.moveFromPath	= [ paths.env.dev + paths.assets.js.vendors.HTML5ShivFile ];
		options.moveToPath		= [ paths.env.prod + paths.assets.js.vendors.dir ];
	}
	
	
	/* Image */
	else if ( options.moveFromPath === null && ( options.task == 'image' || options.task == 'image-min' || options.task == 'image-move' ) ) {
		options.moveFromPath	= [ paths.env.dev + paths.assets.img.allFiles ];
		options.moveToPath		= [ paths.env.prod + paths.assets.img.dir ];
	}
	
	
	/* PHP */
	else if ( options.moveFromPath === null && options.task == 'php' ) {
		options.moveFromPath	= [ paths.env.dev + paths.php.allFiles ];
		options.moveToPath		= [ paths.env.prod + paths.php.dir ];
	}
	
	
	
	// parse options.moveFromPath
	for ( var i = 0; i < options.moveFromPath.length; i++ ) {
		
		gulp.src( options.moveFromPath[i] )
			.pipe( plumber() )
			.pipe( gulp.dest( options.moveToPath[i] ) );
		
	}
	
} );