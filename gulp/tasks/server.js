var gulp = require( 'gulp' );



gulp.task( 'server', [ 'delete' ], function() {
	
	gulp.start( 'move' );
	
} );