var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );
var helpers		= require( '../utils/helpers' );

var fs			= require( 'fs' );
var plumber		= require( 'gulp-plumber' );
var jsonminify	= require( 'gulp-jsonminify' );

var config		= require( '../../' + paths.env.dev + paths.configs.config.configFile );



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
	
	
	helpers.createDir( paths.env.prod + paths.configs.dir );
	helpers.createDir( paths.env.prod + paths.configs.config.dir );
	fs.writeFileSync( paths.env.prod + paths.configs.config.jsFilesFile, data, 'utf8' );
}