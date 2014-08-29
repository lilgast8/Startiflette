

APP.Model = APP.Model || {};


APP.Model.Global = (function(window) {
	
	
	function Global() {
		APP.EventDispatcher.call(this);
		
		this.v = {};
		
		this.EVENT = {
			INIT : 'init'
		};
		
		this.aJsonToLoad = [
			{ id:'infosPages', src:'json/infos-pages-'+APP.Config.LG+'.json' }
		];
		
		this.json = {
			infosPages : null
		};
	}
	
	
	Global.prototype = Object.create(APP.EventDispatcher.prototype);
	Global.prototype.constructor = Global;
	
	
	Global.prototype.init = function() {
		this.jsonLoader = new APP.Loader(true);
		
		this.jsonLoader.buildEvt(this.jsonLoader.EVENT.FILE_LOAD, _onFileLoad.bind(this));
		this.jsonLoader.buildEvt(this.jsonLoader.EVENT.COMPLETE, _onComplete.bind(this));
		
		this.jsonLoader.startLoad(this.aJsonToLoad);
	};
	
	
	var _onFileLoad = function(e) {
		this.json[e.item.id] = e.result;
	};
	
	
	var _onComplete = function(e) {
		this.dispatch(this.EVENT.INIT);
		
		this.jsonLoader.destroyEvt(this.jsonLoader.EVENT.FILE_LOAD, _onFileLoad.bind(this));
		this.jsonLoader.destroyEvt(this.jsonLoader.EVENT.COMPLETE, _onComplete.bind(this));
		
		this.jsonLoader.destroy();
		this.jsonLoader = null;
	};
	
	
	return new Global();
	
	
})(window);

