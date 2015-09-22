var gulp = require( 'gulp' );



gulp.task( 'image-move', [ 'delete' ], function() {
	
	gulp.start( 'move' );
	
} );