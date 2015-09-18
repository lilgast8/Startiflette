var gulp	= require('gulp');

var options	= require( '../utils/options' );



gulp.task( 'image', function() {
	
	if ( options.imageMin )
		gulp.start( 'image-min' );
	else if ( !options.imageMin && options.task == 'image' )
		gulp.start( 'image-move' );
	
} );