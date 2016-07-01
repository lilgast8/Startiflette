var gulp	= require( 'gulp' );
var path	= require( 'path' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var gutil	= require( 'gulp-util' );
var sass	= require( 'gulp-ruby-sass' );
var notify	= require( 'gulp-notify' );
var rename	= require( 'gulp-rename' );



gulp.task( 'sass', [ 'sass:dev' ], function() {
	
	if ( options.task == 'sass' )
		gulp.start( 'move' );
	
});


gulp.task( 'sass:dev', [ 'delete' ], function() {
	
	if ( options.cssSrcPath === null )
		options.cssSrcPath = [
			paths.env.dev + paths.assets.css.app.desktopFile,
			paths.env.dev + paths.assets.css.app.mobileFile
		];
	
	
	return sass( options.cssSrcPath, {
			style:				'compressed',
			// style:				'expanded',
			precision:			3,
			compass:			true,
			emitCompileError:	true
		} )
		.on( 'error', function( error ) {
			console.log( gutil.colors.red( error ) );
			notify().write( options.devicePath + ': ' + error.message );
		} )
		.pipe( rename( { suffix : '.min' } ) )
		.pipe( gulp.dest( paths.env.dev + paths.assets.css.dir ) );
	
});