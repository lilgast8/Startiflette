var gulp		= require('gulp');

var options		= require( '../utils/options' );
var paths		= require('../utils/paths');



gulp.task('remove-empty', function() {
	
	if ( options.deletePath === null )
		options.deletePath = paths.emptyFiles;
	
	gulp.start( 'delete' );
	
});