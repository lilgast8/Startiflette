

APP.Config = (function(window) {
	
	
	function Config() {
		this.LOCALHOST = LOCALHOST == '1' ? true : false;
		this.PROD = PROD == '1' ? true : false;
		this.WEB_ROOT = WEB_ROOT;
		this.LG = LG;
		this.MULTI_LG = MULTI_LG == '1' ? true : false;
		this.ALL_LG = ALL_LG;
		
		this.BROWSER = null;
		this.BROWSER_VERSION = null;
		this.DEVICE = null;
		this.IS_IE = null;
		this.IE_VERSION = null;
		
		this.HAS_PUSHSTATE = null;
	}
	
	
	Config.prototype.init = function() {
		this.BROWSER = Detectizr.browser.name;
		this.BROWSER_VERSION = Detectizr.browser.version;
		this.DEVICE = Detectizr.device.type;
		this.IS_IE = APP.Config.BROWSER == 'ie' ? true : false;
		this.IE_VERSION = null;
		
		this.HAS_PUSHSTATE = Modernizr.history;
		
		APP.OldBrowser.init();
	};
	
	
	return new Config();
	
	
})(window);

