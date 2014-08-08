var gulp = require('gulp');

var paths = require('../options/paths');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');


gulp.task('json-clean', function() {
	
	return gulp.src(paths.assets.json, {read : false})
		.pipe(plumber())
		.pipe(clean());
	
});