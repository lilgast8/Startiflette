var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var concat	= require( 'gulp-concat' );
var uglify	= require( 'gulp-uglify' );



gulp.task( 'js-min', [ 'delete' ], function() {
	
	if ( options.task == 'js' || options.task == 'js-min' )
		gulp.start( 'move' );
	
	
	var jsFiles = require( '../../' + paths.env.dev + paths.configs.jsFilesFile );
	
	
	// parse js-files file
	for ( var name in jsFiles ) {
		jsFile = jsFiles[name];
		
		var needOldie		= typeof( jsFile.name ) == 'string' ? false : true;
		var nameOutputFile	= !needOldie ? jsFile.name : jsFile.name[0];
		var destOutputFile	= jsFile.dest;
		var aFiles			= [];
		var aFilesOldie		= [];
		
		// parse files list
		for ( var j = 0; j < jsFile.files.length; j++ ) {
			file = jsFile.files[j];
			
			if ( typeof( file ) == 'string' ) { // if file - one version of file
				aFiles.push( paths.env.dev + paths.assets.js.dir + file );
				
				if ( needOldie ) // if need oldie version
					aFilesOldie.push( paths.env.dev + paths.assets.js.dir + file );
			}
			else { // if object - two versions of file for manage oldie version
				if ( file[0] != '' )
					aFiles.push( paths.env.dev + paths.assets.js.dir + file[0] );
				
				if ( needOldie && file[1] != '' ) // if need oldie version
					aFilesOldie.push( paths.env.dev + paths.assets.js.dir + file[1] );
			}
		}
		
		// generate min js
		gulp.src( aFiles )
			.pipe( plumber() )
			.pipe( concat( nameOutputFile ) )
			.pipe( uglify() )
			.pipe( gulp.dest( paths.env.prod + paths.assets.js.dir + destOutputFile ) );
		
		// generate oldie min js
		if ( needOldie ) {
			nameOutputFile = jsFile.name[1];
			
			gulp.src( aFilesOldie )
				.pipe( plumber() )
				.pipe( concat( nameOutputFile ) )
				.pipe( uglify() )
				.pipe( gulp.dest( paths.env.prod + paths.assets.js.dir + destOutputFile ) );
		}
		
	}
	
} );