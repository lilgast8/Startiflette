

APP.RoutesManager =(function(window) {
	
	
	function RoutesManager() {
		APP.EventDispatcher.call(this);
		
		this.firstTime = null;
		
		this.prevPage = null;
		this.currentPage = null;
		this.nextPage = null;
		
		this.activeUrl = null;
		this.isPageChange = false;
	}
	
	
	RoutesManager.prototype = Object.create(APP.EventDispatcher.prototype);
	RoutesManager.prototype.constructor = RoutesManager;
	
	
	RoutesManager.prototype.init = function() {
		_bindEvents.call(this);
		_initRoutes.call(this);
	};
	
	
	RoutesManager.prototype.goToPage = function(url) {
		var title = _getTitle(url);
		
		History.pushState(null, title, url);
	};
	
	
	var _bindEvents = function() {
		History.Adapter.bind(window, 'statechange', _onStateChange.bind(this));
	};
	
	
	var _initRoutes = function() {
		this.firstTime = true;
		
		_initPage.call(this);
	};
	
	
	var _onStateChange = function() {
		if(!this.isPageChange) {
			_disablePageChange.call(this);
			
			var pageUrlToLoad = _getPageUrl(null);
			
			this.nextPage = _setPage.call(this, pageUrlToLoad);
			
			this.currentPage.buildEvt(this.currentPage.EVENT.HIDDEN, _loadNext.bind(this, pageUrlToLoad));
			this.currentPage.hide();
		}
	};
	
	
	var _loadNext = function(pageUrl) {
		this.currentPage.destroyEvt(this.currentPage.EVENT.HIDDEN, _loadNext.bind(this));
		
		this.prevPage = this.currentPage;
		this.currentPage = this.nextPage;
		
		this.currentPage.buildEvt(this.currentPage.EVENT.LOADED, this.currentPage.updateMenu.bind(this.currentPage, pageUrl));
		this.currentPage.buildEvt(this.currentPage.EVENT.SHOWN, _initPage.bind(this));
		this.currentPage.load(pageUrl);
	};
	
	
	var _initPage = function() {
		if(this.firstTime) {
			this.firstTime = false;
			
			var pageUrl = _getPageUrl(null);
			this.currentPage = _setPage.call(this, pageUrl);
			this.currentPage.init();
			
			this.currentPage.hideLoader(true);
			this.currentPage.updateMenu(pageUrl);
		}
		else {
			this.currentPage.init();
			this.currentPage.destroyEvt(this.currentPage.EVENT.SHOWN, _initPage.bind(this));
			_enablePageChange.call(this);
		}
	};
	
	
	var _getPageUrl = function(url) {
		if(url === null) url = _getUrl();
		
		var endBaseUrl = url.indexOf(APP.Config.WEB_ROOT)+APP.Config.WEB_ROOT.length;
		var pageUrl = url.substring(endBaseUrl, url.length);
		if(pageUrl === '') pageUrl = 'accueil';
		
		return pageUrl;
	};
	
	
	var _setPage = function(pageUrl) {
		var pageSet = null;
		
		if(pageUrl == 'accueil') pageSet = APP.Views.Home;
		else if(pageUrl.indexOf('collection-complete') > -1) pageSet = APP.Views.CollectionComplete;
		else if(pageUrl.indexOf('collection') > -1) pageSet = APP.Views.Collection;
		else if(pageUrl.indexOf('produit') > -1) pageSet = APP.Views.Product;
		else if(pageUrl.indexOf('lookbook') > -1) pageSet = APP.Views.Lookbook;
		else if(pageUrl.indexOf('points-de-vente') > -1) pageSet = APP.Views.Stores;
		else if(pageUrl.indexOf('mentions-legales') > -1) pageSet = APP.Views.Legals;
		
		return pageSet;
	};
	
	
	var _getTitle = function(url) {
		var pageUrl = _getPageUrl(url);
		var title = null;
		var arrayUrl = pageUrl.split('/');
		var pageName = arrayUrl[0];
		var urlL = arrayUrl.length;
		
		if(urlL == 1) title = APP.Main.json.infosPages[pageUrl].title;
		else if(urlL > 1) {
			var urlDetails = arrayUrl[1]+'/'+arrayUrl[2];
			
			for(var i=0; i<APP.Main.json.collections.length; i++) {
				var collection = APP.Main.json.collections[i];
				var collectionNameTemp = collection.name;
				
				if(pageName == 'collection' && collection.url == urlDetails) title = collectionNameTemp+' - '+APP.Main.json.infosPages[pageName].title;
				else if(pageName == 'produit') {
					for(var j=0; j<collection.products.length; j++) {
						var product = collection.products[j];
						if(product.url == urlDetails) title = collectionNameTemp+' - '+product.color+' - '+APP.Main.json.infosPages[pageName].title;
					}
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
	
	
	var _disablePageChange = function() {
		this.isPageChange = true;
		this.activeUrl = _getUrl();
	};
	
	
	var _enablePageChange = function() {
		this.isPageChange = false;
		_checkUrl.call(this);
	};
	
	
	var _checkUrl = function() {
		if(this.activeUrl != _getUrl()) _onStateChange.call(this);
	};
	
	
	return new RoutesManager();
	
	
})(window);

