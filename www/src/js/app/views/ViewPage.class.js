

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
	
	
	ViewPage.prototype.load = function(pageUrl) {
		var pageUrlToLoad = null;
		var pageName = pageUrl;
		var arrayUrl = pageUrl.split('/');
		var urlL = arrayUrl.length;
		
		if(urlL == 1) pageUrlToLoad = APP.Model.Global.json.infosPages[pageName].file;
		else if(urlL > 1) {
			var pageNameTemp = arrayUrl[0];
			pageName = APP.Model.Global.json.infosPages[pageNameTemp].file;
			pageUrlToLoad = pageUrl.replace(pageNameTemp, pageName);
		}
		
		var urlPage = APP.Config.WEB_ROOT+'content-desktop/'+pageUrlToLoad;
		$.ajax({
			context : this,
			url : urlPage,
			type : 'POST',
			data : { Page: urlPage},
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
	
	
	ViewPage.prototype.show = function(data) {
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
		//	if(APP.RoutesManager.prevPage) // if need a different behavior in the first load.
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

