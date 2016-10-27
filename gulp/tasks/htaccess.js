var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );

var config	= require( '../../' + paths.env.dev + paths.configs.configFile );



gulp.task( 'htaccess', function() {
	
	if ( options.task == 'default' ) { // force reset config by reloading config.json file if there has been change on it
		var configFile	= fs.readFileSync( paths.env.dev + paths.configs.configFile, 'utf8' );
		config			= JSON.parse( configFile );
	}
	
	var baseUrlFBR		= config.ENVS[ options.env ].fallbackresource;
	var dirPath			= options.isDev ? paths.env.dev : paths.env.prod;
	
	var data			= fs.readFileSync( paths.env.base + paths.htaccess, 'utf8' );
	var stringToReplace	= 'FallbackResource BASE_URL_FBR';
	var newString		= 'FallbackResource ' + baseUrlFBR + 'index.php';
	
	data				= data.replace( stringToReplace, newString );
	
	
	if ( baseUrlFBR != '' && dirPath != '' )
		fs.writeFileSync( dirPath + paths.htaccess, data, 'utf8' );
	
} );