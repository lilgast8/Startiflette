

APP.Config = APP.Config || {};


(function(window) {
	
	
	var Config = function() {
		this.LOCALHOST = LOCALHOST;
		this.PROD  = PROD;
		this.WEB_ROOT = WEB_ROOT;
		this.LG = LG;
		
		this.BROWSER = null;
		this.BROWSER_VERSION = null;
		this.DEVICE = null;
		this.IS_IE = null;
		this.IE_VERSION = null;
		
		this.HAS_PUSHSTATE = null;
	};
	
	
	Config.prototype = {
		
		init : function() {
			this.BROWSER = Detectizr.browser.name;
			this.BROWSER_VERSION = Detectizr.browser.version;
			this.DEVICE = Detectizr.device.type;
			this.IS_IE = APP.Config.BROWSER == 'ie' ? true : false;
			this.IE_VERSION = null;
			
			this.HAS_PUSHSTATE = Modernizr.history;
			
			APP.OldBrowser.init();
		}
		
	};
	
	
	APP.Config = new Config();
	
	
})(window);

