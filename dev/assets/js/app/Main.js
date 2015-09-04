

APP.Main = ( function( window ) {
	
	
	function Main() {
		this.$ = {};
		// this.p = {};
		this.v = {};
	}
	
	
	Main.prototype.onReady = function() {
		console.time('load');
		
		// console.log(APP.Config);
		APP.Config.buildEvt( APP.Config.E.INIT, _init.bind( this ) );
		APP.Config.init();
		
		// this.$.window = $( window );
		// this.$.body = $(document.body);
		// this.$.mainContainer = $(document.getElementById('main-container'));
		// this.$.pageContainer = $(document.getElementById('page-container'));
		
		// this.$.window.on( 'load', $.proxy( _windowLoad, this ) );
	};
	
	
	var _init = function() {
		APP.Path.init();
		APP.Lang.init();
		
		// APP.RoutesManager.init();
	};
	
	
	/*Main.prototype.resize = function() {
		_setWindowSize.call(this);
		
		// APP.Views.Static.Header.resize();
		// APP.Views.Static.Footer.resize();
		
		if(APP.RoutesManager.isPageChange) // stop the resize if page is changing (is in transition)
			return false; 
		
		if(APP.RoutesManager.currentView !== null) // if current page exist, resize it
			APP.RoutesManager.currentView.resize();
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
		
		setTimeout(function() { APP.RoutesManager.init(); }, 0);
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


$( APP.Main.onReady.bind( APP.Main ) );

