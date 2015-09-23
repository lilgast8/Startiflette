

STF.Models = STF.Models || {};


STF.Models.Assets = (function(window) {
	
	
	function Assets() {
		STF.EventDispatcher.call(this);
		
		this.$ = {};
		this.v = {};
		
		this.E = {
			INIT : 'init'
		};
		
		this.aAssets = [
			/* bgs */
			STF.Config.WEB_ROOT + 'img/bgs/pattern_black_transparent.png',
			
			/* btns */
			
			/* icons */
			
			/* logos */
			STF.Config.WEB_ROOT + 'img/logos/browsers/browser_chrome.png',
			STF.Config.WEB_ROOT + 'img/logos/browsers/browser_firefox.png',
			STF.Config.WEB_ROOT + 'img/logos/browsers/browser_internet_explorer.png',
			STF.Config.WEB_ROOT + 'img/logos/browsers/browser_opera.png',
			STF.Config.WEB_ROOT + 'img/logos/browsers/browser_safari.png'
			
			/* others */
			
		];
	}
	
	
	Assets.prototype = Object.create(STF.EventDispatcher.prototype);
	Assets.prototype.constructor = Assets;
	
	
	Assets.prototype.init = function() {
		this.assetsLoader = new STF.Loader(true, true);
		
		this.assetsLoader.buildEvt(this.assetsLoader.E.PROGRESS, _onProgress.bind(this));
		this.assetsLoader.buildEvt(this.assetsLoader.E.FILE_LOAD, _onFileLoad.bind(this));
		this.assetsLoader.buildEvt(this.assetsLoader.E.COMPLETE, _onComplete.bind(this));
		
		this.assetsLoader.startLoad(this.aAssets);
	};
	
	
	var _onProgress = function(e) {
		var percentage = Math.round( e.loaded * 100 );
		
		STF.Views.Static.MainLoader.progressLoader(percentage);
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

