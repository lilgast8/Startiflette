

APP.Model = APP.Model || {};


APP.Model.Global = (function(window) {
	
	
	function Global() {
		APP.EventDispatcher.call(this);
		
		this.v = {};
		
		this.EVENT = {
			INIT : 'init'
		};
		
		this.aJsonToLoad = [
			{ id:'pages', src:'json/'+APP.Config.LG+'/pages.json' },
			{ id:'projects', src:'json/'+APP.Config.LG+'/projects.json' }
		];
		
		this.json = {};
	}
	
	
	Global.prototype = Object.create(APP.EventDispatcher.prototype);
	Global.prototype.constructor = Global;
	
	
	Global.prototype.init = function() {
		if(APP.Config.MULTI_LG)
			_addInfosOthersLg.call(this);
		
		this.jsonLoader = new APP.Loader(true);
		
		this.jsonLoader.buildEvt(this.jsonLoader.EVENT.FILE_LOAD, _onFileLoad.bind(this));
		this.jsonLoader.buildEvt(this.jsonLoader.EVENT.COMPLETE, _onComplete.bind(this));
		
		this.jsonLoader.startLoad(this.aJsonToLoad);
	};
	
	
	var _addInfosOthersLg = function() {
		var lgTemp;
		
		for(var i=0; i<APP.Config.ALL_LG.length; i++) {
			lgTemp = APP.Config.ALL_LG[i];
			
			if(lgTemp != APP.Config.LG)
				this.aJsonToLoad.push({
					id :'page-'+lgTemp,
					src : 'json/'+lgTemp+'/pages.json'
				});
		}
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

