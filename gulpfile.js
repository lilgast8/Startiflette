var gulp		= require( 'gulp' );
module.exports	= gulp; // used for gulp-devtools

var requireDir	= require( 'require-dir' );
var dir			= requireDir( './gulp/tasks/' );



/* Init */
gulp.task( 'init', [
	'remove-empty'
] );


/* Default - Dev */
gulp.task( 'default', [
	'watch'
] );


/* Prod */
gulp.task( 'prod', [
	'style',
	'js',
	'json',
	'image'
] );