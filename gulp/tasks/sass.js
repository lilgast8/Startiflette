var gulp			= require( 'gulp' );
var path			= require( 'path' );

var options			= require( '../utils/options' );
var cssSupports		= require( '../utils/css-supports' );
var paths			= require( '../utils/paths' );

var plumber			= require( 'gulp-plumber' );
var gutil			= require( 'gulp-util' );
var sass			= require( 'gulp-sass' );
var sourcemaps		= require( 'gulp-sourcemaps' );
var autoprefixer	= require( 'gulp-autoprefixer' );
var notify			= require( 'gulp-notify' );
var rename			= require( 'gulp-rename' );



gulp.task( 'sass', [ 'sass:dev' ], function() {
	
	if ( options.task == 'sass' )
		gulp.start( 'move' );
	
});


gulp.task( 'sass:dev', [ 'delete' ], function() {
	
	if ( options.cssSrcPath === null )
		options.cssSrcPath = paths.env.dev + paths.assets.css.app.allSCSS;
	
	
	return gulp.src( options.cssSrcPath )
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( sass.sync( {
			outputStyle:		'compressed',
			precision:			3,
			emitCompileError:	true
		} ).on( 'error', function( error ) {
			var file	= error.relativePath.substr( error.relativePath.indexOf( '/assets/' ) + 8 );
			var msg		= 'CSS error: ' + file + ' on line ' + error.line + ', column ' + error.column;
			notify().write( msg );
			console.log( gutil.colors.red( error.message ) );
		} ) )
		.pipe( autoprefixer( cssSupports ) )
		.pipe( rename( { suffix : '.min' } ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( paths.env.dev + paths.assets.css.dir ) );
	
});