

APP.PagesController = ( function( window ) {
	
	
	function PagesController() {
		APP.AbstractController.call( this );
		
		this.prevPage		= null;
		this.currentPage	= null;
		this.nextPage		= null;
		
		this.pages			= {};
	}
	
	
	PagesController.prototype				= Object.create( APP.AbstractController.prototype );
	PagesController.prototype.constructor	= PagesController;
	
	
	PagesController.prototype.init = function() {
		_initPages.call( this );
	};
	
	
	var _initPages = function() {
		this.pages = {
			// 'error-404':		APP.Views.Controllers.Error404,
			'home':				APP.Views.Pages.HomeController,
			// 'about':			APP.Views.Controllers.About,
			// 'projects':			APP.Views.Controllers.Projects,
			// 'project':			APP.Views.Controllers.Project,
			// 'legal_notices':	APP.Views.Controllers.LegalNotices
		};
	};
	
	
	
	
	
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

