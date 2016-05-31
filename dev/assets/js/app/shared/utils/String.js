

STF.Utils = STF.Utils || {};


STF.Utils.String = ( function( window ) {
	'use strict';
	
	
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
	
	
} ) ( window );

