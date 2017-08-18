'use strict';


var CustomEvent	= require( 'shared/events/CustomEvent' );
var Path		= require( 'shared/configs/Path' );
var MainView	= require( 'desktop/views/MainView' );

var StringUtil	= require( 'shared/utils/String' );

var Config		= require( 'shared/configs/Config' );

// var PagesController	= require( 'desktop/controllers/PagesController' );

// var Lang		= require( 'shared/configs/Lang' );



function Router() {
	CustomEvent.call( this );
	
	this.URL					= {};
	this.ALT_LANG_URL			= {};
	
	this.isHomepage				= null;
	this.isPageChange			= null;
	this.isPageChangeByClick	= null;
	this.isSearchChange			= null;
	this.isHashChange			= null;
}


Router.prototype				= Object.create( CustomEvent.prototype );
Router.prototype.constructor	= Router;


// Router.prototype.setUrl = function( isInit, url ) {
Router.prototype.setUrl = function( url ) {
// Router.prototype.init = function() {
	this.URL.full			= _getFullUrl.call( this, url );
	// this.URL.full			= window.location.href;
	this.URL.path			= StringUtil.getPath( this.URL.full );
	this.URL.pathParams		= this.URL.path.split( '/' );
	this.URL.search			= StringUtil.getSearch( this.URL.full );
	this.URL.searchParams	= StringUtil.getParams( this.URL.full, 'search' );
	this.URL.hash			= StringUtil.getHash( this.URL.full );
	this.URL.hashParams		= StringUtil.getParams( this.URL.full, 'hash' );
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
	var fullGaUrl = this.URL.full.replace( Path.URL.base, '' );
	
	
	return fullGaUrl;
};


Router.prototype.init = function() {
	_bindEvents.call( this );
};


var _bindEvents = function() {
	MainView.$window.on( 'popstate', $.proxy( _onPopState, this ) );
	MainView.$window.on( 'hashchange', $.proxy( _onHashChange, this ) );
};


var _setIsHomepage = function( pageId ) {
	this.isHomepage = pageId == 'home' ? true : false;
};


Router.prototype.checkUrlCorrespondence = function() {
	if ( this.URL.full != _getFullUrl.call( this, null ) )
		_onPopState.call( this );
};


Router.prototype.updateUrl = function( url ) {
	var PagesController = require( 'desktop/controllers/PagesController' );
	
	if ( PagesController.isPageChange )
		return;
	
	this.isPageChangeByClick = true;
	
	_setUrlPartChange.call( this, url );
	// this.setUrl( false, url );
	this.setUrl( url );
	
	
	var data = {
		'isPageChange':		this.isPageChange,
		'isSearchChange':	this.isSearchChange,
		'isHashChange':		this.isHashChange
	};
	
	history.pushState( data, '', url );
	
	
	if ( this.isPageChange )
		PagesController.changePage( this.URL.full );
	else if ( this.isSearchChange )
		PagesController.changeSearch();
	else if ( this.isHashChange )
		PagesController.changeHash();
};


var _onPopState = function( e ) {
	var PagesController = require( 'desktop/controllers/PagesController' );
	
	if ( PagesController.isPageChange )
		return;
	
	this.isPageChangeByClick = false;
	
	_setUrlPartChange.call( this, window.location.href );
	
	
	if ( this.isPageChange || this.isSearchChange )
		// this.setUrl( false, null );
		this.setUrl( null );
	
	if ( this.isPageChange )
		PagesController.changePage( this.URL.full );
	else if ( this.isSearchChange )
		PagesController.changeSearch();
};


var _onHashChange = function( e ) {
	var PagesController = require( 'desktop/controllers/PagesController' );
	
	if ( PagesController.isPageChange )
		return;
	
	_setUrlPartChange.call( this, window.location.href );
	this.setUrl( null );
	
	
	if ( this.isHashChange && !this.isPageChange && !this.isSearchChange )
		PagesController.changeHash();
};


var _setUrlPartChange = function( url ) {
	_isPageChanged.call( this, url );
	_isSearchChanged.call( this, url );
	_isHashChanged.call( this, url );
};


var _isPageChanged = function( url ) {
	var nextPath		= StringUtil.getPath( url );
	this.isPageChange	= this.URL.path != nextPath;
};


var _isSearchChanged = function( url ) {
	var nextSearch		= StringUtil.getSearch( url );
	this.isSearchChange	= this.URL.search != nextSearch;
};


var _isHashChanged = function( url ) {
	var nextHash		= StringUtil.getHash( url );
	this.isHashChange	= this.URL.hash != nextHash;
};


Router.prototype.setAltLangUrl = function( $page ) {
	var lang;
	var Lang = require( 'shared/configs/Lang' );
	
	for ( var i = 0; i < Lang.ALL_LANG.length; i++ ) {
		lang = Lang.ALL_LANG[ i ];
		
		if ( lang != Lang.LANG )
			this.ALT_LANG_URL[ lang ] = $page[0].getAttribute( 'data-lang-' + lang );
	}
};


Router.prototype.updateGA = function() {
	if ( Config.IS_PROD && Object.keys( Config.GA_ID ).length > 0 ) {
		for ( var gaName in Config.GA_ID ) {
			if ( gaName == 'default' )
				ga( 'send', 'pageview', '/' + this.URL.fullGA );
			else
				ga( gaName + '.send', 'pageview', '/' + this.URL.fullGA );
		}
	}
};


module.exports = new Router();

