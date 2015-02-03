

APP.Config = (function(window) {
	
	
	function Config() {
		this.LOCALHOST			= LOCALHOST == '1' ? true : false;
		this.PROD				= PROD == '1' ? true : false;
		this.DEFAULT_LANG		= DEFAULT_LANG;
		this.WEB_ROOT			= WEB_ROOT;
		this.ASSETS				= this.PROD ? 'assets/' : 'src/';
		this.LANG				= null;
		this.MULTI_LANG			= null;
		this.ALL_LANG			= null;
		
		this.BROWSER			= null;
		this.BROWSER_VERSION	= null;
		this.DEVICE				= null;
		this.IS_IE				= null;
		this.IE_VERSION			= null;
		
		this.HAS_PUSHSTATE		= null;
		
		this.TRANSFORM			= null;
	}
	
	
	Config.prototype.init = function() {
		this.BROWSER			= Detectizr.browser.name;
		this.BROWSER_VERSION	= Detectizr.browser.version;
		this.DEVICE				= Detectizr.device.type;
		this.IS_IE				= APP.Config.BROWSER == 'ie' ? true : false;
		this.IE_VERSION			= null;
		
		this.ALL_LANG			= _setAllLang.call(this);
		this.MULTI_LANG			= this.ALL_LANG.length == 1 ? false : true;
		this.LANG				= _setLang.call(this);
		
		this.HAS_PUSHSTATE		= Modernizr.history;
		
		this.TRANSFORM			= getSupportedPropertyName('transform');
		
		APP.OldBrowser.init();
	};
	
	
	var _setAllLang = function() {
		var allLang = [];
		
		for(var lang in APP.Models.Json.data.pages)
			allLang.push(lang);
		
		return allLang;
	};
	
	
	var _setLang = function() {
		var lang;
		
		var current = History.getState().url;
		var pageUrl = current.replace(this.WEB_ROOT, '');
		
		if(!this.MULTI_LANG || pageUrl.length === 0)
			lang = this.DEFAULT_LANG;	
		else
			lang = pageUrl.substr(0, 2);
		
		return lang;
	};
	
	
	return new Config();
	
	
})(window);

