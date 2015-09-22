

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.Home = ( function( window ) {
	
	
	function Home() {
		APP.AbstractView.call( this );
	}
	
	
	Home.prototype				= Object.create( APP.AbstractView.prototype );
	Home.prototype.constructor	= Home;
	
	
	Home.prototype.initDOM = function() {
		this.$page = $( document.getElementById( 'page-content' ) );
	};
	
	
	Home.prototype.bindEvents = function() {
		
	};
	
	
	Home.prototype.unbindEvents = function() {
		
	};
	
	
	Home.prototype.resize = function() {
		
	};
	
	
	return Home;
	
	
} ) ( window );

