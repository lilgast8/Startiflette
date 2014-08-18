var gulp = require('gulp');

var options = require('../utils/options');


gulp.task('js', ['js-hint'], function() {
	
	if(options.minify) gulp.start('js-min');
	
});