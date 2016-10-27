

STF.Router = ( function( window ) {
	'use strict';
	
	
	function Router() {
		STF.CustomEvent.call( this );
		
		this.URL					= {};
		this.ALT_LANG_URL			= {};
		
		this.isHomepage				= null;
		this.isPageChange			= null;
		this.isPageChangeByClick	= null;
		this.isSearchChange			= null;
		this.isHashChange			= null;
	}
	
	
	Router.prototype				= Object.create( STF.CustomEvent.prototype );
	Router.prototype.constructor	= Router;
	
	
	Router.prototype.setUrl = function( isInit, url )
	{
		this.URL.full			= _getFullUrl.call( this, url );
		this.URL.path			= STF_str_getPath( this.URL.full );
		this.URL.pathParams		= this.URL.path.split( '/' );
		this.URL.search			= STF_str_getSearch( this.URL.full );
		this.URL.searchParams	= STF_str_getParams( this.URL.full, 'search' );
		this.URL.hash			= STF_str_getHash( this.URL.full );
		this.URL.hashParams		= STF_str_getParams( this.URL.full, 'hash' );
		this.URL.fullGA			= _getFullGaUrl.call( this );
	};
	
	
	var _getFullUrl = function( url ) {
		var fullUrl;
		
		if ( url === null )
			fullUrl = window.location.href;
		else
			fullUrl = url;
		
		
		return fullUrl;
	};
	
	
	var _getFullGaUrl = function () {
		var fullGaUrl = this.URL.full.replace( STF.Path.URL.base, '' );
		
		
		return fullGaUrl;
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
	
	
	Router.prototype.checkUrlCorrespondence = function() {
		if ( this.URL.full != _getFullUrl.call( this, null ) )
			_onPopState.call( this );
	};
	
	
	Router.prototype.updateUrl = function( url ) {
		if ( STF.PagesController.isPageChange )
			return;
		
		this.isPageChangeByClick = true;
		
		_setUrlPartChange.call( this, url );
		this.setUrl( false, url );
		
		
		var data = {
			'isPageChange':		this.isPageChange,
			'isSearchChange':	this.isSearchChange,
			'isHashChange':		this.isHashChange
		};
		
		history.pushState( data, '', url );
		
		
		if ( this.isPageChange )
			STF.PagesController.changePage( this.URL.full );
		else if ( this.isSearchChange )
			STF.PagesController.changeSearch();
		else if ( this.isHashChange )
			STF.PagesController.changeHash();
	};
	
	
	var _onPopState = function( e ) {
		if ( STF.PagesController.isPageChange )
			return;
		
		this.isPageChangeByClick = false;
		
		_setUrlPartChange.call( this, window.location.href );
		
		
		if ( this.isPageChange || this.isSearchChange )
			this.setUrl( false, null );
		
		if ( this.isPageChange )
			STF.PagesController.changePage( this.URL.full );
		else if ( this.isSearchChange )
			STF.PagesController.changeSearch();
	};
	
	
	var _onHashChange = function( e ) {
		if ( STF.PagesController.isPageChange )
			return;
		
		_setUrlPartChange.call( this, window.location.href );
		this.setUrl( false, null );
		
		
		if ( this.isHashChange && !this.isPageChange && !this.isSearchChange )
			STF.PagesController.changeHash();
	};
	
	
	var _setUrlPartChange = function( url ) {
		_isPageChanged.call( this, url );
		_isSearchChanged.call( this, url );
		_isHashChanged.call( this, url );
	};
	
	
	var _isPageChanged = function( url ) {
		var nextPath		= STF_str_getPath( url );
		this.isPageChange	= this.URL.path != nextPath;
	};
	
	
	var _isSearchChanged = function( url ) {
		var nextSearch		= STF_str_getSearch( url );
		this.isSearchChange	= this.URL.search != nextSearch;
	};
	
	
	var _isHashChanged = function( url ) {
		var nextHash		= STF_str_getHash( url );
		this.isHashChange	= this.URL.hash != nextHash;
	};
	
	
	Router.prototype.setAltLangUrl = function( $page ) {
		var lang;
		
		for ( var i = 0; i < STF.Lang.ALL_LANG.length; i++ ) {
			lang = STF.Lang.ALL_LANG[ i ];
			
			if ( lang != STF.Lang.LANG )
				this.ALT_LANG_URL[ lang ] = $page[0].getAttribute( 'data-lang-' + lang );
		}
	};
	
	
	Router.prototype.updateGA = function() {
		if ( STF.Config.IS_PROD && Object.keys( STF.Config.GA_ID ).length > 0 ) {
			for ( var gaName in STF.Config.GA_ID ) {
				if ( gaName == 'default' )
					ga( 'send', 'pageview', '/' + this.URL.fullGA );
				else
					ga( gaName + '.send', 'pageview', '/' + this.URL.fullGA );
			}
		}
	};
	
	
	return new Router();
	
	
} ) ( window );

