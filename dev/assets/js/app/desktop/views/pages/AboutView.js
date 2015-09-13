

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.AboutView = ( function( window ) {
	
	
	function AboutView() {
		APP.AbstractView.call( this );
	}
	
	
	AboutView.prototype				= Object.create( APP.AbstractView.prototype );
	AboutView.prototype.constructor	= AboutView;
	
	
	AboutView.prototype.initDOM = function() {
		this.$page = $( document.getElementById( 'page-content' ) );
	};
	
	
	AboutView.prototype.bindEvents = function() {
		
	};
	
	
	AboutView.prototype.unbindEvents = function() {
		
	};
	
	
	AboutView.prototype.resize = function() {
		
	};
	
	
	return AboutView;
	
	
} ) ( window );

