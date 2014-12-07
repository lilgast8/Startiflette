var gulp = require('gulp');
// module.exports = gulp; // use for gulp-devtools

var requireDir = require('require-dir');
var dir = requireDir('./gulp/tasks/');


/* Default - Dev */
gulp.task('default', ['watch']);

/* Prod */
gulp.task('prod', [
	// 'style',
	'js',
	'json',
	'image'
]);




// var gulp = require('gulp');



// gulp.task('js:hint', require('./gulp/tasks/js-hint'));


// gulp.task('watch', require('./gulp/tasks/watch'));

// gulp.task('default', ['watch']);
