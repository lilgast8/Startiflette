'use strict';


var Props = require( 'shared/configs/Props' );



function DOM() {
	
}


DOM.prototype.addClass = function( el, classToAdd ) {
	if ( el.classList )
		el.classList.add( classToAdd );
	else {
		if ( !this.hasClass( el, classToAdd ) )
			el.className += ' ' + classToAdd;
	}
};


DOM.prototype.removeClass = function( el, classToRemove ) {
	if ( el.classList )
		el.classList.remove( classToRemove );
	else {
		el.className = el.className.replace( new RegExp( '(^|\\b)' + classToRemove.split(' ').join( '|' ) + '(\\b|$)', 'gi' ), '');
		
		var lastCharPos = el.className.length - 1;
		if ( el.className[ lastCharPos ] == ' ' )
			el.className = el.className.substring( 0, lastCharPos );
	}
};


DOM.prototype.resetClass = function( el ) {
	el.className = '';
};


DOM.prototype.hasClass = function( el, classToCheck ) {
	var hasClass;
	
	if ( el.classList )
		hasClass = el.classList.contains( classToCheck );
	else
		hasClass = new RegExp( '(^| )' + classToCheck + '( |$)', 'gi' ).test( el.className );
	
	return hasClass;
};


DOM.prototype.resetStyle = function( el ) {
	el.style.cssText = '';
};


DOM.prototype.setTranslate = function( el, x, y ) {
	x = x === null ? 0 : x;
	y = y === null ? 0 : y;
	
	if ( Props.HAS_TRANSFORMS_3D )
		el.style[ Props.TRANSFORM ] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
	else
		el.style[ Props.TRANSFORM ] = 'translate(' + x + 'px, ' + y + 'px)';
};


module.exports = new DOM();

