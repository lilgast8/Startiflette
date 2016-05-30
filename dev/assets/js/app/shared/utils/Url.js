

STF.Utils = STF.Utils || {};


STF.Utils.Url = ( function( window ) {
	'use strict';
	
	
	String.prototype.convertToUrl = function() {
		var string = this;
		
		var link	= document.createElement( 'a' );
		link.href	= string;
		
		
		return link;
	};
	
	
	window.getPath = function( url, baseUrl ) {
		if ( baseUrl === null || baseUrl === undefined )
			baseUrl = STF.Path.URL.base;
		
		var path	= url.replace( baseUrl, '' );
		
		path		= path.split( '#' )[0]; // remove #hash
		path		= path.split( '?' )[0]; // remove ?search
		
		path		= path.removeFirstSpecificChar( '/' );
		path		= path.removeLastSpecificChar( '/' );
		
		
		return path;
	};
	
	
	window.getSearch = function( url ) {
		url			= url.convertToUrl();
		
		var search	= url.search.split( '?' )[1] || '';
		
		search		= search.removeFirstSpecificChar( '/' );
		search		= search.removeLastSpecificChar( '/' );
		
		
		return search;
	};
	
	
	window.getHash = function( url ) {
		url			= url.convertToUrl();
		
		var hash	= url.hash.split( '#' )[1] || '';
		
		hash		= hash.removeFirstSpecificChar( '/' );
		hash		= hash.removeLastSpecificChar( '/' );
		
		
		return hash;
	};
	
	
} ) ( window );

