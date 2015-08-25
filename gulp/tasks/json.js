var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );



gulp.task( 'json', ['json-lint'], function() {
// gulp.task( 'json', function() {
	
	/*if ( options.deletePath === null && options.tasks.prod )
		options.deletePath = paths.assets.json;
	
	gulp.start( 'json-min' );*/
	
	// console.log(options.jsonSrcPath);
	
	
	if ( options.tasks.default )
		gulp.start( 'json-concat' );
	else if ( options.tasks.prod )
		gulp.start( 'json-min' );
	
} );