

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.PageName = ( function( window ) {
	'use strict';
	
	
	function PageName() {
		STF.AbstractView.call( this );
	}
	
	
	PageName.prototype				= Object.create( STF.AbstractView.prototype );
	PageName.prototype.constructor	= PageName;
	
	
	PageName.prototype.init = function() {
		STF.AbstractView.prototype.init.call( this );
		
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

