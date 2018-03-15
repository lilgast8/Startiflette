var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );



gulp.task( 'robots', function() {
	
	var config	= require( '../../' + paths.env.dev + paths.configs.configFile );
	var data	= fs.readFileSync( paths.env.base + paths.robots, 'utf8' );
	data		= data.replace( 'BASE_URL/', config.ENVS[ options.env ].base_url );
	
	fs.writeFileSync( paths.env.prod + paths.robots, data, 'utf8' );
	
} );