var options	= require( 'minimist' )( process.argv.slice(2) );
var paths	= require( '../utils/paths' );



options.imageMin	= false;

options.task		= options._[0] === undefined ? 'default' : options._[0];
options.subtask		= null;

options.isProd		= null;
options.env			= getEnv();
console.log( 'ENV:', options.env, 'isProd:', options.isProd );
options.device		= options.device === undefined ? 'desktop' : options.device;

options.filePath	= null;
options.fileName	= null;
options.devicePath	= null;
options.cssSrcPath	= null;
options.jsSrcPath	= null;
options.jsonSrcPath	= null;
options.svgSrcPath	= null;

options.deletePath	= null;
options.movePath	= null;



function getEnv() {
	var env;
	var envTemp = options.env;
	
	// if ( envTemp == 'dev' || options.task == 'init' || options.task == 'default' ) {
	// dev
	if ( envTemp != 'preprod-local' && envTemp != 'preprod' || envTemp != 'prod' || options.task == 'init' || options.task == 'default' ) {
		var config	= require( '../../' + paths.env.dev + paths.configs.config.configFile );
		env			= config.ENV;
		
		options.isProd = false;
	}
	
	// preprod-local, preprod or prod
	else {
		var config = require( '../../' + paths.env.dev + paths.configs.config.configFile );
		
		if ( envTemp == 'preprod-local' || envTemp == 'preprod' || envTemp == 'prod' )
			env =  envTemp;
		else
			env =  'prod';
		
		options.isProd = true;
	}
	
	
	return env;
}



module.exports = options;