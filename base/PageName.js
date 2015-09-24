

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.PageName = ( function( window ) {
	'use strict';
	
	
	function PageName() {
		APP.AbstractView.call( this );
	}
	
	
	PageName.prototype				= Object.create( APP.AbstractView.prototype );
	PageName.prototype.constructor	= PageName;
	
	
	PageName.prototype.init = function() {
		APP.AbstractView.prototype.init.call( this );
		
		// init others objects
	};
	
	
	PageName.prototype.initDOM = function() {
		this.$page = $( document.getElementById( 'page-content' ) );
	};
	
	
	PageName.prototype.bindEvents = function() {
		
	};
	
	
	PageName.prototype.unbindEvents = function() {
		
	};
	
	
	PageName.prototype.initTl = function() {
		
	};
	
	
	PageName.prototype.resize = function() {
		
	};
	
	
	return PageName;
	
	
} ) ( window );

