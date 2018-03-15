var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var curl	= require( 'curljs' );
var fs		= require( 'fs' );
var gutil	= require( 'gulp-util' );

var config	= require( '../../' + paths.env.dev + paths.configs.configFile );
var routes	= require( '../../' + paths.env.dev + paths.configs.routesFile );




gulp.task( 'htmlify', [ 'delete' ], function() {
	
	if ( options.task == 'htmlify' ) {
		console.log( gutil.colors.red( 'You can\'t directly launch ' + gutil.colors.bgRed.white( ' htmlify ' ) + ' gulp task! Use ' + gutil.colors.bgRed.white( ' prod-htmlify ' ) + ' task instead.' ) );
		
		return;
	}
	
	
	var urlPage, path;
	var multiLang = config.ALL_LANG.length > 1;
	
	for ( var id in routes ) {
		urlPage = routes[ id ][ 'url-page' ];
		
		for ( var lg in urlPage ) {
			if ( config.ALL_LANG.indexOf( lg ) >= 0 ) {
				path = urlPage[ lg ];
				
				htmlify( multiLang, lg, path );
			}
		}
	}
	
} );



function htmlify( multiLang, lg, path ) {
	var baseUrl		= config.ENVS[ config.ENV ].base_url;
	var lgPath		= !multiLang || lg == config.ALL_LANG[0] && path == '' ? '' : lg + '/';
	var url			= baseUrl + lgPath + path;
	
	var dataObject	= { htmlify: 'true' };
	var curlOpts	= curl.opts.silent()
								.ignore_cert()
								.follow_redirects()
								.max_redirs( 5 )
								.connect_timeout( 3 )
								.post_data( dataObject );
	
	curl( url, curlOpts, function( err, data, stderr ) {
		var id			= path == '' ? 'home' : path;
		
		var filePath	= paths.env.prod + lg + '-' + id + '.html';
		
		data			= data.replace( new RegExp( baseUrl, 'g' ), '' );
		
		fs.writeFileSync( filePath, data, 'utf8' );
		
		console.log( gutil.colors.bgGreen( ' ' + filePath + ' ' ) + gutil.colors.green( ' file was succefully created.' ) );
	} );
}