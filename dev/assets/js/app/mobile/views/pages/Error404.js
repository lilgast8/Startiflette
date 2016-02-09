

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Error404 = ( function( window ) {
	'use strict';
	
	
	function Error404() {
		STF.AbstractView.call( this );
	}
	
	
	Error404.prototype				= Object.create( STF.AbstractView.prototype );
	Error404.prototype.constructor	= Error404;
	
	
	Error404.prototype.initDOM = function() {
		STF.AbstractView.prototype.initDOM.call( this );
	};
	
	
	Error404.prototype.bindEvents = function() {
		
	};
	
	
	Error404.prototype.unbindEvents = function() {
		
	};
	
	
	Error404.prototype.resize = function() {
		
	};
	
	
	return Error404;
	
	
} ) ( window );

