var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );



gulp.task( 'js', ['js-hint'], function() {
	
	options.cleanPath = [paths.assets.jsAllFiles, '!' + paths.assets.jsHTML5Shiv];
	
	gulp.start( 'js-min' );
	
});