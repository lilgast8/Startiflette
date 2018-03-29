var options	= require( 'minimist' )( process.argv.slice(2) );

var paths	= require( '../utils/paths' );
var image	= require( '../utils/image' );

var gutil	= require( 'gulp-util' );



options.image			= image;

options.task			= options._[0] === undefined ? 'default' : options._[0];
options.subtask			= null;

options.isDev			= null;
options.env				= options.env;
options.device			= getDevice();
options.htmlify			= getHTMLify();

options.remove			= options.remove;

options.U_ID			= {
							css:	null,
							js:		null,
						};

options.filePath		= null;
options.fileName		= null;
options.devicePath		= null;
options.cssSrcPath		= null;
options.jsSrcPath		= null;
options.jsonSrcPath		= null;
options.svgSrcPath		= null;

options.initEnv			= initEnv.bind( this );


initEnv();



function initEnv() {
	var config		= require( '../../' + paths.env.dev + paths.configs.configFile );
	
	checkEnvExistence( config, options.env );
	
	options.isDev	= getIsDev();
	options.env		= getEnv( config );
	
	console.log( gutil.colors.bgMagenta( ' — ENV: ' + options.env + ' — ' ) );
}


function getIsDev() {
	var isDev;
	
	if ( options.task == 'init' || options.task == 'default' )
		isDev = true;
	else
		isDev = false;
	
	
	return isDev;
}


function getEnv( config ) {
	var env = options.env;
	
	if ( options.isDev && options.env != config.ENV )
		env = config.ENV;
	else if ( !options.isDev && env === undefined )
		env = 'prod';
	
	
	return env;
}


function checkEnvExistence( config, env ) {
	if ( env !== undefined && config.ENVS[ env ] === undefined )
		console.log( gutil.colors.red( 'WARNING!: ' ) + gutil.colors.bgRed( ' ' + env + ' ' ) + gutil.colors.red( ' doesn\'t exist! Please set an existing environment.' ) );	
}


function getDevice() {
	var device	= options.device === undefined ? 'desktop' : options.device;
	device		= device !== undefined ? device.toLowerCase() : undefined;
	
	
	return device;
}


function getHTMLify() {
	var htmlify = options.task == 'prod-htmlify' ? true : false;
	
	
	return htmlify;
}



module.exports = options;