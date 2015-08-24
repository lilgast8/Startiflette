var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );



gulp.task( 'json', ['json-lint'], function() {
	
	if ( options.deletePath === null )
		options.deletePath = paths.assets.json;
	
	gulp.start( 'json-min' );
	
});