

APP.View = (function(window) {
	
	
	function View() {
		APP.EventDispatcher.call(this);
		
		this.$ = {};
		this.p = {};
		this.v = {};
		
		this.EVENT = {
			LOADED : 'loaded',
			INIT : 'init',
			SHOWN : 'shown',
			HIDDEN : 'hidden'
		};
	}
	
	
	View.prototype = Object.create(APP.EventDispatcher.prototype);
	View.prototype.constructor = View;
	
	
	View.prototype.init = function() {
		this.initElt();
		this.bindEvents();
	};
	
	
	View.prototype.initElt = function() {
		
	};
	
	
	View.prototype.load = function(pageUrl) {
		var pageUrlToLoad = null;
		var pageName = pageUrl;
		var arrayUrl = pageUrl.split('/');
		var urlL = arrayUrl.length;
		
		if(urlL == 1) pageUrlToLoad = APP.Main.json.infosPages[pageName].file;
		else if(urlL > 1) {
			var pageNameTemp = arrayUrl[0];
			pageName = APP.Main.json.infosPages[pageNameTemp].file;
			pageUrlToLoad = pageUrl.replace(pageNameTemp, pageName);
		}
		
		var urlPage = APP.Config.WEB_ROOT+'contenu-desktop/'+pageUrlToLoad;
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
	
	
	View.prototype.loaded = function(data) {
		APP.Main.$.pageContainer[0].innerHTML = data;
		
		this.init();
		this.show();
		
		this.dispatch(this.EVENT.LOADED);
	};
	
	
	View.prototype.error = function() {
		
	};
	
	
	View.prototype.show = function(data) {
		TweenLite.to(APP.Main.$.pageContainer, 0.8, {opacity:1, ease:Quad.easeOut, onComplete:function(){
			this.dispatch(this.EVENT.SHOWN);
			this.hideLoader(false);
		}.bind(this)});
	};
	
	
	View.prototype.hide = function() {
		this.showLoader();
		this.destroy();
		
		TweenLite.to(APP.Main.$.pageContainer, 0.8, {opacity:0, ease:Quad.easeOut, onComplete:function(){
			this.dispatch(this.EVENT.HIDDEN);
		}.bind(this)});
	};
	
	
	View.prototype.showLoader = function(data) {
		console.log('SHOW LOADER');
		APP.Main.$.loader[0].style.display = 'block';
		TweenLite.to(APP.Main.$.loader, 0.8, {opacity:1, ease:Quart.easeOut});
	};
	
	
	View.prototype.hideLoader = function(firstLoad) {
		console.log('HIDE LOADER');
		TweenLite.to(APP.Main.$.loader, 0.8, {opacity:0, ease:Quart.easeOut, onComplete:function(){
			if(firstLoad) APP.Main.$.loader.find('.bg')[0].style.display = 'none';
			APP.Main.$.loader[0].style.display = 'none';
		}});
	};
	
	
	View.prototype.bindEvents = function() {
		
	};
	
	
	View.prototype.unbindEvents = function() {
		
	};
	
	
	View.prototype.killTweens = function() {
		
	};
	
	
	View.prototype.destroy = function() {
		this.unbindEvents();
		
		this.killTweens();
		
		this.$ = {};
		this.v = {};
	};
	
	
	View.prototype.clickChangePage = function(e) {
		e.preventDefault();
		
		var url = e.currentTarget.href;
		APP.RoutesManager.goToPage(url);
	};
	
	
	return View;
	
	
})(window);

