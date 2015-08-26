var gulp		= require( 'gulp' );
module.exports	= gulp; // used for gulp-devtools

var requireDir	= require( 'require-dir' );
var dir			= requireDir( './gulp/tasks/' );

var options		= require( './gulp/utils/options' );



/* Init */
gulp.task( 'init', [
	'delete'
] );


/* Default - Dev */
gulp.task( 'default', [
	'watch'
] );


/* Prod */
gulp.task( 'prod', ['delete'], function() {
	
	options.subtask = 'prod-deleted';
	
	gulp.start( 'sass' );
	gulp.start( 'js' );
	gulp.start( 'json' );
	gulp.start( 'image' );
	
} );