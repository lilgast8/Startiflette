

APP.Main = (function(window) {
	
	
	function Main() {
		this.$ = {};
	}
	
	
	Main.prototype.onReady = function() {
		this.$.window = $(window);
		this.$.body = $(document.body);
		this.$.mainContainer = $(document.getElementById('main-container'));
		this.$.pageContainer = $(document.getElementById('page-container'));
		this.$.loader = $(document.getElementById('loader'));
		
		this.windowLoadProxy = $.proxy(_windowLoad, this);
		this.$.window.on('load', this.windowLoadProxy);
	};
	
	
	Main.prototype.resize = function() {
		this.windowW = this.$.window.width();
		this.windowH = this.$.window.height();
	};
	
	
	var _windowLoad = function() {
		this.$.window.off('load', this.windowLoadProxy);
		this.windowLoadProxy = null;
		
		this.$.mainContainer[0].className = '';
	//	_loadJson.call(this);
		
		APP.Model.Global.init();
	};
	
	/*
	var _loadJson = function() {
        this.queue = new createjs.LoadQueue(true, APP.Config.WEB_ROOT);
		
		this.onFileLoadProxy = $.proxy(_onFileLoad, this);
		this.queue.addEventListener('fileload', this.onFileLoadProxy);
		this.onCompleteProxy = $.proxy(_onComplete, this);
		this.queue.addEventListener('complete', this.onCompleteProxy);
		
		this.queue.loadManifest([
			{ id:'infosPages', src:'json/infos-pages-'+APP.Config.LG+'.json' }
		]);
	};
	
	
	var _onFileLoad = function(e) {
		this.json[e.item.id] = e.result;
	};
	
	
	var _onComplete = function(e) {
		this.queue.removeAllEventListeners();
		this.onCompleteProxy = null;
		this.onFileLoadProxy = null;
		this.queue = null;
		
		_init.call(this);
	};
	*/
	
	
	var _init = function() {
		APP.Config.init();
	//	APP.Views.Header.init();
	//	APP.Views.Footer.init();
	//	APP.RoutesManager.init();
	};
	
	
	return new Main();
	
	
})(window);


$(APP.Main.onReady.bind(APP.Main));

