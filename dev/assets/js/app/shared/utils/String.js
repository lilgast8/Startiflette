

STF.Utils = STF.Utils || {};


STF.Utils.String = ( function( window ) {
	'use strict';
	
	
	String.prototype.removeFirstSpecificChar = function ( char ) {
		var string = this;
		
		if ( string.substr( 0, 1 ) == char )
			string = string.substr( 1 );
		
		
		return string;
	};
	
	
	String.prototype.removeLastSpecificChar = function ( char ) {
		var string = this;
		
		if ( string.substr( string.length - 1, 1 ) == char )
			string = string.substr( 0, string.length - 1 );
		
		
		return string;
	};
	
	
	String.prototype.STF_convertToUrl = function() {
		var string = this;
		
		var link	= document.createElement( 'a' );
		link.href	= string;
		
		
		return link;
	};
	
	
	String.prototype.STF_getPath = function( baseUrl ) {
		if ( baseUrl === null || baseUrl === undefined )
			baseUrl = STF.Path.URL.base;
		
		var path	= this.replace( baseUrl, '' );
		
		path		= path.split( '#' )[0]; // remove #hash
		path		= path.split( '?' )[0]; // remove ?search
		
		path		= path.removeFirstSpecificChar( '/' );
		path		= path.removeLastSpecificChar( '/' );
		
		
		return path;
	};
	
	
	String.prototype.STF_getSearch = function() {
		var url		= this.STF_convertToUrl();
		
		var search	= url.search.split( '?' )[1] || '';
		
		search		= search.removeFirstSpecificChar( '/' );
		search		= search.removeLastSpecificChar( '/' );
		
		
		return search;
	};
	
	
	String.prototype.STF_getHash = function() {
		var url		= this.STF_convertToUrl();
		
		var hash	= url.hash.split( '#' )[1] || '';
		
		hash		= hash.removeFirstSpecificChar( '/' );
		hash		= hash.removeLastSpecificChar( '/' );
		
		
		return hash;
	};
	
	
	String.prototype.STF_getParams = function( type ) {
		var url		= this.STF_convertToUrl();
		
		var params	= {};
		var key, value;
		
		if ( url[ type ].length > 1 ) {
			for ( var aItKey, nKeyId = 0, aCouples = url[ type ].substr(1).split( '&' ); nKeyId < aCouples.length; nKeyId++ ) {
				aItKey	= aCouples[ nKeyId ].split( '=' );
				
				key		= unescape( aItKey[0] );
				key		= key.removeFirstSpecificChar( '/' );
				key		= key.removeLastSpecificChar( '/' );
				
				value	= aItKey.length > 1 ? unescape( aItKey[1] ) : '';
				value	= value.removeFirstSpecificChar( '/' );
				value	= value.removeLastSpecificChar( '/' );
				
				params[ key ] = value;
			}
		}
		
		
		return params;
	};
	
	
} ) ( window );

