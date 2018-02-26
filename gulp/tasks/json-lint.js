var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var jsonlint	= require( 'gulp-jsonlint' );
var notify		= require( 'gulp-notify' );



gulp.task( 'json-lint', function() {
	
	gulp.src( [
		paths.env.dev + paths.assets.json.allFiles,
		paths.env.dev + paths.configs.allJsonFiles
	] )
		.pipe( plumber() )
		.pipe( jsonlint() )
		.pipe( jsonlint.reporter() )
		.pipe( jsonlint.reporter( function( file ) {
			var posJsonStr	= file.path.indexOf( paths.env.dev ) + paths.env.dev.length;
			var fileName	= file.path.substring( posJsonStr, file.path.length );
			
			notify().write( 'JSON Lint error on: ' + fileName );
		} ) );
	
} );