var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var concat		= require( 'gulp-concat' );
var sourcemaps	= require( 'gulp-sourcemaps' );



gulp.task( 'js-concat', [ 'delete' ], function() {
	
	var jsFiles = require( '../../' + paths.env.dev + paths.configs.jsFilesFile );
	
	
	// parse js-files file
	for ( var id in jsFiles ) {
		var jsFile = jsFiles[ id ];
		var aFiles = [];
		
		// parse files list
		for ( var j = 0; j < jsFile.files.length; j++ ) {
			var file = jsFile.files[ j ];
			aFiles.push( paths.env.dev + paths.assets.js.dir + file );
		}
		
		gulp.src( aFiles )
			.pipe( plumber() )
			.pipe( sourcemaps.init() )
			.pipe( concat( jsFile.name ) )
			.pipe( sourcemaps.write( './maps' ) )
			.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );
	}
	
} );