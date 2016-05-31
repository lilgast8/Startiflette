

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
	
	
} ) ( window );

