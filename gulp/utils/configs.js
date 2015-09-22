var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );



var getConfig = function() {
	if ( !options.config ) {
		var configFile	= fs.readFileSync( paths.env.dev + paths.assets.json.config.configFile, 'utf8' );
		var config		= JSON.parse( configFile );
		
		options.config	= config;
	}
	
	
	return options.config;
};



exports.getConfig = getConfig;