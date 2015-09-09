

APP.Main = ( function( window ) {
	
	
	function Main() {
		// this.$ = {};
		// this.p = {};
		this.v = {};
		this.o = {};
	}
	
	
	Main.prototype.init = function() {
		// console.time('load');
		
		// console.log(APP.Config);
		APP.Config.buildEvt( APP.Config.E.INIT, _configLoaded.bind( this ) );
		APP.Config.init();
		
		// this.$.window = $( window );
		// this.$.body = $(document.body);
		// this.$.mainContainer = $(document.getElementById('main-container'));
		// this.$.pageContainer = $(document.getElementById('page-container'));
		
		// this.$.window.on( 'load', $.proxy( _windowLoad, this ) );
	};
	
	
	var _configLoaded = function() {
		APP.Path.init();
		APP.Lang.init();
		
		// APP.OldBrowser.init();
		
		_loadRoutes.call( this );
	};
	
	
	var _loadRoutes = function() {
		APP.RoutesController.buildEvt( APP.RoutesController.E.INIT, _routesLoaded.bind( this ) );
		APP.RoutesController.init();
	};
	
	
	var _routesLoaded = function() {
		// APP.ViewsManager.init();
		
		APP.MainController.init();
		// this.mainController = new APP.MainController();
		// this.mainController.init();
		
		APP.OldBrowser.init();
		
		
		APP.RoutesController.initRouting();
		
		
		/*
		APP.MainController.init();
			-> APP.MainView.init();
				-> body
				-> window
				-> resize()
				-> raf()
			-> set header / footer ()
				-> instance HeaderController
					-> HeaderView
				-> instance FooterController
					-> FooterView
			
			-> CurrentPageController
				-> CurrentPageView
		*/
		
	};
	
	
	/*Main.prototype.resize = function() {
		_setWindowSize.call(this);
		
		// APP.Views.Static.Header.resize();
		// APP.Views.Static.Footer.resize();
		
		if(APP.RoutesController.isPageChange) // stop the resize if page is changing (is in transition)
			return false; 
		
		if(APP.RoutesController.currentView !== null) // if current page exist, resize it
			APP.RoutesController.currentView.resize();
	};*/
	
	
	/*
	var _windowLoad = function() {
		console.timeEnd('load');
		
		this.$.window.off( 'load', $.proxy( _windowLoad, this ) );
		
		// this.$.mainContainer[0].className = '';
		
		// APP.Views.Static.MainLoader.init();
		
		// APP.Models.Json.buildEvt(APP.Models.Json.E.INIT, _init.bind(this));
		// APP.Models.Json.init();
	};
	
	
	var _init = function() {
		APP.Models.Json.destroyEvt(APP.Models.Json.E.INIT, _init.bind(this));
		
		// if(APP.Config.LOCALHOST && !APP.Config.PROD) // FPS stats
		// 	APP.Utils.FPSStats.init();
		
		// if(APP.Config.LOCALHOST && !APP.Config.PROD) // memory stats
		// 	APP.Utils.MemoryStats.init();
		
		// if(APP.Config.LOCALHOST && !APP.Config.PROD) // datGUI
		// 	APP.Utils.DatGUI.init();
		
		_setWindowSize.call(this);
		
		APP.Views.Static.Header.init();
		APP.Views.Static.Footer.init();
		
		_bindEvents.call(this);
		
		this.resize();
		
		setTimeout(function() { APP.RoutesController.init(); }, 0);
	};
	
	
	var _bindEvents = function() {
		this.p.resizeWindow = $.proxy(this.resize, this);
		this.$.window.on('resize', this.p.resizeWindow);
	};
	
	
	var _setWindowSize = function() {
		this.v.windowW = this.$.window.width();
		this.v.windowH = this.$.window.height();
	};
	*/
	
	
	return new Main();
	
	
} ) ( window );


$( APP.Main.init.bind( APP.Main ) );

