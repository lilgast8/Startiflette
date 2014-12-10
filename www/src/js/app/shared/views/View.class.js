

APP.View = (function(window) {
	
	
	function View() {
		APP.EventDispatcher.call(this);
		
		this.$ = {};
		this.p = {};
		this.v = {};
		this.tw = {};
		this.tl = {};
	}
	
	
	View.prototype = Object.create(APP.EventDispatcher.prototype);
	View.prototype.constructor = View;
	
	
	View.prototype.init = function() {
		this.initEl();
		this.bindEvents();
	};
	
	
	View.prototype.initEl = function() {
		
	};
	
	
	View.prototype.bindEvents = function() {
		
	};
	
	
	View.prototype.unbindEvents = function() {
		
	};
	
	
	View.prototype.killTweens = function() {
		/* tween */
		for(var tween in this.tw) {
			var tw = this.tw[tween];
			
			tw.kill();
		}
		
		/* timeline */
		for(var timeline in this.tl) {
			var tl = this.tl[timeline];
			
			tl.stop();
			tl.kill();
			tl.clear();
		}
		
		this.tl = {};
		this.tw = {};
	};
	
	
	View.prototype.destroy = function() {
		this.unbindEvents();
		
		this.killTweens();
		
		this.$ = {};
		this.p = {};
		this.v = {};
	};
	
	
	View.prototype.resize = function() {
		
	};
	
	
	View.prototype.changePage = function(e) {
		e.preventDefault();
		
		var url = e.currentTarget.href;
		
		if(APP.Config.HAS_PUSHSTATE) // if pushstate supported
			APP.RoutesManager.goToPage(url);
		else // if pushstate not supported
			window.location = url;
	};
	
	
	return View;
	
	
})(window);

