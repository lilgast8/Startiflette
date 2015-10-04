var paths	= require( './paths' );

var fs		= require( 'fs' );



var helpers = {
	
	
	getJsAppName: function() {
		var data		= fs.readFileSync( paths.env.dev + paths.assets.js.app.initFile, 'utf8' );
		var startPos	= data.indexOf( 'var ' ) + 4;
		var endPos		= data.indexOf( ' = ' );
		var jsAppName	= data.substring( startPos, endPos );
		
		return jsAppName;
	},
	
	
	titleCase: function( string ) {
		return string.replace( /\w\S*/g, function( txt ) {
			return txt[0].toUpperCase() + txt.substr(1).toLowerCase();
		});
	},
	
	
	upperCaseFirstLetter: function( string ) {
		return string[0].toUpperCase() + string.slice(1);
	},
	
	
	lowerCaseFirstLetter: function( string ) {
		return string[0].toLowerCase() + string.slice(1);
	},
	
	
	createDir: function( dirPath ) {
		if ( !fs.existsSync( dirPath ) )
			fs.mkdirSync( dirPath );
	}
	
	
};



module.exports = helpers;