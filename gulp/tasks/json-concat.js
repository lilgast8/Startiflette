var gulp	= require( 'gulp' );
var path	= require( 'path' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );
var plumber	= require( 'gulp-plumber' );



gulp.task( 'json-concat', ['delete'], function() {
	
	var configFile	= fs.readFileSync( paths.env.dev + paths.assets.json.config.configFile, 'utf8' );
	var config		= JSON.parse(configFile);
	
	var routesFileName, lang, data;
	
	
	// parse routes files
	for ( var i = 0; i < config.ROUTES_FILES.length; i++ ) {
		var routesFileName = config.ROUTES_FILES[i] + '.json';
		
		data = '{\n\n\n\n';
		
		// parse language directories
		for ( var j = 0; j < config.ALL_LANG.length; j++ ) {
			lang = config.ALL_LANG[j];
			
			data += '"' + lang + '" : ';
			data += '\t' + fs.readFileSync( paths.env.dev + paths.assets.json.routes.dir + lang + '/' + routesFileName, 'utf8' );
			
			if ( j < config.ALL_LANG[j].length )
				data += ',\n\n\n\n';
		}
		
		data += '\n\n\n\n}';
		
		fs.writeFileSync( paths.env.dev + paths.assets.json.routes.dir + routesFileName, data, 'utf8' );
		
	}
	
} );