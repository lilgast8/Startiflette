var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );
var helpers		= require( '../utils/helpers' );

var fs			= require( 'fs' );
var plumber		= require( 'gulp-plumber' );
var jsonminify	= require( 'gulp-jsonminify' );

var config		= require( '../../' + paths.env.dev + paths.configs.configFile );



gulp.task( 'json-min', [ 'json-min:json', 'json-min:configs' ], function () {
	
	gulp.start( 'set-env' );
	
} );


gulp.task( 'json-min:json', [ 'delete' ], function() {
	
	var jsonSrcPath = [ paths.env.dev + paths.assets.json.allFiles ];
	var jsonDestPath = paths.env.prod + paths.assets.json.dir;
	
	
	return minifyJson( jsonSrcPath, jsonDestPath );
	
} );


gulp.task( 'json-min:configs', [ 'delete' ], function() {
	
	var jsonSrcPath = [
		paths.env.dev + paths.configs.allJsonFiles,
		'!' + paths.env.dev + paths.configs.jsFilesFile,
		'!' + paths.env.dev + paths.configs.favicons.allFiles
	];
	var jsonDestPath = paths.env.prod + paths.configs.dir;
	
	
	minifyJsFilesFile(); // js-files file
	
	return minifyJson( jsonSrcPath, jsonDestPath );
	
} );



function minifyJson( scrPath, destPath ) {
	return gulp.src( scrPath )
		.pipe( plumber() )
		.pipe( jsonminify() )
		.pipe( gulp.dest( destPath ) );
}


function minifyJsFilesFile() {
	var jsFiles	= require( '../../' + paths.env.dev + paths.configs.jsFilesFile );
	var aLength	= Object.keys( jsFiles ).length;
	var i		= 0;
	var jsFile, jsFileName, isArray;
	
	var data	= '{';
	
	// parse js-files file
	for ( var name in jsFiles ) {
		i++;
		
		jsFile		= jsFiles[ name ];
		jsFileName	= JSON.stringify( jsFile.name );
		jsFileDest	= JSON.stringify( jsFile.dest );
		
		data += '"' + name + '":{"name":' + jsFileName + ',"dest":' + jsFileDest + '}';
		
		if ( i < aLength )
			data += ',';
	}
	
	data += '}';
	
	
	helpers.createDir( paths.env.prod + paths.configs.dir );
	fs.writeFileSync( paths.env.prod + paths.configs.jsFilesFile, data, 'utf8' );
}