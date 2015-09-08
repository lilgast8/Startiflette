

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
		console.log('MainView.init()');
		
		this.v.wW = null;
		this.v.wH = null;
		
		this.initDOM();
		this.setEvt();
		this.bindEvents();
	};
	
	
	MainView.prototype.initDOM = function() {
		this.$.window	= $( window );
		this.$.body		= $( document.body );
		this.$.mainCont	= $( document.getElementById( 'main-container' ) );
		this.$.pageCont	= $( document.getElementById( 'page-container' ) );
	};
	
	
	MainView.prototype.setEvt = function() {
		this.evt = {
			'resizeW':		[
				this.$.window,
				'resize',
				$.proxy(_resize, this)
			],
			// 'raf':			'$.proxy(_raf, this)',
			'mouseMoveW':	[
				this.$.window,
				'mousemove',
				$.proxy(_mouseMove, this)
			],
			'mouseDownW':	[
				this.$.window,
				'mousedown',
				$.proxy(_mouseDown, this)
			],
			'mouseUpW':	[
				this.$.window,
				'mouseup',
				$.proxy(_mouseUp, this)
			]
		};
	};
	
	
	MainView.prototype.bindEvents = function() {
		// Bind all main events (resize, raf, mousemove, mousedown, mouseup, scroll, orientationChange...)
		
		var prop;
		for ( var evt in this.evt ) {
			// console.log(evt, this.evt[evt][0], this.evt[evt][1], this.evt[evt][2]);
			
			// this.p.NAME = $.proxy(FCT, this);
			// this.$.ELT.on('EVENT', this.p.NAME);
			
			prop = this.evt[ evt ];
			// console.log(prop[0], prop[1], prop[2]);
			// prop[0].on(prop[1], prop[2]);
		}
		
	};
	
	
	var _resize = function() {
		// console.log('_resize()');
		
		this.v.wW = this.$.window.width();
		this.v.hW = this.$.window.height();
		
		this.dispatch( this.E.RESIZE );
	};
	
	
	var _raf = function() {
		console.log('_mouseMove()');
		
		this.dispatch( this.E.MOUSE_MOVE );
	};
	
	
	var _mouseMove = function() {
		console.log('_mouseMove()');
		
		this.dispatch( this.E.MOUSE_MOVE );
	};
	
	
	var _mouseDown = function() {
		console.log('_mouseDown()');
	};
	
	
	var _mouseUp = function() {
		console.log('_mouseUp');
	};
	
	
	return MainView;
	
	
} ) ( window );

