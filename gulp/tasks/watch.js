var gulp		= require( 'gulp' );
var path		= require( 'path' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var livereload	= require( 'gulp-livereload' );



gulp.task( 'watch', function() {
	
	// livereload.listen();
	
	
	gulp.watch( paths.src.allFiles, function(e) {
		var filePath, ext, desktop, mobile, shared, taskname;
		
		filePath	= e.path;
		ext			= path.extname( filePath );
		
		desktop	= filePath.indexOf( 'desktop' )	> -1 ? true : false;
		mobile	= filePath.indexOf( 'mobile' ) > -1 ? true : false;
		shared	= filePath.indexOf( 'shared' ) > -1 ? true : false;
		
		if( ext == '.js' ) {
			taskname = 'js-hint';
			
			if( desktop )
				options.sourcesPath = paths.src.jsAppDesktopFiles;
			else if( mobile )
				options.sourcesPath = paths.src.jsAppMobileFiles;
		}
		else if( ext == '.scss' ) {
			taskname = 'sass';
			
			if( desktop ) {
				options.sourcesPath = paths.src.cssDesktopFile;
				options.assetsPath = paths.assets.cssDesktop;
			}
			else if( mobile ) {
				options.sourcesPath = paths.src.cssMobileFile;
				options.assetsPath = paths.assets.cssMobile;
			}
			else if( shared ) {
				options.sourcesPath = [paths.src.cssDesktopFile, paths.src.cssMobileFile];
				options.assetsPath = [paths.assets.cssDesktop, paths.assets.cssMobile];
			}
		}
		
		
		gulp.start( taskname );
		
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
