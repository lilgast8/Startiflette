

STF.Utils = STF.Utils || {};


STF.Utils.Global = ( function( window ) {
	'use strict';
	
	
	window.color = {};
	
	
	window.addClass = function( el, classToAdd ) {
		if ( el.classList )
			el.classList.add( classToAdd );
		else {
			if ( !hasClass( el, classToAdd ) )
				el.className += ' ' + classToAdd;
		}
	};
	
	
	window.removeClass = function( el, classToRemove ) {
		if ( el.classList )
			el.classList.remove( classToRemove );
		else {
			el.className = el.className.replace( new RegExp( '(^|\\b)' + classToRemove.split(' ').join( '|' ) + '(\\b|$)', 'gi' ), '');
			
			var lastCharPos = el.className.length - 1;
			if ( el.className[ lastCharPos ] == ' ' )
				el.className = el.className.substring( 0, lastCharPos );
		}
	};
	
	
	window.hasClass = function( el, classToCheck ) {
		var hasClass;
		
		if ( el.classList )
			hasClass = el.classList.contains( classToCheck );
		else
			hasClass = new RegExp( '(^| )' + classToCheck + '( |$)', 'gi' ).test( el.className );
		
		return hasClass;
	};
	
	
	window.resetStyle = function( el ) {
		el.style.cssText = '';
	};
	
	
	window.getElSize = function( elW, elH, contW, contH ) {
		var elRatio		= elW / elH;
		var contRatio	= contW / contH;
		var sizeEl		= {
			x : 0,
			y : 0,
			w : 0,
			h : 0
		};
		
		if ( elRatio < contRatio ) {
			sizeEl.w = contW;
			sizeEl.h = Math.round( sizeEl.w / elRatio );
			sizeEl.y = Math.round( - ( sizeEl.h - contH ) / 2 );
		}
		else {
			sizeEl.h = contH;
			sizeEl.w = Math.round ( sizeEl.h * elRatio );
			sizeEl.x = Math.round ( - ( sizeEl.w - contW ) / 2 );
		}
		
		return sizeEl;
	};
	
	
	window.degToRad = function( deg ) {
		return deg * Math.PI / 180;
	};
	
	
	window.radToDeg = function( rad ) {
		return rad * 180 / Math.PI;
	};
	
	
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

