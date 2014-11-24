

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
		this.$.loader = $(document.getElementById('loader'));
		
		this.p.windowLoad = $.proxy(_windowLoad, this);
		this.$.window.on('load', this.p.windowLoad);
	};
	
	
	Main.prototype.resize = function() {
		this.v.windowW = this.$.window.width();
		this.v.windowH = this.$.window.height();
	};
	
	
	var _windowLoad = function() {
		this.$.window.off('load', this.p.windowLoad);
		this.p.windowLoad = null;
		
		this.$.mainContainer[0].className = '';
		
		APP.Model.Global.buildEvt(APP.Model.Global.EVENT.INIT, _init.bind(this));
		APP.Model.Global.init();
	};
	
	
	var _init = function() {
		APP.Model.Global.destroyEvt(APP.Model.Global.EVENT.INIT, _init.bind(this));
		
		APP.Config.init();
		APP.Views.Static.Header.init();
		APP.Views.Static.Footer.init();
		APP.RoutesManager.init();
	};
	
	
	return new Main();
	
	
})(window);


$(APP.Main.onReady.bind(APP.Main));

