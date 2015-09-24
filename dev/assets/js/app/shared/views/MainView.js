

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
		
		this.wW			= null;
		this.wH			= null;
		this.scrollY	= null;
	}
	
	
	MainView.prototype				= Object.create( STF.AbstractView.prototype );
	MainView.prototype.constructor	= MainView;
	
	
	MainView.prototype.init = function() {
		STF.AbstractView.prototype.init.call( this );
		
		_initStaticsViews.call( this );
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
	};
	
	
	var _initStaticsViews = function() {
		STF.PagesController.init();
		STF.Views.Statics.HeaderView.init();
		// STF.Views.Statics.FooterView.init();
	};
	
	
	var _resize = function() {
		this.wW = this.$window.width();
		this.wH = this.$window.height();
		
		console.log( 'MainView _resize()', this.wW, this.wH );
	};
	
	
	var _raf = function() {
		this.scrollY = this.$window[0].scrollY || this.$window[0].pageYOffset;
		
		console.log( 'MainView _raf()' );
	};
	
	
	var _mouseMove = function() {
		console.log( 'MainView _mouseMove()' );
	};
	
	
	var _mouseDown = function() {
		console.log( 'MainView _mouseDown()' );
	};
	
	
	var _mouseUp = function() {
		console.log( 'MainView _mouseUp()' );
	};
	
	
	return new MainView();
	
	
} ) ( window );

