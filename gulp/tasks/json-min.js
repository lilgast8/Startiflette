var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );
var configs		= require( '../utils/configs' );

var fs			= require( 'fs' );
var plumber		= require( 'gulp-plumber' );
var jsonminify	= require( 'gulp-jsonminify' );



gulp.task( 'json-min', [ 'delete' ], function () {
	
	var jsonSrcPath = [
		[ paths.env.dev + paths.assets.json.allFiles ],
		[
			paths.env.dev + paths.configs.allFiles,
			'!' + paths.env.dev + paths.configs.config.jsFilesFile
		]
	];
	var jsonDestPath = [
		paths.env.prod + paths.assets.json.dir,
		paths.env.prod + paths.configs.dir
	];
	
	var config = configs.getConfig();
	
	
	for ( var i = 0; i < jsonSrcPath.length; i++ ) {
		
		gulp.src( jsonSrcPath[i] )
			.pipe( plumber() )
			.pipe( jsonminify() )
			.pipe( gulp.dest( jsonDestPath[i] ) );
			
	}
	
	
	minifyJsFilesFile(); // js-files file
	
} );



function minifyJsFilesFile() {
	var jsFiles	= require( '../../' + paths.env.dev + paths.configs.config.jsFilesFile );
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
	
	
	createDir( paths.env.prod + paths.configs.dir );
	createDir( paths.env.prod + paths.configs.config.dir );
	fs.writeFileSync( paths.env.prod + paths.configs.config.jsFilesFile, data, 'utf8' );
}


function createDir( dirPath ) {
	if ( !fs.existsSync( dirPath ) )
		fs.mkdirSync( dirPath );
}