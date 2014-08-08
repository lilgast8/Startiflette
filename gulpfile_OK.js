var gulp = require('gulp');





var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var jshint = require('gulp-jshint');
var jsonlint = require('gulp-json-lint');





gulp.task('style', function() {
	
	gulp.src('./www/src/css/styles.scss')
		.pipe(plumber())
		.pipe(sass({
			style: 'compressed',
		//	style: 'expanded',
			compass: true
		}))
		.on('error', function(error) {
			return notify().write(error.message);
		})
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('www/assets/css/'));
	
});



gulp.task('js', function() {
	
	gulp.src('./www/src/js/app/**/*.js')
		.pipe(plumber())
		.pipe(jshint())
		.pipe(notify(function(file) {
			if(file.jshint.success) return false;
			var errors = file.jshint.results.map(function(data) {
				if(data.error) return '('+data.error.line+':'+data.error.character+') '+data.error.reason;
			}).join('\n');
			return file.relative+' ('+file.jshint.results.length+' errors)\n'+errors;
		}))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
	
});



gulp.task('json', function() {
	
	gulp.src('./www/src/json/**/*.json')
		.pipe(plumber())
		.pipe(jsonlint())
		.pipe(jsonlint.report(function(lint, file) {
			var posJsonStr = file.path.indexOf('json/')+5;
			var fileName = file.path.substring(posJsonStr, file.path.length);
			return notify().write(fileName+' ('+lint.line+':'+lint.character+')\n'+lint.error);
		}));
	
});



gulp.task('default', function() {
	
	livereload.listen();
	
	gulp.watch('./www/src/css/**/*.scss', ['style']);
	gulp.watch('./www/src/js/app/**/*.js', ['js']);
	gulp.watch('./www/src/json/**/*.json', ['json']);
	
	gulp.watch([
		'./www/assets/css/**/*.scss',
		'./www/src/js/**/*.js',
		'./www/src/json/**/*.json',
		'./www/**/*.html',
		'./www/**/*.php',
	]).on('change', livereload.changed);
	
});



/*
gulp.task('default', ['style'], function() {
	gulp.watch('./www/src/css/** /*', ['styles']);
});
*/
