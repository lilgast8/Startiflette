var gulp = require( 'gulp' );



gulp.task( 'sounds', [ 'delete' ], function() {
	
	gulp.start( 'move' );
	
} );