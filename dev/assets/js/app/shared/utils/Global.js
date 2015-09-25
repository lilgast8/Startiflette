

STF.Utils = STF.Utils || {};


STF.Utils.Global = ( function( window ) {
	'use strict';
	
	
	window.color = {};
	
	
	window.getSupportedPropertyName = function( property ) {
		var prefixes = [ '', 'ms', 'Webkit', 'Moz', 'O' ];
		
		for ( var i = 0; i < prefixes.length; i++ ) {
			var prefix	= prefixes[i];
			property	= prefix === '' ? property : property.charAt(0).toUpperCase() + property.substring(1).toLowerCase();
			var prop	= prefix + property;
			
			if ( typeof document.body.style[ prop ] != 'undefined' )
				return prop;
		}
		
		return null;
	};
	
	
	window.encryptMailto = function( el, address, domain, end, replaceContent ) {
		var mailto		= 'mailto';
		var separator	= ':';
		var at			= '@';
		var dot			= '.';
		
		var content		= replaceContent ? address + at + domain + dot + end : el.innerHTML;
		var email		= mailto + separator + address + at + domain + dot + end;
		
		el.outerHTML	= '<a href="' + email + '">' + content + '</a>';
	};
	
	
	window.getObjSize = function( obj ) {
		var size = 0;
		
		for ( var key in obj )
			if ( obj.hasOwnProperty( key ) )
				size++;
		
		return size;
	};
	
	
} ) ( window );

