var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );



gulp.task( 'set-env', function() {
	
	var config	= require( '../../' + paths.env.prod + paths.configs.config.configFile );
	config.ENV	= options.env;
	var data	= JSON.stringify( config );
	
	fs.writeFileSync( paths.env.prod + paths.configs.config.configFile, data, 'utf8' );
	
} );