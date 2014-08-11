var gulp = require('gulp');
module.exports = gulp; // use for gulp-devtools

var requireDir = require('require-dir');
var dir = requireDir('./gulp/tasks/');


/* Default - Dev */
gulp.task('default', ['watch']);

/* Prod */
gulp.task('prod', [
	'style',
	'js',
	'json',
	'image'
]);