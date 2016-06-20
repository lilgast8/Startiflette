

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Home = ( function( window ) {
	'use strict';
	
	
	function Home() {
		STF.AbstractPageView.call( this );
	}
	
	
	Home.prototype				= Object.create( STF.AbstractPageView.prototype );
	Home.prototype.constructor	= Home;
	
	
	Home.prototype.init = function() {
		STF.AbstractPageView.prototype.init.call( this );
	};
	
	
	Home.prototype.bindEvents = function() {
		STF.AbstractPageView.prototype.bindEvents.call( this );
	};
	
	
	Home.prototype.unbindEvents = function() {
		STF.AbstractPageView.prototype.unbindEvents.call( this );
	};
	
	
	Home.prototype.resize = function() {
		
	};
	
	
	return Home;
	
	
} ) ( window );

