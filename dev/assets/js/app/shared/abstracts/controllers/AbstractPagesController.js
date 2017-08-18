'use strict';


var CustomEvent		= require( 'shared/events/CustomEvent' );

var Error404		= require( 'desktop/views/pages/Error404' );
var LegalNotices	= require( 'desktop/views/pages/LegalNotices' );
var Home			= require( 'desktop/views/pages/Home' );
// var About			= require( 'desktop/views/pages/About' );
var Projects		= require( 'desktop/views/pages/Projects' );
var Project			= require( 'desktop/views/pages/Project' );

var AssetsModel		= require( 'desktop/models/Assets' );
var MainLoader		= require( 'desktop/views/statics/MainLoader' );
var Header			= require( 'desktop/views/statics/Header' );
var Footer			= require( 'desktop/views/statics/Footer' );

var Config			= require( 'shared/configs/Config' );
var AbstractPageView = require( 'desktop/abstracts/views/AbstractPageView' );
var Router			= require( 'shared/routes/Router' );

var STF_DOM	= require( 'shared/utils/DOM' );

var MainView		= require( 'desktop/views/MainView' );

var Lang			= require( 'shared/configs/Lang' );
var Path			= require( 'shared/configs/Path' );



function AbstractPagesController() {
	CustomEvent.call( this );
	
	this.LOADING_MODE			= 'byPageStatic'; // can be allStatic, byPageStatic, byPageDynamic
	this.DYNAMIC_IMG_TO_LOAD	= 'img'; // used when LOADING_MODE == 'byPageDynamic', can be img.class for selective preload
	this.IS_HIDE_INIT			= true; // set to true if need a different behavior when hide loader on init
	
	this.pages					= {};
	this.page					= null;
	this.prevPageInfos			= {};
	this.pageInfos				= {};
	
	this.isFirstLoad			= true;
	this.isPageChange			= true;
	this.isContentLoaded		= false;
	this.isAssetsLoaded			= false;
	this.isPageHidden			= false;
	this.isPageShown			= false;
	this.isMainLoaderShown		= false;
	this.isMainLoaderHidden		= false;
	
	this.data					= null;
}


AbstractPagesController.prototype				= Object.create( CustomEvent.prototype );
AbstractPagesController.prototype.constructor	= AbstractPagesController;


AbstractPagesController.prototype.init = function() {
	this.initPages();
	this.initEl();
};


AbstractPagesController.prototype.initPages = function() {
	this.pages = {
		'error-404':		Error404,
		'legal-notices':	LegalNotices,
		'home':				Home,
		// 'about':			About,
		'projects':			Projects,
		'project':			Project,
	};
};


AbstractPagesController.prototype.initEl = function() {
	// this.assetsModel = AssetsModel;
	// this.assetsModel.init();
	
	AssetsModel.init();
	
	// var AssetsModel		= require( 'desktop/models/Assets' );
	// this.assetsModel = new AssetsModel();
	// this.assetsModel.init();
	
	// this.mainLoader = STF.Views.Statics.MainLoader;
	
	MainLoader.init();
	Header.init();
	Footer.init();
};


AbstractPagesController.prototype.initFirstPage = function() {
	this.bindEvents();
	_setPageInfos.call( this );
	this.manageMenuLinks();
	_loadAssets.call( this );
};


AbstractPagesController.prototype.bindEvents = function() {
	// this.mainLoader.bind( this.mainLoader.E.FILE_LOAD, _onFileLoad, this );
	// this.mainLoader.bind( this.mainLoader.E.COMPLETE, _onAssetsLoaded, this );
	MainLoader.bind( MainLoader.E.FILE_LOAD, _onFileLoad, this );
	MainLoader.bind( MainLoader.E.COMPLETE, _onAssetsLoaded, this );
};


var _setPageId = function( url ) {
	var path	= Router.URL.path === '' ? 'index' : Router.URL.path;
	var id		= Config.JS_VIEWS_ID[ path ];
	
	if ( id === undefined )
		id = 'error-404';
	
	this.prevPageInfos.id	= this.pageInfos.id;
	this.pageInfos.id		= id;
};


var _setPageInfos = function() {
	var $page	= $( document.getElementById( 'page' ) );
	var id		= $page[0].getAttribute( 'data-js-id' );
	var title	= $page[0].getAttribute( 'data-title' );
	
	if ( !Config.NEED_PAGE_ID )
		this.prevPageInfos.id	= this.pageInfos.id;
	this.prevPageInfos.title	= this.pageInfos.title;
	
	this.pageInfos.id			= id;
	this.pageInfos.title		= title;
	
	_setPage.call( this );
	
	Router.setAltLangUrl( $page );
};


var _setPage = function() {
	if ( this.pages[ this.pageInfos.id ] === undefined) {
		if ( !Config.IS_PROD )
			console.warn( 'PagesController: no specific page view for the "' + this.pageInfos.id + '" ID. If you need one, create it and then set the view in the PagesController.pages object.' );
		
		this.page = new AbstractPageView();
	}
	else
		this.page = new this.pages[ this.pageInfos.id ]();
};


AbstractPagesController.prototype.initPageChangeValues = function() {
	this.isContentLoaded	= false;
	this.isAssetsLoaded		= false;
	this.isPageHidden		= false;
	this.isPageShown		= false;
	this.isMainLoaderShown	= false;
	this.isMainLoaderHidden	= false;
};


var _loadAssets = function() {
	// var aAssetsToLoad = this.assetsModel.getAssetsToLoad( this.pageInfos.id, this.isFirstLoad, this.LOADING_MODE );
	var aAssetsToLoad = AssetsModel.getAssetsToLoad( this.pageInfos.id, this.isFirstLoad, this.LOADING_MODE );
	
	// this.mainLoader.loadAssets( aAssetsToLoad );
	MainLoader.loadAssets( aAssetsToLoad );
};


var _onFileLoad = function( e ) {
	if ( e.item.type == 'image' )
		_onImgLoaded.call( this, e );
	else if ( e.item.type == 'json' )
		// this.assetsModel.setJsonData( e.item.id, e.result );
		AssetsModel.setJsonData( e.item.id, e.result );
};


var _onImgLoaded = function( e ) {
	var $imgs = $( 'img' ).filter( '[ data-src="' + e.item.src + '" ]' );
	_setImages.call( this, $imgs, e.item.src, 'preloaded' );
};


var _setImages = function( $imgs, src, dataSrc ) {
	var $img;
	
	for ( var i = 0; i < $imgs.length; i++ ) {
		$img		= $imgs[ i ];
		$img.src	= src !== null ? src : $img.getAttribute( 'data-src' );
		
		$img.offsetHeight; // jshint ignore:line
		$img.setAttribute( 'data-src', dataSrc );
	}
};


var _onAssetsLoaded = function() {
	_showNonLoadedImages.call( this );
	
	
	// first load
	if ( this.isFirstLoad ) {
		MainView.initAfterAssetsLoaded();
		
		this.page.init();
		
		this.page.bind( this.page.E.SHOWN, this.onPageShown, this );
		this.page.show();
		
		// this.mainLoader.bind( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
		MainLoader.bind( MainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
		
		if ( this.IS_HIDE_INIT )
			// this.mainLoader.hideInit();
			MainLoader.hideInit();
		
		else
			// this.mainLoader.hide();
			MainLoader.hide();
	}
	
	
	// page change load
	else if ( !this.isFirstLoad && ( this.LOADING_MODE == 'byPageStatic' || this.LOADING_MODE == 'byPageDynamic' ) ) {
		this.isAssetsLoaded = true;
		
		this.checkPageHiding();
	}
};


var _showNonLoadedImages = function() {
	var $imgsCont = this.isFirstLoad ? MainView.$body : MainView.$pageCont;
	
	var $imgs = $imgsCont.find( 'img' ).filter( function() {
		return this.getAttribute( 'data-lazyload' ) != 'true' && this.getAttribute( 'data-src' ) != 'preloaded';
	} );
	
	_setImages.call( this, $imgs, null, 'non-preloaded' );
};


AbstractPagesController.prototype.changePage = function( url ) {
	Router.updateGA();
	
	if ( Config.NEED_PAGE_ID )
		_setPageId.call( this, url );
	
	_disablePageChange.call( this );
	this.initPageChangeValues();
	
	if ( this.LOADING_MODE == 'allStatic' )
		this.isAssetsLoaded = true;
	
	_loadContent.call( this, url );
	
	this.managePageHidingTransitions();
};


AbstractPagesController.prototype.changeSearch = function() {
	this.page.updateSearch();
};


AbstractPagesController.prototype.changeHash = function() {
	this.page.updateHash();
};


var _loadContent = function( url ) {
	// setTimeout( function() { // simulate a very slow connection = very long load
	
	$.ajax({
		context:	this,
		url:		url,
		type:		'POST',
		data:		{
						// useful if need differents behavior on PHP file when AJAX load
						// can be got with $_POST['ajax'] & $_POST['type']
						ajax: 'true',
						type: 'pageChange'
					},
		dataType:	'html',
		success:	_onContentLoaded.bind( this ),
		error:		_onContentError.bind( this )
	});
	
	// }.bind( this ), 3000 ); // simulate a very slow connection = very long load
};


var _onContentLoaded = function( data ) {
	this.data = data;
	
	this.isContentLoaded = true;
	this.checkPageHiding();
};


var _onContentError = function( e ) {
	console.warn( 'Ajax loading error', e );
	
	if ( e.status == 404 )
		_force404Load.call( this );
};


var _force404Load = function() {
	var lang	= Lang.MULTI_LANG ? Lang.LANG + '/' : '';
	var url		= Path.URL.base + lang + '404';
	
	_loadContent.call( this, url );
};


AbstractPagesController.prototype.managePageHidingTransitions = function() {
	this.page.bind( this.page.E.HIDDEN, this.onPageHidden, this );
	this.page.hide();
	
	// this.mainLoader.bind( this.mainLoader.E.SHOWN, this.onMainLoaderShown, this );
	// this.mainLoader.show();
	MainLoader.bind( MainLoader.E.SHOWN, this.onMainLoaderShown, this );
	MainLoader.show();
};


AbstractPagesController.prototype.onPageHidden = function() {
	this.page.unbind( this.page.E.HIDDEN, this.onPageHidden, this );
	
	_destroyPage.call( this );
	
	this.isPageHidden = true;
	this.checkPageHiding();
};


var _destroyPage = function() {
	this.page.destroy();
	this.page = null;
};


AbstractPagesController.prototype.onMainLoaderShown = function() {
	// this.mainLoader.unbind( this.mainLoader.E.SHOWN, this.onMainLoaderShown, this );
	MainLoader.unbind( MainLoader.E.SHOWN, this.onMainLoaderShown, this );
	
	this.isMainLoaderShown = true;
	this.checkPageHiding();
};


AbstractPagesController.prototype.checkPageHiding = function() {
	if ( this. LOADING_MODE == 'allStatic' &&
		 this.isContentLoaded && this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ) {
		
		this.setContent();
		this.showPage();
	}
	
	else if ( ( this. LOADING_MODE == 'byPageStatic' || this. LOADING_MODE == 'byPageDynamic' ) &&
			  this.isContentLoaded && !this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ) {
		
		this.setContent();
	}
	
	else if ( ( this. LOADING_MODE == 'byPageStatic' || this. LOADING_MODE == 'byPageDynamic' ) &&
			  this.isContentLoaded && this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ) {
		
		this.showPage();
	}
};


AbstractPagesController.prototype.setContent = function() {
	MainView.$pageCont[0].innerHTML = this.data;
	
	_setPageInfos.call( this );
	
	if ( this. LOADING_MODE != 'allStatic' ) {
		STF_resetImgs( MainView.$pageCont.find( 'img' ) );
		setTimeout( function() { _loadAssets.call( this ); }.bind( this ), 0 );
	}
	
	this.data = null;
};


AbstractPagesController.prototype.showPage = function() {
	this.manageMenuLinks();
	_updateTitle.call( this );
	
	this.page.init();
	
	this.managePageShowingTransitions();
};


AbstractPagesController.prototype.managePageShowingTransitions = function() {
	this.page.bind( this.page.E.SHOWN, this.onPageShown, this );
	this.page.show();
	
	// this.mainLoader.bind( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
	// this.mainLoader.hide();
	MainLoader.bind( MainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
	MainLoader.hide();
};


AbstractPagesController.prototype.onPageShown = function() {
	this.page.unbind( this.page.E.SHOWN, this.onPageShown, this );
	
	this.isPageShown = true;
	this.checkPageShowing();
};


AbstractPagesController.prototype.onMainLoaderHidden = function() {
	// this.mainLoader.unbind( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
	MainLoader.unbind( MainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
	
	this.isMainLoaderHidden = true;
	this.checkPageShowing();
};


AbstractPagesController.prototype.checkPageShowing = function() {
	if ( this.isPageShown && this.isMainLoaderHidden )
		this.enablePageChange();
};


AbstractPagesController.prototype.manageMenuLinks = function() {
	
};


AbstractPagesController.prototype.updateMenuLinks = function( $link ) {
	var $linkToInactivate	= $link.filter( '.active' );
	var $linkToActivate		= $link.filter( '[ data-link-id="' + this.pageInfos.id + '" ]' );
	
	if ( $linkToInactivate.length > 0 )
		STF_DOM.removeClass( $linkToInactivate[0], 'active' );
	if ( $linkToActivate.length )
		STF_DOM.addClass( $linkToActivate[0], 'active' );
};


AbstractPagesController.prototype.manageLangLinks = function() {
	
};


AbstractPagesController.prototype.changeLangLinks = function( $links ) {
	var $link;
	
	for ( var i = 0; i < $links.length; i++ ) {
		$link		= $links[ i ];
		$link.href	= Router.ALT_LANG_URL[ $link.getAttribute( 'data-lang' ) ];
	}
};


var _updateTitle = function() {
	document.title = this.pageInfos.title;
};


AbstractPagesController.prototype.enablePageChange = function() {
	this.isPageChange = false;
	
	if ( this.isFirstLoad )
		this.isFirstLoad = false;
	
	Router.checkUrlCorrespondence();
};


var _disablePageChange = function() {
	this.isPageChange = true;
};


module.exports = AbstractPagesController;

