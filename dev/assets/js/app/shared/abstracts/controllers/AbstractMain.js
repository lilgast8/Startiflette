

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
		
		this.initStaticsViews();
	}
	
	
	initDOM() {
		this.$window	= $( window );
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
	}
	
	
	bindEvents() {
		// TweenLite.ticker.addEventListener( 'tick', this.raf, this );
	}
	
	
	initStaticsViews() {
		STF.Views.Statics.MainLoader.init();
		STF.Views.Statics.Header.init();
		STF.Views.Statics.Footer.init();
		
		STF_dom_removeClass( this.$mainCont[0], 'preload' );
	}
	
	
	raf() {
		if ( STF.Configs.Config.HAS_FPS_STATS && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.Debug.FPSStats.begin();
		
		
		this.dispatch( this.E.RAF );
		
		
		if ( STF.Configs.Config.HAS_FPS_STATS && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.Debug.FPSStats.end();
		
		if ( STF.Configs.Config.HAS_MEMORY_STATS && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.Debug.MemoryStats.update();
	}
	
	
	initAfterAssetsLoaded() {
		
	}
	
	
};

