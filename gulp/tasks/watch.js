var gulp		= require( 'gulp' );
var path		= require( 'path' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var livereload	= require( 'gulp-livereload' );



gulp.task( 'watch', function() {
	
	// livereload.listen();
	
	
	/* Tasks management */
	gulp.watch( [
		
		paths.src.allFiles,
		'!' + paths.src.jsonConcatFiles ], function(e) {
			
		var filePath, ext, desktop, mobile, shared;
		var taskname = null;
		
		filePath	= e.path;
		ext			= path.extname( filePath );
		
		desktop	= filePath.indexOf( 'desktop' )	> -1 ? true : false;
		mobile	= filePath.indexOf( 'mobile' ) > -1 ? true : false;
		shared	= filePath.indexOf( 'shared' ) > -1 ? true : false;
		
		
		/* SASS */
		if ( ext == '.scss' ) {
			taskname = 'sass';
			
			if ( desktop )
				options.cssSrcPath = [ paths.src.cssDesktopFile ];
			else if ( mobile )
				options.cssSrcPath = [ paths.src.cssMobileFile ];
			else if ( shared )
				options.cssSrcPath = [ paths.src.cssDesktopFile, paths.src.cssMobileFile ];
		}
		
		/* JS */
		else if ( ext == '.js' ) {
			taskname = 'js-hint';
			
			if ( desktop )
				options.jsSrcPath = paths.src.jsAppDesktopFiles;
			else if ( mobile )
				options.jsSrcPath = paths.src.jsAppMobileFiles;
			else if ( shared )
				options.jsSrcPath = paths.src.jsSharedFiles;
		}
		
		/* JSON */
		else if ( ext == '.json' && filePath.indexOf( paths.src.jsJsFilesFile ) < 0 ) {
			taskname = 'json-concat';
			
			options.jsonSrcPath = [ paths.src.jsJsFilesFile, paths.src.jsonAllFiles ];
		}
		
		
		if ( taskname )
			gulp.start( taskname );
		
	});
	
	
	/* Livereload */
	gulp.watch( [
		
		// SASS
		paths.assets.cssFiles,
		
		// JS
		paths.src.jsFiles,
		
		// JSON
		paths.src.jsJsFilesFile,
		paths.src.jsonAllFiles,
		'!' + paths.src.jsonConcatFiles,
		
		// PHP
		paths.php.indexFile,
		paths.php.allFiles
		
	] ).on( 'change', livereload.changed );
	
});