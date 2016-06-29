

STF.AbstractMainView = ( function( window ) {
	'use strict';
	
	
	function AbstractMainView() {
		STF.AbstractView.call( this );
		
		this.E = {
			RESIZE:		'resize',
			RAF:		'raf',
			MOUSE_MOVE:	'mousemove',
			MOUSE_DOWN:	'mousedown',
			MOUSE_UP:	'mouseup',
			WINDOW_OUT:	'windowout',
			WINDOW_IN:	'windowin',
		};
		
		this.bW		= null; // body width
		this.bH		= null; // body height
		this.wW		= null; // window width
		this.wH		= null; // window height
		this.cX		= null; // center X
		this.cY		= null; // center Y
		this.sY		= null; // scroll Y
		this.siY	= null; // scroll inertia Y
		this.mX		= null; // mouse X
		this.mY		= null; // mouse Y
		
		this.SCROLL_INERTIA		= 0.07;
		
		this.isWindowFocused	= true;
	}
	
	
	AbstractMainView.prototype				= Object.create( STF.AbstractView.prototype );
	AbstractMainView.prototype.constructor	= AbstractMainView;
	
	
	AbstractMainView.prototype.init = function() {
		STF.AbstractView.prototype.init.call( this );
		
		this.initStaticsViews();
		
		this.resize.call( this );
	};
	
	
	AbstractMainView.prototype.initDOM = function() {
		this.$window	= $( window );
		this.$body		= $( document.body );
		this.$mainCont	= $( document.getElementById( 'main-container' ) );
		this.$pageCont	= $( document.getElementById( 'page-container' ) );
	};
	
	
	AbstractMainView.prototype.bindEvents = function() {
		this.$window.on( 'resize', $.proxy( this.resize, this ) );
		TweenLite.ticker.addEventListener( 'tick', this.raf, this );
		// this.$window.on( 'mousemove', $.proxy( this.mouseMove, this ) );
		// this.$window.on( 'mousedown', $.proxy( this.mouseDown, this ) );
		// this.$window.on( 'mouseup', $.proxy( this.mouseUp, this ) );
		// this.$window.on( 'blur', $.proxy( this.windowOut, this ) );
		// this.$window.on( 'focus', $.proxy( this.windowIn, this ) );
	};
	
	
	AbstractMainView.prototype.initStaticsViews = function() {
		STF.Views.Statics.MainLoader.init();
		STF.Views.Statics.Header.init();
		STF.Views.Statics.Footer.init();
		
		removeClass( this.$mainCont[0], 'preload' );
	};
	
	
	AbstractMainView.prototype.resize = function() {
		_setResizeProps.call( this );
		
		if ( this.e.resize !== undefined )
			this.dispatch( this.E.RESIZE );
	};
	
	
	var _setResizeProps = function() {
		this.bW = this.$body.width();
		this.bH = this.$body.height();
		this.wW = this.$window.width();
		this.wH = this.$window.height();
		this.cX = Math.round( this.bW / 2 );
		this.cY = Math.round( this.wH / 2 );
		
		if ( this.mX === null && this.mY === null ) {
			this.mX = this.cX;
			this.mY = this.cY;
		}
	};
	
	
	AbstractMainView.prototype.raf = function() {
		if ( STF.Config.HAS_FPS_STATS && STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' )
			STF.Utils.FPSStats.begin();
		
		
		_setRafProps.call( this );
		
		if ( this.e.raf !== undefined )
			this.dispatch( this.E.RAF );
		
		
		if ( STF.Config.HAS_FPS_STATS && STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' )
			STF.Utils.FPSStats.end();
		
		if ( STF.Config.HAS_MEMORY_STATS && STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' )
			STF.Utils.MemoryStats.update();
	};
	
	
	var _setRafProps = function() {
		this.sY		= this.$window[0].scrollY || this.$window[0].pageYOffset;
		this.siY	+= ( this.sY - this.siY ) * this.SCROLL_INERTIA;
	};
	
	
	AbstractMainView.prototype.mouseMove = function( e ) {
		this.mX = e.clientX;
		this.mY = e.clientY;
		
		console.log( 'AbstractMainView _mouseMove()', this.mX, this.mY );
		
		if ( this.e.mousemove !== undefined )
			this.dispatch( this.E.MOUSE_MOVE );
	};
	
	
	AbstractMainView.prototype.mouseDown = function() {
		if ( this.e.mousedown !== undefined )
			this.dispatch( this.E.MOUSE_DOWN );
	};
	
	
	AbstractMainView.prototype.mouseUp = function() {
		if ( this.e.mouseup !== undefined )
			this.dispatch( this.E.MOUSE_UP );
	};
	
	
	AbstractMainView.prototype.windowOut = function() {
		this.isWindowFocused = false;
		
		if ( this.e.windowout !== undefined )
			this.dispatch( this.E.WINDOW_OUT );
	};
	
	
	AbstractMainView.prototype.windowIn = function() {
		this.isWindowFocused = true;
		
		if ( this.e.windowin !== undefined )
			this.dispatch( this.E.WINDOW_IN );
	};
	
	
	return AbstractMainView;
	
	
} ) ( window );

