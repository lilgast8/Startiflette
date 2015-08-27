var gulp	= require('gulp');

var paths	= require('../utils/paths');

var plumber	= require('gulp-plumber');



gulp.task( 'image-move', ['delete'], function() {
	
	gulp.src( paths.env.dev + paths.assets.img.allFiles )
		.pipe( plumber() )
		.pipe( gulp.dest( paths.env.prod + paths.assets.img.dir ) );
	
} );