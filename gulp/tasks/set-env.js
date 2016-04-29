var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );



gulp.task( 'set-env', [ 'htaccess' ], function() {
	
	var config	= require( '../../' + paths.env.dev + paths.configs.config.configFile );
	config.ENV	= options.env;
	config.ENVS	= '{"' + options.env + '": ' + JSON.stringify( config.ENVS[ options.env ] ) + '}';
	var data	= JSON.stringify( config );
	
	fs.writeFileSync( paths.env.prod + paths.configs.config.configFile, data, 'utf8' );
	
} );