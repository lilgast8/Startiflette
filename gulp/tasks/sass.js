var gulp		= require( 'gulp' );
var path		= require( 'path' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var gutil		= require( 'gulp-util' );
var sass		= require( 'gulp-sass' );
var sourcemaps	= require( 'gulp-sourcemaps' );
var notify		= require( 'gulp-notify' );
var rename		= require( 'gulp-rename' );



gulp.task( 'sass', [ 'sass:dev' ], function() {
	
	if ( options.task == 'sass' )
		gulp.start( 'move' );
	
});


gulp.task( 'sass:dev', [ 'delete' ], function() {
	
	if ( options.cssSrcPath === null )
		/*options.cssSrcPath = [
			paths.env.dev + paths.assets.css.app.desktopFile,
			paths.env.dev + paths.assets.css.app.mobileFile
		];*/
		options.cssSrcPath = paths.env.dev + paths.assets.css.app.dir + '*.scss';
	
	
	return gulp.src( options.cssSrcPath )
		.pipe( sourcemaps.init() )
		.pipe( sass( {
			outputStyle:		'compressed',
			// outputStyle:		'expanded',
			precision:			3,
			// compass:			true,
			emitCompileError:	true
		} ).on( 'error', function( error ) {
			var file = error.file.substr( error.file.indexOf( '/assets/' ) + 8 );
			var msg = 'CSS error: ' + file + ' in line ' + error.line + ', column ' + error.column;
			console.log( gutil.colors.red( msg ) );
			notify().write( msg );
		} ) )
		.pipe( rename( { suffix : '.min' } ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( paths.env.dev + paths.assets.css.dir ) );
	
});