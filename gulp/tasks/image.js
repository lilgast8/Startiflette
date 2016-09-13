var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );



gulp.task( 'image', function() {
	
	if ( options.image.min )
		gulp.start( 'image-min' );
	
	else if ( !options.image.min && options.task == 'image' )
		gulp.start( 'image-move' );
	
} );