var gulp		= require( 'gulp' );
module.exports	= gulp; // used for gulp-devtools

var requireDir	= require( 'require-dir' );
var dir			= requireDir( './gulp/tasks/' );

var options		= require( './gulp/utils/options' );
var paths		= require( './gulp/utils/paths' );
var helpers		= require( './gulp/utils/helpers' );



/* Init */
gulp.task( 'init', [
	'htaccess',
	'rename-js-app'
] );


/* Default - Dev */
gulp.task( 'default', [
	'watch'
] );


/* Prod */
gulp.task( 'prod', [ 'delete' ], function() {
	
	helpers.createDir( paths.env.prod );
	
	options.subtask = 'prod-deleted';
	
	gulp.start( 'prod:move' );
	
} );

gulp.task( 'prod:move', [
	'robots',
	'sass',
	'js',
	'json',
	'svg',
	'image'
], function() {
	
	gulp.start( 'move' );
	
} );