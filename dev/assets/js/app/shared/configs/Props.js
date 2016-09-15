

STF.Props = ( function( window ) {
	'use strict';
	
	
	function Props() {
		this.HAS_PUSHSTATE		= null;
		this.TRANSFORM			= null;
		this.HAS_TRANSFORMS		= null;
		this.HAS_TRANSFORMS_3D	= null;
		this.HAS_TRANSITIONS	= null;
		this.HAS_ANIMATIONS		= null;
	}
	
	
	Props.prototype.init = function() {
		_setProperties.call( this );
	};
	
	
	var _setProperties = function() {
		this.HAS_PUSHSTATE		= Modernizr.history;
		this.TRANSFORM			= Modernizr.prefixed( 'transform' );
		this.HAS_TRANSFORMS		= Modernizr.csstransforms;
		this.HAS_TRANSFORMS_3D	= Modernizr.csstransforms3d;
		this.HAS_TRANSITIONS	= Modernizr.csstransitions;
		this.HAS_ANIMATIONS		= Modernizr.cssanimations;
	};
	
	
	return new Props();
	
	
} ) ( window );

