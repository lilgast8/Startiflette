

APP.RoutesManager =(function(window) {
	
	
	function RoutesManager() {
		APP.EventDispatcher.call(this);
		
		this.prevPage = null;
		this.currentPage = null;
		this.nextPage = null;
		
		this.pageUrl = null;
		this.activeUrl = null;
		this.isPageChange = false;
	}
	
	
	RoutesManager.prototype = Object.create(APP.EventDispatcher.prototype);
	RoutesManager.prototype.constructor = RoutesManager;
	
	
	RoutesManager.prototype.init = function() {
		_bindEvents.call(this);
		_initFirstPage.call(this);
	};
	
	
	RoutesManager.prototype.goToPage = function(url) {
		_setPageUrl.call(this, url);
		
		var title = _getTitle.call(this);
		
		History.pushState(null, title, url);
	};
	
	
	var _bindEvents = function() {
		History.Adapter.bind(window, 'statechange', _onStateChange.bind(this));
	};
	
	
	var _onStateChange = function() {
		if(!this.isPageChange) {
			_disablePageChange.call(this);
			
			_setPageUrl.call(this, null);
			
			this.nextPage = _getPage.call(this);
			
			this.currentPage.buildEvt(this.currentPage.EVENT.HIDDEN, _loadNextPage.bind(this));
			this.currentPage.hide();
		}
	};
	
	
	var _initFirstPage = function() {
		_setPageUrl.call(this, null);
		this.currentPage = _getPage.call(this);
		this.currentPage.init();
		
		this.currentPage.hideLoader(true);
		_updateMenu.call(this);
	};
	
	
	var _loadNextPage = function() {
		this.currentPage.destroyEvt(this.currentPage.EVENT.HIDDEN, _loadNextPage.bind(this));
		
		this.prevPage = this.currentPage;
		this.currentPage = this.nextPage;
		
		this.currentPage.buildEvt(this.currentPage.EVENT.LOADED, _updateMenu.bind(this));
		this.currentPage.buildEvt(this.currentPage.EVENT.SHOWN, _enablePageChange.bind(this));
		
		this.currentPage.load(this.pageUrl);
	};
	
	
	var _updateMenu = function() {
		if(this.currentPage.events.loaded) this.currentPage.destroyEvt(this.currentPage.EVENT.LOADED, _updateMenu.bind(this));
		
		var $menu = APP.Views.Header.$.menu;
		var $footer = APP.Views.Footer.$.footer;
		
		var $menuToDisable = $menu.find('[data-active="true"]');
		if(!$menuToDisable.length) $menuToDisable = $footer.find('[data-active="true"]');
		var $menuToEnable = $menu.find('[href*="'+this.pageUrl+'"]');
		if(!$menuToEnable.length) $menuToEnable = $footer.find('[href*="'+pageUrl+'"]');
		
		if($menuToDisable.length) $menuToDisable[0].setAttribute('data-active', 'false');
		if($menuToEnable.length) $menuToEnable[0].setAttribute('data-active', 'true');
	};
	
	
	var _disablePageChange = function() {
		this.isPageChange = true;
		this.activeUrl = _getUrl();
	};
	
	
	var _enablePageChange = function() {
		this.currentPage.destroyEvt(this.currentPage.EVENT.SHOWN, _enablePageChange.bind(this));
		
		this.isPageChange = false;
		_checkUrl.call(this);
	};
	
	
	var _checkUrl = function() {
		if(this.activeUrl != _getUrl()) _onStateChange.call(this);
	};
	
	
	var _setPageUrl = function(url) {
		if(url === null) url = _getUrl();
		
		var endBaseUrl = url.indexOf(APP.Config.WEB_ROOT)+APP.Config.WEB_ROOT.length;
		this.pageUrl = url.substring(endBaseUrl, url.length);
		if(this.pageUrl === '') this.pageUrl = 'accueil';
	};
	
	
	var _getPage = function() {
		var currentPage = null;
		
		if(this.pageUrl.indexOf('accueil') > -1) currentPage = APP.Views.Home;
		else if(this.pageUrl.indexOf('a-propos') > -1) currentPage = APP.Views.About;
		else if(this.pageUrl.indexOf('legals') > -1) currentPage = APP.Views.Legals;
		
		return currentPage;
	};
	
	
	var _getTitle = function(url) {
		var title = null;
		var arrayUrl = this.pageUrl.split('/');
		var pageName = arrayUrl[0];
		var urlL = arrayUrl.length;
		
		if(urlL == 1) title = APP.Main.json.infosPages[this.pageUrl].title;
		else if(urlL > 1) {
			var urlDetails = arrayUrl[1]+'/'+arrayUrl[2];
			
			for(var i=0; i<APP.Main.json.projects.length; i++) {
				var project = APP.Main.json.projects[i];
				
				title = project.name;
			}
		}
		
		return title;
	};
	
	
	var _getUrl = function() {
		var state = History.getState();
		url = state.url;
		
		return url;
	};
	
	
	return new RoutesManager();
	
	
})(window);

