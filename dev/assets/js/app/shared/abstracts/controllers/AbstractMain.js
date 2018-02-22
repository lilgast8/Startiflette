

STF.Abstracts.AbstractMain = class AbstractMain extends STF.Events.CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			RESIZE:			'resize',
			RAF:			'raf',
			MOUSE_MOVE:		'mousemove',
			MOUSE_DOWN:		'mousedown',
			MOUSE_UP:		'mouseup',
			TOUCH_MOVE:		'touchmove',
			TOUCH_START:	'touchstart',
			TOUCH_END:		'touchend',
			WINDOW_OUT:		'windowout',
			WINDOW_IN:		'windowin'
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
		this.miX	= null; // mouse inertia X
		this.miY	= null; // mouse inertia Y
		this.tX		= null; // touch X
		this.tY		= null; // touch Y
		
		this.SCROLL_INERTIA		= 0.07;
		this.MOUSE_INERTIA		= 0.03;
		
		this.isWindowFocused	= true;
	}
	
	
	init() {
		this.initDOM();
		this.initEl();
		this.bindEvents();
		
		this.initStaticsViews();
		
		this.resize();
	}
	
	
	initDOM() {
		this.$window	= $( window );
		this.$body		= $( document.body );
		this.$mainCont	= $( document.getElementById( 'main-container' ) );
		this.$pageCont	= $( document.getElementById( 'page-container' ) );
	}
	
	
	initEl() {
		STF.Configs.Path.overwriteSpecialPaths( this.$mainCont[0].getAttribute( 'data-assets-base-url' ) );
	}
	
	
	bindEvents() {
		this.$window.on( 'resize', $.proxy( this.resize, this ) );
		TweenLite.ticker.addEventListener( 'tick', this.raf, this );
		// this.$window.on( 'mousemove', $.proxy( this.mouseMove, this ) );
		// this.$window.on( 'mousedown', $.proxy( this.mouseDown, this ) );
		// this.$window.on( 'mouseup', $.proxy( this.mouseUp, this ) );
		// this.$window.on( 'touchmove', $.proxy( this.touchMove, this ) );
		// this.$window.on( 'touchstart', $.proxy( this.touchStart, this ) );
		// this.$window.on( 'touchend', $.proxy( this.touchEnd, this ) );
		// this.$window.on( 'blur', $.proxy( this.windowOut, this ) );
		// this.$window.on( 'focus', $.proxy( this.windowIn, this ) );
	}
	
	
	initStaticsViews() {
		STF.Views.Statics.MainLoader.init();
		STF.Views.Statics.Header.init();
		STF.Views.Statics.Footer.init();
		
		STF_dom_removeClass( this.$mainCont[0], 'preload' );
	}
	
	
	disableScrollRestoration() {
		if ( 'scrollRestoration' in history )
			history.scrollRestoration = 'manual';
	}
	
	
	resize() {
		this._setResizeProps();
		
		this.dispatch( this.E.RESIZE );
	}
	
	
	_setResizeProps() {
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
	}
	
	
	raf() {
		if ( STF.Configs.Config.HAS_FPS_STATS && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.Debug.FPSStats.begin();
		
		
		this._setRafProps();
		
		this.dispatch( this.E.RAF );
		
		
		if ( STF.Configs.Config.HAS_FPS_STATS && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.Debug.FPSStats.end();
		
		if ( STF.Configs.Config.HAS_MEMORY_STATS && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.Debug.MemoryStats.update();
	}
	
	
	_setRafProps() {
		this.sY		= this.$window[0].scrollY || this.$window[0].pageYOffset;
		this.siY	= STF_math_getInertia( this.sY, this.siY, this.SCROLL_INERTIA );
		
		this.miX	= STF_math_getInertia( this.mX, this.miX, this.MOUSE_INERTIA );
		this.miY	= STF_math_getInertia( this.mY, this.miY, this.MOUSE_INERTIA );
	}
	
	
	mouseMove( e ) {
		this.mX = e.clientX;
		this.mY = e.clientY;
		
		// console.log( 'AbstractMain _mouseMove()', this.mX, this.mY );
		
		this.dispatch( this.E.MOUSE_MOVE );
	}
	
	
	mouseDown() {
		this.dispatch( this.E.MOUSE_DOWN );
	}
	
	
	mouseUp() {
		this.dispatch( this.E.MOUSE_UP );
	}
	
	
	touchMove( e ) {
		e.preventDefault();
		
		// Zepto
		this.tX = e.touches[0].pageX;
		this.tY = e.touches[0].pageY;
		// jQuery
		// this.tX = e.originalEvent.touches[0].pageX;
		// this.tY = e.originalEvent.touches[0].pageY;
		
		this.dispatch( this.E.TOUCH_MOVE );
	}
	
	
	touchStart() {
		this.dispatch( this.E.TOUCH_START );
	}
	
	
	touchEnd() {
		this.dispatch( this.E.TOUCH_END );
	}
	
	
	windowOut() {
		this.isWindowFocused = false;
		
		this.dispatch( this.E.WINDOW_OUT );
	}
	
	
	windowIn() {
		this.isWindowFocused = true;
		
		this.dispatch( this.E.WINDOW_IN );
	}
	
	
	setScrollY( scrollY ) {
		this.sY		= scrollY;
		this.siY	= scrollY;
		
		this.$window[0].scrollTo( 0, scrollY );
	}
	
	
	setBodyHeight( bodyH ) {
		if ( bodyH === null )
			bodyH = this.$pageCont.height();
		
		this.$body[0].style.height = bodyH + 'px';
	}
	
	
	initAfterAssetsLoaded() {
		
	}
	
	
};

