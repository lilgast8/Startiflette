

APP.Models = APP.Models || {};


APP.Models.Assets = (function(window) {
	
	
	function Assets() {
		APP.EventDispatcher.call(this);
		
		this.$ = {};
		this.v = {};
		
		this.E = {
			INIT : 'init'
		};
		
		this.aAssets = [
			/* bgs */
			APP.Config.WEB_ROOT + 'img/bgs/pattern_black_transparent.png',
			
			/* btns */
			
			/* icons */
			
			/* logos */
			APP.Config.WEB_ROOT + 'img/logos/browsers/browser_chrome.png',
			APP.Config.WEB_ROOT + 'img/logos/browsers/browser_firefox.png',
			APP.Config.WEB_ROOT + 'img/logos/browsers/browser_internet_explorer.png',
			APP.Config.WEB_ROOT + 'img/logos/browsers/browser_opera.png',
			APP.Config.WEB_ROOT + 'img/logos/browsers/browser_safari.png'
			
			/* others */
			
		];
	}
	
	
	Assets.prototype = Object.create(APP.EventDispatcher.prototype);
	Assets.prototype.constructor = Assets;
	
	
	Assets.prototype.init = function() {
		this.assetsLoader = new APP.Loader(true, true);
		
		this.assetsLoader.buildEvt(this.assetsLoader.E.PROGRESS, _onProgress.bind(this));
		this.assetsLoader.buildEvt(this.assetsLoader.E.FILE_LOAD, _onFileLoad.bind(this));
		this.assetsLoader.buildEvt(this.assetsLoader.E.COMPLETE, _onComplete.bind(this));
		
		this.assetsLoader.startLoad(this.aAssets);
	};
	
	
	var _onProgress = function(e) {
		var percentage = Math.round( e.loaded * 100 );
		
		APP.Views.Static.MainLoader.progressLoader(percentage);
	};
	
	
	var _onFileLoad = function(e) {
	//	console.log(e.item);
	};
	
	
	var _onComplete = function(e) {
		this.assetsLoader.destroyEvt(this.assetsLoader.E.PROGRESS, _onProgress.bind(this));
		this.assetsLoader.destroyEvt(this.assetsLoader.E.FILE_LOAD, _onFileLoad.bind(this));
		this.assetsLoader.destroyEvt(this.assetsLoader.E.COMPLETE, _onComplete.bind(this));
		
		this.assetsLoader.destroy();
		this.assetsLoader = null;
		
		this.dispatch(this.E.INIT);
	};
	
	
	return new Assets();
	
	
})(window);

