

STF.ViewPage = (function(window) {
	
	
	function ViewPage() {
		STF.View.call(this);
		
		this.name = null;
		
		this.E = {
		//	LOADED : 'loaded',
		//	INIT : 'init',
			SHOWN : 'shown',
			HIDDEN : 'hidden'
		};
	}
	
	
	ViewPage.prototype = Object.create(STF.View.prototype);
	ViewPage.prototype.constructor = ViewPage;
	
	
	ViewPage.prototype.load = function(pageUrl) {
		this.initTransitionValues();
		
		var urlPage = STF.Config.MULTI_LANG ? 
						STF.Config.WEB_ROOT + STF.Config.LANG + '/ajax-content/' + pageUrl : 
						STF.Config.WEB_ROOT + 'ajax-content/'+ pageUrl;
		
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
	
	
	ViewPage.prototype.loaded = function(data) {
		this.v.data = data;
		
		this.v.isAjaxLoaded = true;
		
		this.checkInit();
	};
	
	
	ViewPage.prototype.error = function() {
	//	console.log('ajax load error');
		window.location.href = STF.Config.WEB_ROOT+STF.RoutesManager.pageUrl;
	};
	
	
	ViewPage.prototype.transitionEnded = function() {
		this.v.isTransitionHideEnded = true;
		
		this.checkInit();
	};
	
	
	ViewPage.prototype.checkInit = function() {
		if(this.v.isAjaxLoaded && this.v.isTransitionHideEnded) {
			STF.RoutesManager.updateGA(); // update Google Analytics
			
			STF.Main.$.pageContainer[0].innerHTML = this.v.data;
			
			this.v.data = null;
			
			this.initTransitionValues();
			
			this.init();
			this.show();
		}
	};
	
	
	ViewPage.prototype.initTransitionValues = function() {
		this.v.isAjaxLoaded				= false;
		this.v.isTransitionHideEnded	= false;
	};
	
	
	ViewPage.prototype.initEl = function() {
		
	};
	
	
	ViewPage.prototype.bindEvents = function() {
		
	};
	
	
	ViewPage.prototype.unbindEvents = function() {
		
	};
	
	
	ViewPage.prototype.resize = function() {
		
	};
	
	
	ViewPage.prototype.show = function() {
		this.tw.showPage = TweenLite.to(STF.Main.$.pageContainer, 0.8, {opacity:1, ease:Quad.easeOut, onComplete:function(){
			this.dispatch(this.E.SHOWN);
		}.bind(this)});
	};
	
	
	ViewPage.prototype.hide = function() {
		this.tw.hidePage = TweenLite.to(STF.Main.$.pageContainer, 0.8, {opacity:0, ease:Quad.easeOut, onComplete:function(){
			this.destroy();
			this.dispatch(this.E.HIDDEN);
		}.bind(this)});
	};
	
	
	return ViewPage;
	
	
})(window);

