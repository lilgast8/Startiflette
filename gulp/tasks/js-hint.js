var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var notify	= require( 'gulp-notify' );
var jshint	= require( 'gulp-jshint' );



gulp.task( 'js-hint', function() {
	
	if ( options.jsSrcPath === null )
		options.jsSrcPath = paths.env.dev + paths.assets.js.app.allFiles;
	
	
	gulp.src( options.jsSrcPath )
		.pipe( plumber() )
		.pipe( jshint({
			'-W083' : true // Don't make functions within a loop
		}) )
		.pipe( jshint.reporter( 'jshint-stylish' ) )
		.pipe( notify( function( file ) {
			
			if ( file.jshint.success )
				return false;
			
			var errors = file.jshint.results.map( function( data ) {
				if ( data.error )
					return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
			} ).join('\n');
			
			return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
			
		}))
		.pipe( jshint.reporter( 'fail' ) );
	
} );