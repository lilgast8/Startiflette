var gulp		= require('gulp');

var options		= require( '../utils/options' );
var paths		= require('../utils/paths');

var plumber		= require('gulp-plumber');
var imagemin	= require('gulp-imagemin');



gulp.task('image', function() {
	
	// options.cleanPath = paths.assets.img;
	
	// if ( options.cleanPath.length === 0 )
	// 	options.cleanPath = paths.assets.img;
	// else
	// 	options.cleanPath.push( paths.assets.img );
	// console.log('cleanPath IMAGE : ', options.cleanPath);
	
	gulp.start( 'image-min' );
	
});