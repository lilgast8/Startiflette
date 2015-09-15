

APP.PagesController = ( function( window ) {
	
	
	function PagesController() {
		APP.AbstractController.call( this );
		
		this.pages					= {};
		this.page					= {};
		
		this.LOADING_MODE			= 'byPageDynamic'; // can be allStatic, byPageStatic, byPageDynamic
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
	
	
	PagesController.prototype				= Object.create( APP.AbstractController.prototype );
	PagesController.prototype.constructor	= PagesController;
	
	
	PagesController.prototype.init = function() {
		_initPages.call( this );
		
		_instanceAssetsModel.call( this );
		_instanceMainLoader.call( this );
	};
	
	
	var _initPages = function() {
		this.pages = {
			'error-404':		APP.Views.Pages.Error404View,
			'home':				APP.Views.Pages.HomeView,
			'about':			APP.Views.Pages.AboutView,
			'projects':			APP.Views.Pages.ProjectsView,
			'project':			APP.Views.Pages.ProjectView,
			'legal-notices':	APP.Views.Pages.LegalNoticesView
		};
	};
	
	
	var _instanceAssetsModel = function() {
		this.assetsModel = new APP.Models.AssetsModel();
	};
	
	
	var _instanceMainLoader = function() {
		this.mainLoader = new APP.Views.Statics.MainLoaderView();
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
			console.log( 'PagesController error: Need to create a view for the "' + this.page.jsView + '" ID, then set the view in the PageManager.pages object.' );
			return;
		}
		
		this.prevPage = this.currentPage;
		
		// if ( this.currentPage != null )
		// 	_unbindEvents.call(this);
		
		this.currentPage = new this.pages[ this.page.jsView ]();
		
		// console.log( this.currentPage );
	};
	
	
	PagesController.prototype.initPage = function() {
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
		var aImgsListIds	= _getImgsListIds.call( this );
		var dynamicImgsList	= _getDynamicImgsListToLoad.call( this );
		var aImgsToLoad		= this.assetsModel.getImgsToLoad( aImgsListIds, dynamicImgsList );
		// console.log( aImgsToLoad );
		
		this.mainLoader.buildEvt( this.mainLoader.E.COMPLETE, _onAssetsLoaded.bind( this ) );
		this.mainLoader.loadAssets( aImgsToLoad );
	};
	
	
	var _getImgsListIds = function() {
		var aIds = [];
		
		
		// first load
		if ( this.isFirstLoad && this.LOADING_MODE == 'allStatic')
			aIds = this.assetsModel.getAllStaticImgsListIds();
		
		else if ( this.isFirstLoad && this.LOADING_MODE == 'byPageStatic')
			aIds = [ 'global', this.page.id ];
		
		else if ( this.isFirstLoad && this.LOADING_MODE == 'byPageDynamic')
			aIds = [ 'global' ];
		
		
		// page change load
		else if ( !this.isFirstLoad && this.LOADING_MODE == 'byPageStatic')
			aIds = [ this.page.id ];
		
		
		return aIds;
	};
	
	
	var _getDynamicImgsListToLoad = function() {
		var dynamicImgsList;
		
		if ( this.LOADING_MODE !== 'byPageDynamic' )
			dynamicImgsList = null;
		
		else if ( this.isFirstLoad )
			dynamicImgsList = APP.MainView.$pageCont.find( this.DYNAMIC_IMG_TO_LOAD );
		
		else if ( !this.isFirstLoad )
			dynamicImgsList = $( this.data ).find( this.DYNAMIC_IMG_TO_LOAD );
		
		
		return dynamicImgsList;
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
	
	
	var _onAssetsLoaded = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.COMPLETE, _onAssetsLoaded.bind( this ) );
		
		
		// first load
		if ( this.isFirstLoad ) {
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
			
			_checkPrevPageHidden.call( this );
		}
	};
	
	
	var _loadContent = function( pageUrl ) {
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
		_checkPrevPageHidden.call( this );
		
		if ( this.LOADING_MODE == 'byPageDynamic' )
			_loadAssets.call( this );
	};
	
	
	var _onContentError = function() {
		console.log( 'ajax load error' );
		// window.location.href = APP.Config.WEB_ROOT + APP.RoutesManager.pageUrl;
	};
	
	
	var _onPrevPageHidden = function() {
		this.prevPage.destroyEvt( this.prevPage.E.HIDDEN, _onPrevPageHidden.bind( this ) );
		
		this.isPrevPageHidden = true;
		_checkPrevPageHidden.call( this );
	};
	
	
	var _onMainLoaderShown = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.SHOWN, _onMainLoaderShown.bind( this ) );
		
		this.isMainLoaderShown = true;
		_checkPrevPageHidden.call( this );
		
		if ( this. LOADING_MODE == 'byPageStatic' ) {
			_loadAssets.call( this );
		}
	};
	
	
	var _checkPrevPageHidden = function() {
		// console.log( 'PagesController _checkPrevPageHidden():', this.isContentLoaded, this.isAssetsLoaded, this.isPrevPageHidden, this.isMainLoaderShown );
		
		if ( this.isContentLoaded && this.isAssetsLoaded && this.isPrevPageHidden && this.isMainLoaderShown ) {
			// APP.RoutesManager.updateGA(); // update Google Analytics
			
			APP.MainView.$pageCont[0].innerHTML = this.data;
			
			this.data = null;
			
			this.currentPage.buildEvt( this.currentPage.E.SHOWN, _onCurrentPageShown.bind( this ) );
			this.currentPage.show();
			
			this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
			this.mainLoader.hide();
		}
	};
	
	
	var _onCurrentPageShown = function() {
		this.currentPage.destroyEvt( this.currentPage.E.SHOWN, _onCurrentPageShown.bind( this ) );
		
		this.isCurrentPageShow = true;
		_checkCurrentPageShown.call( this );
	};
	
	
	var _onMainLoaderHidden = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
		
		this.isMainLoaderHidden = true;
		_checkCurrentPageShown.call( this );
	};
	
	
	var _checkCurrentPageShown = function() {
		// console.log( 'PagesController _checkCurrentPageShown():', this.isCurrentPageShow, this.isMainLoaderHidden );
		
		if ( this.isCurrentPageShow && this.isMainLoaderHidden )
			_enablePageChange.call( this );
	};
	
	
	var _enablePageChange = function() {
		this.isPageChange = false;
		
		if ( this.isFirstLoad )
			this.isFirstLoad = false;
		
		APP.Router.checkUrlCorrespondence();
	};
	
	
	var _disablePageChange = function() {
		this.isPageChange = true;
	};
	
	
	return new PagesController();
	
	
} ) ( window );

