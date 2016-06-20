

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Error404 = ( function( window ) {
	'use strict';
	
	
	function Error404() {
		STF.AbstractView.call( this );
	}
	
	
	Error404.prototype				= Object.create( STF.AbstractView.prototype );
	Error404.prototype.constructor	= Error404;
	
	
	Error404.prototype.init = function() {
		STF.AbstractView.prototype.init.call( this );
	};
	
	
	Error404.prototype.bindEvents = function() {
		STF.AbstractView.prototype.bindEvents.call( this );
	};
	
	
	Error404.prototype.unbindEvents = function() {
		STF.AbstractView.prototype.unbindEvents.call( this );
	};
	
	
	Error404.prototype.resize = function() {
		
	};
	
	
	return Error404;
	
	
} ) ( window );

