

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.About = ( function( window ) {
	'use strict';
	
	
	function About() {
		STF.AbstractPageView.call( this );
	}
	
	
	About.prototype				= Object.create( STF.AbstractPageView.prototype );
	About.prototype.constructor	= About;
	
	
	About.prototype.init = function() {
		STF.AbstractPageView.prototype.init.call( this );
	};
	
	
	About.prototype.bindEvents = function() {
		STF.AbstractPageView.prototype.bindEvents.call( this );
	};
	
	
	About.prototype.unbindEvents = function() {
		STF.AbstractPageView.prototype.unbindEvents.call( this );
	};
	
	
	About.prototype.resize = function() {
		
	};
	
	
	return About;
	
	
} ) ( window );

