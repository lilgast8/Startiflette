var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var fs			= require( 'fs' );
var plumber		= require( 'gulp-plumber' );
var jsonminify	= require( 'gulp-jsonminify' );



gulp.task( 'json-min', ['clean'], function () {
	
	gulp.src( paths.src.jsonConcatFiles )
		.pipe( plumber() )
		.pipe( jsonminify() )
		.pipe( gulp.dest( paths.assets.json ) );
	
	
	minifyJsFiles();
	
});



function minifyJsFiles() {
	var jsFiles	= require( '../../' + paths.src.jsJsFilesFile );
	var aLength	= Object.keys( jsFiles ).length;
	var i		= 0;
	var jsFile, jsFileName, isArray;
	
	var data	= '{';
	
	// parse js-files file
	for ( var name in jsFiles ) {
		i++;
		
		jsFile		= jsFiles[name];
		jsFileName	= JSON.stringify( jsFile.name );
		jsFileDest	= JSON.stringify( jsFile.dest );
		
		data += '"'+ name +'":{"name":'+ jsFileName +',"dest":'+ jsFileDest +'}';
		
		if ( i < aLength )
			data += ',';
	}
	
	data += '}';
	
	fs.writeFileSync( paths.assets.jsJsFilesFile, data, 'utf8' );
}