

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Home = ( function( window ) {
	'use strict';
	
	
	function Home() {
		STF.AbstractView.call( this );
	}
	
	
	Home.prototype				= Object.create( STF.AbstractView.prototype );
	Home.prototype.constructor	= Home;
	
	
	Home.prototype.initDOM = function() {
		STF.AbstractView.prototype.initDOM.call( this );
	};
	
	
	Home.prototype.bindEvents = function() {
		
	};
	
	
	Home.prototype.unbindEvents = function() {
		
	};
	
	
	Home.prototype.resize = function() {
		
	};
	
	
	return Home;
	
	
} ) ( window );

