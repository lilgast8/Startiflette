var options	= require( 'minimist' )( process.argv.slice(2) );
var paths	= require( '../utils/paths' );
var image	= require( '../utils/image' );

var gutil	= require( 'gulp-util' );



options.image		= image;

options.task		= options._[0] === undefined ? 'default' : options._[0];
options.subtask		= null;

options.isDev		= null;
options.env			= getEnv();
options.device		= getDevice();

options.filePath	= null;
options.fileName	= null;
options.devicePath	= null;
options.cssSrcPath	= null;
options.jsSrcPath	= null;
options.jsonSrcPath	= null;
options.svgSrcPath	= null;



function getEnv() {
	var config		= require( '../../' + paths.env.dev + paths.configs.configFile );
	var defaultEnv	= config.ENV;
	var envTemp		= options.env;
	var env;
	
	checkEnvExistence( config, envTemp );
	
	// dev
	if ( envTemp == defaultEnv || options.task == 'init' || options.task == 'default' ) {
		if ( envTemp === undefined )
			env = config.ENV;
		else
			env = envTemp;
		
		options.isDev = true;
	}
	
	// preprod-local, preprod or prod
	else {
		if ( envTemp === undefined )
			env = 'prod';
		else if ( envTemp == 'preprod-local' || envTemp.indexOf( 'preprod-local-' ) > -1 ||
			 envTemp == 'preprod' || envTemp.indexOf( 'preprod-' ) > -1 ||
			 envTemp == 'prod' || envTemp.indexOf( 'prod-' ) > -1 )
			env = envTemp;
		
		options.isDev = false;
	}
	
	console.log( gutil.colors.bgMagenta( ' — ENV: ' + env + ' — ' ) );
	
	
	return env;
}


function checkEnvExistence( config, envTemp ) {
	if ( envTemp !== undefined && config.ENVS[ envTemp ] === undefined )
		console.log( gutil.colors.red( 'WARNING!: ' ) + gutil.colors.bgRed( ' ' + envTemp + ' ' ) + gutil.colors.red( ' doesn\'t exist! Please set an existing environment.' ) );	
}


function getDevice() {
	var device	= options.device === undefined ? 'desktop' : options.device;
	device		= device !== undefined ? device.toLowerCase() : undefined;
	
	
	return device;
}



module.exports = options;