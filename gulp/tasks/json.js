var gulp = require('gulp');

var options = require('../options/options');


gulp.task('json', ['json-lint'], function() {
	
	if(options.minify) gulp.start('json-min');
	
});