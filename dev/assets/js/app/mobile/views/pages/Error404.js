

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Error404 = ( function( window ) {
	'use strict';
	
	
	function Error404() {
		STF.AbstractPageView.call( this );
	}
	
	
	Error404.prototype				= Object.create( STF.AbstractPageView.prototype );
	Error404.prototype.constructor	= Error404;
	
	
	Error404.prototype.init = function() {
		STF.AbstractPageView.prototype.init.call( this );
	};
	
	
	Error404.prototype.bindEvents = function() {
		STF.AbstractPageView.prototype.bindEvents.call( this );
	};
	
	
	Error404.prototype.unbindEvents = function() {
		STF.AbstractPageView.prototype.unbindEvents.call( this );
	};
	
	
	Error404.prototype.resize = function() {
		
	};
	
	
	return Error404;
	
	
} ) ( window );

