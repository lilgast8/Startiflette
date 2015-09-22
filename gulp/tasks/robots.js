var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );
var configs	= require( '../utils/configs' );

var fs		= require( 'fs' );



gulp.task( 'robots', function() {
	
	var config	= configs.getConfig();
	
	var data	= fs.readFileSync( paths.env.base + paths.robots, 'utf8' );
	data		= data.replace( 'BASE_URL/', config.ENVS.prod.base_url );
	
	fs.writeFileSync( paths.env.prod + paths.robots, data, 'utf8' );
	
} );