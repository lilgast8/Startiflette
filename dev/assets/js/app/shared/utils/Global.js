

STF.Utils = STF.Utils || {};


STF.Utils.Global = ( function( window ) {
	'use strict';
	
	
	window.color = {};
	
	
	window.STF_gl_encryptMailto = function( el, address, domain, end, replaceContent ) {
		var className	= el.className;
		var mailto		= 'mailto';
		var separator	= ':';
		var at			= '@';
		var dot			= '.';
		
		var content		= replaceContent ? address + at + domain + dot + end : el.innerHTML;
		var email		= mailto + separator + address + at + domain + dot + end;
		
		el.outerHTML	= '<a href="' + email + '" class="' + className + '">' + content + '</a>';
	};
	
	
	window.STF_gl_getObjSize = function( obj ) {
		var size = 0;
		
		for ( var key in obj )
			if ( obj.hasOwnProperty( key ) )
				size++;
		
		
		return size;
	};
	
	
	window.STF_gl_getType = function( obj ) {
		return ({}).toString.call( obj ).match( /\s([a-z|A-Z]+)/ )[1].toLowerCase();
	};
	
	
	window.STF_gl_getConstructorName = function ( obj ) {
		var string	= ( obj.prototype ? obj.prototype.constructor : obj.constructor ).toString();
		var cname	= string.match( /function\s(\w*)/ )[1];
		var aliases	= [ "", "anonymous", "Anonymous" ];
		
		
		return aliases.indexOf( cname ) > -1 ? "Function" : cname;
	};
	
	
} ) ( window );

