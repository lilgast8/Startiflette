var gulp		= require('gulp');

var options		= require( '../utils/options' );
var paths		= require('../utils/paths');

var plumber		= require('gulp-plumber');
var imagemin	= require('gulp-imagemin');



gulp.task('image', function() {
	
	if ( options.cleanPath === null )
		options.cleanPath = paths.assets.img;
	
	gulp.start( 'image-min' );
	
});