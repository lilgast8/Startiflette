

APP.MainController = ( function( window ) {
	
	
	function MainController() {
		APP.AbstractController.call( this );
		
		this.o.view = null;
	}
	
	
	MainController.prototype				= Object.create( APP.AbstractController.prototype );
	MainController.prototype.constructor	= MainController;
	
	
	MainController.prototype.init = function() {
		// console.log('MainController.init()');
		
		this.instanceView();
	};
	
	
	MainController.prototype.instanceView = function() {
		// console.log('MainController.instanceView()');
		
		this.o.view = new APP.MainView();
		
		this.o.view.init();
	};
	
	
	return MainController;
	
	
} ) ( window );

