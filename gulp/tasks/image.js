var gulp		= require('gulp');

var options		= require( '../utils/options' );
var paths		= require('../utils/paths');

var plumber		= require('gulp-plumber');
var imagemin	= require('gulp-imagemin');



gulp.task('image', function() {
	
	if ( options.deletePath === null )
		options.deletePath = paths.assets.img;
	
	if ( options.imageMin )
		gulp.start( 'image-min' );
	else
		gulp.start( 'image-move' );
	
} );