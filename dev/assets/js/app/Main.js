

STF.Main = ( function( window ) {
	
	
	function Main() {
		// this.$ = {};
		// this.p = {};
		this.v = {};
		this.o = {};
	}
	
	
	Main.prototype.init = function() {
		// console.time('load');
		
		// console.log(STF.Config);
		STF.Config.buildEvt( STF.Config.E.INIT, _configLoaded.bind( this ) );
		STF.Config.init();
		
		// this.$.window = $( window );
		// this.$.body = $(document.body);
		// this.$.mainContainer = $(document.getElementById('main-container'));
		// this.$.pageContainer = $(document.getElementById('page-container'));
		
		// this.$.window.on( 'load', $.proxy( _windowLoad, this ) );
	};
	
	
	var _configLoaded = function() {
		STF.Path.init();
		STF.Lang.init();
		
		// STF.OldBrowser.init();
		
		_loadRoutes.call( this );
	};
	
	
	var _loadRoutes = function() {
		STF.Router.buildEvt( STF.Router.E.INIT, _routesLoaded.bind( this ) );
		STF.Router.init();
	};
	
	
	var _routesLoaded = function() {
		// STF.ViewsManager.init();
		
		// STF.MainController.init();
		// this.mainController = new STF.MainController();
		// this.mainController.init();
		STF.MainView.init();
		
		STF.OldBrowser.init();
		
		
		STF.Router.initRouting();
		
		
		/*
		STF.MainController.init();
			-> STF.MainView.init();
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
		
		// STF.Views.Static.Header.resize();
		// STF.Views.Static.Footer.resize();
		
		if(STF.RoutesController.isPageChange) // stop the resize if page is changing (is in transition)
			return false; 
		
		if(STF.RoutesController.currentView !== null) // if current page exist, resize it
			STF.RoutesController.currentView.resize();
	};*/
	
	
	/*
	var _windowLoad = function() {
		console.timeEnd('load');
		
		this.$.window.off( 'load', $.proxy( _windowLoad, this ) );
		
		// this.$.mainContainer[0].className = '';
		
		// STF.Views.Static.MainLoader.init();
		
		// STF.Models.Json.buildEvt(STF.Models.Json.E.INIT, _init.bind(this));
		// STF.Models.Json.init();
	};
	
	
	var _init = function() {
		STF.Models.Json.destroyEvt(STF.Models.Json.E.INIT, _init.bind(this));
		
		// if(STF.Config.LOCALHOST && !STF.Config.PROD) // FPS stats
		// 	STF.Utils.FPSStats.init();
		
		// if(STF.Config.LOCALHOST && !STF.Config.PROD) // memory stats
		// 	STF.Utils.MemoryStats.init();
		
		// if(STF.Config.LOCALHOST && !STF.Config.PROD) // datGUI
		// 	STF.Utils.DatGUI.init();
		
		_setWindowSize.call(this);
		
		STF.Views.Static.Header.init();
		STF.Views.Static.Footer.init();
		
		_bindEvents.call(this);
		
		this.resize();
		
		setTimeout(function() { STF.RoutesController.init(); }, 0);
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


$( STF.Main.init.bind( STF.Main ) );

