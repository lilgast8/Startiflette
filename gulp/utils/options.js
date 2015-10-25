var options	= require( 'minimist' )( process.argv.slice(2) );
var paths	= require( '../utils/paths' );



options.task		= options._[0] === undefined ? 'default' : options._[0];
options.subtask		= null;
options.filePath	= null;
options.fileName	= null;

options.env			= getEnv();

options.imageMin	= true;

options.device		= null;

options.cssSrcPath	= null;
options.jsSrcPath	= null;
options.jsonSrcPath	= null;
options.svgSrcPath	= null;

options.deletePath	= null;
options.movePath	= null;



function getEnv() {
	var environment;
	
	if ( options.task == 'init' || options.task == 'default' )
		environment = 'dev';
	
	else {
		var config = require( '../../' + paths.env.dev + paths.configs.config.configFile );
		
		for ( var env in config.ENVS ) {
			if ( options[ env ] )
				environment = env;
		}
		
		if ( environment === undefined )
			environment = 'preprod_local';
	}
	
	
	return environment;
}



module.exports = options;