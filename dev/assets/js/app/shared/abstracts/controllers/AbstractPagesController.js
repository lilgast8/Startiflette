

STF.AbstractPagesController = ( function( window ) {
	'use strict';
	
	
	function AbstractPagesController() {
		STF.EventDispatcher.call( this );
		
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
	
	
	AbstractPagesController.prototype				= Object.create( STF.EventDispatcher.prototype );
	AbstractPagesController.prototype.constructor	= AbstractPagesController;
	
	
	AbstractPagesController.prototype.init = function() {
		this.initPages();
		_initEl.call( this );
		_bindEvents.call( this );
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
	
	
	var _initEl = function() {
		this.assetsModel = STF.Models.Assets;
		this.assetsModel.init();
		
		this.mainLoader = STF.Views.Statics.MainLoader;
	};
	
	
	var _bindEvents = function() {
		this.mainLoader.buildEvt( this.mainLoader.E.FILE_LOAD, _onFileLoad.bind( this ) );
		this.mainLoader.buildEvt( this.mainLoader.E.COMPLETE, _onAssetsLoaded.bind( this ) );
	};
	
	
	AbstractPagesController.prototype.initFirstPage = function() {
		_setPageInfos.call( this );
		_manageMenuLinks.call( this );
		_loadAssets.call( this );
	};
	
	
	var _setPageInfos = function() {
		var $page	= $( document.getElementById( 'page' ) );
		var id		= $page[0].getAttribute( 'data-id' );
		var title	= $page[0].getAttribute( 'data-title' );
		
		this.prevPageInfos.id		= this.pageInfos.id;
		this.prevPageInfos.title	= this.pageInfos.title;
		
		this.pageInfos.id			= id;
		this.pageInfos.title		= title;
		
		_setPage.call( this );
		
		STF.Router.setAltLangUrl( $page );
	};
	
	
	var _setPage = function() {
		if ( this.pages[ this.pageInfos.id ] === undefined) {
			if ( STF.Config.ENV != 'prod' )
				console.log( 'PagesController: no specific page view for the "' + this.pageInfos.id + '" ID. If you need one, create it and then set the view in the PagesController.pages object.' );
			
			this.page = new STF.AbstractView();
		}
		else
			this.page = new this.pages[ this.pageInfos.id ]();
	};
	
	
	var _initPageChangeValues = function() {
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
		
		for ( var i = 0; i < $imgs.length; i++ ) {
			$imgs[ i ].src	= e.item.src;
			$imgs[ i ].offsetHeight; // jshint ignore:line
		}
	};
	
	
	var _onAssetsLoaded = function() {
		// first load
		if ( this.isFirstLoad ) {
			this.page.init();
			
			this.page.buildEvt( this.page.E.SHOWN, this.onPageShown.bind( this ) );
			this.page.show();
			
			this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden.bind( this ) );
			
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
	
	
	AbstractPagesController.prototype.changePage = function( url ) {
		STF.Router.updateGA();
		
		_disablePageChange.call( this );
		_initPageChangeValues.call( this );
		
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
		console.log( 'Ajax loading error', e );
		
		if ( e.status == 404 )
			_force404Load.call( this );
	};
	
	
	var _force404Load = function() {
		var lang	= STF.Lang.MULTI_LANG ? STF.Lang.LANG + '/'  : '';
		var url		= STF.Path.URL.base + lang + '404';
		
		_loadContent.call( this, url );
	};
	
	
	AbstractPagesController.prototype.managePageHidingTransitions = function() {
		this.page.buildEvt( this.page.E.HIDDEN, this.onPageHidden.bind( this ) );
		this.page.hide();
		
		this.mainLoader.buildEvt( this.mainLoader.E.SHOWN, this.onMainLoaderShown.bind( this ) );
		this.mainLoader.show();
	};
	
	
	AbstractPagesController.prototype.onPageHidden = function() {
		this.page.destroyEvt( this.page.E.HIDDEN, this.onPageHidden.bind( this ) );
		
		_destroyPage.call( this );
		
		this.isPageHidden = true;
		this.checkPageHiding();
	};
	
	
	var _destroyPage = function() {
		this.page.destroy();
		this.page = null;
	};
	
	
	AbstractPagesController.prototype.onMainLoaderShown = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.SHOWN, this.onMainLoaderShown.bind( this ) );
		
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
			_resetImgs.call( this );
			setTimeout( function() { _loadAssets.call( this ); }.bind( this ), 0 );
		}
		
		this.data = null;
	};
	
	
	var _resetImgs = function() {
		var $imgs = STF.MainView.$pageCont.find( 'img' );
		var $img, src;
		
		for ( var i = 0; i < $imgs.length; i++ ) {
			$img		= $imgs[i];
			src			= $img.src;
			
			$img.src	= STF.Path.URL.img + 'bgs/pattern-transparent.png';
			$img.setAttribute( 'data-src' , src );
		}
	};
	
	
	AbstractPagesController.prototype.showPage = function() {
		_manageMenuLinks.call( this );
		_manageLangLinks.call( this );
		
		this.page.init();
		
		this.managePageShowingTransitions();
	};
	
	
	AbstractPagesController.prototype.managePageShowingTransitions = function() {
		this.page.buildEvt( this.page.E.SHOWN, this.onPageShown.bind( this ) );
		this.page.show();
		
		this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden.bind( this ) );
		this.mainLoader.hide();
	};
	
	
	AbstractPagesController.prototype.onPageShown = function() {
		this.page.destroyEvt( this.page.E.SHOWN, this.onPageShown.bind( this ) );
		
		this.isPageShown = true;
		this.checkPageShowing();
	};
	
	
	AbstractPagesController.prototype.onMainLoaderHidden = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden.bind( this ) );
		
		this.isMainLoaderHidden = true;
		this.checkPageShowing();
	};
	
	
	AbstractPagesController.prototype.checkPageShowing = function() {
		if ( this.isPageShown && this.isMainLoaderHidden )
			this.enablePageChange();
	};
	
	
	var _manageMenuLinks = function() {
		_updateMenuLinks.call( this, STF.Views.Statics.Header.$menuLink );
		_updateMenuLinks.call( this, STF.Views.Statics.Footer.$footerLink );
	};
	
	
	var _updateMenuLinks = function( $link ) {
		var $linkToInactivate	= $link.filter( '.active' );
		var $linkToActivate		= $link.filter( '[ data-link-id="' + this.pageInfos.id + '" ]' );
		
		if ( $linkToInactivate.length > 0 )
			removeClass( $linkToInactivate[0], 'active' );
		if ( $linkToActivate.length )
			addClass( $linkToActivate[0], 'active' );
	};
	
	
	var _manageLangLinks = function() {
		_changeLangLinks.call( this, STF.Views.Statics.Header.$headerLgLink );
		_changeLangLinks.call( this, STF.Views.Statics.Footer.$footerLgLink );
	};
	
	
	var _changeLangLinks = function( $links ) {
		var $link;
		
		for ( var i = 0; i < $links.length; i++ ) {
			$link		= $links[ i ];
			$link.href	= STF.Router.ALT_LANG_URL[ $link.getAttribute( 'data-lang' ) ];
		}
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
