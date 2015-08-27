var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );



gulp.task( 'js', ['js-hint'], function() {
	
	if ( options.task == 'prod' || options.task == 'js'  )
		gulp.start( 'js-min' );
	
} );