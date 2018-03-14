var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );
var helpers	= require( '../utils/helpers' );



gulp.task( 'prod', [ 'delete', 'set-uid:prod' ], function() {
	
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