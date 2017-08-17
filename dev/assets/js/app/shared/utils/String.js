'use strict';


var Path = require( 'shared/configs/Path' );



function String() {
	
}


String.prototype.removeFirstSpecificChar = function ( string, char ) {
	if ( string.substr( 0, 1 ) == char )
		string = string.substr( 1 );
	
	
	return string;
};


String.prototype.removeLastSpecificChar = function ( string, char ) {
	if ( string.substr( string.length - 1, 1 ) == char )
		string = string.substr( 0, string.length - 1 );
	
	
	return string;
};


String.prototype.convertToUrl = function( string ) {
	var link	= document.createElement( 'a' );
	link.href	= string;
	
	
	return link;
};


String.prototype.getPath = function( string, baseUrl ) {
	if ( baseUrl === null || baseUrl === undefined )
		baseUrl = Path.URL.base;
	
	var path	= string.replace( baseUrl, '' );
	
	path		= path.split( '#' )[0]; // remove #hash
	path		= path.split( '?' )[0]; // remove ?search
	
	path		= this.removeFirstSpecificChar( path, '/' );
	path		= this.removeLastSpecificChar( path, '/' );
	
	
	return path;
};


String.prototype.getSearch = function( string ) {
	var url		= this.convertToUrl( string );
	
	var search	= url.search.split( '?' )[1] || '';
	
	search		= this.removeFirstSpecificChar( search, '/' );
	search		= this.removeLastSpecificChar( search, '/' );
	
	
	return search;
};


String.prototype.getHash = function( string ) {
	var url		= this.convertToUrl( string );
	
	var hash	= url.hash.split( '#' )[1] || '';
	
	hash		= this.removeFirstSpecificChar( hash, '/' );
	hash		= this.removeLastSpecificChar( hash, '/' );
	
	
	return hash;
};


String.prototype.getParams = function( string, type ) {
	var url		= this.convertToUrl( string );
	
	var params	= {};
	var key, value;
	
	if ( url[ type ].length > 1 ) {
		for ( var aItKey, nKeyId = 0, aCouples = url[ type ].substr(1).split( '&' ); nKeyId < aCouples.length; nKeyId++ ) {
			aItKey	= aCouples[ nKeyId ].split( '=' );
			
			key		= unescape( aItKey[0] );
			key		= this.removeFirstSpecificChar( key, '/' );
			key		= this.removeLastSpecificChar( key, '/' );
			
			value	= aItKey.length > 1 ? unescape( aItKey[1] ) : '';
			value	= this.removeFirstSpecificChar( value, '/' );
			value	= this.removeLastSpecificChar( value, '/' );
			
			params[ key ] = value;
		}
	}
	
	
	return params;
};


module.exports = new String();

