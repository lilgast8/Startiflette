

STF.AbstractMainView = ( function( window ) {
	'use strict';
	
	
	function AbstractMainView() {
		STF.AbstractView.call( this );
		
		/*this.E = {
			RESIZE:		'resize',
			RAF:		'raf',
			MOUSE_MOVE:	'mousemouse',
			MOUSE_DOWN:	'mousedown',
			MOUSE_UP:	'mouseup'
		};*/
		
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
		
		_resize.call( this );
	};
	
	
	AbstractMainView.prototype.initDOM = function() {
		this.$window	= $( window );
		this.$body		= $( document.body );
		this.$mainCont	= $( document.getElementById( 'main-container' ) );
		this.$pageCont	= $( document.getElementById( 'page-container' ) );
	};
	
	
	AbstractMainView.prototype.bindEvents = function() {
		this.$window.on( 'resize', $.proxy( _resize, this ) );
		// this.$window.on( 'resize', $.proxy( this.resize, this ) );
		// TweenLite.ticker.addEventListener( 'tick', _raf, this );
		// this.$window.on( 'mousemove', $.proxy( _mouseMove, this ) );
		// this.$window.on( 'mousedown', $.proxy( _mouseDown, this ) );
		// this.$window.on( 'mouseup', $.proxy( _mouseUp, this ) );
		// this.$window.on( 'blur', $.proxy( _windowOut, this ) );
		// this.$window.on( 'focus', $.proxy( _windowIn, this ) );
	};
	
	
	AbstractMainView.prototype.initStaticsViews = function() {
		STF.Views.Statics.MainLoader.init();
		STF.Views.Statics.Header.init();
		STF.Views.Statics.Footer.init();
		
		removeClass( this.$mainCont[0], 'preload' );
	};
	
	
	var _resize = function() {
		_setResizeProps.call( this );
		
		this.resizeStaticsViews();
		
		_resizeCurrentPage.call( this );
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
		
		// console.log( 'AbstractMainView _setResizeProps()', this.wW, this.wH );
	};
	
	
	AbstractMainView.prototype.resizeStaticsViews = function() {
		STF.Views.Statics.MainLoader.resize();
		STF.Views.Statics.Header.resize();
		STF.Views.Statics.Footer.resize();
	};
	
	
	var _resizeCurrentPage = function() {
		if ( STF.PagesController.currentPage !== null )
			STF.PagesController.currentPage.resize();
	};
	
	
	var _raf = function() {
		if ( STF.Config.HAS_FPS_STATS && STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' )
			STF.Utils.FPSStats.begin();
		
		
		_setRafProps.call( this );
		
		this.rafStaticsViews();
		
		_rafCurrentPage.call( this );
		
		
		if ( STF.Config.HAS_FPS_STATS && STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' )
			STF.Utils.FPSStats.end();
		
		if ( STF.Config.HAS_MEMORY_STATS && STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' )
			STF.Utils.MemoryStats.update();
	};
	
	
	var _setRafProps = function() {
		this.sY		= this.$window[0].scrollY || this.$window[0].pageYOffset;
		this.siY	+= ( this.sY - this.siY ) * this.SCROLL_INERTIA;
	};
	
	
	AbstractMainView.prototype.rafStaticsViews = function() {
		STF.Views.Statics.MainLoader.raf();
		STF.Views.Statics.Header.raf();
		STF.Views.Statics.Footer.raf();
	};
	
	
	var _rafCurrentPage = function() {
		if ( STF.PagesController.currentPage !== null )
			STF.PagesController.currentPage.raf();
	};
	
	
	var _mouseMove = function( e ) {
		this.mX = e.clientX;
		this.mY = e.clientY;
		
		console.log( 'AbstractMainView _mouseMove()', this.mX, this.mY );
	};
	
	
	var _mouseDown = function() {
		console.log( 'AbstractMainView _mouseDown()' );
	};
	
	
	var _mouseUp = function() {
		console.log( 'AbstractMainView _mouseUp()' );
	};
	
	
	var _windowOut = function() {
		this.isWindowFocused = false;
		
		console.log( 'AbstractMainView _windowOut', this.isWindowFocused );
	};
	
	
	var _windowIn = function() {
		this.isWindowFocused = true;
		
		console.log( 'AbstractMainView _windowOut', this.isWindowFocused );
	};
	
	
	return AbstractMainView;
	
	
} ) ( window );

