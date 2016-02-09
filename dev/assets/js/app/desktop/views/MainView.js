

STF.MainView = ( function( window ) {
	'use strict';
	
	
	function MainView() {
		STF.AbsctractMainView.call( this );
	}
	
	
	MainView.prototype				= Object.create( STF.AbsctractMainView.prototype );
	MainView.prototype.constructor	= MainView;
	
	
	MainView.prototype.init = function() {
		STF.AbsctractMainView.prototype.init.call( this );
	};
	
	
	/*MainView.prototype.initDOM = function() {
		
	};*/
	
	
	/*MainView.prototype.bindEvents = function() {
		
	};*/
	
	
	MainView.prototype.initStaticsViews = function() {
		STF.Views.Statics.Header.init();
		STF.Views.Statics.Footer.init();
	};
	
	
	MainView.prototype.resizeStaticsViews = function() {
		STF.AbsctractMainView.prototype.resizeStaticsViews.call( this );
	};
	
	
	MainView.prototype.rafStaticsViews = function() {
		STF.AbsctractMainView.prototype.rafStaticsViews.call( this );
	};
	
	
	return new MainView();
	
	
} ) ( window );

