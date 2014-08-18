var gulp = require('gulp');

var options = require('../utils/options');


gulp.task('json', ['json-lint'], function() {
	
	if(options.minify) gulp.start('json-min');
	
});