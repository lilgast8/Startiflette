

APP.Loader = (function(window) {
	
	
	function Loader(fileLoadOpt, onProgress) {
		APP.EventDispatcher.call(this);
		
		this.p = {};
		
		this.EVENT = {
			STARTED : 'started',
			FILE_LOAD : 'fileload',
			COMPLETE : 'complete',
			ERROR : 'error',
			SHOWN : 'shown',
			HIDDEN : 'hidden'
		};
		
		this.isFileLoadOpt = fileLoadOpt;
		this.isOnProgress = onProgress;
		
		this.queue = new createjs.LoadQueue(true, APP.Config.WEB_ROOT);
		
		this.bindEvents();
	}
	
	
	Loader.prototype = Object.create(APP.EventDispatcher.prototype);
	Loader.prototype.constructor = Loader;
	
	
	Loader.prototype.bindEvents = function() {
		this.p.onLoadStart = $.proxy(this.onLoadStart, this);
		this.queue.addEventListener('loadstart', this.p.onLoadStart);
		
		this.p.onProgress = $.proxy(this.onProgress, this);
		this.queue.addEventListener('progress', this.p.onProgress);
		
		this.p.onFileLoad = $.proxy(this.onFileLoad, this);
		this.queue.addEventListener('fileload', this.p.onFileLoad);
		
		this.p.onComplete = $.proxy(this.onComplete, this);
		this.queue.addEventListener('complete', this.p.onComplete);
		
		this.p.onError = $.proxy(this.onError, this);
		this.queue.addEventListener('error', this.p.onError);
	};
	
	
	Loader.prototype.unbindEvents = function() {
		this.queue.removeAllEventListeners();
		
		this.p = {};
	};
	
	
	Loader.prototype.startLoad = function(aUrlImg) {
		this.queue.loadManifest(aUrlImg);
	};
	
	
	Loader.prototype.onLoadStart = function(e) {
		// console.log('loadStart loader');
	};
	
	
	Loader.prototype.onProgress = function(e) {
		// console.log('progress loader', e.loaded);
		
		if(this.isOnProgress)
			this.dispatch(this.EVENT.PROGRESS, e);
	};
	
	
	Loader.prototype.onFileLoad = function(e) {
		if(this.isFileLoadOpt)
			this.dispatch(this.EVENT.FILE_LOAD, e);
	};
	
	
	Loader.prototype.onComplete = function(e) {
		this.dispatch(this.EVENT.COMPLETE);
	};
	
	
	Loader.prototype.onError = function(e) {
		this.dispatch(this.EVENT.ERROR);
	};
	
	
	Loader.prototype.close = function(e) {
		this.queue.close();
	};
	
	
	Loader.prototype.destroy = function() {
		this.unbindEvents();
		this.queue = null;
	};
	
	
	return Loader;
	
	
})(window);

