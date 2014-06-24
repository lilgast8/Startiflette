

APP.Loader = (function(window) {
	
	
	function Loader() {
		APP.EventDispatcher.call(this);
		
		this.EVENT = {
			STARTED : 'started',
			ENDED : 'ended',
			ERROR : 'error',
			SHOWN : 'shown',
			HIDDEN : 'hidden'
		};
		
		this.queue = null;
	}
	
	
	Loader.prototype = Object.create(APP.EventDispatcher.prototype);
	Loader.prototype.constructor = Loader;
	
	
	Loader.prototype.init = function() {
		this.queue = new createjs.LoadQueue(true, APP.Config.WEB_ROOT);
		
		this.bindEvents.call(this);
	};
	
	
	Loader.prototype.initLoad = function(aUrlImg) {
		this.queue.loadManifest(aUrlImg);
	};
		
		
	Loader.prototype.bindEvents = function() {
		this.onLoadStartProxy = $.proxy(this.onLoadStart, this);
		this.queue.addEventListener('loadstart', this.onLoadStartProxy);
		
		this.onProgressProxy = $.proxy(this.onProgress, this);
		this.queue.addEventListener('progress', this.onProgressProxy);
		
		this.onCompleteProxy = $.proxy(this.onComplete, this);
		this.queue.addEventListener('complete', this.onCompleteProxy);
		
		this.onErrorProxy = $.proxy(this.onError, this);
		this.queue.addEventListener('error', this.onErrorProxy);
	};
	
	
	Loader.prototype.unbindEvents = function() {
		this.queue.removeAllEventListeners();
		this.onLoadStartProxy = null;
		this.onProgressProxy = null;
		this.onCompleteProxy = null;
		this.onErrorProxy = null;
	};
	
	
	Loader.prototype.onLoadStart = function(e) {
	//	console.log('loadStart loader');
	};
	
	
	Loader.prototype.onProgress = function(e) {
	//	console.log('progress loader', e.loaded);
	};
	
	
	Loader.prototype.onComplete = function(e) {
		this.dispatch(this.EVENT.ENDED);
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

