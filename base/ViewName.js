

STF.Views			= STF.Views || {};
STF.Views.ViewType	= STF.Views.ViewType || {};


STF.Views.ViewType.ViewName = ( function( window ) {
	'use strict';
	
	
	function ViewName() {
		STF.AbstractView.call( this );
	}
	
	
	ViewName.prototype				= Object.create( STF.AbstractView.prototype );
	ViewName.prototype.constructor	= ViewName;
	
	
	ViewName.prototype.init = function() {
		STF.AbstractView.prototype.init.call( this );
		
		// init others objects
	};
	
	
	ViewName.prototype.initDOM = function() {
		STF.AbstractView.prototype.initDOM.call( this );
	};
	
	
	ViewName.prototype.initEl = function() {
		
	};
	
	
	ViewName.prototype.initTl = function() {
		
	};
	
	
	ViewName.prototype.bindEvents = function() {
		STF.AbstractView.prototype.bindEvents.call( this );
	};
	
	
	ViewName.prototype.unbindEvents = function() {
		STF.AbstractView.prototype.unbindEvents.call( this );
	};
	
	
	ViewName.prototype.initView = function() {
		this.isInit = true;
	};
	
	
	ViewName.prototype.show = function() {
		
	};
	
	
	ViewName.prototype.hide = function() {
		
	};
	
	
	ViewName.prototype.resize = function() {
		
	};
	
	
	ViewName.prototype.raf = function() {
		
	};
	
	
	return ViewName;
	
	
} ) ( window );

