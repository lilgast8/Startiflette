var gulp = require('gulp');

var paths = require('../utils/paths');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');


gulp.task('image', ['image-clean'], function() {
	
	return gulp.src(paths.src.img+'**/*')
		.pipe(plumber())
		.pipe(imagemin({
			optimizationLevel : 3, // png, default 3
			progressive : false // jpg, default false
		}))
		.pipe(gulp.dest(paths.assets.img));
	
});