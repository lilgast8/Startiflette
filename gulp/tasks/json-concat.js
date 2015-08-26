var gulp	= require( 'gulp' );
var path	= require( 'path' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );
var plumber	= require( 'gulp-plumber' );



gulp.task( 'json-concat', ['delete'], function() {
	
	var configFile	= fs.readFileSync( paths.src.json.config.configFile, 'utf8' );
	var config		= JSON.parse(configFile);
	
	var routesFileName, lang, data;
	
	
	// parse routes files
	for ( var i = 0; i < config.ROUTES_FILES.length; i++ ) {
		var routesFileName = config.ROUTES_FILES[i] + '.json';
		
		data = '{\n\n\n\n';
		
		// parse language directories
		for ( var j = 0; j < config.LANGUAGES.length; j++ ) {
			lang = config.LANGUAGES[j];
			
			data += '"' + lang + '" : ';
			data += '\t' + fs.readFileSync( paths.src.json.routes.dir + lang + '/' + routesFileName, 'utf8' );
			
			if ( j < config.LANGUAGES[j].length )
				data += ',\n\n\n\n';
		}
		
		data += '\n\n\n\n}';
		
		fs.writeFileSync( paths.src.json.routes.dir + routesFileName, data, 'utf8' );
		
	}
	
} );