var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );



gulp.task( 'htaccess', function() {
	
	var config			= require( '../../' + paths.env.dev + paths.configs.configFile );
	
	var baseUrlFBR		= config.ENVS[ options.env ].fallbackresource;
	var dirPath			= options.isDev ? paths.env.dev : paths.env.prod;
	
	var data			= fs.readFileSync( paths.env.base + paths.htaccess, 'utf8' );
	var stringToReplace	= 'FallbackResource BASE_URL_FBR';
	var newString		= 'FallbackResource ' + baseUrlFBR + 'index.php';
	
	data				= data.replace( stringToReplace, newString );
	
	
	if ( baseUrlFBR != '' && dirPath != '' )
		fs.writeFileSync( dirPath + paths.htaccess, data, 'utf8' );
	
} );