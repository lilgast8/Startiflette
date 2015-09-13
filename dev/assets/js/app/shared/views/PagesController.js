

APP.PagesController = ( function( window ) {
	
	
	function PagesController() {
		APP.AbstractController.call( this );
		
		this.pages			= {};
		this.page			= {};
		
		this.LOADING_MODE	= 'allStatic'; // can be allStatic, byPageStatic, byPageDynamic
		this.firstLoad		= true;
		this.isPageChange	= true;
		
		this.prevPage		= null;
		this.currentPage	= null;
		this.nextPage		= null;
	}
	
	
	PagesController.prototype				= Object.create( APP.AbstractController.prototype );
	PagesController.prototype.constructor	= PagesController;
	
	
	PagesController.prototype.init = function() {
		_initPages.call( this );
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
	
	
	var _instanceMainLoader = function() {
		// this.mainLoader = new APP.Views.Statics.MainLoaderController();
		this.mainLoader = new APP.Views.Statics.MainLoader();
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
		
		
		
		_loadAssets.call( this );
		
	};
	
	
	var _loadAssets = function() {
		var aAssetsList = [];
		
		// first load
		if ( this.firstLoad ) {
			// this.firstLoad = false; // TO SET IN enablePageChange()
			
			// aAssetsList = [ 'global' ];
			aAssetsList = _getAssetsList.call( this, true );
			// console.log(aAssetsList);
			
			this.mainLoader.buildEvt( this.mainLoader.E.COMPLETE, _onAssetsLoaded.bind( this, true ) );
			
			this.mainLoader.loadAssets( aAssetsList );
		}
		
		// page change load
		else {
			console.log('page change load');
		}
	};
	
	
	var _getAssetsList = function( init ) {
		var aAssetsList = [];
		
		/* Init */
		if ( init && this.LOADING_MODE == 'allStatic')
			aAssetsList = [ 'global' ];
		else if ( init && this.LOADING_MODE == 'byPageStatic')
			aAssetsList = [ 'global', this.page.id ];
		else if ( init && this.LOADING_MODE == 'byPageDynamic')
			aAssetsList = [ 'global', this.page.id ];
		
		/* Change page */
		// else if ( !init && this.LOADING_MODE == 'allStatic')
		// 	aAssetsList = [ ];
		// else if ( !init && this.LOADING_MODE == 'byPageStatic')
		// 	aAssetsList = [ this.page.id ];
		// else if ( !init && this.LOADING_MODE == 'byPageDynamic')
		// 	aAssetsList = [ this.page.id ];
		
		return aAssetsList;
	};
	
	
	var _onAssetsLoaded = function( init ) {
		console.log('PagesController _onAssetsLoaded()', init);
		
		this.mainLoader.destroyEvt( this.mainLoader.E.COMPLETE, _onAssetsLoaded.bind( this ) );
		
		if ( init ) {
			this.mainLoader.buildEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
			this.mainLoader.hideInit();
		}
		
	};
	
	
	var _onMainLoaderHidden = function() {
		console.log('_onMainLoaderHidden');
		this.mainLoader.destroyEvt( this.mainLoader.E.HIDDEN, _onMainLoaderHidden.bind( this ) );
		
		_enablePageChange.call( this );
	};
	
	
	var _enablePageChange = function() {
		this.isPageChange = false;
		if ( this.firstLoad )
			this.firstLoad = false;
		
		APP.Router.checkUrlSimilarity();
	};
	
	
	PagesController.prototype.changePage = function() {
		console.log('changePage', this.isPageChange);
		
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
	
	
	/*PagesController.prototype.hideCurrentView = function() {
		console.log('hideCurrentView');
	};*/
	
	
	/*PagesController.prototype.navigateTo = function( url ) {
		console.log('———————— PagesController.navigateTo():', url, '————————');
		
		APP.Router.setPageUrl( url );
	};*/
	
	
	
	
	
	
	
	
	
	
	PagesController.prototype.load = function(pageUrl) {
		this.initTransitionValues();
		
		var urlPage = APP.Config.MULTI_LANG ? 
						APP.Config.WEB_ROOT + APP.Config.LANG + '/ajax-content/' + pageUrl : 
						APP.Config.WEB_ROOT + 'ajax-content/'+ pageUrl;
		
		$.ajax({
			context		: this,
			url			: urlPage,
			type		: 'POST',
			data		: { ajax:pageUrl },	// useful if need a different behavior on PHP file when AJAX load
									 		// can be detected with if(isset($_POST['ajax']))
			dataType	: 'html',
			success		: this.loaded,
			error		: this.error
		});
	};
	
	
	PagesController.prototype.loaded = function(data) {
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
	};
	
	
	PagesController.prototype.checkInit = function() {
		if(this.v.isAjaxLoaded && this.v.isTransitionHideEnded) {
			APP.RoutesManager.updateGA(); // update Google Analytics
			
			APP.Main.$.pageContainer[0].innerHTML = this.v.data;
			
			this.v.data = null;
			
			this.initTransitionValues();
			
			this.init();
			this.show();
		}
	};
	
	
	PagesController.prototype.initTransitionValues = function() {
		this.v.isAjaxLoaded				= false;
		this.v.isTransitionHideEnded	= false;
	};
	
	
	return new PagesController();
	
	
} ) ( window );

