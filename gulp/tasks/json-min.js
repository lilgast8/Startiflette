var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var fs			= require( 'fs' );
var plumber		= require( 'gulp-plumber' );
var jsonminify	= require( 'gulp-jsonminify' );



gulp.task( 'json-min', ['json-concat'], function () {
	
	// config file
	gulp.src( paths.src.jsonConfigFile )
		.pipe( plumber() )
		.pipe( jsonminify() )
		.pipe( gulp.dest( paths.assets.jsonConfig ) );
	
	// routes files
	gulp.src( paths.src.jsonRoutesConcatFiles )
		.pipe( plumber() )
		.pipe( jsonminify() )
		.pipe( gulp.dest( paths.assets.jsonRoutes ) );
	
	
	minifyJsFilesFile(); // js-files file
	
} );



function minifyJsFilesFile() {
	var jsFiles	= require( '../../' + paths.src.jsonJsFilesFile );
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
	
	fs.writeFileSync( paths.assets.jsonJsFilesFile, data, 'utf8' );
}