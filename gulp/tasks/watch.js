var gulp = require('gulp');

var paths = require('../utils/paths');
var livereload = require('gulp-livereload');


gulp.task('watch', function() {
	
	livereload.listen();
	
	gulp.watch(paths.src.css+'**/*.scss', ['style']);
	gulp.watch(paths.src.jsApp+'**/*.js', ['js']);
	gulp.watch([paths.src.json+'**/*.json', paths.src.js+'js-files.json'], ['json']);
	
	gulp.watch([
		paths.assets.css+'**/*.css',
		paths.src.jsApp+'**/*.js',
		paths.src.js+'js-files.json',
		paths.src.json+'**/*.json',
		paths.global.root+'**/*.html',
		paths.global.root+'**/*.php',
	]).on('change', livereload.changed);
	
});