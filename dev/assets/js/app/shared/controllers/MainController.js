

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
		
		this.bindEvents();
		this.o.view.init();
		
	};
	
	
	MainController.prototype.bindEvents = function() {
		console.log('MainController.bindEvents()');
		// Bind all main events (resize, raf, mousemove, mousedown, mouseup, scroll, orientationChange...)
		
		// this.o.view.buildEvt( this.o.view.E.RESIZE, _resize.bind( this ) );
		this.o.view.buildEvt( this.o.view.E.RESIZE, _resize.bind( this ) );
	};
	
	
	var _resize = function() {
		console.log('MainController _resize()', this.o.view.v.wW, this.o.view.v.hW);
	};
	
	
	// return new MainController();
	return MainController;
	
	
} ) ( window );

