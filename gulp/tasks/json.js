var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );



gulp.task( 'json', ['json-lint'], function() {
	
	if ( options.cleanPath === null )
		options.cleanPath = paths.assets.json;
	
	gulp.start( 'json-min' );
	
});