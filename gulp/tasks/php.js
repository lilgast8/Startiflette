var gulp = require('gulp');



gulp.task( 'php', ['delete'], function() {
	
	gulp.start( 'move' );
	
} );