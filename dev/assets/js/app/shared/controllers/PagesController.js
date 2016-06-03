

STF.PagesController = ( function( window ) {
	'use strict';
	
	
	function PagesController() {
		STF.EventDispatcher.call( this );
		
		this.pages					= {};
		this.page					= null;
		this.prevPageInfos			= {};
		this.pageInfos				= {};
		
		this.LOADING_MODE			= 'allStatic'; // can be allStatic, byPageStatic, byPageDynamic
		this.DYNAMIC_IMG_TO_LOAD	= 'img'; // used when LOADING_MODE == 'byPageDynamic', can be img.class for selective preload
		this.IS_HIDE_INIT			= true; // set to true if need a different behavior when hide loader on init
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
	
	
	PagesController.prototype				= Object.create( STF.EventDispatcher.prototype );
	PagesController.prototype.constructor	= PagesController;
	
	
	PagesController.prototype.init = function() {
		_initPages.call( this );
		_initEl.call( this );
		_bindEvents.call( this );
	};
	
	
	var _initPages = function() {
		this.pages = {
			'error-404':		STF.Views.Pages.Error404,
			'legal-notices':	STF.Views.Pages.LegalNotices,
			'home':				STF.Views.Pages.Home,
			'about':			STF.Views.Pages.About,
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
	
	
	PagesController.prototype.initFirstPage = function() {
		_setPageInfos.call( this );
		_loadAssets.call( this );
	};
	
	
	var _setPageInfos = function()
	{
		var $page	= $( document.getElementById( 'page' ) )[0];
		var id		= $page.getAttribute( 'data-id' );
		var title	= $page.getAttribute( 'data-title' );
		
		
		this.prevPageInfos.id		= this.pageInfos.id;
		this.prevPageInfos.title	= this.pageInfos.title;
		
		this.pageInfos.id			= id;
		this.pageInfos.title		= title;
		
		_setPage.call( this );
	};
	
	
	var _setPage = function() {
		if ( this.pages[ this.pageInfos.id ] === undefined) {
			console.error( 'PagesController error: Need to create a view for the "' + this.pageInfos.id + '" ID, then set the view in the PagesController.pages object.' );
			
			return;
		}
		
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
	
	
	PagesController.prototype.changePage = function( url ) {
		_updateMenuLinks.call( this );
		STF.Router.updateGA();
		
		if ( STF.Lang.MULTI_LANG )
			_changeLgLink.call( this );
		
		_disablePageChange.call( this );
		_initPageChangeValues.call( this );
		
		if ( this.LOADING_MODE == 'allStatic' )
			this.isAssetsLoaded = true;
		
		_loadContent.call( this, url );
		
		this.page.buildEvt( this.page.E.HIDDEN, _onPageHidden.bind( this ) );
		this.page.hide();
		
		this.mainLoader.buildEvt( this.mainLoader.E.SHOWN, _onMainLoaderShown.bind( this ) );
		this.mainLoader.show();
	};
	
	
	PagesController.prototype.changeSearch = function() {
		this.page.updateSearch();
	};
	
	
	PagesController.prototype.changeHash = function() {
		this.page.updateHash();
	};
	
	
	var _onFileLoad = function( e ) {
		if ( e.item.type == 'json' )
			this.assetsModel.setJsonData( e.item.id, e.result );
	};
	
	
	var _onAssetsLoaded = function() {
		// first load
		if ( this.isFirstLoad ) {
			_updateMenuLinks.call( this );
			
			this.page.init();
			
			this.page.buildEvt( this.page.E.SHOWN, _onPageShown.bind( this ) );
			this.page.show();
			
			this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
			
			if ( this.IS_HIDE_INIT )
				this.mainLoader.hideInit();
			
			else
				this.mainLoader.hide();
		}
		
		
		// page change load
		else if ( !this.isFirstLoad && ( this.LOADING_MODE == 'byPageStatic' || this.LOADING_MODE == 'byPageDynamic' ) ) {
			this.isAssetsLoaded = true;
			
			_checkPageHiding.call( this );
		}
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
		_checkPageHiding.call( this );
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
	
	
	var _onPageHidden = function() {
		this.page.destroyEvt( this.page.E.HIDDEN, _onPageHidden.bind( this ) );
		
		_destroyPage.call( this );
		
		this.isPageHidden = true;
		_checkPageHiding.call( this );
	};
	
	
	var _destroyPage = function() {
		this.page.destroy();
		this.page = null;
	};
	
	
	var _onMainLoaderShown = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.SHOWN, _onMainLoaderShown.bind( this ) );
		
		this.isMainLoaderShown = true;
		_checkPageHiding.call( this );
	};
	
	
	var _checkPageHiding = function() {
		if ( this. LOADING_MODE == 'allStatic' &&
			 this.isContentLoaded && this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ) {
			
			_setContent.call( this );
			_showPage.call( this );
		}
		
		else if ( ( this. LOADING_MODE == 'byPageStatic' || this. LOADING_MODE == 'byPageDynamic' ) &&
				  this.isContentLoaded && !this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ) {
			
			_setContent.call( this );
		}
		
		else if ( ( this. LOADING_MODE == 'byPageStatic' || this. LOADING_MODE == 'byPageDynamic' ) &&
				  this.isContentLoaded && this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ) {
			
			_showPage.call( this );
		}
	};
	
	
	var _setContent = function() {
		STF.MainView.$pageCont[0].innerHTML = this.data;
		
		_setPageInfos.call( this );
		
		if ( this. LOADING_MODE != 'allStatic' )
			_loadAssets.call( this );
		
		this.data = null;
	};
	
	
	var _showPage = function() {
		this.page.init();
		
		this.page.buildEvt( this.page.E.SHOWN, _onPageShown.bind( this ) );
		this.page.show();
		
		this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
		this.mainLoader.hide();
	};
	
	
	var _onPageShown = function() {
		this.page.destroyEvt( this.page.E.SHOWN, _onPageShown.bind( this ) );
		
		this.isPageShown = true;
		_checkPageShowing.call( this );
	};
	
	
	var _onMainLoaderHidden = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
		
		this.isMainLoaderHidden = true;
		_checkPageShowing.call( this );
	};
	
	
	var _checkPageShowing = function() {
		if ( this.isPageShown && this.isMainLoaderHidden )
			_enablePageChange.call( this );
	};
	
	
	var _updateMenuLinks = function() {
		// STF.Views.Statics.Header.updateMenuLinks( STF.Router.PAGE_URL.full );
		// STF.Views.Statics.Footer.updateMenuLinks( STF.Router.PAGE_URL.full );
	};
	
	
	var _changeLgLink = function() {
		// STF.Views.Statics.Header.changeLgLink( STF.Router.ALT_LANG_URL );
	};
	
	
	var _enablePageChange = function() {
		this.isPageChange = false;
		
		if ( this.isFirstLoad )
			this.isFirstLoad = false;
		
		STF.Router.checkUrlCorrespondence();
	};
	
	
	var _disablePageChange = function() {
		this.isPageChange = true;
	};
	
	
	return new PagesController();
	
	
} ) ( window );

