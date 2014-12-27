var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var jsonminify	= require( 'gulp-jsonminify' );



gulp.task( 'json-min', ['clean'], function () {
	
	// gulp.src( paths.src.jsonFiles )
	gulp.src( paths.src.jsonConcatFiles )
		.pipe( plumber() )
		.pipe( jsonminify() )
		.pipe( gulp.dest( paths.assets.json ) );
	
});