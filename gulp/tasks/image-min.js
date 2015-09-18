var gulp		= require('gulp');

var paths		= require('../utils/paths');

var plumber		= require('gulp-plumber');
var imagemin	= require('gulp-imagemin');



gulp.task( 'image-min', [ 'delete' ], function() {
	
	gulp.src( paths.env.dev + paths.assets.img.allFiles )
		.pipe( plumber() )
		.pipe( imagemin({
			optimizationLevel : 3, // png, default 3
			progressive : false // jpg, default false
		}) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.img.dir ) );
	
} );