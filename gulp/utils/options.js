var options	= require( 'minimist' )( process.argv.slice(2) );
var paths	= require( '../utils/paths' );

var gutil	= require( 'gulp-util' );



options.imageMin	= true;

options.task		= options._[0] === undefined ? 'default' : options._[0];
options.subtask		= null;

options.isProd		= null;
options.env			= getEnv();
options.device		= getDevice();

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
	var config		= require( '../../' + paths.env.dev + paths.configs.config.configFile );
	var defaultEnv	= config.ENV;
	var envTemp		= options.env;
	var env;
	
	// dev
	if ( envTemp == defaultEnv || options.task == 'init' || options.task == 'default' ) {
		if ( envTemp === undefined )
			env = config.ENV;
		else
			env = envTemp;
		
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
	
	console.log( gutil.colors.bgMagenta( ' — ENV: ' + env + ' — ' ) );
	
	
	return env;
}


function getDevice() {
	var device	= options.device === undefined ? 'desktop' : options.device;
	device		= device !== undefined ? device.toLowerCase() : undefined;
	
	
	return device;
}



module.exports = options;