var gulp = require('gulp');

var paths = require('../options/paths');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');


gulp.task('image-clean', function() {
	
	return gulp.src(paths.assets.img, {read : false})
		.pipe(plumber())
		.pipe(clean());
	
});