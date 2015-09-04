

APP.Loader = (function(window) {
	
	
	function Loader(isOnProgress) {
		APP.EventDispatcher.call(this);
		
		this.p = {};
		
		this.E = {
			STARTED:	'started',
			FILE_LOAD:	'fileload',
			COMPLETE:	'complete',
			ERROR:		'error',
			SHOWN:		'shown',
			HIDDEN:		'hidden'
		};
		
		this.isOnProgress	= isOnProgress;
		
		// this.queue = new createjs.LoadQueue(true, APP.Config.WEB_ROOT);
		// this.queue = new createjs.LoadQueue(true);
		
		// this.bindEvents();
		
		
		// this.items	= [];
		this.datas	= [];
		this.queue	= null;
		
		this.init();
	}
	
	
	Loader.prototype = Object.create(APP.EventDispatcher.prototype);
	Loader.prototype.constructor = Loader;
	
	
	Loader.prototype.init = function() {
		this.queue = new createjs.LoadQueue(true);
		
		this.bindEvents();
	};
	
	
	Loader.prototype.bindEvents = function() {
		this.p.onLoadStart = $.proxy(_onLoadStart, this);
		this.queue.addEventListener('loadstart', this.p.onLoadStart);
		
		this.p.onProgress = $.proxy(_onProgress, this);
		this.queue.addEventListener('progress', this.p.onProgress);
		
		this.p.onFileLoad = $.proxy(_onFileLoad, this);
		this.queue.addEventListener('fileload', this.p.onFileLoad);
		
		this.p.onComplete = $.proxy(_onComplete, this);
		this.queue.addEventListener('complete', this.p.onComplete);
		
		this.p.onError = $.proxy(_onError, this);
		this.queue.addEventListener('error', this.p.onError);
	};
	
	
	Loader.prototype.unbindEvents = function() {
		this.queue.removeAllEventListeners();
		
		this.p = {};
	};
	
	
	Loader.prototype.startLoad = function( items ) {
		if ( !items.length ) {
			this.onComplete.call( this );
			return;
		}
		
		this.queue.loadManifest( items );
	};
	
	
	Loader.prototype.destroy = function() {
		this.unbindEvents();
		this.queue = null;
	};
	
	
	var _onLoadStart = function(e) {
		// console.log('Loader._loadStart()');
	};
	
	
	var _onProgress = function(e) {
		if ( this.isOnProgress )
			this.dispatch( this.E.PROGRESS, e );
	};
	
	
	var _onFileLoad = function(e) {
		this.datas[ e.item.id ] = e.result;
	};
	
	
	var _onComplete = function(e) {
		// this.dispatch(this.E.COMPLETE, e);
		// this.dispatch(this.E.COMPLETE, this.items);
		this.dispatch( this.E.COMPLETE, this.datas );
	};
	
	
	var _onError = function(e) {
		this.dispatch(this.E.ERROR);
	};
	
	
	return Loader;
	
	
})(window);

