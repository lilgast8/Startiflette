var gulp = require('gulp');
var path = require('path');

var paths = require('../utils/paths');
var livereload = require('gulp-livereload');


gulp.task('watch', function() {
	
	livereload.listen();
	
	// gulp.watch(paths.src.cssFiles, ['style']);
	// gulp.watch(paths.src.jsAppFiles, ['js-hint']);
	// gulp.watch([
	// 	paths.src.json+'**/*.json', 
	// 	paths.src.js+'js-files.json'
	// ], ['json']);
	
	gulp.watch(paths.src.allFiles, function(e){
		
		console.log(e);
		
		var filePath, ext, desktop, mobile, shared, taskname;
		filePath = e.path;
		ext = path.extname(filePath);
		
		desktop = filePath.indexOf('desktop/') > -1 ? true : false;
		mobile = filePath.indexOf('mobile/') > -1 ? true : false;
		shared = filePath.indexOf('shared/') > -1 ? true : false;
		
		console.log(ext);
		console.log(desktop, mobile, shared);
		
	});
	
	// gulp.watch([
	// 	paths.assets.css+'**/*.css',
	// 	paths.src.jsApp+'**/*.js',
	// 	paths.src.js+'js-files.json',
	// 	paths.src.json+'**/*.json',
	// 	// paths.php.root+'**/*.php',
	// ]).on('change', livereload.changed);
	
});





// var gulp = require('gulp');

// var paths = require('../utils/paths');



// module.exports = function() {
	
// 	// gulp.watch('gulp/**/*.js', ['js:hint']);
// 	gulp.watch(paths.src.jsAppDesktopFiles, ['js:hint']);
	
	
	
// }
