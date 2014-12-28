

APP.Model = APP.Model || {};


APP.Model.Global = (function(window) {
	
	
	function Global() {
		APP.EventDispatcher.call(this);
		
		this.E = {
			INIT : 'init'
		};
		
		this.aJsonToLoad = [
			{
				id	: 'pages',
				src	: 'json/pages.json'
			},
			{
				id	: 'projects',
				src	: 'json/projects.json'
			}
		];
		
		this.json = {};
	}
	
	
	Global.prototype = Object.create(APP.EventDispatcher.prototype);
	Global.prototype.constructor = Global;
	
	
	Global.prototype.init = function() {
		this.jsonLoader = new APP.Loader(true, false);
		
		this.jsonLoader.buildEvt(this.jsonLoader.E.FILE_LOAD, _onFileLoad.bind(this));
		this.jsonLoader.buildEvt(this.jsonLoader.E.COMPLETE, _onComplete.bind(this));
		
		this.jsonLoader.startLoad(this.aJsonToLoad);
	};
	
	var _onFileLoad = function(e) {
		if(e.item.id == 'pages')
			this.json[e.item.id] = e.result;
		
		else {
			this.json.subPages = this.json.subPages || {};
			this.json.subPages[e.item.id] = e.result;
		}
		
		// this.json[e.item.id] = e.result;
	};
	
	
	var _onComplete = function(e) {
		this.dispatch(this.E.INIT);
		
		this.jsonLoader.destroyEvt(this.jsonLoader.E.FILE_LOAD, _onFileLoad.bind(this));
		this.jsonLoader.destroyEvt(this.jsonLoader.E.COMPLETE, _onComplete.bind(this));
		
		this.jsonLoader.destroy();
		this.jsonLoader = null;
	};
	
	
	return new Global();
	
	
})(window);

