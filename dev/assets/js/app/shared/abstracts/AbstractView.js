

APP.AbstractView = ( function( window ) {
	
	
	function AbstractView() {
		APP.EventDispatcher.call( this );
		
		// this.$	= {};
		// this.v	= {};
		// this.o	= {};
		this.tw	= {};
		this.tl	= {};
	}
	
	
	AbstractView.prototype				= Object.create( APP.EventDispatcher.prototype );
	AbstractView.prototype.constructor	= AbstractView;
	
	
	AbstractView.prototype.init = function() {
		this.initDOM();
		this.bindEvents();
		this.initTl();
	};
	
	
	AbstractView.prototype.initDOM = function() {
		
	};
	
	
	AbstractView.prototype.bindEvents = function() {
		
	};
	
	
	AbstractView.prototype.unbindEvents = function() {
		
	};
	
	
	AbstractView.prototype.initTl = function() {
		
	};
	
	
	AbstractView.prototype.initView = function() {
		
	};
	
	
	AbstractView.prototype.showView = function() {
		
	};
	
	
	AbstractView.prototype.hideView = function() {
		
	};
	
	
	AbstractView.prototype.destroyGSAP = function() {
		/* tween */
		for(var tween in this.tw) {
			var tw = this.tw[tween];
			
			tw.kill();
		}
		
		/* timeline */
		for(var timeline in this.tl) {
			var tl = this.tl[timeline];
			
			tl.stop();
			tl.clear();
			tl.kill();
		}
		
		this.tl = {};
		this.tw = {};
	};
	
	
	AbstractView.prototype.killTween = function(twName) {
		this.tw[twName].kill();
		
		this.tw[twName] = null;
	};
	
	
	AbstractView.prototype.killTimeline = function(tlName) {
		this.tl[tlName].stop();
		this.tl[tlName].clear();
		this.tl[tlName].kill();
		
		this.tl[tlName] = null;
	};
	
	
	AbstractView.prototype.destroy = function() {
		this.unbindEvents();
		
		this.destroyGSAP();
		
		this.$ = {};
		this.p = {};
		this.v = {};
	};
	
	
	AbstractView.prototype.resize = function() {
		
	};
	
	
	/*AbstractView.prototype.changePage = function(e) {
		if(APP.Config.HAS_PUSHSTATE) { // if pushstate supported
			e.preventDefault();
			
			var url = e.currentTarget.href;
			
			APP.RoutesManager.goToPage(url);
		}
	};*/
	
	
	return AbstractView;
	
	
} ) ( window );

