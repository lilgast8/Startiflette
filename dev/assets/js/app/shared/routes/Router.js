

STF.Router = ( function( window ) {
	'use strict';
	
	
	function Router() {
		STF.EventDispatcher.call( this );
		
		this.ROUTES			= {};
		this.PAGE_URL		= {};
		this.ALT_LANG_URL	= {};
		this.LINK			= {};
		
		this.isHomepage		= null;
		this.isPageChange	= null;
		this.isSearchChange	= null;
		this.isHashChange	= null;
	}
	
	
	Router.prototype				= Object.create( STF.EventDispatcher.prototype );
	Router.prototype.constructor	= Router;
	
	
	Router.prototype.setPageUrl = function( isInit, url )
	{
		this.PAGE_URL.full			= _getFullPageUrl.call( this, url );
		this.PAGE_URL.path			= this.PAGE_URL.full.STF_getPath();
		this.PAGE_URL.aPath			= this.PAGE_URL.path.split( '/' );
		this.PAGE_URL.search		= this.PAGE_URL.full.STF_getSearch();
		this.PAGE_URL.searchParams	= this.PAGE_URL.full.STF_getParams( 'search' );
		this.PAGE_URL.hash			= this.PAGE_URL.full.STF_getHash();
		this.PAGE_URL.hashParams	= this.PAGE_URL.full.STF_getParams( 'hash' );
		this.PAGE_URL.fullGA		= _getFullPageUrlGA.call( this );
	};
	
	
	var _getFullPageUrl = function( url ) {
		var fullPageUrl;
		
		if ( url === null )
			fullPageUrl = window.location.href;
		else
			fullPageUrl = url;
		
		
		return fullPageUrl;
	};
	
	
	var _getFullPageUrlGA = function () {
		var fullGA = this.PAGE_URL.full.replace( STF.Path.URL.base, '' );
		
		
		return fullGA;
	};
	
	
	var _getCurrentPageUrl = function()
	{
		var currentPageUrl = this.PAGE_URL.path.replace( STF.Lang.LANG, '' );
		
		currentPageUrl = currentPageUrl.removeFirstSpecificChar( '/' );
		currentPageUrl = currentPageUrl.removeLastSpecificChar( '/' );
		
		
		return currentPageUrl;
	};
	
	
	Router.prototype.init = function() {
		_bindEvents.call( this );
		
		STF.PagesController.initFirstPage();
	};
	
	
	var _bindEvents = function() {
		STF.MainView.$window.on( 'popstate', $.proxy( _onPopState, this ) );
		STF.MainView.$window.on( 'hashchange', $.proxy( _onHashChange, this ) );
	};
	
	
	var _getLangExistence = function() {
		var langExist = true;
		
		if ( STF.Lang.ALL_LANG.indexOf( STF.Lang.LANG ) == -1 ) {
			STF.Lang.LANG = STF.Lang.DEFAULT_LANG;
			
			langExist = false;
		}
		
		
		return langExist;
	};
	
	
	var _setIsHomepage = function( pageId )
	{
		this.isHomepage = pageId == 'home' ? true : false;
	};
	
	
	var _setAltLangUrl = function( pageParams )
	{
		var currentUrl, urlPart, altLangUrl;
		
		for ( var i in STF.Lang.ALL_LANG ) {
			var lang = STF.Lang.ALL_LANG[ i ];
			
			if ( lang !== STF.Lang.LANG ) {
				currentUrl = pageParams[ lang ].url;
				
				if ( this.isHomepage && lang == STF.Lang.DEFAULT_LANG )
					urlPart = '';
				
				else if ( this.isHomepage )
					urlPart = lang;
				
				else
					urlPart = lang + '/' + pageParams[ lang ].url;
				
				
				altLangUrl = STF.Path.URL.base + urlPart;
				
				this.ALT_LANG_URL[ lang ] = altLangUrl;
			}
			
		}
	};
	
	
	Router.prototype.checkUrlCorrespondence = function() {
		if ( this.PAGE_URL.full != _getFullPageUrl.call( this, null ) )
			_onPopState.call( this );
	};
	
	
	Router.prototype.updateUrl = function( url ) {
		if ( STF.PagesController.isPageChange )
			return;
		
		_setUrlPartChange.call( this, url );
		this.setPageUrl( false, url );
		
		
		var data = {
			'isPageChange':		this.isPageChange,
			'isSearchChange':	this.isSearchChange,
			'isHashChange':		this.isHashChange
		};
		
		history.pushState( data, '', url );
		
		
		if ( this.isPageChange )
			STF.PagesController.changePage( this.PAGE_URL.full );
		else if ( this.isSearchChange )
			STF.PagesController.changeSearch();
		else if ( this.isHashChange )
			STF.PagesController.changeHash();
	};
	
	
	var _onPopState = function( e ) {
		if ( STF.PagesController.isPageChange )
			return;
		
		_setUrlPartChange.call( this, window.location.href );
		
		
		if ( this.isPageChange || this.isSearchChange )
			this.setPageUrl( false, null );
		
		if ( this.isPageChange )
			STF.PagesController.changePage( this.PAGE_URL.full );
		else if ( this.isSearchChange )
			STF.PagesController.changeSearch();
	};
	
	
	var _onHashChange = function( e ) {
		if ( STF.PagesController.isPageChange )
			return;
		
		_setUrlPartChange.call( this, window.location.href );
		this.setPageUrl( false, null );
		
		
		if ( this.isHashChange && !this.isPageChange && !this.isSearchChange )
			STF.PagesController.changeHash();
	};
	
	
	var _setUrlPartChange = function( url ) {
		_isPageChanged.call( this, url );
		_isSearchChanged.call( this, url );
		_isHashChanged.call( this, url );
	};
	
	
	var _isPageChanged = function( url ) {
		var nextPath		= url.STF_getPath();
		this.isPageChange	= this.PAGE_URL.path != nextPath;
	};
	
	
	var _isSearchChanged = function( url ) {
		var nextSearch		= url.STF_getSearch();
		this.isSearchChange	= this.PAGE_URL.search != nextSearch;
	};
	
	
	var _isHashChanged = function( url ) {
		var nextHash		= url.STF_getHash();
		this.isHashChange	= this.PAGE_URL.hash != nextHash;
	};
	
	
	Router.prototype.updateGA = function() {
		if ( STF.Config.ENV == 'prod' && Object.keys( STF.Config.GA_ID ).length > 0 ) {
			for ( var gaName in STF.Config.GA_ID ) {
				if ( gaName == 'null' )
					ga( 'send', 'pageview', '/' + this.PAGE_URL.fullGA );
				else
					ga( gaName + '.send', 'pageview', '/' + this.PAGE_URL.fullGA );
			}
		}
	};
	
	
	return new Router();
	
	
} ) ( window );

