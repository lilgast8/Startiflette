

STF.Abstracts.AbstractMain = class AbstractMain extends STF.Events.CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			RAF: 'raf'
		};
	}
	
	
	init() {
		this.initDOM();
		this.initEl();
		this.bindEvents();
		
		this.initStaticViews();
	}
	
	
	initDOM() {
		this.$window	= $( window );
		this.$html		= $( 'html' );
		this.$body		= $( document.body );
		this.$mainCont	= $( document.getElementById( 'main-container' ) );
		this.$pageCont	= $( document.getElementById( 'page-container' ) );
	}
	
	
	initEl() {
		STF.Controllers.Screen.init( this.$window, this.$body, this.$pageCont );
		STF.Controllers.Scroll.init( this.$window );
		// STF.Controllers.Mouse.init( this.$window, STF.Controllers.Screen.cX, STF.Controllers.Screen.cY );
		// STF.Controllers.Touch.init( this.$window, STF.Controllers.Screen.cX, STF.Controllers.Screen.cY );
		
		STF.Configs.Path.overwriteSpecialPaths( this.$mainCont[0].getAttribute( 'data-assets-base-url' ) );
		this.setClassWebGL();
		
		STF.Views.Partials.CookiesPolicy.init( 'STF' );
	}
	
	
	bindEvents() {
		// TweenLite.ticker.addEventListener( 'tick', this.raf, this );
	}
	
	
	initStaticViews() {
		STF.Views.Statics.MainLoader.init();
		STF.Views.Statics.Header.init();
		STF.Views.Statics.Footer.init();
		
		STF_dom_removeClass( this.$mainCont[0], 'preload' );
	}
	
	
	raf() {
		STF.Utils.Debug.DebugController.rafStart();
		
		
		this.dispatch( this.E.RAF );
		
		
		STF.Utils.Debug.DebugController.rafEnd();
	}
	
	
	initAfterAssetsLoaded() {
		
	}
	
	
	setClassWebGL() {
		const webGL = STF.Configs.Props.HAS_WEBGL === null ? null : STF.Configs.Props.HAS_WEBGL ? 'webgl' : 'no-webgl';
		if ( webGL )
			STF_dom_addClass( this.$html[0], webGL );
	}
	
	
};

