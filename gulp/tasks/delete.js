var gulp	= require( 'gulp' );

var options	= require( '../utils/options' )

var plumber	= require( 'gulp-plumber' );
var del		= require( 'del' );



gulp.task( 'delete', function() {
	
	del( options.cleanPath );
	
});