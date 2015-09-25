

STF.Utils = STF.Utils || {};


STF.Utils.DOM = ( function( window ) {
	'use strict';
	
	
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
	
	
} ) ( window );

