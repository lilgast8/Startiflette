var gulp		= require('gulp');

var options		= require( '../utils/options' );
var paths		= require('../utils/paths');



gulp.task('remove-empty', function() {
	
	// console.log('remove-empty');
	// options.cleanPath = paths.emptyFiles;
	
	gulp.start( 'clean' );
	
});