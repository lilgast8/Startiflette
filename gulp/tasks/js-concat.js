var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var concat		= require( 'gulp-concat' );
var sourcemaps	= require( 'gulp-sourcemaps' );
var all			= require( 'gulp-all' );
var livereload	= require( 'gulp-livereload' );



gulp.task( 'js-concat', [ 'delete' ], function() {
	
	var jsFiles = require( '../../' + paths.env.dev + paths.configs.jsFilesFile );
	
	var jsFilesList	= getJsFileList( jsFiles );
	var i			= 0;
	
	var allTasks = jsFilesList.map( function( bundle ) {
		i++;
		
		if ( i < jsFilesList.length )
			return gulp.src( bundle.src )
						.pipe( plumber() )
						.pipe( sourcemaps.init() )
						.pipe( concat( bundle.name ) )
						.pipe( sourcemaps.write( './maps' ) )
						.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );
		else if ( i == jsFilesList.length )
			return gulp.src( bundle.src )
						.pipe( plumber() )
						.pipe( sourcemaps.init() )
						.pipe( concat( bundle.name ) )
						.pipe( sourcemaps.write( './maps' ) )
						.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) )
						.pipe( livereload() );
	} );
	
	
	all( allTasks );
	
} );



function getJsFileList( jsFiles ) {
	var fullUrlJsFile;
	var jsFileList	= [];
	var i			= 0;
	
	// parse js-files file
	for ( var id in jsFiles ) {
		var jsFile			= jsFiles[ id ];
		var isNeedConcat	= false;
		fullUrlJsFile		= [];
		
		// parse files list
		for ( var j = 0; j < jsFile.files.length; j++ ) {
			var file = jsFile.files[ j ];
			
			if ( options.filePath === null )
				isNeedConcat = true;
			else if ( options.filePath.indexOf( file ) >= 0 )
				isNeedConcat = true;
			
			fullUrlJsFile.push( paths.env.dev + paths.assets.js.dir + file );
		}
		
		if ( isNeedConcat ) {
			jsFileList[ i ] = {
				src:	fullUrlJsFile,
				name:	jsFile.name
			};
			
			i++;
		}
	}
	
	
	return jsFileList;
}