

STF.AbstractPagesController = ( function( window ) {
	'use strict';
	
	
	function AbstractPagesController() {
		STF.CustomEvent.call( this );
		
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
	
	
	AbstractPagesController.prototype				= Object.create( STF.CustomEvent.prototype );
	AbstractPagesController.prototype.constructor	= AbstractPagesController;
	
	
	AbstractPagesController.prototype.init = function() {
		this.initPages();
		this.initEl();
	};
	
	
	AbstractPagesController.prototype.initPages = function() {
		this.pages = {
			'error-404':		STF.Views.Pages.Error404,
			'legal-notices':	STF.Views.Pages.LegalNotices,
			'home':				STF.Views.Pages.Home,
			// 'about':			STF.Views.Pages.About,
			'projects':			STF.Views.Pages.Projects,
			'project':			STF.Views.Pages.Project,
		};
	};
	
	
	AbstractPagesController.prototype.initEl = function() {
		this.assetsModel = STF.Models.Assets;
		this.assetsModel.init();
		
		this.mainLoader = STF.Views.Statics.MainLoader;
	};
	
	
	AbstractPagesController.prototype.initFirstPage = function() {
		this.bindEvents();
		_setPageInfos.call( this );
		this.manageMenuLinks();
		_loadAssets.call( this );
	};
	
	
	AbstractPagesController.prototype.bindEvents = function() {
		this.mainLoader.bind( this.mainLoader.E.FILE_LOAD, _onFileLoad, this );
		this.mainLoader.bind( this.mainLoader.E.COMPLETE, _onAssetsLoaded, this );
	};
	
	
	var _setPageId = function( url ) {
		var path	= STF.Router.URL.path === '' ? 'index' : STF.Router.URL.path;
		var id		= STF.Config.JS_VIEWS_ID[ path ];
		
		if ( id === undefined )
			id = 'error-404';
		
		this.prevPageInfos.id	= this.pageInfos.id;
		this.pageInfos.id		= id;
	};
	
	
	var _setPageInfos = function() {
		var $page	= $( document.getElementById( 'page' ) );
		var id		= $page[0].getAttribute( 'data-js-id' );
		var title	= $page[0].getAttribute( 'data-title' );
		
		if ( !STF.Config.NEED_PAGE_ID )
			this.prevPageInfos.id	= this.pageInfos.id;
		this.prevPageInfos.title	= this.pageInfos.title;
		
		this.pageInfos.id			= id;
		this.pageInfos.title		= title;
		
		_setPage.call( this );
		
		STF.Router.setAltLangUrl( $page );
	};
	
	
	var _setPage = function() {
		if ( this.pages[ this.pageInfos.id ] === undefined) {
			if ( !STF.Config.IS_PROD )
				console.warn( 'PagesController: no specific page view for the "' + this.pageInfos.id + '" ID. If you need one, create it and then set the view in the PagesController.pages object.' );
			
			this.page = new STF.AbstractPageView();
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
		var aAssetsToLoad = this.assetsModel.getAssetsToLoad( this.pageInfos.id, this.isFirstLoad, this.LOADING_MODE );
		
		this.mainLoader.loadAssets( aAssetsToLoad );
	};
	
	
	var _onFileLoad = function( e ) {
		if ( e.item.type == 'image' )
			_onImgLoaded.call( this, e );
		else if ( e.item.type == 'json' )
			this.assetsModel.setJsonData( e.item.id, e.result );
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
			STF.MainView.initAfterAssetsLoaded();
			
			this.page.init();
			
			this.page.bind( this.page.E.SHOWN, this.onPageShown, this );
			this.page.show();
			
			this.mainLoader.bind( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
			
			if ( this.IS_HIDE_INIT )
				this.mainLoader.hideInit();
			
			else
				this.mainLoader.hide();
		}
		
		
		// page change load
		else if ( !this.isFirstLoad && ( this.LOADING_MODE == 'byPageStatic' || this.LOADING_MODE == 'byPageDynamic' ) ) {
			this.isAssetsLoaded = true;
			
			this.checkPageHiding();
		}
	};
	
	
	var _showNonLoadedImages = function() {
		var $imgsCont = this.isFirstLoad ? STF.MainView.$body : STF.MainView.$pageCont;
		
		var $imgs = $imgsCont.find( 'img' ).filter( function() {
			return this.getAttribute( 'data-lazyload' ) != 'true' && this.getAttribute( 'data-src' ) != 'preloaded';
		} );
		
		_setImages.call( this, $imgs, null, 'non-preloaded' );
	};
	
	
	AbstractPagesController.prototype.changePage = function( url ) {
		STF.Router.updateGA();
		
		if ( STF.Config.NEED_PAGE_ID )
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
		var lang	= STF.Lang.MULTI_LANG ? STF.Lang.LANG + '/' : '';
		var url		= STF.Path.URL.base + lang + '404';
		
		_loadContent.call( this, url );
	};
	
	
	AbstractPagesController.prototype.managePageHidingTransitions = function() {
		this.page.bind( this.page.E.HIDDEN, this.onPageHidden, this );
		this.page.hide();
		
		this.mainLoader.bind( this.mainLoader.E.SHOWN, this.onMainLoaderShown, this );
		this.mainLoader.show();
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
		this.mainLoader.unbind( this.mainLoader.E.SHOWN, this.onMainLoaderShown, this );
		
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
		STF.MainView.$pageCont[0].innerHTML = this.data;
		
		_setPageInfos.call( this );
		
		if ( this. LOADING_MODE != 'allStatic' ) {
			STF_resetImgs( STF.MainView.$pageCont.find( 'img' ) );
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
		
		this.mainLoader.bind( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
		this.mainLoader.hide();
	};
	
	
	AbstractPagesController.prototype.onPageShown = function() {
		this.page.unbind( this.page.E.SHOWN, this.onPageShown, this );
		
		this.isPageShown = true;
		this.checkPageShowing();
	};
	
	
	AbstractPagesController.prototype.onMainLoaderHidden = function() {
		this.mainLoader.unbind( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
		
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
			STF_dom_removeClass( $linkToInactivate[0], 'active' );
		if ( $linkToActivate.length )
			STF_dom_addClass( $linkToActivate[0], 'active' );
	};
	
	
	AbstractPagesController.prototype.manageLangLinks = function() {
		
	};
	
	
	AbstractPagesController.prototype.changeLangLinks = function( $links ) {
		var $link;
		
		for ( var i = 0; i < $links.length; i++ ) {
			$link		= $links[ i ];
			$link.href	= STF.Router.ALT_LANG_URL[ $link.getAttribute( 'data-lang' ) ];
		}
	};
	
	
	var _updateTitle = function() {
		document.title = this.pageInfos.title;
	};
	
	
	AbstractPagesController.prototype.enablePageChange = function() {
		this.isPageChange = false;
		
		if ( this.isFirstLoad )
			this.isFirstLoad = false;
		
		STF.Router.checkUrlCorrespondence();
	};
	
	
	var _disablePageChange = function() {
		this.isPageChange = true;
	};
	
	
	return AbstractPagesController;
	
	
} ) ( window );

