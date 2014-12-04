

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
	
	
	RoutesManager.prototype.updateGA = function() {
		var pageUrl = this.pageId != 0 ? '/'+this.pageUrl : '';
		var gaPageName = APP.Config.LG == APP.Config.ALL_LG[0] && this.pageId === 0 ? '' : APP.Config.LG+pageUrl;
		
		if(!APP.Config.LOCALHOST && APP.Config.PROD)
			ga('send', 'pageview', '/'+gaPageName);
	};
	
	
	var _bindEvents = function() {
		History.Adapter.bind(window, 'statechange', _onStateChange.bind(this));
	};
	
	
	var _initFirstPage = function() {
		_setInfosPage.call(this, null);
		
		this.currentPage = _getPage.call(this);
		
		_updateMenu.call(this);
		
		this.currentPage.buildEvt(this.currentPage.EVENT.SHOWN, _enablePageChange.bind(this, true));
		
		this.currentPage.hidePreloader();
	};
	
	
	var _onStateChange = function() {
		if(!this.isPageChange) {
			_disablePageChange.call(this);
			
			_setInfosPage.call(this, null);
			
			this.nextPage = _getPage.call(this);
			
			this.currentPage.buildEvt(this.currentPage.EVENT.HIDDEN, _initNextPage.bind(this));
			this.currentPage.hideContent();
			
			this.nextPage.load(this.pageUrl, this.pageName, this.viewName);
		}
	};
	
	
	var _initNextPage = function() {
		this.currentPage.destroyEvt(this.currentPage.EVENT.HIDDEN, _initNextPage.bind(this));
		
		this.prevPage = this.currentPage;
		this.currentPage = this.nextPage;
		
		_updateMenu.call(this);
		_updateLgLinks.call(this);
		
		this.currentPage.buildEvt(this.currentPage.EVENT.SHOWN, _enablePageChange.bind(this, false));
		
		this.currentPage.transitionEnded();
	};
	
	
	var _updateMenu = function() {
		var $menu = APP.Views.Static.Header.$.menu;
		var $footer = APP.Views.Static.Footer.$.footer;
		
		var $menuToDisable = $menu.find('[data-active="true"]');
		if(!$menuToDisable.length) $menuToDisable = $footer.find('[data-active="true"]');
		var $menuToEnable = $menu.find('[data-url*="'+this.pageUrl+'"]');
		if(!$menuToEnable.length) $menuToEnable = $footer.find('[data-url*="'+this.pageUrl+'"]');
		
		if($menuToDisable.length) $menuToDisable[0].setAttribute('data-active', 'false');
		if($menuToEnable.length) $menuToEnable[0].setAttribute('data-active', 'true');
	};
	
	
	var _updateLgLinks = function() {
		var aAltLink = _getAltLinks.call(this);
		
		var lgTemp, $footerLgLink;
		
		for(var i=0; i<APP.Views.Static.Footer.$.footerLgLink.length; i++) {
			$footerLgLink = APP.Views.Static.Footer.$.footerLgLink[i];
			
			lgTemp = $footerLgLink.getAttribute('data-lg');
			
			$footerLgLink.href = aAltLink[lgTemp];
		}
	};
	
	
	var _getAltLinks = function() {
		this.pageId = _getPageId.call(this);
		
		var aAltLink = [];
		var lgTemp, urlPageAlt, urlAlt;
		
		for(var i=0; i<APP.Config.ALL_LG.length; i++) {
			lgTemp = APP.Config.ALL_LG[i];
			
			if(lgTemp != APP.Config.LG) {
				urlPageAlt = this.pageId != 0 ? '/'+APP.Model.Global.json['page-'+lgTemp][this.pageId]['url'] : '';
				urlAlt = lgTemp == APP.Config.ALL_LG[0] && this.pageId == 0 ? APP.Config.WEB_ROOT : APP.Config.WEB_ROOT+lgTemp+urlPageAlt;
				
				aAltLink[lgTemp] = urlAlt;
			}
		}
		
		return aAltLink;
	};
	
	
	var _getPageId = function() {
		var pageId = null;
		
		for(var i=0; i<APP.Model.Global.json.pages.length; i++)
			if(this.viewName == APP.Model.Global.json.pages[i].file)
				pageId = i;
		
		return pageId;
	};
	
	
	var _disablePageChange = function() {
		this.currentPage.showLoader();
		
		this.isPageChange = true;
		this.activeUrl = _getUrl();
	};
	
	
	var _enablePageChange = function(init) {
		this.currentPage.destroyEvt(this.currentPage.EVENT.SHOWN, _enablePageChange.bind(this));
		
		this.currentPage.hideLoader();
		
		this.isPageChange = false;
		
		if(init)
			this.currentPage.init();
		
		APP.Main.resize();
		
		if(!init)
			_checkUrl.call(this);
	};
	
	
	var _checkUrl = function() {
		if(this.activeUrl != _getUrl()) _onStateChange.call(this);
	};
	
	
	var _setInfosPage = function(url) {
		if(url === null) url = _getUrl();
		
		var endBaseUrl = url.indexOf(APP.Config.WEB_ROOT)+APP.Config.WEB_ROOT.length;
		
		
		/* set page url */
		this.pageUrl = url.substring(endBaseUrl, url.length);
		var lastCharPos = this.pageUrl.length-1;
		if(this.pageUrl[lastCharPos] == '/')
			this.pageUrl = this.pageUrl.substring(0, lastCharPos);
		
		if(this.pageUrl.split('/')[0] == LG) { // remove language if it's in the url
			if(this.pageUrl.split('/')[1] === undefined) // if we are at the root
				this.pageUrl = '';
			else
				this.pageUrl = this.pageUrl.substring(3, this.pageUrl.length);
		}
		
		if(this.pageUrl === '')
			this.pageUrl = APP.Model.Global.json.pages[0].url;
		
		
		/* set view name */
		this.pageName = this.pageUrl.split('/')[0];
		
		
		/* set view name */
		for(key in APP.Model.Global.json.pages)
			if(this.pageName == APP.Model.Global.json.pages[key].url)
				this.viewName = APP.Model.Global.json.pages[key].file;
	};
	
	
	var _getPage = function() {
		var currentPage = null;
		var key = null;
		
		for(key in APP.Views.Page)
			if(this.viewName == APP.Views.Page[key].name)
				currentPage = APP.Views.Page[key];
		
		return currentPage;
	};
	
	
	var _getTitle = function() {
		for(key in APP.Model.Global.json.pages)
			if(this.pageName == APP.Model.Global.json.pages[key].url)
				title = APP.Model.Global.json.pages[key].title;
		
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

