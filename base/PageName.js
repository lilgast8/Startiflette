

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
		STF.AbstractView.prototype.initDOM.call( this );
	};
	
	
	PageName.prototype.initEl = function() {
		
	};
	
	
	PageName.prototype.initTl = function() {
		
	};
	
	
	PageName.prototype.bindEvents = function() {
		
	};
	
	
	PageName.prototype.unbindEvents = function() {
		
	};
	
	
	PageName.prototype.initView = function() {
		this.isInit = true;
	};
	
	
	PageName.prototype.show = function() {
		
	};
	
	
	PageName.prototype.hide = function() {
		
	};
	
	
	PageName.prototype.resize = function() {
		
	};
	
	
	PageName.prototype.raf = function() {
		
	};
	
	
	return PageName;
	
	
} ) ( window );

