var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var fs			= require( 'fs' );
var plumber		= require( 'gulp-plumber' );
var jsonminify	= require( 'gulp-jsonminify' );



gulp.task( 'json-min', ['json-concat'], function () {
	
	// config file
	gulp.src( paths.src.json.config.configFile )
		.pipe( plumber() )
		.pipe( jsonminify() )
		.pipe( gulp.dest( paths.assets.json.config.dir ) );
	
	// routes files
	gulp.src( paths.src.json.routes.concatAllFiles )
		.pipe( plumber() )
		.pipe( jsonminify() )
		.pipe( gulp.dest( paths.assets.json.routes.dir ) );
	
	
	minifyJsFilesFile(); // js-files file
	
} );



function minifyJsFilesFile() {
	var jsFiles	= require( '../../' + paths.src.json.config.jsFilesFile );
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
	
	fs.writeFileSync( paths.assets.json.config.jsFilesFile, data, 'utf8' );
}