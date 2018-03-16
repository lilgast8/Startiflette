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
		config.U_ID	= {};
		config.U_ID	= options.U_ID;
		
		var uId		= require( '../../' + paths.env.dev + paths.configs.uIdFile );
		uId.U_ID	= options.U_ID;
		
		var data	= JSON.stringify( uId );
		
		fs.writeFileSync( paths.env.dev + paths.configs.uIdFile, data, 'utf8' );
	}
	else if ( options.task == 'set-env' || options.task == 'json' || options.task == 'json-min' ) {
		var uId		= require( '../../' + paths.env.dev + paths.configs.uIdFile );
		config.U_ID	= uId.U_ID;
	}
	
	var data = JSON.stringify( config );
	
	fs.writeFileSync( paths.env.prod + paths.configs.configFile, data, 'utf8' );
	
} );