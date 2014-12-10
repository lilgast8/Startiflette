

APP.ViewPage = (function(window) {
	
	
	function ViewPage() {
		APP.View.call(this);
		
		this.name = null;
		
		this.E = {
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
	
	
	ViewPage.prototype.show = function() {
		this.tw.showPage = TweenLite.to(APP.Main.$.pageContainer, 0.8, {opacity:1, ease:Quad.easeOut, onComplete:function(){
			this.dispatch(this.E.SHOWN);
		}.bind(this)});
	};
	
	
	ViewPage.prototype.hide = function() {
		this.tw.hidePage = TweenLite.to(APP.Main.$.pageContainer, 0.8, {opacity:0, ease:Quad.easeOut, onComplete:function(){
			this.destroy();
			this.dispatch(this.E.HIDDEN);
		}.bind(this)});
	};
	
	
	return ViewPage;
	
	
})(window);

