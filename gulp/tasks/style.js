var gulp = require('gulp');

var paths = require('../utils/paths');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');



gulp.task('style', function() {
	
	gulp.src(paths.src.css+'styles.scss')
		.pipe(plumber())
		.pipe(sass({
			style: 'compressed',
		//	style: 'expanded',
			compass: true
		}))
		.on('error', function(error) {
			console.log(error.message);
			return notify().write(error.message);
		})
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest(paths.assets.css));
	
});