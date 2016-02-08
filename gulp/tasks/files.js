var gulp = require( 'gulp' );



gulp.task( 'files', [ 'delete' ], function() {
	
	gulp.start( 'move' );
	
} );