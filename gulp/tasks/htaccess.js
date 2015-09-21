var gulp	= require('gulp');

var options	= require( '../utils/options' );
var paths	= require('../utils/paths');

var fs		= require( 'fs' );



gulp.task( 'htaccess', function() {
	
	var data		= fs.readFileSync( paths.env.base + paths.htaccess, 'utf8' );
	
	var configFile	= fs.readFileSync( paths.env.dev + paths.assets.json.config.configFile, 'utf8' );
	var config		= JSON.parse( configFile );
	
	// console.log( config );
	// console.log( config.ENVS.preprod_local.fallbackresource );
	
	/*
	var baseUrlFBR	= getBaseUrlFBR( config.ENVS );
	var filePath	= getFilePath();
	*/
	var infos	= getInfos( config.ENVS );
	
	console.log( infos );
	// console.log( baseUrlFBR );
	// console.log( baseUrlFBR, filePath );
	
	
	// var stringToReplace	= 'FallbackResource ' + config.ENVS.dev.fallbackresource + 'index.php';
	var stringToReplace	= 'FallbackResource BASE_URL_FBR';
	// var newString		= 'FallbackResource ' + config.ENVS[ options.env ].fallbackresource + 'index.php';
	var newString		= 'FallbackResource ' + infos.baseUrlFBR + 'index.php';
	
	
	data = data.replace( stringToReplace, newString );
	
	// console.log( data );
	
	fs.writeFileSync( infos.dirPath + paths.htaccess, data, 'utf8' );
	
	
} );



function getInfos( envs ) {
	var infos = {
		baseUrlFBR:	'',
		dirPath:	''
	};
	
	/* htaccess */
	if ( options.task == 'htaccess' && options.dev )
		infos = {
			baseUrlFBR:	envs.dev.fallbackresource,
			dirPath:	paths.env.dev
		};
	else if ( options.task == 'htaccess' && options.prod )
		infos = {
			baseUrlFBR:	envs.prod.fallbackresource,
			dirPath:	paths.env.prod
		};
	else if ( options.task == 'htaccess' && options.preprod )
		infos = {
			baseUrlFBR:	envs.preprod.fallbackresource,
			dirPath:	paths.env.prod
		};
	else if ( options.task == 'htaccess' && options.preprod_local )
		infos = {
			baseUrlFBR:	envs.preprod_local.fallbackresource,
			dirPath:	paths.env.prod
		};
	else if ( options.task == 'htaccess' )
		infos = {
			baseUrlFBR:	envs.preprod_local.fallbackresource,
			dirPath:	paths.env.prod
		};
	
	
	/* Init */
	else if ( options.task == 'init' )
		infos = {
			baseUrlFBR:	envs.dev.fallbackresource,
			dirPath:	paths.env.dev
		};
	
	
	/* Prod */
	else if ( options.task == 'prod' && options.preprod )
		infos = {
			baseUrlFBR:	envs.preprod.fallbackresource,
			dirPath:	paths.env.prod
		};
	else if ( options.task == 'prod' && options.preprod_local )
		infos = {
			baseUrlFBR:	envs.preprod_local.fallbackresource,
			dirPath:	paths.env.prod
		};
	else if ( options.task == 'prod' )
		infos = {
			baseUrlFBR:	envs.prod.fallbackresource,
			dirPath:	paths.env.prod
		};
	
	
	return infos;
}