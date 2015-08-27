var gulp	= require('gulp');

var paths	= require('../utils/paths');

var plumber	= require('gulp-plumber');



gulp.task( 'php', function() {
	
	if (options.moveFromPath === null) {
		options.moveFromPath	= paths.env.dev + paths.php.allFiles;
		options.moveToPath		= paths.env.prod + paths.php.dir;
	}
	
	gulp.src( options.moveFromPath )
		.pipe( plumber() )
		.pipe( gulp.dest( options.moveToPath ) );
	
} );