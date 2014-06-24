

APP.Views = APP.Views || {};


APP.View = (function(window) {
	
	
	function View() {
		APP.EventDispatcher.call(this);
		
		this.$ = {};
		
		this.EVENT = {
			LOADED : 'loaded',
			INIT : 'init',
			SHOWN : 'shown',
			HIDDEN : 'hidden'
		};
	}
	
	
	View.prototype = Object.create(APP.EventDispatcher.prototype);
	View.prototype.constructor = View;
	
	
	View.prototype.init = function(pageUrl) {
		this.initElt();
		this.bindEvents();
		if(pageUrl !== undefined) this.updateMenu(pageUrl);
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
			success : this.show,
		//	success : this.loadContent,
			error : this.error
		});
	};
	
	
	View.prototype.onComplete = function(e) {
		
	};
	
	
	/*
	View.prototype.loadContent = function(data) {
		console.log('load content :', this);
		
		this.loaderView = new APP.Loader();
		this.loaderView.init.call(this.loaderView);
		
		this.loaderView.buildEvt(this.loaderView.EVENT.ENDED, this.show.bind(this));
		this.loaderView.buildEvt(this.loaderView.EVENT.ERROR, this.show.bind(this));
		
		var aUrlImg = [];
		var imgsView = $('img');
		console.log(imgsView.length);
		for(var i=0; i<imgsView.length; i++) {
			aUrlImg.push(imgsView[i].src);
		}
		
		
		this.loaderView.initLoad.call(this.loaderView, aUrlImg);
	};
	*/
	
	
	View.prototype.show = function(data) {
		this.dispatch(this.EVENT.LOADED);
		
		APP.Main.$.$pageContainer[0].innerHTML = data;
		
		this.hideLoader(false);
		
		var self = this;
		TweenLite.to(APP.Main.$.$pageContainer, 0.8, {opacity:1, ease:Quad.easeOut, onComplete:function(){
			self.dispatch(self.EVENT.SHOWN);
		}});
	};
	
	
	View.prototype.hide = function() {
		this.showLoader();
		this.destroy();
		
		var self = this;
		TweenLite.to(APP.Main.$.$pageContainer, 0.8, {opacity:0, ease:Quad.easeOut});
		TweenLite.to(window, 0.8, {scrollTo:{y:0, autoKill:false}, ease:Quad.easeInOut, onComplete:function(){
			self.dispatch(self.EVENT.HIDDEN);
		}});
	};
	
	
	View.prototype.showLoader = function(data) {
		APP.Main.$.$loader[0].style.display = 'block';
		TweenLite.to(APP.Main.$.$loader, 0.8, {opacity:1, ease:Quart.easeOut});
		TweenLite.to(APP.Main.$.$loaderSpinner, 0.8, {scale:1, ease:Quart.easeOut});
	};
	
	
	View.prototype.hideLoader = function(firstLoad) {
		setTimeout(function() {
			TweenLite.to(APP.Main.$.$loaderSpinner, 0.8, {scale:1.5, ease:Quart.easeOut});
			TweenLite.to(APP.Main.$.$loader, 0.8, {opacity:0, ease:Quart.easeOut, onComplete:function(){
				if(firstLoad) APP.Main.$.$loader.find('.bg')[0].style.display = 'none';
				APP.Main.$.$loader[0].style.display = 'none';
			}});
		}, 0);
	};
	
	
	View.prototype.error = function() {
		
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
	};
	
	
	View.prototype.updateMenu = function(pageUrl) {
		if(this.events.loaded) this.destroyEvt(this.EVENT.LOADED, this.updateMenu.bind(this));
		
		var $menu = APP.Views.Header.$.$menu;
		var $footer = APP.Main.$.$footer;
		
		var $menuToDisable = $menu.find('[data-active="true"]');
		if(!$menuToDisable.length) $menuToDisable = $footer.find('[data-active="true"]');
		var $menuToEnable = $menu.find('[href*="'+pageUrl+'"]');
		if(!$menuToEnable.length) $menuToEnable = $footer.find('[href*="'+pageUrl+'"]');
		
		if($menuToDisable.length) $menuToDisable[0].setAttribute('data-active', 'false');
		if($menuToEnable.length) $menuToEnable[0].setAttribute('data-active', 'true');
	};
	
	
	View.prototype.clickChangePage = function(e) {
		e.preventDefault();
		
		var url = e.currentTarget.href;
		APP.RoutesManager.goToPage(url);
	};
	
	
	return View;
	
	
})(window);

