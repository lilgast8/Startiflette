

APP.Model = APP.Model || {};


APP.Model.Global = (function(window) {
	
	
	function Global() {
		APP.EventDispatcher.call(this);
		
		this.$ = {};
		this.p = {};
		this.v = {};
		
		this.EVENT = {
			INIT : 'init'
		};
		
		this.json = {
			infosPages : null
		};
	}
	
	
	Global.prototype = Object.create(APP.EventDispatcher.prototype);
	Global.prototype.constructor = Global;
	
	
	Global.prototype.init = function() {
		this.queue = new createjs.LoadQueue(true, APP.Config.WEB_ROOT);
		
		_bindEvents.call(this);
		
		this.queue.loadManifest([
			{ id:'infosPages', src:'json/infos-pages-'+APP.Config.LG+'.json' }
		]);
	};
	
	
	var _bindEvents = function() {
		this.onFileLoadProxy = $.proxy(_onFileLoad, this);
		this.queue.addEventListener('fileload', this.onFileLoadProxy);
		this.onCompleteProxy = $.proxy(_onComplete, this);
		this.queue.addEventListener('complete', this.onCompleteProxy);
	};
	
	
	var _onFileLoad = function(e) {
		this.json[e.item.id] = e.result;
	};
	
	
	var _onComplete = function(e) {
		this.queue.removeAllEventListeners();
		this.onCompleteProxy = null;
		this.onFileLoadProxy = null;
		this.queue = null;
		
		this.dispatch(this.EVENT.INIT);
	//	_init.call(this);
	};
	
	
	return new Global();
	
	
})(window);

