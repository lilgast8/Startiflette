var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var gutil	= require( 'gulp-util' );
var getUid	= require( 'get-uid' );

var fs		= require( 'fs' );



gulp.task( 'set-uid', function() {
	
	if ( options.task == 'set-uid' ) {
		console.log( gutil.colors.red( 'You can\'t directly launch ' + gutil.colors.bgRed.white( ' set-uid ' ) + ' gulp task!' ) );
		
		return;
	}
	
	
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
	var uID = getUid();
	
	updateFile( paths.env.prod + paths.configs.configFile, type, uID );
	updateFile( paths.env.dev + paths.configs.uIdFile, type, uID );
}


function updateFile( filePath, type, uID ) {
	var file				= require( '../../' + filePath );
	
	options.U_ID[ type ]	= uID;
	file.U_ID[ type ]		= uID;
	
	var data				= JSON.stringify( file );
	
	fs.writeFileSync( filePath, data, 'utf8' );
}