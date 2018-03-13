var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var getUid	= require( 'get-uid' );

var fs		= require( 'fs' );



gulp.task( 'set-uid', function() {
	
	console.log( '🦄 ', options.task );
	
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
	
	console.log( '🦄🦄🦄 ', options.U_ID );
	
	
} );



function setUID( type ) {
	var config = require( '../../' + paths.env.prod + paths.configs.configFile );
	
	// console.log( config );
	
	var uID					= getUid();
	options.U_ID[ type ]	= uID;
	config.U_ID[ type ]		= uID;
	
	// console.log( config );
	var data = JSON.stringify( config );
	// console.log( data );
	
	fs.writeFileSync( paths.env.prod + paths.configs.configFile, data, 'utf8' );
	
	/*
	var config = require( '../../' + paths.env.dev + paths.configs.configFile );
	// var config = require( '../../' + paths.env.prod + paths.configs.configFile );
	
	var configProd	= JSON.parse( JSON.stringify( config ) );
	// var jsUid		= JSON.parse( JSON.stringify( config.U_ID.js ) );
	
	// console.log( configProd );
	
	var uID = getUid();
	
	configProd.U_ID[ type ]	= uID;
	
	
	// var uID = getUid();
	// config.U_ID.js = uID;
	
	// var data		= JSON.stringify( config );
	var data		= JSON.stringify( configProd );
	// console.log( data );
	// console.log( configProd );
	// var data = configProd;
	
	// fs.writeFileSync( paths.env.prod + paths.configs.configFile, data, 'utf8' );
	fs.writeFileSync( paths.env.dev + paths.configs.configFile, data, 'utf8' );
	*/
	
	
	/*var data			= fs.readFileSync( paths.env.dev + paths.configs.configFile, 'utf8' );
	console.log( data );*/
	// data				= data.replace( new RegExp( stringToReplace, 'g' ), newString );
	
	
	// fs.writeFileSync( filePath, data, 'utf8' );
	
	
	
}


/*gulp.task( 'set-uid:solo', function() {
	
	console.log( '🦄🦄🦄' );
	
} );*/