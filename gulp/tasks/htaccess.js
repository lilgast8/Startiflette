var gulp	= require('gulp');

var options	= require( '../utils/options' );
var paths	= require('../utils/paths');

var fs		= require( 'fs' );



gulp.task( 'htaccess', function() {
	
	// console.log( paths.env.dev + paths.htaccess );
	
	var htaccessData = fs.readFileSync( paths.env.dev + paths.htaccess, 'utf8' );
	
	
	// console.log( htaccessFile );
	
	
	var configFile	= fs.readFileSync( paths.env.dev + paths.assets.json.config.configFile, 'utf8' );
	var config		= JSON.parse( configFile );
	
	// console.log( config.ENVS[ config.ENV ] );
	console.log( config.ENVS.preprod_local.fallbackresource );
	
	var stringToReplace	= 'FallbackResource ' + config.ENVS.dev.fallbackresource + 'index.php';
	var newString		= 'FallbackResource ' + config.ENVS[ options.env ].fallbackresource + 'index.php';
	
	htaccessData = htaccessData.replace( stringToReplace, newString );
	
	// console.log( htaccessData );
	
	fs.writeFileSync( paths.env.prod + paths.htaccess, htaccessData, 'utf8' );
	
} );