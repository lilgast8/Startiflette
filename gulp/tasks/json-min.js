var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var jsonminify	= require( 'gulp-jsonminify' );



gulp.task( 'json-min', ['clean'], function () {
	
	var jsonToMin = [
		{
			input		: paths.src.jsonConcatFiles,
			output	: paths.assets.json
		},
		{
			input		: paths.src.jsJsFilesFile,
			output	: paths.assets.js
		}
	];
	
	
	var json;
	
	for ( var i = 0; i < jsonToMin.length; i++ ) {
		json	= jsonToMin[i];
		
		gulp.src( json.input )
			.pipe( plumber() )
			.pipe( jsonminify() )
			.pipe( gulp.dest( json.output ) );
	}
	
});