var gulp	= require('gulp');

var options	= require( '../utils/options' );
var paths	= require('../utils/paths');

var plumber	= require('gulp-plumber');



gulp.task( 'move', function() {
	
	console.log('MOVE', options.moveFromPath);
	
	// if ( options.moveFromPath === null && options.task == 'sass' ) {
	if ( options.moveFromPath === null && options.task == 'sass:prod' ) {
		options.moveFromPath	= [
			paths.env.dev + paths.assets.css.minAllFiles
		];
		options.moveToPath		= [
			paths.env.prod + paths.assets.css.dir
		];
	}
	
	if ( options.moveFromPath === null && options.task == 'prod' ) {
		options.moveFromPath	= [
			[ paths.env.dev + paths.php.allFiles ],
			paths.env.dev + paths.assets.css.minAllFiles
		];
		options.moveToPath		= [
			paths.env.prod + paths.php.dir,
			paths.env.prod + paths.assets.css.dir
		];
	}
	
	
	// parse options.moveFromPath
	for ( var i = 0; i < options.moveFromPath.length; i++ ) {
		
		console.log('from:', options.moveFromPath[i], ' -> to:', options.moveToPath[i]);
		
		gulp.src( options.moveFromPath[i] )
			.pipe( plumber() )
			.pipe( gulp.dest( options.moveToPath[i] ) );
		
	}
	
} );