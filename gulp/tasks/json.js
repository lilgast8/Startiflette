var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );



gulp.task( 'json', ['json-lint'], function() {
	
	// console.log('1 json JS : ', options.cleanPath);
	
	// options.cleanPath = paths.assets.json;
	
	// if ( options.cleanPath.length === 0 )
	// 	options.cleanPath = paths.assets.json;
	// else
	// 	options.cleanPath.push( paths.assets.json );
	// console.log('cleanPath JSON : ', options.cleanPath);
	
	gulp.start( 'json-min' );
	
});