var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var curl	= require( 'curljs' );
var fs		= require( 'fs' );
var gutil	= require( 'gulp-util' );

var config	= require( '../../' + paths.env.dev + paths.configs.configFile );
var routes	= require( '../../' + paths.env.dev + paths.configs.routesFile );




gulp.task( 'htmlify', [ 'delete' ], function() {
	
	// console.log( '🐬 HTMLify' );
	console.log( '🍗 opt ENV:', options.env );
	console.log( '🐔 conf ENV:', config.ENV );
	/*var typeList;
	
	for ( var lg in config.HTMLIFY ) {
		typeList = config.HTMLIFY[ lg ];
		
		for ( i = 0; i < typeList.length; i++ ) {
			htmlify( lg, typeList[ i ] );
		}
	}*/
	
	var urlPage, path;
	
	for ( var id in routes ) {
		// console.log( routes[ id ] );
		
		urlPage = routes[ id ][ 'url-page' ];
		
		// console.log( urlPage );
		
		for ( var lg in urlPage ) {
			// path = urlPage[ lg ] == '' ? 'home' : urlPage[ lg ];
			path = urlPage[ lg ];
			
			
			// console.log( lg, '—', path );
			
			htmlify( lg, path );
		}
		
		// htmlify()
	}
	
} );



// function htmlify( lg, type ) {
function htmlify( lg, path ) {
	
	// var url			= config.ENV.base_url + lg + '?type=' + type;
	// var url			= config.ENVS[ config.ENV ].base_url + lg + '/' + path;
	var baseUrl	= config.ENVS[ config.ENV ].base_url;
	// config.ENVS[ options.env ]
	
	
	var url			= lg == config.ALL_LANG[0] && path == '' ? baseUrl : baseUrl + lg + '/' + path;
	console.log( baseUrl, '—' ,url );
	
	var dataObject	= { htmlify: 'true' };
	var curlOpts	= curl.opts.silent()
								.ignore_cert()
								.follow_redirects()
								.max_redirs( 5 )
								.connect_timeout( 3 )
								.post_data( dataObject );
	
	curl( url, curlOpts, function( err, data, stderr ) {
		// var stringToReplace	= 'LANDING_TYPE';
		// var newString		= type
		var id = path == '' ? 'home' : path;
		
		var filePath		= paths.env.prod + lg + '-' + id + '.html';
		// console.log( filePath );
		
		// data = data.replace( new RegExp( 'LANDING_TYPE', 'g' ), type );
		data = data.replace( new RegExp( baseUrl, 'g' ), '' );
		
		fs.writeFileSync( filePath, data, 'utf8' );
		
		// console.log( gutil.colors.bgGreen( ' ' + filePath + ' ' ) + gutil.colors.green( ' file was succefully created.' ) );
	} );
	
	
	
	/*
	var dataObject	= { htmlify: 'true' };
	var curlOpts	= curl.opts.silent()
								.ignore_cert()
								.follow_redirects()
								.max_redirs( 5 )
								.connect_timeout( 3 )
								.post_data( dataObject );
	
	curl( url, curlOpts, function( err, data, stderr ) {
		var stringToReplace	= 'LANDING_TYPE';
		var newString		= type
		var filePath		= paths.env.prod + config.TLP_NAME + '-' + lg + '-' + type + '.html';
		
		data = data.replace( new RegExp( 'LANDING_TYPE', 'g' ), type );
		
		fs.writeFileSync( filePath, data, 'utf8' );
		
		console.log( gutil.colors.bgGreen( ' ' + filePath + ' ' ) + gutil.colors.green( ' file was succefully created.' ) );
	} );
	*/
}