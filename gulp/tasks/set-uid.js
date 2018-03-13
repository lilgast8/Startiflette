var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var getUid	= require( 'get-uid' );

var fs		= require( 'fs' );



gulp.task( 'set-uid', function() {
	
	if ( options.task == 'js' || options.task == 'js-min' )
		setUID( 'js' );
	else if ( options.task == 'sass' )
		setUID( 'css' );
	
	
} );


gulp.task( 'set-uid:prod', function() {
	
	options.U_ID = {
		css:	getUid(),
		js:		getUid(),
	};
	
} );



function setUID( type ) {
	var config				= require( '../../' + paths.env.prod + paths.configs.configFile );
	
	var uID					= getUid();
	options.U_ID[ type ]	= uID;
	config.U_ID[ type ]		= uID;
	
	var data				= JSON.stringify( config );
	
	fs.writeFileSync( paths.env.prod + paths.configs.configFile, data, 'utf8' );
}