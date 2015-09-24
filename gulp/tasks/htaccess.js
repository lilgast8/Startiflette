var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );

var config	= require( '../../' + paths.env.dev + paths.configs.config.configFile );



gulp.task( 'htaccess', function() {
	
	var infos			= getInfos( config.ENVS );
	
	var data			= fs.readFileSync( paths.env.base + paths.htaccess, 'utf8' );
	var stringToReplace	= 'FallbackResource BASE_URL_FBR';
	var newString		= 'FallbackResource ' + infos.baseUrlFBR + 'index.php';
	
	data				= data.replace( stringToReplace, newString );
	
	fs.writeFileSync( infos.dirPath + paths.htaccess, data, 'utf8' );
	
} );



function getInfos( envs ) {
	var infos = {
		baseUrlFBR:	'',
		dirPath:	''
	};
	
	
	/* htaccess */
	if ( options.task == 'htaccess' && options.env == 'dev' )
		infos = {
			baseUrlFBR:	envs.dev.fallbackresource,
			dirPath:	paths.env.dev
		};
	else if ( options.task == 'htaccess' && options.env == 'prod' )
		infos = {
			baseUrlFBR:	envs.prod.fallbackresource,
			dirPath:	paths.env.prod
		};
	else if ( options.task == 'htaccess' && options.env == 'preprod' )
		infos = {
			baseUrlFBR:	envs.preprod.fallbackresource,
			dirPath:	paths.env.prod
		};
	else if ( options.task == 'htaccess' && options.env == 'preprod_local' )
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
	
	
	/* Default - Dev */
	else if ( options.task == 'default' )
		infos = {
			baseUrlFBR:	envs.dev.fallbackresource,
			dirPath:	paths.env.dev
		};
	
	
	/* Prod */
	else if ( options.task == 'prod' && options.env == 'preprod' )
		infos = {
			baseUrlFBR:	envs.preprod.fallbackresource,
			dirPath:	paths.env.prod
		};
	else if ( options.task == 'prod' && options.env == 'preprod_local' )
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