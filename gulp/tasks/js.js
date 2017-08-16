/*
var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );



gulp.task( 'js', [ 'js-hint' ], function() {
	
	if ( options.task == 'prod' || options.task == 'js' || options.htmlify )
		gulp.start( 'js-min' );
	
} );
*/



var gulp		= require( 'gulp' );

// var options	= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );

var browserify	= require( 'browserify' );
var watchify	= require( 'watchify' );
var source		= require( 'vinyl-source-stream' );
// var buffer		= require( 'vinyl-buffer' );

var assign		= require( 'lodash.assign' );

var gutil		= require( 'gulp-util' );

// var glslify		= require( 'glslify' );



gulp.task( 'js', function() {
	
	// add custom browserify options here
	var customOpts = {
		cache:			{},
		packageCache:	{},
		// fullPaths:		true,
		entries: 		[ paths.env.dev + paths.assets.js.app.dir + 'Main.js' ],
		paths:			[
							paths.env.dev + paths.assets.js.app.dir,
							paths.env.dev + paths.assets.js.vendor.dir
						],
		// debug: 			true,
		
		transform: [
			// browserifyShim,
			// glslify
		]
	};
	var opts	= assign( {}, watchify.args, customOpts );
	var b		= watchify( browserify( opts ) );
	
	
	// on any dep update, runs the bundler
	b.on( 'update', function() {
		bundle( b );
	} );
	b.on( 'log', gutil.log ); // output build logs to terminal
	
	
	bundle( b );
	
} );



function bundle( b ) {
	return b.bundle()
		// log errors if they happen
		.on( 'error', gutil.log.bind( gutil, 'Browserify Error' ) )
		.pipe( source( 'scripts.js' ) )
		// optional, remove if you don't need to buffer file contents
		// .pipe( buffer() )
		// optional, remove if you dont want sourcemaps
		// .pipe( sourcemaps.init( {loadMaps: true} ) ) // loads map from browserify file
			// Add transformation tasks to the pipeline here.
		// .pipe( sourcemaps.write('./') ) // writes .map file
		.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );
}