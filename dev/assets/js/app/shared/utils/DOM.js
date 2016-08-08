

STF.Utils = STF.Utils || {};


STF.Utils.DOM = ( function( window ) {
	'use strict';
	
	
	window.STF_dom_addClass = function( el, classToAdd ) {
		if ( el.classList )
			el.classList.add( classToAdd );
		else {
			if ( !hasClass( el, classToAdd ) )
				el.className += ' ' + classToAdd;
		}
	};
	
	
	window.STF_dom_removeClass = function( el, classToRemove ) {
		if ( el.classList )
			el.classList.remove( classToRemove );
		else {
			el.className = el.className.replace( new RegExp( '(^|\\b)' + classToRemove.split(' ').join( '|' ) + '(\\b|$)', 'gi' ), '');
			
			var lastCharPos = el.className.length - 1;
			if ( el.className[ lastCharPos ] == ' ' )
				el.className = el.className.substring( 0, lastCharPos );
		}
	};
	
	
	window.STF_dom_resetClass = function( el ) {
		el.className = '';
	};
	
	
	window.STF_dom_hasClass = function( el, classToCheck ) {
		var hasClass;
		
		if ( el.classList )
			hasClass = el.classList.contains( classToCheck );
		else
			hasClass = new RegExp( '(^| )' + classToCheck + '( |$)', 'gi' ).test( el.className );
		
		return hasClass;
	};
	
	
	window.STF_dom_resetStyle = function( el ) {
		el.style.cssText = '';
	};
	
	
	window.STF_dom_setTranslate = function( el, x, y ) {
		x = x === null ? 0 : x;
		y = y === null ? 0 : y;
		
		if ( STF.Props.HAS_TRANSFORMS_3D )
			el.style[ STF.Props.TRANSFORM ] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
		else
			el.style[ STF.Props.TRANSFORM ] = 'translate(' + x + 'px, ' + y + 'px)';
	};
	
	
} ) ( window );

