

STF.PagesController = ( function( window ) {
	'use strict';
	
	
	function PagesController() {
		STF.EventDispatcher.call( this );
		
		this.pages					= {};
		this.prevPageInfos			= {};
		this.pageInfos				= {};
		
		this.LOADING_MODE			= 'allStatic'; // can be allStatic, byPageStatic, byPageDynamic
		this.DYNAMIC_IMG_TO_LOAD	= 'img'; // used when LOADING_MODE == 'byPageDynamic', can be img.class for selective preload
		this.IS_HIDE_INIT			= true; // set to true if need a different behavior when hide loader on init
		this.isFirstLoad			= true;
		this.isPageChange			= true;
		
		this.isContentLoaded		= false;
		this.isAssetsLoaded			= false;
		this.isPrevPageHidden		= false;
		this.isCurrentPageShown		= false;
		this.isMainLoaderShown		= false;
		this.isMainLoaderHidden		= false;
		
		this.prevPage				= null;
		this.currentPage			= null;
		this.nextPage				= null;
		
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
		this.setPageInfos();
		
		_loadAssets.call( this );
	};
	
	
	// PagesController.prototype.setPageInfos = function( pageId, jsView, title, desc )
	PagesController.prototype.setPageInfos = function()
	{
		var $page	= $( document.getElementById( 'page' ) )[0];
		var id		= $page.getAttribute( 'data-id' );
		var title	= $page.getAttribute( 'data-title' );
		
		
		this.prevPageInfos.id		= this.pageInfos.id;
		this.prevPageInfos.title	= this.pageInfos.title;
		
		this.pageInfos.id			= id;
		this.pageInfos.title		= title;
		
		_setCurrentPage.call( this );
	};
	
	
	var _setCurrentPage = function() {
		if ( this.pages[ this.pageInfos.id ] === undefined) {
			console.error( 'PagesController error: Need to create a view for the "' + this.pageInfos.id + '" ID, then set the view in the PagesController.pages object.' );
			
			return;
		}
		
		this.prevPage		= this.currentPage;
		this.currentPage	= new this.pages[ this.pageInfos.id ]();
		
		console.log( '_setCurrentPage():', this.currentPage );
	};
	
	
	var _initPageChangeValues = function() {
		this.isContentLoaded	= false;
		this.isAssetsLoaded		= false;
		this.isPrevPageHidden	= false;
		this.isCurrentPageShown	= false;
		this.isMainLoaderShown	= false;
		this.isMainLoaderHidden	= false;
	};
	
	
	var _loadAssets = function() {
		var aImgListIds		= _getAssetsListIds.call( this, 'img' );
		var aJsonListIds	= _getAssetsListIds.call( this, 'json' );
		var dynamicImgList	= _getDynamicImgListToLoad.call( this );
		var aAssetsToLoad	= this.assetsModel.getAssetsToLoad( aImgListIds, aJsonListIds, dynamicImgList );
		
		this.mainLoader.loadAssets( aAssetsToLoad );
	};
	
	
	var _getAssetsListIds = function( type ) {
		var aIds = [];
		
		
		// first load
		if ( this.isFirstLoad && this.LOADING_MODE == 'allStatic')
			aIds = this.assetsModel.getAllStaticAssetsListIds();
		
		else if ( this.isFirstLoad && this.LOADING_MODE == 'byPageStatic' ||
				  this.isFirstLoad && this.LOADING_MODE == 'byPageDynamic' )
			aIds = [ 'global', this.pageInfos.id ];
		
		
		// page change load
		else if ( !this.isFirstLoad && this.LOADING_MODE == 'byPageStatic' ||
				  !this.isFirstLoad && this.LOADING_MODE == 'byPageDynamic' )
			aIds = [ this.pageInfos.id ];
		
		
		return aIds;
	};
	
	
	var _getDynamicImgListToLoad = function() {
		var dynamicImgList;
		
		if ( this.LOADING_MODE !== 'byPageDynamic' )
			dynamicImgList = null;
		
		else if ( this.isFirstLoad )
			dynamicImgList = STF.MainView.$pageCont.find( this.DYNAMIC_IMG_TO_LOAD );
		
		else if ( !this.isFirstLoad )
			dynamicImgList = $( this.data ).find( this.DYNAMIC_IMG_TO_LOAD );
		
		
		return dynamicImgList;
	};
	
	
	PagesController.prototype.changePage = function( url ) {
		_updateMenuLinks.call( this );
		STF.Router.updateGA();
		
		if ( STF.Lang.MULTI_LANG )
			_changeLgLink.call( this );
		
		_disablePageChange.call( this );
		_initPageChangeValues.call( this );
		
		_loadContent.call( this, url );
		
		// this.prevPage.buildEvt( this.prevPage.E.HIDDEN, _onPrevPageHidden.bind( this ) );
		// this.prevPage.hide();
		console.log( 'changePage:', this.prevPage, this.currentPage );
		this.currentPage.buildEvt( this.currentPage.E.HIDDEN, _onPrevPageHidden.bind( this ) );
		this.currentPage.hide();
		
		this.mainLoader.buildEvt( this.mainLoader.E.SHOWN, _onMainLoaderShown.bind( this ) );
		this.mainLoader.show();
		
		if ( this.LOADING_MODE == 'allStatic' )
			this.isAssetsLoaded = true;
	};
	
	
	PagesController.prototype.changeSearch = function() {
		this.currentPage.updateSearch();
	};
	
	
	PagesController.prototype.changeHash = function() {
		this.currentPage.updateHash();
	};
	
	
	var _onFileLoad = function( e ) {
		if ( e.item.type == 'json' )
			this.assetsModel.setJsonData( e.item.id, e.result );
	};
	
	
	var _onAssetsLoaded = function() {
		// first load
		if ( this.isFirstLoad ) {
			_updateMenuLinks.call( this );
			
			this.currentPage.init();
			
			this.currentPage.buildEvt( this.currentPage.E.SHOWN, _onCurrentPageShown.bind( this ) );
			this.currentPage.show();
			
			this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
			
			if ( this.IS_HIDE_INIT )
				this.mainLoader.hideInit();
			
			else
				this.mainLoader.hide();
		}
		
		
		// page change load
		else if ( !this.isFirstLoad && ( this.LOADING_MODE == 'byPageStatic' || this.LOADING_MODE == 'byPageDynamic' ) ) {
			this.isAssetsLoaded = true;
			
			_checkFirstStepPageChange.call( this );
		}
	};
	
	
	var _loadContent = function( url ) {
		// console.log( '_loadContent():', this.pageInfos.id, this.prevPageInfos.id );
		// if ( this.pageInfos.id == 'error-404' ) { // used to avoid that the request return a error on callback if it's a 404 page 
		/*if ( this.prevPageInfos.id == 'error-404' ) { // used to avoid that the request return a error on callback if it's a 404 page 
			var lang	= STF.Lang.MULTI_LANG ? STF.Lang.LANG + '/'  : '';
			// pageUrl		= STF.Path.URL.base + lang + STF.Router.ROUTES.statics[ this.pageInfos.id ][ STF.Lang.LANG ].url;
			pageUrl		= STF.Path.URL.base + lang + '404';
			console.log( pageUrl );
		}*/
		
		
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
		_checkFirstStepPageChange.call( this );
	};
	
	
	var _onContentError = function( e ) {
		console.log( 'ajax load error', e );
		
		if ( e.status == 404 )
			_force404Load.call( this );
	};
	
	
	var _force404Load = function() {
		console.log( 'FORCE 404 LOAD !' );
		
		var lang	= STF.Lang.MULTI_LANG ? STF.Lang.LANG + '/'  : '';
		// pageUrl		= STF.Path.URL.base + lang + STF.Router.ROUTES.statics[ this.pageInfos.id ][ STF.Lang.LANG ].url;
		var url		= STF.Path.URL.base + lang + '404';
		console.log( url );
		
		_loadContent.call( this, url );
	};
	
	
	var _onPrevPageHidden = function() {
		console.log( '_onPrevPageHidden():', this.prevPage, this.currentPage );
		// this.prevPage.destroyEvt( this.prevPage.E.HIDDEN, _onPrevPageHidden.bind( this ) );
		this.currentPage.destroyEvt( this.currentPage.E.HIDDEN, _onPrevPageHidden.bind( this ) );
		
		_destroyPage.call( this );
		
		this.isPrevPageHidden = true;
		_checkFirstStepPageChange.call( this );
	};
	
	
	var _onMainLoaderShown = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.SHOWN, _onMainLoaderShown.bind( this ) );
		
		this.isMainLoaderShown = true;
		_checkFirstStepPageChange.call( this );
		
		if ( this. LOADING_MODE == 'byPageStatic' )
			_loadAssets.call( this );
	};
	
	
	var _checkFirstStepPageChange = function() {
		if ( this.isContentLoaded && this.isAssetsLoaded && this.isPrevPageHidden && this.isMainLoaderShown ) {
			STF.MainView.$pageCont[0].innerHTML = this.data;
			
			// this.setPageInfos();
			
			// _destroyPrevPage.call( this );
			// _destroyPage.call( this );
			this.data = null;
			
			this.setPageInfos();
			
			console.log( 'this.currentPage.init():', this.currentPage );
			this.currentPage.init();
			
			this.currentPage.buildEvt( this.currentPage.E.SHOWN, _onCurrentPageShown.bind( this ) );
			this.currentPage.show();
			
			this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
			this.mainLoader.hide();
		}
		
		else if ( this.LOADING_MODE == 'byPageDynamic' && this.isContentLoaded && this.isPrevPageHidden && this.isMainLoaderShown )
			_loadAssets.call( this );
	};
	
	
	var _destroyPrevPage = function() {
		console.log( '_destroyPrevPage():', this.prevPage );
		
		this.prevPage.destroy();
		this.prevPage = null;
	};
	var _destroyPage = function() {
		console.log( '_destroyPage():', this.currentPage );
		
		this.currentPage.destroy();
		this.currentPage = null;
	};
	
	
	var _onCurrentPageShown = function() {
		this.currentPage.destroyEvt( this.currentPage.E.SHOWN, _onCurrentPageShown.bind( this ) );
		
		this.isCurrentPageShown = true;
		_checkSecondStepPageChange.call( this );
	};
	
	
	var _onMainLoaderHidden = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
		
		this.isMainLoaderHidden = true;
		_checkSecondStepPageChange.call( this );
	};
	
	
	var _checkSecondStepPageChange = function() {
		if ( this.isCurrentPageShown && this.isMainLoaderHidden )
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

