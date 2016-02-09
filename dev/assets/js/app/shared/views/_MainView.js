

STF.MainView = ( function( window ) {
	'use strict';
	
	
	function MainView() {
		STF.AbstractView.call( this );
		
		this.E = {
			RESIZE:		'resize',
			RAF:		'raf',
			MOUSE_MOVE:	'mousemouse',
			MOUSE_DOWN:	'mousedown',
			MOUSE_UP:	'mouseup'
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
	
	
	MainView.prototype				= Object.create( STF.AbstractView.prototype );
	MainView.prototype.constructor	= MainView;
	
	
	MainView.prototype.init = function() {
		STF.AbstractView.prototype.init.call( this );
		
		_initStaticsViews.call( this );
		
		_resize.call( this );
	};
	
	
	MainView.prototype.initDOM = function() {
		this.$window	= $( window );
		this.$body		= $( document.body );
		this.$mainCont	= $( document.getElementById( 'main-container' ) );
		this.$pageCont	= $( document.getElementById( 'page-container' ) );
	};
	
	
	MainView.prototype.bindEvents = function() {
		this.$window.on( 'resize', $.proxy( _resize, this ) );
		// TweenLite.ticker.addEventListener( 'tick', _raf, this );
		// this.$window.on( 'mousemove', $.proxy( _mouseMove, this ) );
		// this.$window.on( 'mousedown', $.proxy( _mouseDown, this ) );
		// this.$window.on( 'mouseup', $.proxy( _mouseUp, this ) );
		// this.$window.on( 'blur', $.proxy( _windowOut, this ) );
		// this.$window.on( 'focus', $.proxy( _windowIn, this ) );
	};
	
	
	var _initStaticsViews = function() {
		// STF.PagesController.init();
		STF.Views.Statics.Header.init();
		// STF.Views.Statics.Footer.init();
	};
	
	
	var _resize = function() {
		this.wW = this.$window.width();
		this.wH = this.$window.height();
		this.cX = Math.round( this.bW / 2 );
		this.cY = Math.round( this.wH / 2 );
		
		if ( this.mX === null && this.mY === null ) {
			this.mX = this.cX;
			this.mY = this.cY;
		}
		
		// console.log( 'MainView _resize()', this.wW, this.wH );
		
		STF.Views.Statics.Header.resize();
		STF.Views.Statics.Footer.resize();
		
		if ( STF.PagesController.currentPage !== null )
			STF.PagesController.currentPage.resize();
	};
	
	
	var _raf = function() {
		// if ( STF.Config.ENV == 'dev' || STF.Config.ENV == 'preprod_local' )
		// 	STF.Utils.FPSStats.begin();
		
		
		console.log( 'MainView _raf()' );
		
		this.sY		= this.$window[0].scrollY || this.$window[0].pageYOffset;
		this.siY	+= ( this.sY - this.siY ) * this.SCROLL_INERTIA;
		
		STF.Views.Statics.Header.raf();
		STF.Views.Statics.Footer.raf();
		
		if ( STF.PagesController.currentPage !== null )
			STF.PagesController.currentPage.raf();
		
		
		// if ( STF.Config.ENV == 'dev' || STF.Config.ENV == 'preprod_local' )
		// 	STF.Utils.FPSStats.end();
	};
	
	
	var _mouseMove = function( e ) {
		this.mX = e.clientX;
		this.mY = e.clientY;
		
		console.log( 'MainView _mouseMove()', this.mX, this.mY );
	};
	
	
	var _mouseDown = function() {
		console.log( 'MainView _mouseDown()' );
	};
	
	
	var _mouseUp = function() {
		console.log( 'MainView _mouseUp()' );
	};
	
	
	var _windowOut = function() {
		this.isWindowFocused = false;
		
		console.log( 'MainView _windowOut', this.isWindowFocused );
	};
	
	
	var _windowIn = function() {
		this.isWindowFocused = true;
		
		console.log( 'MainView _windowOut', this.isWindowFocused );
	};
	
	
	return new MainView();
	
	
} ) ( window );
