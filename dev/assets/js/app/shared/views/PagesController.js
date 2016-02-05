

STF.PagesController = ( function( window ) {
	'use strict';
	
	
	function PagesController() {
		STF.EventDispatcher.call( this );
		
		this.pages					= {};
		this.page					= {};
		
		this.LOADING_MODE			= 'allStatic'; // can be allStatic, byPageStatic, byPageDynamic
		this.DYNAMIC_IMG_TO_LOAD	= 'img'; // used when LOADING_MODE == 'byPageDynamic', can be img.class for selective preload
		this.isFirstLoad			= true;
		this.isPageChange			= true;
		
		this.isContentLoaded		= false;
		this.isPrevPageHidden		= false;
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
		
		this.mainLoader = new STF.Views.Statics.MainLoader();
		this.mainLoader.buildEvt( this.mainLoader.E.FILE_LOAD, _onFileLoad.bind( this ) );
		this.mainLoader.buildEvt( this.mainLoader.E.COMPLETE, _onAssetsLoaded.bind( this ) );
		this.mainLoader.init();
	};
	
	
	PagesController.prototype.setPageInfos = function( pageId, jsView, title, desc )
	{
		this.page.id		= pageId;
		this.page.jsView	= jsView;
		this.page.title		= title;
		this.page.desc		= desc;
		
		_setCurrentPage.call( this );
	};
	
	
	var _setCurrentPage = function() {
		if ( this.pages[ this.page.jsView ] === undefined) {
			console.error( 'PagesController error: Need to create a view for the "' + this.page.jsView + '" ID, then set the view in the PagesController.pages object.' );
			
			return;
		}
		
		this.prevPage		= this.currentPage;
		this.currentPage	= new this.pages[ this.page.jsView ]();
	};
	
	
	PagesController.prototype.initFirstPage = function() {
		_initPageChangeValues.call( this );
		
		_loadAssets.call( this );
	};
	
	
	var _initPageChangeValues = function() {
		this.isContentLoaded	= false;
		this.isAssetsLoaded		= false;
		this.isPrevPageHidden	= false;
		this.isMainLoaderShown	= false;
		
		this.isCurrentPageShow	= false;
		this.isMainLoaderHidden	= false;
	};
	
	
	var _loadAssets = function() {
		var aImgListIds	= _getAssetsListIds.call( this, 'img' );
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
				  this.isFirstLoad && this.LOADING_MODE == 'byPageDynamic' && type == 'json' )
			aIds = [ 'global', this.page.id ];
		
		else if ( this.isFirstLoad && this.LOADING_MODE == 'byPageDynamic' && type == 'img' )
			aIds = [ 'global' ];
		
		
		// page change load
		else if ( !this.isFirstLoad && this.LOADING_MODE == 'byPageStatic' ||
				  !this.isFirstLoad && this.LOADING_MODE == 'byPageDynamic' && type == 'json' )
			aIds = [ this.page.id ];
		
		
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
	
	
	PagesController.prototype.changePage = function( pageUrl ) {
		_disablePageChange.call( this );
		_initPageChangeValues.call( this );
		
		_loadContent.call( this, pageUrl );
		
		this.prevPage.buildEvt( this.prevPage.E.HIDDEN, _onPrevPageHidden.bind( this ) );
		this.prevPage.hide();
		
		this.mainLoader.buildEvt( this.mainLoader.E.SHOWN, _onMainLoaderShown.bind( this ) );
		this.mainLoader.show();
		
		if ( this.LOADING_MODE == 'allStatic' )
			this.isAssetsLoaded = true;
	};
	
	
	var _onFileLoad = function( e ) {
		if ( e.item.type == 'json' )
			this.assetsModel.setJsonData( e.item.id, e.result );
	};
	
	
	var _onAssetsLoaded = function() {
		// first load
		if ( this.isFirstLoad ) {
			this.currentPage.init();
			
			this.currentPage.buildEvt( this.currentPage.E.SHOWN, _onCurrentPageShown.bind( this ) );
			this.currentPage.show();
			
			this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
			
			if ( this.LOADING_MODE == 'allStatic' )
				this.mainLoader.hideInit();
			
			else if ( this.LOADING_MODE == 'byPageStatic' || this.LOADING_MODE == 'byPageDynamic' )
				this.mainLoader.hide();
		}
		
		
		// page change load
		else if ( !this.isFirstLoad && ( this.LOADING_MODE == 'byPageStatic' || this.LOADING_MODE == 'byPageDynamic' ) ) {
			this.isAssetsLoaded = true;
			
			_checkFirstStepPageChange.call( this );
		}
	};
	
	
	var _loadContent = function( pageUrl ) {
		if ( this.page.id == 'error404' ) { // used to avoid that the request return a error on callback if it's a 404 page 
			var lang	= STF.Lang.MULTI_LANG ? STF.Lang.LANG + '/'  : '';
			pageUrl		= STF.Path.URL.base + lang + STF.Router.ROUTES.statics.error404[ STF.Lang.LANG ].url;
		}
		
		$.ajax({
			context:	this,
			url:		pageUrl,
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
	};
	
	
	var _onContentLoaded = function( data ) {
		this.data = data;
		
		this.isContentLoaded = true;
		_checkFirstStepPageChange.call( this );
	};
	
	
	var _onContentError = function( e ) {
		console.log( 'ajax load error' );
		// window.location.href = STF.Routes.PAGE_URL.full;
	};
	
	
	var _onPrevPageHidden = function() {
		this.prevPage.destroyEvt( this.prevPage.E.HIDDEN, _onPrevPageHidden.bind( this ) );
		
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
			// STF.RoutesManager.updateGA(); // update Google Analytics
			
			STF.MainView.$pageCont[0].innerHTML = this.data;
			
			_destroyPrevPage.call( this );
			this.data = null;
			
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
		this.prevPage.destroy();
		this.prevPage = null;
	};
	
	
	var _onCurrentPageShown = function() {
		this.currentPage.destroyEvt( this.currentPage.E.SHOWN, _onCurrentPageShown.bind( this ) );
		
		this.isCurrentPageShow = true;
		_checkSecondStepPageChange.call( this );
	};
	
	
	var _onMainLoaderHidden = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
		
		this.isMainLoaderHidden = true;
		_checkSecondStepPageChange.call( this );
	};
	
	
	var _checkSecondStepPageChange = function() {
		if ( this.isCurrentPageShow && this.isMainLoaderHidden )
			_enablePageChange.call( this );
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

