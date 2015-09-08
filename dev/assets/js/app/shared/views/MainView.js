

APP.MainView = ( function( window ) {
	
	
	function MainView() {
		APP.AbstractView.call( this );
		
		this.E = {
			RESIZE:		'resize',
			RAF:		'raf',
			MOUSE_MOVE:	'mousemouse',
			MOUSE_DOWN:	'mousedown',
			MOUSE_UP:	'mouseup'
		};
	}
	
	
	MainView.prototype				= Object.create( APP.AbstractView.prototype );
	MainView.prototype.constructor	= MainView;
	
	
	MainView.prototype.init = function() {
		this.v.wW		= null;
		this.v.wH		= null;
		this.v.scrollY	= null;
		
		this.initDOM();
		this.bindEvents();
	};
	
	
	MainView.prototype.initDOM = function() {
		this.$.window	= $( window );
		this.$.body		= $( document.body );
		this.$.mainCont	= $( document.getElementById( 'main-container' ) );
		this.$.pageCont	= $( document.getElementById( 'page-container' ) );
	};
	
	
	MainView.prototype.bindEvents = function() {
		this.$.window.on( 'resize', $.proxy( _resize, this ) );
		TweenLite.ticker.addEventListener( 'tick', _raf, this );
		this.$.window.on( 'mousemove', $.proxy( _mouseMove, this ) );
		this.$.window.on( 'mousedown', $.proxy( _mouseDown, this ) );
		this.$.window.on( 'mouseup', $.proxy( _mouseUp, this ) );
	};
	
	
	var _resize = function() {
		this.v.wW = this.$.window.width();
		this.v.hW = this.$.window.height();
		
		this.dispatch( this.E.RESIZE );
	};
	
	
	var _raf = function() {
		this.v.scrollY = this.$.window[0].scrollY || this.$.window[0].pageYOffset;
		
		this.dispatch( this.E.RAF );
	};
	
	
	var _mouseMove = function() {
		this.dispatch( this.E.MOUSE_MOVE );
	};
	
	
	var _mouseDown = function() {
		this.dispatch( this.E.MOUSE_DOWN );
	};
	
	
	var _mouseUp = function() {
		this.dispatch( this.E.MOUSE_UP );
	};
	
	
	return new MainView();
	
	
} ) ( window );

