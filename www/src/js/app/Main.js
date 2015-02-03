

APP.Main = (function(window) {
	
	
	function Main() {
		this.$ = {};
		this.p = {};
		this.v = {};
	}
	
	
	Main.prototype.onReady = function() {
		this.$.window = $(window);
		this.$.body = $(document.body);
		this.$.mainContainer = $(document.getElementById('main-container'));
		this.$.pageContainer = $(document.getElementById('page-container'));
		
		this.p.windowLoad = $.proxy(_windowLoad, this);
		this.$.window.on('load', this.p.windowLoad);
	};
	
	
	Main.prototype.resize = function() {
		_setWindowSize.call(this);
		
		// APP.Views.Static.Header.resize();
		// APP.Views.Static.Footer.resize();
		
		if(APP.RoutesManager.isPageChange) // stop the resize if page is changing (is in transition)
			return false; 
		
		if(APP.RoutesManager.currentPage !== null) // if current page exist, resize it
			APP.RoutesManager.currentPage.resize();
	};
	
	
	var _windowLoad = function() {
		this.$.window.off('load', this.p.windowLoad);
		this.p.windowLoad = null;
		
		this.$.mainContainer[0].className = '';
		
		APP.Config.init();
		APP.Views.Static.MainLoader.init();
		
		APP.Models.Json.buildEvt(APP.Models.Json.E.INIT, _init.bind(this));
		APP.Models.Json.init();
	};
	
	
	var _init = function() {
		APP.Models.Json.destroyEvt(APP.Models.Json.E.INIT, _init.bind(this));
		
		// if(APP.Config.LOCALHOST && !APP.Config.PROD) // stats
		// 	_initStats.call(this);
		
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
	
	
	var _initStats = function() {
		this.stats = new Stats();
		this.stats.setMode(0);
		
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.right = '0px';
		this.stats.domElement.style.bottom = '0px';
		this.stats.domElement.style.zIndex = 88;
		
		document.body.appendChild(this.stats.domElement);
	};
	
	
	return new Main();
	
	
})(window);


$(APP.Main.onReady.bind(APP.Main));

