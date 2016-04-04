var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );

var config	= require( '../../' + paths.env.dev + paths.configs.config.configFile );



gulp.task( 'htaccess', function() {
	
	console.log( 'HTACCESS:', options.env, options.isProd );
	
	if ( options.task == 'default' ) { // force reset config by reloading config.json file if there has been change on it
		var configFile	= fs.readFileSync( paths.env.dev + paths.configs.config.configFile, 'utf8' );
		config			= JSON.parse( configFile );
	}
	
	// var infos			= getInfos( config.ENVS );
	// console.log( infos );
	var baseUrlFBR	= config.ENVS[ options.env ].fallbackresource;
	var dirPath		= options.isProd ? paths.env.prod : paths.env.dev;
	console.log( baseUrlFBR, '————————', dirPath );
	
	var data			= fs.readFileSync( paths.env.base + paths.htaccess, 'utf8' );
	var stringToReplace	= 'FallbackResource BASE_URL_FBR';
	var newString		= 'FallbackResource ' + baseUrlFBR + 'index.php';
	
	data				= data.replace( stringToReplace, newString );
	
	
	if ( baseUrlFBR != '' && dirPath != '' )
		fs.writeFileSync( dirPath + paths.htaccess, data, 'utf8' );
	
	/*var data			= fs.readFileSync( paths.env.base + paths.htaccess, 'utf8' );
	var stringToReplace	= 'FallbackResource BASE_URL_FBR';
	var newString		= 'FallbackResource ' + infos.baseUrlFBR + 'index.php';
	
	data				= data.replace( stringToReplace, newString );
	
	
	if ( infos.baseUrlFBR != '' && infos.dirPath != '' )
		fs.writeFileSync( infos.dirPath + paths.htaccess, data, 'utf8' );*/
	
} );



function getInfos( envs ) {
	var infos = {
		baseUrlFBR:	'',
		dirPath:	''
	};
	
	
	infos = {
		baseUrlFBR:	envs[ options.env ].fallbackresource,
		dirPath:	options.isProd ? paths.env.prod : paths.env.dev
	};
	
	
	// /* preprod_local */
	// if ( options.env == 'preprod_local' )
	// 	infos = {
	// 		baseUrlFBR:	envs.preprod_local.fallbackresource,
	// 		dirPath:	paths.env.prod
	// 	};
	
	// /* preprod */
	// else if ( options.env == 'preprod' )
	// 	infos = {
	// 		baseUrlFBR:	envs.preprod.fallbackresource,
	// 		dirPath:	paths.env.prod
	// 	};
	
	// /* prod */
	// else if ( options.env == 'prod' )
	// 	infos = {
	// 		baseUrlFBR:	envs.prod.fallbackresource,
	// 		dirPath:	paths.env.prod
	// 	};
	
	// /* dev */
	// else
	// 	infos = {
	// 		baseUrlFBR:	envs[ options.env ].fallbackresource,
	// 		dirPath:	paths.env.dev
	// 	};
	
	
	return infos;
}