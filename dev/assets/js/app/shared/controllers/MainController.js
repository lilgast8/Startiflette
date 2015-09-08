

APP.MainController = ( function( window ) {
	
	
	function MainController() {
		APP.AbstractController.call( this );
		
		this.o.view = null;
	}
	
	
	MainController.prototype				= Object.create( APP.AbstractController.prototype );
	MainController.prototype.constructor	= MainController;
	
	
	MainController.prototype.init = function() {
		this.instanceView();
	};
	
	
	MainController.prototype.instanceView = function() {
		this.o.view = APP.MainView;
		
		this.bindEvents();
		this.o.view.init();
	};
	
	
	MainController.prototype.bindEvents = function() {
		this.o.view.buildEvt( this.o.view.E.RESIZE, _resize.bind( this ) );
		this.o.view.buildEvt( this.o.view.E.RAF, _raf.bind( this ) );
		this.o.view.buildEvt( this.o.view.E.MOUSE_MOVE, _mouseMove.bind( this ) );
		this.o.view.buildEvt( this.o.view.E.MOUSE_DOWN, _mouseDown.bind( this ) );
		this.o.view.buildEvt( this.o.view.E.MOUSE_UP, _mouseUp.bind( this ) );
	};
	
	
	var _resize = function() {
		console.log('MainController _resize()', this.o.view.v.wW, this.o.view.v.hW);
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

