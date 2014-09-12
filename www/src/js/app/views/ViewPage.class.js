

APP.ViewPage = (function(window) {
	
	
	function ViewPage() {
		APP.View.call(this);
		
		this.EVENT = {
			LOADED : 'loaded',
			INIT : 'init',
			SHOWN : 'shown',
			HIDDEN : 'hidden'
		};
	}
	
	
	ViewPage.prototype = Object.create(APP.View.prototype);
	ViewPage.prototype.constructor = ViewPage;
	
	
	ViewPage.prototype.load = function(pageUrl, pageName, fileName) {
		var pageUrlToLoad = pageUrl.replace(pageName, fileName);
		
		var urlPage = APP.Config.WEB_ROOT+'content-desktop/'+pageUrlToLoad;
		$.ajax({
			context : this,
			url : urlPage,
			type : 'POST',
			data : { ajax:pageUrlToLoad},
			dataType : 'html',
			success : this.loaded,
			error : this.error
		});
	};
	
	
	ViewPage.prototype.loaded = function(data) {
		APP.Main.$.pageContainer[0].innerHTML = data;
		
		this.init();
		this.show();
		
		this.dispatch(this.EVENT.LOADED);
	};
	
	
	ViewPage.prototype.error = function() {
		
	};
	
	
	ViewPage.prototype.initElt = function() {
		
	};
	
	
	ViewPage.prototype.bindEvents = function() {
		
	};
	
	
	ViewPage.prototype.unbindEvents = function() {
		
	};
	
	
	ViewPage.prototype.show = function() {
		TweenLite.to(APP.Main.$.pageContainer, 0.8, {opacity:1, ease:Quad.easeOut, onComplete:function(){
			this.dispatch(this.EVENT.SHOWN);
			this.hideLoader(false);
		}.bind(this)});
	};
	
	
	ViewPage.prototype.hide = function() {
		this.showLoader();
		this.destroy();
		
		TweenLite.to(APP.Main.$.pageContainer, 0.8, {opacity:0, ease:Quad.easeOut, onComplete:function(){
			this.dispatch(this.EVENT.HIDDEN);
		}.bind(this)});
	};
	
	
	ViewPage.prototype.showLoader = function() {
		TweenLite.to(APP.Main.$.loader, 0.8, {opacity:1, display:'block', ease:Quart.easeOut});
	};
	
	
	ViewPage.prototype.hideLoader = function() {
		TweenLite.to(APP.Main.$.loader, 0.8, {opacity:0, display:'none', ease:Quart.easeOut});
	//	if(APP.RoutesManager.prevPage !== null) // if need a different behavior in the first load.
	};
	
	
	ViewPage.prototype.killTweens = function() {
		
	};
	
	
	ViewPage.prototype.destroy = function() {
		this.unbindEvents();
		
		this.killTweens();
		
		this.$ = {};
		this.v = {};
	};
	
	
	return ViewPage;
	
	
})(window);

