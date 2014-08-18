var gulp = require('gulp');

var paths = require('../utils/paths');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('js-min', ['js-clean'], function() {
	
	var jsFiles = require('../../'+paths.src.js+'js-files.json');
	
	for(var i=0; i<jsFiles.length; i++) {
		jsFile = jsFiles[i];
		
		var isOldie = typeof(jsFile.name) == 'string' ? false : true;
		var nameOutputFile = !isOldie ? jsFile.name : jsFile.name[0];
		var destOutputFile = jsFile.dest;
		var aFiles = [];
		var aFilesOldie = [];
		
		for(var j=0; j<jsFile.files.length; j++) {
			file = jsFile.files[j];
			
			if(typeof(file) == 'string') {
				aFiles.push(paths.src.js+file);
				if(isOldie) aFilesOldie.push(paths.src.js+file);
			}
			else {
				aFiles.push(paths.src.js+file[0]);
				if(isOldie) aFilesOldie.push(paths.src.js+file[1]);
			}
			
		}
		
		gulp.src(aFiles)
			.pipe(plumber())
			.pipe(concat(nameOutputFile))
			.pipe(uglify())
			.pipe(gulp.dest(paths.assets.js+destOutputFile));
		
		if(isOldie) {
			nameOutputFile = jsFile.name[1];
			gulp.src(aFilesOldie)
				.pipe(plumber())
				.pipe(concat(nameOutputFile))
				.pipe(uglify())
				.pipe(gulp.dest(paths.assets.js+destOutputFile));
		}
	}
	
});