

STF.Utils = STF.Utils || {};


STF.Utils.Global = ( function( window ) {
	'use strict';
	
	
	window.color = {};
	
	
	window.encryptMailto = function( el, address, domain, end, replaceContent ) {
		var className	= el.className;
		var mailto		= 'mailto';
		var separator	= ':';
		var at			= '@';
		var dot			= '.';
		
		var content		= replaceContent ? address + at + domain + dot + end : el.innerHTML;
		var email		= mailto + separator + address + at + domain + dot + end;
		
		el.outerHTML	= '<a href="' + email + '" class="' + className + '">' + content + '</a>';
	};
	
	
	window.getObjSize = function( obj ) {
		var size = 0;
		
		for ( var key in obj )
			if ( obj.hasOwnProperty( key ) )
				size++;
		
		return size;
	};
	
	
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

	
	
} ) ( window );

