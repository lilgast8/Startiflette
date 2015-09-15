

APP.PagesController = ( function( window ) {
	
	
	function PagesController() {
		APP.AbstractController.call( this );
		
		this.pages				= {};
		this.page				= {};
		
		this.LOADING_MODE		= 'allStatic'; // can be allStatic, byPageStatic, byPageDynamic
		this.isFirstLoad		= true;
		this.isPageChange		= true;
		
		this.isContentLoaded	= false;
		this.isPrevPageHidden	= false;
		this.isMainLoaderHidden	= false;
		
		this.prevPage			= null;
		this.currentPage		= null;
		this.nextPage			= null;
		
		this.data				= null;
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
			console.log('PagesController error: Need to create a view for the "' + this.page.jsView + '" ID, then set the view in the PageManager.pages object.');
			return;
		}
		
		this.prevPage = this.currentPage;
		
		// if ( this.currentPage != null )
		// 	_unbindEvents.call(this);
		
		this.currentPage = new this.pages[ this.page.jsView ]();
		
		// console.log(this.currentPage);
		
		
		
		// _loadAssets.call( this );
		
	};
	
	
	PagesController.prototype.loadAssets = function() {
		var aImgsListIds, aImgsToLoad;
		
		// first load
		if ( this.isFirstLoad ) {
			aImgsListIds	= _getImgsListIds.call( this );
			aImgsToLoad		= this.assetsModel.getImgsToLoad( aImgsListIds );
			
			this.mainLoader.buildEvt( this.mainLoader.E.COMPLETE, _onAssetsLoaded.bind( this, this.isFirstLoad ) );
			this.mainLoader.loadAssets( aImgsToLoad );
		}
		
		// page change load
		else {
			console.log('page change load');
		}
	};
	
	
	var _getImgsListIds = function() {
		var aIds = [];
		
		/* First load */
		if ( this.isFirstLoad && this.LOADING_MODE == 'allStatic')
			aIds = this.assetsModel.getAllStaticImgsListIds();
		else if ( this.isFirstLoad && this.LOADING_MODE == 'byPageStatic')
			aIds = [ 'global', this.page.id ];
		else if ( this.isFirstLoad && this.LOADING_MODE == 'byPageDynamic')
			aIds = [ 'global', this.page.id ];
		
		/* Change page */
		// else if ( !this.isFirstLoad && this.LOADING_MODE == 'allStatic')
		// 	aIds = [ ];
		// else if ( !this.isFirstLoad && this.LOADING_MODE == 'byPageStatic')
		// 	aIds = [ this.page.id ];
		// else if ( !this.isFirstLoad && this.LOADING_MODE == 'byPageDynamic')
		// 	aIds = [ this.page.id ];
		
		return aIds;
	};
	
	
	var _onAssetsLoaded = function( isFirstLoad ) {
		// console.log('PagesController _onAssetsLoaded()', isFirstLoad, this.isFirstLoad);
		
		this.mainLoader.destroyEvt( this.mainLoader.E.COMPLETE, _onAssetsLoaded.bind( this ) );
		
		if ( isFirstLoad ) {
			this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHiddenInit.bind( this ) );
			this.mainLoader.hideInit();
		}
		
	};
	
	
	var _onMainLoaderHiddenInit = function() {
		// console.log('_onMainLoaderHidden');
		this.mainLoader.destroyEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
		
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
	
	
	PagesController.prototype.changePage = function( pageUrl ) {
		console.log('changePage', this.isPageChange);
		
		_disablePageChange.call( this );
		_initPageChangeValues.call( this );
		
		_loadContent.call( this, pageUrl );
		
		this.prevPage.buildEvt( this.prevPage.E.HIDDEN, _onPrevPageHidden.bind( this ) );
		this.prevPage.hide();
		
		this.mainLoader.buildEvt( this.mainLoader.E.SHOWN, _onMainLoaderShown.bind( this ) );
		this.mainLoader.show();
		
		
		// if ( !this.isPageChange ) {
			/*
			_disablePageChange.call(this);
			
			if(this.isPageChangedByClick) // if page is changed by a click
				this.isPageChangedByClick = false;
			else // if page is changed by a prev/next
				_setPageInfos.call(this, null);
			
			this.nextView = _getView.call(this);
			
			this.currentView.buildEvt(this.currentView.E.HIDDEN, _initNextView.bind(this));
			this.currentView.hide();
			
			this.nextView.load(this.pageUrl);
			*/
		// }
	};
	
	
	var _initPageChangeValues = function() {
		this.isContentLoaded	= false;
		this.isPrevPageHidden	= false;
		this.isMainLoaderHidden	= false;
	};
	
	
	// PagesController.prototype.load = function(pageUrl) {
	var _loadContent = function( pageUrl ) {
		console.log( '_loadContent', pageUrl );
		
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
		console.log( this.data );
		
		this.isContentLoaded = true;
		_checkPrevPageHidden.call( this );
	};
	
	
	var _onContentError = function() {
		console.log( 'ajax load error' );
		// window.location.href = APP.Config.WEB_ROOT + APP.RoutesManager.pageUrl;
	};
	
	
	var _onPrevPageHidden = function() {
		console.log('PagesController _onPrevPageHidden()');
		
		this.prevPage.destroyEvt( this.prevPage.E.HIDDEN, _onPrevPageHidden.bind( this ) );
		
		this.isMainLoaderHidden = true;
		_checkPrevPageHidden.call( this );
	};
	
	
	var _onMainLoaderShown = function() {
		console.log('PagesController _onMainLoaderShown()');
		
		this.mainLoader.destroyEvt( this.mainLoader.E.SHOWN, _onMainLoaderShown.bind( this ) );
		
		this.isPrevPageHidden = true;
		_checkPrevPageHidden.call( this );
	};
	
	
	var _onMainLoaderHidden = function() {
		this.mainLoader.destroyEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
		
		_checkCurrentPageShown.call( this );
	};
	
	
	var _checkPrevPageHidden = function() {
		console.log('PagesController _checkPrevPageHidden():', this.isContentLoaded, this.isPrevPageHidden, this.isMainLoaderHidden);
		
		if ( this.isContentLoaded && this.isPrevPageHidden && this.isMainLoaderHidden ) {
			// APP.RoutesManager.updateGA(); // update Google Analytics
			
			APP.MainView.$pageCont[0].innerHTML = this.data;
			
			this.data = null;
			
			_initPageChangeValues.call( this );
			
			// this.init();
			// this.show();
			
			
			this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
			this.mainLoader.hide();
			
			this.currentPage.buildEvt( this.currentPage.E.SHOWN, _onCurrentPageShown.bind( this ) );
			this.currentPage.show();
		}
	};
	
	
	var _onCurrentPageShown = function() {
		console.log( '_onCurrentPageShown' );
		
		this.currentPage.destroyEvt( this.currentPage.E.SHOWN, _onCurrentPageShown.bind( this ) );
		
		_checkCurrentPageShown.call( this );
	};
	
	
	var _checkCurrentPageShown = function() {
		console.log( 'PagesController _checkCurrentPageShown()' );
		
	};
	
	
	
	
	
	
	
	
	
	/*PagesController.prototype.hideCurrentView = function() {
		console.log('hideCurrentView');
	};*/
	
	
	/*PagesController.prototype.navigateTo = function( url ) {
		console.log('———————— PagesController.navigateTo():', url, '————————');
		
		APP.Router.setPageUrl( url );
	};*/
	
	
	
	
	
	/*PagesController.prototype.loaded = function(data) {
		this.v.data = data;
		
		this.v.isAjaxLoaded = true;
		
		this.checkInit();
	};
	
	
	PagesController.prototype.error = function() {
	//	console.log('ajax load error');
		window.location.href = APP.Config.WEB_ROOT+APP.RoutesManager.pageUrl;
	};
	
	
	PagesController.prototype.transitionEnded = function() {
		this.v.isTransitionHideEnded = true;
		
		this.checkInit();
	};*/
	
	
	/*PagesController.prototype.checkInit = function() {
		if(this.v.isAjaxLoaded && this.v.isTransitionHideEnded) {
			APP.RoutesManager.updateGA(); // update Google Analytics
			
			APP.Main.$.pageContainer[0].innerHTML = this.v.data;
			
			this.v.data = null;
			
			this.initTransitionValues();
			
			this.init();
			this.show();
		}
	};*/
	
	
	/*PagesController.prototype.initTransitionValues = function() {
		this.v.isAjaxLoaded				= false;
		this.v.isTransitionHideEnded	= false;
	};*/
	
	
	return new PagesController();
	
	
} ) ( window );

