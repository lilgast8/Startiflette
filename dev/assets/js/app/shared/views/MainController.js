

APP.MainController = ( function( window ) {
	
	
	function MainController() {
		APP.AbstractController.call( this );
		
		this.view = null;
	}
	
	
	MainController.prototype				= Object.create( APP.AbstractController.prototype );
	MainController.prototype.constructor	= MainController;
	
	
	MainController.prototype.init = function() {
		this.pagesController = APP.PagesController;
		this.pagesController.init();
		
		// this.mainLoader = APP.MainLoader;
		// this.mainLoader.init();
		
		this.instanceView();
	};
	
	
	MainController.prototype.instanceView = function() {
		this.view = new APP.MainView();
		
		this.bindEvents();
		
		this.view.init();
	};
	
	
	MainController.prototype.bindEvents = function() {
		this.view.buildEvt( this.view.E.RESIZE, _resize.bind( this ) );
		this.view.buildEvt( this.view.E.RAF, _raf.bind( this ) );
		this.view.buildEvt( this.view.E.MOUSE_MOVE, _mouseMove.bind( this ) );
		this.view.buildEvt( this.view.E.MOUSE_DOWN, _mouseDown.bind( this ) );
		this.view.buildEvt( this.view.E.MOUSE_UP, _mouseUp.bind( this ) );
	};
	
	
	var _resize = function() {
		console.log('MainController _resize()', this.view.wW, this.view.wH);
	};
	
	
	var _raf = function() {
		console.log('MainController _raf()');
	};
	
	
	var _mouseMove = function() {
		console.log('MainController _mouseMove()');
	};
	
	
	var _mouseDown = function() {
		console.log('MainController _mouseDown()');
	};
	
	
	var _mouseUp = function() {
		console.log('MainController _mouseUp()');
	};
	
	
	return new MainController();
	
	
} ) ( window );

