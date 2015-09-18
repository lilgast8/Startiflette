var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var fs			= require( 'fs' );
var plumber		= require( 'gulp-plumber' );
var jsonminify	= require( 'gulp-jsonminify' );



gulp.task( 'json-min', [ 'delete' ], function () {
	
	var jsonSrcPath = [
		paths.env.dev + paths.assets.json.allFiles,
		'!' + paths.env.dev + paths.assets.json.config.jsFilesFile
	];
	
	
	var configFile	= fs.readFileSync( paths.env.dev + paths.assets.json.config.configFile, 'utf8' );
	var config		= JSON.parse( configFile );
	
	for ( var i = 0; i < config.ALL_LANG.length; i++ )
		jsonSrcPath.push( '!' + paths.env.dev + paths.assets.json.routes.dir + config.ALL_LANG[i] + '/**/*.json' );
	
	
	gulp.src( jsonSrcPath )
		.pipe( plumber() )
		.pipe( jsonminify() )
		.pipe( gulp.dest( paths.env.prod + paths.assets.json.dir ) );
	
	
	minifyJsFilesFile(); // js-files file
	
} );



function minifyJsFilesFile() {
	var jsFiles	= require( '../../' + paths.env.dev + paths.assets.json.config.jsFilesFile );
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
	
	
	createDir( paths.env.prod + paths.assets.json.dir );
	createDir( paths.env.prod + paths.assets.json.config.dir );
	fs.writeFileSync( paths.env.prod + paths.assets.json.config.jsFilesFile, data, 'utf8' );
}


function createDir( dirPath ) {
	if ( !fs.existsSync( dirPath ) )
		fs.mkdirSync( dirPath );
}