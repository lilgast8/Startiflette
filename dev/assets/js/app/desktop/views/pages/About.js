

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.About = ( function( window ) {
	
	
	function About() {
		STF.AbstractView.call( this );
	}
	
	
	About.prototype				= Object.create( STF.AbstractView.prototype );
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

