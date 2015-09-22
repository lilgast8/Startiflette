

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.About = ( function( window ) {
	
	
	function About() {
		APP.AbstractView.call( this );
	}
	
	
	About.prototype				= Object.create( APP.AbstractView.prototype );
	About.prototype.constructor	= About;
	
	
	About.prototype.initDOM = function() {
		this.$page = $( document.getElementById( 'page-content' ) );
	};
	
	
	About.prototype.bindEvents = function() {
		
	};
	
	
	About.prototype.unbindEvents = function() {
		
	};
	
	
	About.prototype.resize = function() {
		
	};
	
	
	return About;
	
	
} ) ( window );

