var gulp	= require( 'gulp' );

var options	= require( '../utils/options' )
var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var clean	= require( 'gulp-clean' );



gulp.task( 'clean', function() {
	
	return gulp.src( options.cleanPath, {read : false} )
		.pipe( plumber() )
		.pipe( clean() );
	
});