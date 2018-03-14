

STF.Controllers.Screen = new class Screen extends STF.Events.CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			RESIZE:		'resize',
			WINDOW_OUT:	'windowout',
			WINDOW_IN:	'windowin'
		};
		
		this.wW	= null; // window width
		this.wH	= null; // window height
		this.bW	= null; // body width
		this.bH	= null; // body height
		this.cX	= null; // center X
		this.cY	= null; // center Y
		
		this.isWindowFocused = true;
	}
	
	
	init( $window = $( window ), $body = $( document.body ), $pageCont = $body ) {
		this._initDOM( $window, $body, $pageCont );
		this._initEl();
		this._bindEvents();
		
		this._resize();
	}
	
	
	_initDOM( $window, $body, $pageCont ) {
		this.$window	= $window;
		this.$body		= $body;
		this.$pageCont	= $pageCont;
	}
	
	
	_initEl() {
		
	}
	
	
	_bindEvents() {
		this.$window.on( 'resize', $.proxy( this._resize, this ) );
		// this.$window.on( 'blur', $.proxy( this._windowOut, this ) );
		// this.$window.on( 'focus', $.proxy( this._windowIn, this ) );
	}
	
	
	_resize() {
		this._setResizeProps();
		
		this.dispatch( this.E.RESIZE );
	}
	
	
	_setResizeProps() {
		this.wW = this.$window.width();
		this.wH = this.$window.height();
		this.bW = this.$body.width();
		this.bH = this.$body.height();
		this.cX = Math.round( this.bW / 2 );
		this.cY = Math.round( this.wH / 2 );
	}
	
	
	_windowOut() {
		this.isWindowFocused = false;
		
		this.dispatch( this.E.WINDOW_OUT );
	}
	
	
	_windowIn() {
		this.isWindowFocused = true;
		
		this.dispatch( this.E.WINDOW_IN );
	}
	
	
	setBodyHeight( bodyH ) {
		if ( bodyH === null )
			bodyH = this.$pageCont.height();
		
		this.bH						= bodyH;
		this.$body[0].style.height	= bodyH + 'px';
	}
	
	
}();

