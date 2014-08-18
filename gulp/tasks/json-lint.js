var gulp = require('gulp');

var paths = require('../utils/paths');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var jsonlint = require('gulp-json-lint');


gulp.task('json-lint', function() {
	
	gulp.src(paths.src.json+'**/*.json')
		.pipe(plumber())
		.pipe(jsonlint())
		.pipe(jsonlint.report('verbose'))
		.pipe(jsonlint.report(function(lint, file) {
			var posJsonStr = file.path.indexOf('json/')+5;
			var fileName = file.path.substring(posJsonStr, file.path.length);
			return notify().write(fileName+' ('+lint.line+':'+lint.character+')\n'+lint.error);
		}));
	
});