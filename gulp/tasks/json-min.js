var gulp = require('gulp');

var paths = require('../utils/paths');
var plumber = require('gulp-plumber');
var jsonminify = require('gulp-jsonminify');


gulp.task('json-min', ['json-clean'], function () {
	
	gulp.src([paths.src.json+'**/*.json'])
		.pipe(plumber())
		.pipe(jsonminify())
		.pipe(gulp.dest(paths.assets.json));
	
});