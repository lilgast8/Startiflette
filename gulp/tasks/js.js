var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );



gulp.task( 'js', ['js-hint'], function() {
	
	// options.cleanPath = [ paths.assets.jsFiles, '!' + paths.assets.jsHTML5Shiv ];
	
	// if ( options.cleanPath = options.cleanPath.length === 0 )
	// 	options.cleanPath = [ paths.assets.jsFiles, '!' + paths.assets.jsHTML5Shiv ];
	// else
	// 	options.cleanPath.push( paths.assets.jsFiles, '!' + paths.assets.jsHTML5Shiv );
	// console.log('cleanPath JS : ', options.cleanPath);
	
	gulp.start( 'js-min' );
	
});