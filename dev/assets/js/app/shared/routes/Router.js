

STF.Router = ( function( window ) {
	'use strict';
	
	
	function Router() {
		STF.EventDispatcher.call( this );
		
		this.E = {
			INIT: 'init'
		};
		
		this.ROUTES			= {};
		this.PAGE_URL		= {};
		this.PREV_PAGE_URL	= {};
		this.ALT_LANG_URL	= {};
		this.LINK			= {};
		
		this.isHomepage		= null;
	}
	
	
	Router.prototype				= Object.create( STF.EventDispatcher.prototype );
	Router.prototype.constructor	= Router;
	
	
	Router.prototype.init = function() {
		_loadRoutesFile.call( this );
	};
	
	
	var _loadRoutesFile = function() {
		this.jsonLoader	= new STF.Loader( false, false );
		
		this.jsonLoader.buildEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		var aJsonFiles	= [];
		var fileName, filePath;
		
		for ( var key in STF.Config.ROUTES_FILES ) {
			fileName = STF.Config.ROUTES_FILES[ key ];
			filePath = STF.Path.URL.routes + fileName + '.json';
			
			aJsonFiles.push( {
				id:		fileName,
				src:	filePath
			} );
		}
		
		this.jsonLoader.startLoad( aJsonFiles );
	};
	
	
	var _onComplete = function( data ) {
		_destroyJsonLoader.call( this );
		_setRoutes.call( this, data );
		
		this.dispatch( this.E.INIT );
	};
	
	
	var _destroyJsonLoader = function() {
		this.jsonLoader.destroyEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		this.jsonLoader.destroy();
		this.jsonLoader = null;
	};
	
	
	var _setRoutes = function( data ) {
		for ( var routesName in data )
			this.ROUTES[ routesName ] = data[ routesName ];
	};
	
	
	Router.prototype.setPageUrl = function( isInit, url )
	{
		// base.com/path?params=param#hash=tag
		// base.com/params?search=test#hash=tag
		
		
		this.PREV_PAGE_URL.full		= this.PAGE_URL.full;
		// this.PREV_PAGE_URL.params	= this.PAGE_URL.params;
		// this.PREV_PAGE_URL.aParams	= this.PAGE_URL.aParams;
		this.PREV_PAGE_URL.path		= this.PAGE_URL.path;
		this.PREV_PAGE_URL.aPath	= this.PAGE_URL.aPath;
		this.PREV_PAGE_URL.search	= this.PAGE_URL.search;
		this.PREV_PAGE_URL.hash		= this.PAGE_URL.hash;
		this.PREV_PAGE_URL.fullGA	= this.PAGE_URL.fullGA;
		this.PREV_PAGE_URL.current	= this.PAGE_URL.current;
		this.PREV_PAGE_URL.aCurrent	= this.PAGE_URL.aCurrent;
		
		this.PAGE_URL.full			= _getFullPageUrl.call( this, url );
		// this.PAGE_URL.params		= _getParamsPageUrl.call( this );
		// this.PAGE_URL.aParams		= this.PAGE_URL.params.split( '/' );
		this.PAGE_URL.path			= _getPathPageUrl.call( this );
		this.PAGE_URL.aPath			= this.PAGE_URL.path.split( '/' );
		this.PAGE_URL.search		= _getSearchPageUrl.call( this );
		this.PAGE_URL.hash			= _getHashPageUrl.call( this );
		this.PAGE_URL.fullGA		= _getFullPageUrlGA.call( this );
		
		console.log( 'PAGE_URL:', STF.Router.PAGE_URL );
		
		if ( isInit ) { // init
			this.PAGE_URL.current	= null;
			this.PAGE_URL.aCurrent	= null;
		}
		else // page change
			this.setCurrentPageUrl();
	};
	
	
	var _getFullPageUrl = function( url ) {
		var fullPageUrl;
		
		if ( url === null ) // init
			fullPageUrl = window.location.href;
		else // page change
			fullPageUrl = url;
		
		
		return fullPageUrl;
	};
	
	
	var _getPathPageUrl = function() {
		var pathPageUrl = this.PAGE_URL.full.replace( STF.Path.URL.base, '' );
		
		pathPageUrl = pathPageUrl.split( '#' )[0]; // remove #hash
		pathPageUrl = pathPageUrl.split( '?' )[0]; // remove ?search
		
		pathPageUrl = pathPageUrl.removeFirstSpecificChar( '/' );
		pathPageUrl = pathPageUrl.removeLastSpecificChar( '/' );
		
		
		return pathPageUrl;
	};
	
	
	var _getSearchPageUrl = function() {
		// var searchPageUrl	= this.PAGE_URL.full.replace( STF.Path.URL.base, '' );
		
		// searchPageUrl		= searchPageUrl.split( '#' )[1] || '';
		var searchPageUrl	= window.location.search.split( '?' )[1] || '';
		
		searchPageUrl		= searchPageUrl.removeFirstSpecificChar( '/' );
		searchPageUrl		= searchPageUrl.removeLastSpecificChar( '/' );
		
		
		/*var oParametre = {};
		
		if (window.location.search.length > 1) {
			for (var aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
				aItKey = aCouples[nKeyId].split("=");
				oParametre[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
			}
		}
		console.log( oParametre );*/
		
		/*var sRecherche = window.location.search;
		console.log( sRecherche );
		sRecherche = sRecherche.removeLastSpecificChar( '/' );
		console.log( sRecherche );
		
		var oParametre = new (function (sRecherche) {
		if (sRecherche.length > 1) {
			for (var aItKey, nKeyId = 0, aCouples = sRecherche.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
				aItKey = aCouples[nKeyId].split("=");
				this[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
			}
		}
		})(sRecherche);
		console.log( oParametre );*/
		
		
		return searchPageUrl;
	};
	
	
	var _getHashPageUrl = function() {
		/*var hashPageUrl	= this.PAGE_URL.full.replace( STF.Path.URL.base, '' );
		
		hashPageUrl		= hashPageUrl.split( '#' )[1] || '';*/
		
		var hashPageUrl	= window.location.hash.split( '#' )[1] || '';
		
		hashPageUrl		= hashPageUrl.removeFirstSpecificChar( '/' );
		hashPageUrl		= hashPageUrl.removeLastSpecificChar( '/' );
		
		
		return hashPageUrl;
	};
	
	
	var _getFullPageUrlGA = function () {
		var fullGA = this.PAGE_URL.full.replace( STF.Path.URL.base, '' );
		
		
		return fullGA;
	};
	
	
	Router.prototype.setCurrentPageUrl = function() {
		this.PAGE_URL.current	= _getCurrentPageUrl.call( this );
		this.PAGE_URL.aCurrent	= this.PAGE_URL.current.split( '/' );
	};
	
	
	var _getCurrentPageUrl = function()
	{
		var currentPageUrl = this.PAGE_URL.path.replace( STF.Lang.LANG, '' );
		
		currentPageUrl = currentPageUrl.removeFirstSpecificChar( '/' );
		currentPageUrl = currentPageUrl.removeLastSpecificChar( '/' );
		
		
		return currentPageUrl;
	};
	
	
	Router.prototype.initRouting = function() {
		_bindEvents.call( this );
		
		_setPageInfos.call( this );
		
		STF.PagesController.initFirstPage();
	};
	
	
	var _bindEvents = function() {
		STF.MainView.$window.on( 'popstate', $.proxy( _onPopState, this ) );
		STF.MainView.$window.on( 'hashchange', $.proxy( _onHashChange, this ) );
	};
	
	
	var _setPageInfos = function() {
		var langExist	= _getLangExistence.call( this );
		var page		= _getPageInfos.call( this );
		
		if ( langExist && page.exist ) { // page exist
			_setIsHomepage.call( this, page.id );
			_setAltLangUrl.call( this, page.params );
		}
		else { // 404
			page.id		= 'error-404';
			page.params	= this.ROUTES.statics[ page.id ];
		}
		
		STF.PagesController.setPageInfos( page.id, page.params.jsView, page.params[ STF.Lang.LANG ].title, page.params[ STF.Lang.LANG ].desc );
	};
	
	
	var _getLangExistence = function() {
		var langExist = true;
		
		if ( STF.Lang.ALL_LANG.indexOf( STF.Lang.LANG ) == -1 ) {
			STF.Lang.LANG = STF.Lang.DEFAULT_LANG;
			
			langExist = false;
		}
		
		
		return langExist;
	};
	
	
	var _getPageInfos = function() {
		var routesGroupName, routesGroup, pageId, pageParams;
		var page = {
			exist:	false,
			id:		null,
			params:	null
		};
		
		for ( routesGroupName in this.ROUTES ) { // parse all routes group
			routesGroup = this.ROUTES[ routesGroupName ];
			
			for ( pageId in routesGroup ) { // parse all pages
				pageParams = routesGroup[ pageId ];
				
				if ( pageParams[ STF.Lang.LANG ].url == this.PAGE_URL.current ) { // if url exist
					page.exist	= true;
					page.id		= pageId;
					page.params	= pageParams;
					
					break; // break second for
				}
			}
			
			if ( page.exist )
				break; // break first for
			
		}
		
		
		return page;
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
	
	
	Router.prototype.navigateTo = function( url ) {
		// console.log( 'navigateTo:', url );
		
		if ( STF.PagesController.isPageChange )
			return;
		
		// if ( _isSameUrl.call( this, url ) )
		// 	return;
		// if ( _isPageChanged.call ( this, url ) ) {
		
		_setInfos.call( this, url );
		
		
		if ( !_isPageChanged.call ( this ) ) {
			console.log( 'SAME PAGE' );
			// return;
		}
		
		else if ( !_isSearchChanged.call ( this ) ) {
			console.log( 'SAME SEARCH' );
			// return;
		}
		
		else if ( !_isHashChanged.call ( this ) ) {
			console.log( 'SAME HASH' );
			// return;
		}
		
		
		
		var data = {
			'page': STF.PagesController.pageInfos.id
		};
		
		history.pushState( data, '', url );
		
		STF.PagesController.changePage( this.PAGE_URL.full );
	};
	
	
	var _onPopState = function( e ) {
		console.log( e );
		// console.log( '_onPopState:', e.state );
		
		
		// if ( e !== undefined )
		// 	if ( e.state === null ) // prevent hash change
		// 		return false;
		
		console.log( 'SLP:', this.PAGE_URL.full, window.location.href );
		console.log( '_isPageChanged:', _isPageChanged.call( this ) );
		if ( e !== undefined )
			if ( e.state === null && !_isPageChanged.call( this ) ) { // prevent hash change
				console.log( 'ramon' );
				return false;
			}
		
		
		if ( STF.PagesController.isPageChange )
			return;
		
		// if ( _isPageChanged.call ( this, url ) ) {
		// 	console.log( 'SAME URL' );
		// 	return;
		// }
		
		_setInfos.call( this, null );
		
		// if ( STF.PagesController.prevPageInfos.id == STF.PagesController.pageInfos.id ) {}
		// console.log( '--->', STF.PagesController.prevPageInfos.id, '/', STF.PagesController.pageInfos.id );
		
		STF.PagesController.changePage( this.PAGE_URL.full );
	};
	
	
	var _onHashChange = function( e ) {
		console.log( e );
		// console.log( e.oldURL, e.newURL );
		
		STF.PagesController.currentPage.onHashChange();
	};
	
	
	// var _isPageChanged = function( url ) {
	var _isPageChanged = function() {
		return this.PREV_PAGE_URL.path != this.PAGE_URL.path;
		
		/*var oldlink		= document.createElement( 'a' );
		oldlink.href	= this.PAGE_URL.full;
		
		console.log( oldlink );
		console.log( oldlink.pathname );
		
		var url = this.PREV_PAGE_URL.full;
		var link		= document.createElement( 'a' );
		link.href		= url;
		
		var oldPagePath	= oldlink.pathname;
		var pagePath	= link.pathname;
		
		oldPagePath		= oldPagePath.removeFirstSpecificChar( '/' );
		oldPagePath		= oldPagePath.removeLastSpecificChar( '/' );
		pagePath		= pagePath.removeFirstSpecificChar( '/' );
		pagePath		= pagePath.removeLastSpecificChar( '/' );
		
		console.log( oldPagePath, '-', pagePath );
		console.log( 'CABRON:', oldPagePath == pagePath );
		return oldPagePath == pagePath;*/
	};
	
	
	var _isSearchChanged = function() {
		return this.PREV_PAGE_URL.search != this.PAGE_URL.search;
	};
	
	
	var _isHashChanged = function() {
		return this.PREV_PAGE_URL.hash != this.PAGE_URL.hash;
	};
	
	
	var _isSameUrl = function( url ) {
		var fullPageUrl = this.PAGE_URL.full;
		
		fullPageUrl	= fullPageUrl.removeLastSpecificChar( '/' );
		url			= url.removeLastSpecificChar( '/' );
		
		// console.log( '_isSameUrl:', url, fullPageUrl );
		return url == fullPageUrl;
	};
	
	
	var _setInfos = function( url ) {
		console.log( '_setInfos' );
		this.setPageUrl( false, url );
		
		_setPageInfos.call( this );
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

