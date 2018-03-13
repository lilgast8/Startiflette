var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );



gulp.task( 'set-env', [ 'htaccess' ], function() {
	
	var config		= require( '../../' + paths.env.dev + paths.configs.configFile );
	var configProd	= JSON.parse( JSON.stringify( config ) );
	var envProd		= JSON.parse( JSON.stringify( configProd.ENVS[ options.env ] ) );
	
	configProd.ENV	= options.env;
	configProd.ENVS = {};
	configProd.ENVS[ options.env ] = envProd;
	
	if ( options.task == 'prod' ) {
		console.log( '⚡️ SLP ⚡️', options.U_ID );
		// options.U_ID[ type ]	= uID;
		configProd.U_ID.css	= options.U_ID.css;
		configProd.U_ID.js	= options.U_ID.js;
	}
	
	var data		= JSON.stringify( configProd );
	
	fs.writeFileSync( paths.env.prod + paths.configs.configFile, data, 'utf8' );
	
} );