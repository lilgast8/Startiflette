

APP.RoutesManager = (function(window) {
	
	
	function RoutesManager() {
		APP.EventDispatcher.call(this);
		
		this.prevPage = null;
		this.currentPage = null;
		this.nextPage = null;
		
		this.viewName = null;
		this.pageName = null;
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
		_setInfosPage.call(this, url);
		
		var title = _getTitle.call(this);
		
		History.pushState(null, title, url);
	};
	
	
	var _bindEvents = function() {
		History.Adapter.bind(window, 'statechange', _onStateChange.bind(this));
	};
	
	
	var _onStateChange = function() {
		if(!this.isPageChange) {
			_disablePageChange.call(this);
			
			_setInfosPage.call(this, null);
			
			this.nextPage = _getPage.call(this);
			
			this.currentPage.buildEvt(this.currentPage.EVENT.HIDDEN, _loadNextPage.bind(this));
			this.currentPage.hide();
		}
	};
	
	
	var _initFirstPage = function() {
		_setInfosPage.call(this, null);
		
		this.currentPage = _getPage.call(this);
		this.currentPage.init();
		
		this.currentPage.hideLoader();
		_updateMenu.call(this);
	};
	
	
	var _loadNextPage = function() {
		this.currentPage.destroyEvt(this.currentPage.EVENT.HIDDEN, _loadNextPage.bind(this));
		
		this.prevPage = this.currentPage;
		this.currentPage = this.nextPage;
		
		this.currentPage.buildEvt(this.currentPage.EVENT.LOADED, _updateMenu.bind(this));
		this.currentPage.buildEvt(this.currentPage.EVENT.SHOWN, _enablePageChange.bind(this));
		
		this.currentPage.load(this.pageUrl, this.pageName, this.viewName);
	};
	
	
	var _updateMenu = function() {
		if(this.currentPage.events.loaded) this.currentPage.destroyEvt(this.currentPage.EVENT.LOADED, _updateMenu.bind(this));
		
		var $menu = APP.Views.Static.Header.$.menu;
		var $footer = APP.Views.Static.Footer.$.footer;
		
		var $menuToDisable = $menu.find('[data-active="true"]');
		if(!$menuToDisable.length) $menuToDisable = $footer.find('[data-active="true"]');
		var $menuToEnable = $menu.find('[href*="'+this.pageUrl+'"]');
		if(!$menuToEnable.length) $menuToEnable = $footer.find('[href*="'+this.pageUrl+'"]');
		
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
	
	
	var _setInfosPage = function(url) {
		if(url === null) url = _getUrl();
		
		var endBaseUrl = url.indexOf(APP.Config.WEB_ROOT)+APP.Config.WEB_ROOT.length;
		
		this.pageUrl = url.substring(endBaseUrl, url.length);
		var lastCharPos = this.pageUrl.length-1;
		if(this.pageUrl[lastCharPos] == '/') this.pageUrl = this.pageUrl.substring(0, lastCharPos);
		if(this.pageUrl === '') this.pageUrl = 'accueil';
		
		this.pageName = this.pageUrl.split('/')[0];
		
		this.viewName = APP.Model.Global.json.pages[this.pageName].file;
	};
	
	
	var _getPage = function() {
		var currentPage = null;
		
		if(this.viewName == 'home') currentPage = APP.Views.Page.Home;
		else if(this.viewName == 'about') currentPage = APP.Views.Page.About;
		else if(this.viewName == 'projects') currentPage = APP.Views.Page.Projects;
		else if(this.viewName == 'project') currentPage = APP.Views.Page.Project;
		else if(this.viewName == 'legals') currentPage = APP.Views.Page.Legals;
		
		return currentPage;
	};
	
	
	var _getTitle = function() {
		var title = APP.Model.Global.json.pages[this.pageName].title;
		
		if(this.viewName == 'project') {
			for(var i=0; i<APP.Model.Global.json.projects.length; i++) {
				var project = APP.Model.Global.json.projects[i];
				
				if(project.url == this.pageUrl) {
					title = project.name;
					
					break;
				}
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

