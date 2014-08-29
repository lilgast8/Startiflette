

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
		
		APP.Model.Global.buildEvt(APP.Model.Global.EVENT.INIT, _init.bind(this));
		APP.Model.Global.init();
	};
	
	
	var _init = function() {
		console.log('init Main');
		APP.Model.Global.destroyEvt(APP.Model.Global.EVENT.INIT, _init.bind(this));
		
		APP.Config.init();
	//	APP.Views.Header.init();
	//	APP.Views.Footer.init();
	//	APP.RoutesManager.init();
	};
	
	
	return new Main();
	
	
})(window);


$(APP.Main.onReady.bind(APP.Main));

