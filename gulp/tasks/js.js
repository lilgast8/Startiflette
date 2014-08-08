var gulp = require('gulp');

var options = require('../options/options');


gulp.task('js', ['js-hint'], function() {
	
	if(options.minify) gulp.start('js-min');
	
});