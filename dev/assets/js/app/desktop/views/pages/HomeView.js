

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.HomeView = ( function( window ) {
	
	
	function HomeView() {
		APP.AbstractView.call(this);
	}
	
	
	HomeView.prototype				= Object.create( APP.AbstractView.prototype );
	HomeView.prototype.constructor	= HomeView;
	
	
	HomeView.prototype.initEl = function() {
		this.$.page = $( document.getElementById( 'page-content' ) );
	};
	
	
	HomeView.prototype.bindEvents = function() {
		
	};
	
	
	HomeView.prototype.unbindEvents = function() {
		
	};
	
	
	HomeView.prototype.resize = function() {
		
	};
	
	
	return HomeView;
	
	
} ) ( window );

