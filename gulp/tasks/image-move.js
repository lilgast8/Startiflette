var gulp	= require('gulp');

var paths	= require('../utils/paths');

var plumber	= require('gulp-plumber');



gulp.task( 'image-move', ['delete'], function() {
	
	gulp.src( paths.src.img.allFiles )
		.pipe( plumber() )
		.pipe( gulp.dest( paths.assets.img.dir ) );
	
} );