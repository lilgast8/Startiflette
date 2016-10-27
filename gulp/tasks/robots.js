var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );

var config	= require( '../../' + paths.env.dev + paths.configs.configFile );



gulp.task( 'robots', function() {
	
	var data	= fs.readFileSync( paths.env.base + paths.robots, 'utf8' );
	data		= data.replace( 'BASE_URL/', config.ENVS[ options.env ].base_url );
	
	fs.writeFileSync( paths.env.prod + paths.robots, data, 'utf8' );
	
} );