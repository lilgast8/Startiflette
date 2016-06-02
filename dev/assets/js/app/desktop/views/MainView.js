

STF.MainView = ( function( window ) {
	'use strict';
	
	
	function MainView() {
		STF.AbstractMainView.call( this );
	}
	
	
	MainView.prototype				= Object.create( STF.AbstractMainView.prototype );
	MainView.prototype.constructor	= MainView;
	
	
	/*MainView.prototype.init = function() {
		STF.AbstractMainView.prototype.init.call( this );
	};*/
	
	
	/*MainView.prototype.initDOM = function() {
		STF.AbstractMainView.prototype.initDOM.call( this );
	};*/
	
	
	/*MainView.prototype.bindEvents = function() {
		STF.AbstractMainView.prototype.bindEvents.call( this );
	};*/
	
	
	/*MainView.prototype.initStaticsViews = function() {
		STF.AbstractMainView.prototype.initStaticsViews.call( this );
	};*/
	
	
	/*MainView.prototype.resizeStaticsViews = function() {
		STF.AbstractMainView.prototype.resizeStaticsViews.call( this );
	};*/
	
	
	/*MainView.prototype.rafStaticsViews = function() {
		STF.AbstractMainView.prototype.rafStaticsViews.call( this );
	};*/
	
	
	return new MainView();
	
	
} ) ( window );

