

STF.Utils = STF.Utils || {};


STF.Utils.String = ( function( window ) {
	'use strict';
	
	
	window.STF_str_removeFirstSpecificChar = function ( string, char ) {
		if ( string.substr( 0, 1 ) == char )
			string = string.substr( 1 );
		
		
		return string;
	};
	
	
	window.STF_str_removeLastSpecificChar = function ( string, char ) {
		if ( string.substr( string.length - 1, 1 ) == char )
			string = string.substr( 0, string.length - 1 );
		
		
		return string;
	};
	
	
	window.STF_str_convertToUrl = function( string ) {
		var link	= document.createElement( 'a' );
		link.href	= string;
		
		
		return link;
	};
	
	
	window.STF_str_getPath = function( string, baseUrl ) {
		if ( baseUrl === null || baseUrl === undefined )
			baseUrl = STF.Path.URL.base;
		
		var path	= string.replace( baseUrl, '' );
		
		path		= path.split( '#' )[0]; // remove #hash
		path		= path.split( '?' )[0]; // remove ?search
		
		path		= STF_str_removeFirstSpecificChar( path, '/' );
		path		= STF_str_removeLastSpecificChar( path, '/' );
		
		
		return path;
	};
	
	
	window.STF_str_getSearch = function( string ) {
		var url		= STF_str_convertToUrl( string );
		
		var search	= url.search.split( '?' )[1] || '';
		
		search		= STF_str_removeFirstSpecificChar( search, '/' );
		search		= STF_str_removeLastSpecificChar( search, '/' );
		
		
		return search;
	};
	
	
	window.STF_str_getHash = function( string ) {
		var url		= STF_str_convertToUrl( string );
		
		var hash	= url.hash.split( '#' )[1] || '';
		
		hash		= STF_str_removeFirstSpecificChar( hash, '/' );
		hash		= STF_str_removeLastSpecificChar( hash, '/' );
		
		
		return hash;
	};
	
	
	window.STF_str_getParams = function( string, type ) {
		var url		= STF_str_convertToUrl( string );
		
		var params	= {};
		var key, value;
		
		if ( url[ type ].length > 1 ) {
			for ( var aItKey, nKeyId = 0, aCouples = url[ type ].substr(1).split( '&' ); nKeyId < aCouples.length; nKeyId++ ) {
				aItKey	= aCouples[ nKeyId ].split( '=' );
				
				key		= unescape( aItKey[0] );
				key		= STF_str_removeFirstSpecificChar( key, '/' );
				key		= STF_str_removeLastSpecificChar( key, '/' );
				
				value	= aItKey.length > 1 ? unescape( aItKey[1] ) : '';
				value	= STF_str_removeFirstSpecificChar( value, '/' );
				value	= STF_str_removeLastSpecificChar( value, '/' );
				
				params[ key ] = value;
			}
		}
		
		
		return params;
	};
	
	
} ) ( window );

