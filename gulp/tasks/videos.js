var gulp = require( 'gulp' );



gulp.task( 'videos', [ 'delete' ], function() {
	
	gulp.start( 'move' );
	
} );