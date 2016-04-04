var gulp		= require( 'gulp' );
var path		= require( 'path' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var livereload	= require( 'gulp-livereload' );



gulp.task( 'watch', function() {
	
	livereload.listen();
	
	
	/* Tasks management */
	gulp.watch( [
		
		/* htaccess */
		paths.env.base + paths.htaccess,
		
		/* Assets */
		paths.env.dev + paths.assets.allFiles,
		'!' + paths.env.dev + paths.assets.css.minAllFiles,
		'!' + paths.env.dev + paths.assets.css.fonts.allFiles,
		// '!' + paths.env.dev + paths.assets.svg.sprite.spriteFile,
		'!' + paths.env.dev + paths.assets.svg.sprite.allFiles,
		
		/* Config */
		paths.env.dev + paths.configs.allFiles,
		'!' + paths.env.dev + paths.configs.favicons.dataFile,
		
	], function(e) {
		
		var ext, desktop, mobile, shared, config, favicons, routes;
		var taskname = null;
		
		options.filePath	= e.path;
		ext					= path.extname( options.filePath );
		options.fileName	= path.basename( options.filePath )
		
		desktop		= options.filePath.indexOf( 'desktop/' ) > -1 ? true : false;
		mobile		= options.filePath.indexOf( 'mobile/' ) > -1 ? true : false;
		shared		= options.filePath.indexOf( 'shared/' ) > -1 ? true : false;
		config		= options.filePath.indexOf( 'config/' ) > -1 ? true : false;
		favicons	= options.filePath.indexOf( 'configs/favicons/' ) > -1 ? true : false;
		routes		= options.filePath.indexOf( 'routes/' ) > -1 ? true : false;
		console.log( 'favicons:', favicons, '—', options.filePath, '—', options.fileName, ext );
		
		//  options.device: used for SASS error notification
		if ( desktop )
			options.device = 'desktop';
		else if ( mobile )
			options.device = 'mobile';
		else if ( shared )
			options.device = 'shared';
		
		
		/* htaccess */
		if ( options.fileName == '.htaccess' ) {
			taskname = 'htaccess';
		}
		
		/* SASS */
		else if ( ext == '.scss' ) {
			taskname = 'sass';
			
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
		
		/* Favicons */
		// if ( favicons && ( ext == '.png' || ext == '.jpg' ) ) {
		if ( favicons ) {
			
			// if ( options.fileName != 'faviconData.json' )
				// taskname = 'favicons';
				console.log( 'launch favicons' );
		}
		
		/* JS */
		else if ( ext == '.js' ) {
			taskname = 'js';
			
			if ( desktop )
				options.jsSrcPath = paths.env.dev + paths.assets.js.app.desktopAllFiles;
			else if ( mobile )
				options.jsSrcPath = paths.env.dev + paths.assets.js.app.mobileAllFiles;
			else if ( shared )
				options.jsSrcPath = paths.env.dev + paths.assets.js.app.sharedAllFiles;
		}
		
		/* JSON */
		else if ( ext == '.json' ) {
			taskname = 'json';
			
			if ( config )
				options.jsonSrcPath = paths.env.dev + paths.configs.config.allFiles;
			else if ( routes )
				options.jsonSrcPath = paths.env.dev + paths.configs.routes.allFiles;
			else
				options.jsonSrcPath = paths.env.dev + paths.assets.json.allFiles;
		}
		
		/* SVG */
		else if ( ext == '.svg' ) {
			taskname = 'svg';
			
			options.svgSrcPath = [ paths.env.dev + paths.assets.svg.allFiles ];
		}
		
		
		if ( taskname )
			gulp.start( taskname );
		
	} );
	
	
	/* Livereload */
	gulp.watch( [
		
		/* htaccess */
		paths.env.dev + paths.htaccess,
		
		/* CSS */
		paths.env.dev + paths.assets.css.minAllFiles,
		
		/* JS */
		paths.env.dev + paths.assets.js.allFiles,
		
		/* JSON */
		paths.env.dev + paths.assets.json.allFiles,
		
		/* SVG */
		paths.env.dev + paths.assets.svg.sprite.allFiles,
		
		/* Config */
		paths.env.dev + paths.configs.allFiles,
		'!' + paths.env.dev + paths.configs.favicons.dataFile,
		
		/* Server */
		paths.env.dev + paths.server.indexFile,
		paths.env.dev + paths.server.allFiles
		
	] ).on( 'change', livereload.changed );
	
} );