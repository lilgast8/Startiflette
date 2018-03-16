var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );



gulp.task( 'set-env', [ 'htaccess' ], function() {
	
	var config	= require( '../../' + paths.env.dev + paths.configs.configFile );
	var envProd	= config.ENVS[ options.env ];
	
	config.ENV	= options.env;
	config.ENVS = {};
	config.ENVS[ options.env ] = envProd;
	
	if ( options.task == 'prod' ) {
		config.U_ID.css	= options.U_ID.css;
		config.U_ID.js	= options.U_ID.js;
	}
	else if ( options.task == 'set-env' ) {
		var configProd	= require( '../../' + paths.env.prod + paths.configs.configFile );
		config.U_ID		= configProd.U_ID;
	}
	
	var data = JSON.stringify( config );
	
	fs.writeFileSync( paths.env.prod + paths.configs.configFile, data, 'utf8' );
	
} );