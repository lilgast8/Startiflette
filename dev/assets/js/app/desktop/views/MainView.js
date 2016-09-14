

STF.MainView = ( function( window ) {
	'use strict';
	
	
	function MainView() {
		STF.AbstractMainView.call( this );
	}
	
	
	MainView.prototype				= Object.create( STF.AbstractMainView.prototype );
	MainView.prototype.constructor	= MainView;
	
	
	/*MainView.prototype.initDOM = function() {
		STF.AbstractMainView.prototype.initDOM.call( this );
	};*/
	
	
	MainView.prototype.initEl = function() {
		this.disableScrollRestoration();
	};
	
	
	/*MainView.prototype.bindEvents = function() {
		STF.AbstractMainView.prototype.bindEvents.call( this );
	};*/
	
	
	/*MainView.prototype.initStaticsViews = function() {
		STF.AbstractMainView.prototype.initStaticsViews.call( this );
	};*/
	
	
	return new MainView();
	
	
} ) ( window );

