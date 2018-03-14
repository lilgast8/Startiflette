var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );
var helpers	= require( '../utils/helpers' );



gulp.task( 'prod-htmlify', [ 'delete' ], function() {
	
	helpers.createDir( paths.env.prod );
	
	options.subtask = 'prod-deleted';
	
	gulp.start( 'prod-htmlify:move' );
	
} );


gulp.task( 'prod-htmlify:move', [
	'sass',
	'js',
	'json',
	'svg',
	'image'
], function() {
	
	gulp.start( 'move' );
	gulp.start( 'htmlify' );
	
} );