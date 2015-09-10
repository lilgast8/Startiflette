

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.HomeController = ( function( window ) {
	
	
	function HomeController() {
		APP.AbstractController.call(this);
	}
	
	
	HomeController.prototype				= Object.create( APP.AbstractController.prototype );
	HomeController.prototype.constructor	= HomeController;
	
	
	HomeController.prototype.init = function() {
		
	};
	
	
	return HomeController;
	
	
} ) ( window );

