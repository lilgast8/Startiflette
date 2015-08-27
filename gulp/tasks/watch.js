var gulp		= require( 'gulp' );
var path		= require( 'path' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var livereload	= require( 'gulp-livereload' );



gulp.task( 'watch', function() {
	
	livereload.listen();
	
	
	/* Tasks management */
	gulp.watch( [
		paths.env.dev + paths.assets.allFiles,
		'!' + paths.env.dev + paths.assets.css.minAllFiles,
		'!' + paths.env.dev + paths.assets.json.routes.concatAllFiles
	], function(e) {
		
		var ext, desktop, mobile, shared, config, routes;
		var taskname = null;
		
		options.filePath	= e.path;
		ext					= path.extname( options.filePath );
		
		desktop	= options.filePath.indexOf( 'desktop/' ) > -1 ? true : false;
		mobile	= options.filePath.indexOf( 'mobile/' ) > -1 ? true : false;
		shared	= options.filePath.indexOf( 'shared/' ) > -1 ? true : false;
		config	= options.filePath.indexOf( 'config/' ) > -1 ? true : false;
		routes	= options.filePath.indexOf( 'routes/' ) > -1 ? true : false;
		
		
		/* SASS */
		if ( ext == '.scss' ) {
			taskname		= 'sass';
			options.subtask	= 'default-sass';
			
			if ( desktop )
				options.cssSrcPath = [ paths.env.dev + paths.assets.css.app.desktopFile ];
			else if ( mobile )
				options.cssSrcPath = [ paths.env.dev + paths.assets.css.app.mobileFile ];
			else if ( shared )
				options.cssSrcPath = [
					paths.env.dev + paths.assets.css.app.desktopFile,
					paths.env.dev + paths.assets.css.app.mobileFile
				];
		}
		
		/* JS */
		else if ( ext == '.js' ) {
			taskname		= 'js';
			options.subtask	= 'default-js';
			
			if ( desktop )
				options.jsSrcPath = paths.env.dev + paths.assets.js.app.desktopAllFiles;
			else if ( mobile )
				options.jsSrcPath = paths.env.dev + paths.assets.js.app.mobileAllFiles;
			else if ( shared )
				options.jsSrcPath = paths.env.dev + paths.assets.js.app.sharedAllFiles;
		}
		
		/* JSON */
		else if ( ext == '.json' ) {
			taskname		= 'json';
			options.subtask	= 'default-json';
			
			if ( config )
				options.jsonSrcPath = paths.env.dev + paths.assets.json.config.allFiles;
			else if ( routes )
				options.jsonSrcPath = paths.env.dev + paths.assets.json.routes.allFiles;
		}
		
		
		if ( taskname )
			gulp.start( taskname );
		
	} );
	
	
	/* Livereload */
	gulp.watch( [
		
		// SASS
		paths.env.dev + paths.assets.css.minAllFiles,
		
		// JS
		paths.env.dev + paths.assets.js.allFiles,
		
		// JSON
		paths.env.dev + paths.assets.json.allFiles,
		'!' + paths.env.dev + paths.assets.json.routes.concatAllFiles,
		
		// PHP
		paths.env.dev + paths.php.indexFile,
		paths.env.dev + paths.php.allFiles
		
	] ).on( 'change', livereload.changed );
	
} );