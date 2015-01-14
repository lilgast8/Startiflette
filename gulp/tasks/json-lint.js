var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var notify		= require( 'gulp-notify' );
var jsonlint	= require( 'gulp-jsonlint' );



gulp.task( 'json-lint', function() {
	
	if ( options.jsonSrcPath === null )
		options.jsonSrcPath = paths.src.jsonFiles;
	
	gulp.src( options.jsonSrcPath )
		.pipe( plumber() )
		.pipe( jsonlint() )
		.pipe( jsonlint.reporter() )
		.pipe( jsonlint.reporter(function(file) {
			var posJsonStr = file.path.indexOf( 'www/' ) + 4;
			var fileName = file.path.substring( posJsonStr, file.path.length );
			
			return notify().write( 'JSON Lint error on: ' + fileName );
		}) );
	
});