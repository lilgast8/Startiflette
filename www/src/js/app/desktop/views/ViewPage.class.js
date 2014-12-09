

APP.ViewPage = (function(window) {
	
	
	function ViewPage() {
		APP.View.call(this);
		
		this.name = null;
		
		this.tl = {};
		
		this.EVENT = {
		//	LOADED : 'loaded',
		//	INIT : 'init',
			SHOWN : 'shown',
			HIDDEN : 'hidden'
		};
	}
	
	
	ViewPage.prototype = Object.create(APP.View.prototype);
	ViewPage.prototype.constructor = ViewPage;
	
	
	ViewPage.prototype.load = function(pageUrl, pageName, fileName) {
		this.v.isAjaxLoaded = false;
		this.v.isTransitionHideEnded = false;
		
		var pageUrlToLoad = pageUrl.replace(pageName, fileName);
		
		var urlPage = APP.Config.WEB_ROOT+'content-desktop/'+pageUrlToLoad;
		$.ajax({
			context : this,
			url : urlPage,
			type : 'POST',
			data : { ajax:pageUrlToLoad },
			dataType : 'html',
			success : this.loaded,
			error : this.error
		});
	};
	
	
	ViewPage.prototype.loaded = function(data) {
		this.v.data = data;
		
		this.v.isAjaxLoaded = true;
		
		this.checkInit();
	};
	
	
	ViewPage.prototype.error = function() {
	//	console.log('ajax load error');
		window.location.href = APP.Config.WEB_ROOT+APP.RoutesManager.pageUrl;
	};
	
	
	ViewPage.prototype.transitionEnded = function() {
		this.v.isTransitionHideEnded = true;
		
		this.checkInit();
	};
	
	
	ViewPage.prototype.checkInit = function() {
		if(this.v.isAjaxLoaded && this.v.isTransitionHideEnded) {
			APP.RoutesManager.updateGA(); // update Google Analytics
			
			APP.Main.$.pageContainer[0].innerHTML = this.v.data;
			
			this.v.data = null;
			this.v.isAjaxLoaded = false;
			this.v.isTransitionHideEnded = false;
			
			this.init();
			this.show();
		}
	};
	
	
	ViewPage.prototype.initEl = function() {
		
	};
	
	
	ViewPage.prototype.bindEvents = function() {
		
	};
	
	
	ViewPage.prototype.unbindEvents = function() {
		
	};
	
	
	ViewPage.prototype.resize = function() {
		
	};
	
	
	ViewPage.prototype.killTweens = function() {
		for(var timeline in this.tl) {
			var tl = this.tl[timeline];
			
			tl.stop();
			tl.kill();
			tl.clear();
		}
		
		this.tl = {};
	};
	
	
	ViewPage.prototype.destroy = function() {
		this.unbindEvents();
		
		this.killTweens();
		
		this.$ = {};
		this.p = {};
		this.v = {};
	};
	
	
	ViewPage.prototype.show = function() {
		TweenLite.to(APP.Main.$.pageContainer, 0.8, {opacity:1, ease:Quad.easeOut, onComplete:function(){
			this.dispatch(this.EVENT.SHOWN);
		}.bind(this)});
	};
	
	
	ViewPage.prototype.hideContent = function() {
		this.hide();
	};
	
	
	ViewPage.prototype.hide = function() {
		TweenLite.to(APP.Main.$.pageContainer, 0.8, {opacity:0, ease:Quad.easeOut, onComplete:function(){
			this.destroy();
			this.dispatch(this.EVENT.HIDDEN);
		}.bind(this)});
	};
	
	
	ViewPage.prototype.showLoader = function() {
		TweenLite.to(APP.Main.$.loader, 0.8, {opacity:1, display:'block', ease:Quart.easeOut});
	};
	
	
	ViewPage.prototype.hidePreloader = function() {
		// hide preloader if need
		// play intro if need and at the end of it dispatch APP.RoutesManager.currentPage.EVENT.SHOWN
		
		APP.RoutesManager.currentPage.dispatch(APP.RoutesManager.currentPage.EVENT.SHOWN); // dispatch event to enable page change
	};
	
	
	ViewPage.prototype.hideLoader = function() {
		TweenLite.to(APP.Main.$.loader, 0.8, {opacity:0, display:'none', ease:Quart.easeOut});
		
		// if(APP.RoutesManager.prevPage == null) // if need a different behavior in the first load.
	};
	
	
	return ViewPage;
	
	
})(window);

