var gulp	= require( 'gulp' );

var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var concat	= require( 'gulp-concat' );
var uglify	= require( 'gulp-uglify' );



gulp.task( 'js-min', ['delete'], function() {
	
	var jsFiles = require( '../../' + paths.src.jsonJsFilesFile );
	
	
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
				aFiles.push( paths.src.js + file );
				
				if ( needOldie ) // if need oldie version
					aFilesOldie.push( paths.src.js + file );
			}
			else { // if object - two versions of file for manage oldie version
				aFiles.push( paths.src.js + file[0] );
				
				if ( needOldie ) // if need oldie version
					aFilesOldie.push( paths.src.js + file[1] );
			}
		}
		
		// generate min js
		gulp.src( aFiles )
			.pipe( plumber() )
			.pipe( concat( nameOutputFile ) )
			.pipe( uglify() )
			.pipe( gulp.dest( paths.assets.js + destOutputFile ) );
		
		// generate oldie min js
		if ( needOldie ) {
			nameOutputFile = jsFile.name[1];
			
			gulp.src( aFilesOldie )
				.pipe( plumber() )
				.pipe( concat( nameOutputFile ) )
				.pipe( uglify() )
				.pipe( gulp.dest( paths.assets.js + destOutputFile ) );
		}
		
	}
	
});