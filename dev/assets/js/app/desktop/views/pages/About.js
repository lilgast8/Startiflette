

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.About = ( function( window ) {
	'use strict';
	
	
	function About() {
		STF.AbstractView.call( this );
	}
	
	
	About.prototype				= Object.create( STF.AbstractView.prototype );
	About.prototype.constructor	= About;
	
	
	About.prototype.init = function() {
		STF.AbstractView.prototype.init.call( this );
	};
	
	
	About.prototype.bindEvents = function() {
		STF.AbstractView.prototype.bindEvents.call( this );
	};
	
	
	About.prototype.unbindEvents = function() {
		STF.AbstractView.prototype.unbindEvents.call( this );
	};
	
	
	About.prototype.resize = function() {
		
	};
	
	
	return About;
	
	
} ) ( window );

