var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var fs			= require( 'fs' );
var plumber		= require( 'gulp-plumber' );
var jsonminify	= require( 'gulp-jsonminify' );



// gulp.task( 'json-min', ['clean'], function () {
gulp.task( 'json-min', function () {
	/*
	var jsonToMin = [
		{
			input	: paths.src.jsonConcatFiles,
			output	: paths.assets.json
		},
		{
			input	: paths.src.jsJsFilesFile,
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
	*/
	
	
	// gulp.src( paths.src.jsonConcatFiles )
	// 	.pipe( plumber() )
	// 	.pipe( jsonminify() )
	// 	.pipe( gulp.dest( paths.assets.json ) );
	
	
	minifyJsFiles();
	
});



function minifyJsFiles() {
	// var files = fs.readdirSync( paths.src.jsJsFilesFile );
	// var data = fs.readFileSync( paths.src.jsJsFilesFile, 'utf8' );
	// var jsFiles = fs.readFileSync( paths.src.jsJsFilesFile, 'utf8' );
	
	// console.log(data);
	
	var jsFiles	= require( '../../' + paths.src.jsJsFilesFile );
	var data	= '{';
	var jsFile, jsFileName, isArray;
	
	for ( var name in jsFiles ) {
		jsFile		= jsFiles[name];
		jsFileName	= jsFile.name;
		
		isArray = Array.isArray(jsFileName)
		if (!isArray)
			jsFileName = '"'+ jsFileName + '"';
		
		data += '"'+ name +'":{"name":'+ jsFileName +'}';
	}
	
	data += '}';
	
	console.log(data);
}