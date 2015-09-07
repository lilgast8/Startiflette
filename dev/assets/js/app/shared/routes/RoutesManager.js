

APP.RoutesManager = ( function( window ) {
	
	
	function RoutesManager() {
		APP.EventDispatcher.call( this );
		
		// this.prevView				= null;
		// this.currentView			= null;
		// this.nextView				= null;
		
		// this.rootPageName			= null;
		// this.urlParts				= null;
		// this.pageUrl				= null;
		// this.pageName				= null;
		// this.viewName				= null;
		// this.altUrl					= null;
		
		// this.isPageChangedByClick	= false; // used to avoid to set page infos two times
		
		// this.activeUrl				= null;
		// this.isPageChange			= true;
		
		this.routes = {};
	}
	
	
	RoutesManager.prototype				= Object.create( APP.EventDispatcher.prototype );
	RoutesManager.prototype.constructor	= RoutesManager;
	
	
	RoutesManager.prototype.init = function() {
		_loadRoutesFile.call( this );
	};
	
	
	var _loadRoutesFile = function() {
		this.jsonLoader = new APP.Loader( false );
		
		this.jsonLoader.buildEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		var aJsonFiles = [];
		var fileName, filePath;
		
		for ( var key in APP.Config.ROUTES_FILES ) {
			fileName = APP.Config.ROUTES_FILES[ key ];
			filePath = APP.Path.URL.routes + fileName + '.json';
			
			console.log(fileName, filePath);
			
			aJsonFiles.push( {
				id:		fileName,
				src:	filePath
			} );
		}
		
		this.jsonLoader.startLoad( aJsonFiles );
	};
	
	
	var _onComplete = function( data ) {
		_killJsonLoader.call( this );
		_setRoutes.call( this, data );
	};
	
	
	var _killJsonLoader = function() {
		this.jsonLoader.destroyEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		this.jsonLoader.destroy();
		this.jsonLoader = null;
	};
	
	
	var _setRoutes = function( data ) {
		for ( var routesName in data )
			this.routes[ routesName ] = data[routesName];
	};
	
	
	
	
	
	
	
	
	
	/*
	RoutesManager.prototype.init = function() {
		History.options.disableSuid = true;
		
		_setRootPageName.call(this);
		
		if(APP.Config.MULTI_LANG)
			_manageAltUrl.call(this);
		
		_bindEvents.call(this);
		
		_initFirstView.call(this);
	};
	
	
	RoutesManager.prototype.goToPage = function(url) {
		this.isPageChangedByClick = true;
		
		_setPageInfos.call(this, url);
		
		var title = _getTitle.call(this);
		
		History.pushState(null, title, url);
	};
	
	
	RoutesManager.prototype.updateGA = function() {
		var pageUrl = this.pageId !== 0 ? '/'+this.pageUrl : '';
		var gaPageName = APP.Config.LANG == APP.Config.DEFAULT_LANG && this.pageId === 0 ? '' : APP.Config.LANG+pageUrl;
		
		if(!APP.Config.LOCALHOST && APP.Config.PROD)
			ga('send', 'pageview', '/'+gaPageName);
	};
	
	
	var _bindEvents = function() {
		History.Adapter.bind(window, 'statechange', _onStateChange.bind(this));
	};
	
	
	var _initFirstView = function() {
		_setPageInfos.call(this, null);
		
		this.currentView = _getView.call(this);
		
		_updateMenu.call(this);
		
		this.currentView.buildEvt(this.currentView.E.SHOWN, _enablePageChange.bind(this, true));
		APP.Views.Static.MainLoader.hidePreloader();
	};
	
	
	var _setRootPageName = function() {
		for(var url in APP.Models.Json.data.pages[APP.Config.LANG]) {
			this.rootPageName = url;
			
			break;
		}
	};
	
	
	var _manageAltUrl = function() {
		this.altUrl = {};
		
		_setAltUrl.call(this, APP.Models.Json.data.pages);
		
		for(var subPagesName in APP.Models.Json.data.subPages) // parse subpages
			_setAltUrl.call(this, APP.Models.Json.data.subPages[subPagesName]);
	};
	
	
	var _setAltUrl = function(infosToParse) {
		var activePage;
		var translatedPages = [];
		
		for(var lang in infosToParse) { // parse pages
			if(lang == APP.Config.LANG)
				activePage = infosToParse[lang];
			else
				translatedPages[lang] = infosToParse[lang];
		}
		
		for(var pageName in activePage) { // parse pages of the active language
			var viewName = activePage[pageName].name;
			
			this.altUrl[pageName] = this.altUrl[pageName] || {};
			
			for(lang in translatedPages) { // parse translations of the others languages
				
				for(var page in translatedPages[lang]) { // parse pages of the translated language
					
					// if the name of the translated language match with the viewName of the active language
					if(translatedPages[lang][page].name == viewName) {
						urlPageAlt = pageName == this.rootPageName ? '' : '/' + page;
						urlAlt = lang == 	APP.Config.DEFAULT_LANG && pageName == this.rootPageName ? 
											APP.Config.WEB_ROOT : APP.Config.WEB_ROOT + lang + urlPageAlt;
						
						this.altUrl[pageName][lang] = urlAlt;
					}
				}
			}
		}
	};
	
	
	var _onStateChange = function() {
		if(!this.isPageChange) {
			_disablePageChange.call(this);
			
			if(this.isPageChangedByClick) // if page is changed by a click
				this.isPageChangedByClick = false;
			else // if page is changed by a prev/next
				_setPageInfos.call(this, null);
			
			this.nextView = _getView.call(this);
			
			this.currentView.buildEvt(this.currentView.E.HIDDEN, _initNextView.bind(this));
			this.currentView.hide();
			
			this.nextView.load(this.pageUrl);
		}
	};
	
	
	var _initNextView = function() {
		this.currentView.destroyEvt(this.currentView.E.HIDDEN, _initNextView.bind(this));
		
		this.prevView		= this.currentView;
		this.currentView	= this.nextView;
		
		_updateMenu.call(this);
		if(APP.Config.MULTI_LANG)
			_updateLgLinks.call(this);
		
		this.currentView.buildEvt(this.currentView.E.SHOWN, _enablePageChange.bind(this, false));
		this.currentView.transitionEnded();
	};
	
	
	var _setPageInfos = function(currentUrl) {
		if(currentUrl === null)
			currentUrl = _getUrl();
		
		var urlBaseEnd, urlEnd, pageUrl, urlParts, pageName;
		
		// remove base & parameters if there is one
		urlBaseEnd	= currentUrl.indexOf(APP.Config.WEB_ROOT) + APP.Config.WEB_ROOT.length;
		urlEnd		= currentUrl.indexOf('?') < 0 ? currentUrl.length : currentUrl.indexOf('?');
		pageUrl		= currentUrl.substring(urlBaseEnd, urlEnd);
		
		// remove language if exist
		if(APP.Config.MULTI_LANG && pageUrl.substr(0, 2) == APP.Config.LANG)
			pageUrl = pageUrl.replace(APP.Config.LANG, '');
		
		// remove first slash if exist
		if(pageUrl.substr(0, 1) == '/')
			pageUrl = pageUrl.replace('/', '');
		
		// remove last slash if there is one
		if(pageUrl.substr(pageUrl.length-1, 1) == '/')
			pageUrl = pageUrl.substr(0, pageUrl.length-1);
		
		// get the url parts
		urlParts = pageUrl.split('/');
		
		// set page name
		if(urlParts[0] === '')
			pageName = this.rootPageName;
		else
			pageName = urlParts[0];
		
		// set page url
		if(pageUrl === '')
			pageUrl = this.rootPageName;
		
		
		this.urlParts	= urlParts;
		this.pageUrl	= pageUrl;
		this.pageName	= pageName;
		this.viewName	= APP.Models.Json.data.pages[ APP.Config.LANG ][this.pageName].name;
	};
	
	
	var _getView = function() {
		var currentView = null;
		
		for(var pageView in APP.Views.Page) {
			if(this.viewName == APP.Views.Page[pageView].name) {
				currentView = APP.Views.Page[pageView];
				
				break;
			}
		}
		
		return currentView;
	};
	
	
	var _getTitle = function() {
		var title = APP.Models.Json.data.pages[APP.Config.LANG][this.pageName].title;
		
		if(title === '') {
			
			for(var subPagesName in APP.Models.Json.data.subPages) { // parse subpages
				var subPagesInfos = APP.Models.Json.data.subPages[ subPagesName ][ APP.Config.LANG ];
				
				for(var pageUrl in subPagesInfos) { // parse subpages infos
					
					if(pageUrl == this.pageUrl) { // if page url match
						title = subPagesInfos[ pageUrl ].title;
						
						break;
					}
				}
			}
		}
		
		return title;
	};
	
	
	var _getUrl = function() {
		var state = History.getState();
		
		url = state.url;
		// url = state.hash;
		
		return url;
	};
	
	
	var _updateMenu = function() {
		var $menu	= APP.Views.Static.Header.$.menu;
		var $footer	= APP.Views.Static.Footer.$.footer;
		
		var $menuToDisable = $menu.find('.active');
		if(!$menuToDisable.length)
			$menuToDisable = $footer.find('.active');
		var $menuToEnable = $menu.find('[data-url*="'+this.pageUrl+'"]');
		if(!$menuToEnable.length)
			$menuToEnable = $footer.find('[data-url*="'+this.pageUrl+'"]');
		
		if($menuToDisable.length)
			removeClass($menuToDisable[0], 'active');
		if($menuToEnable.length)
			addClass($menuToEnable[0], 'active');
	};
	
	
	var _updateLgLinks = function() {
		var lang, $footerLgLink;
		
		for(var i=0; i<APP.Views.Static.Footer.$.footerLgLink.length; i++) {
			$footerLgLink = APP.Views.Static.Footer.$.footerLgLink[i];
			
			lang = $footerLgLink.getAttribute('data-lg');
			
			$footerLgLink.href = this.altUrl[this.pageUrl][lang];
		}
	};
	
	
	var _disablePageChange = function() {
		APP.Views.Static.MainLoader.show();
		
		this.isPageChange = true;
		this.activeUrl = _getUrl();
	};
	
	
	var _enablePageChange = function(init) {
		this.currentView.destroyEvt(this.currentView.E.SHOWN, _enablePageChange.bind(this));
		APP.Views.Static.MainLoader.hide();
		
		this.isPageChange = false;
		
		if(init)
			this.currentView.init();
		
		APP.Main.resize();
		
		if(!init)
			_checkUrl.call(this);
	};
	
	
	var _checkUrl = function() {
		if(this.activeUrl != _getUrl()) _onStateChange.call(this);
	};
	*/
	
	
	return new RoutesManager();
	
	
} ) ( window );

