

APP.View = (function(window) {
	
	
	function View() {
		APP.EventDispatcher.call(this);
		
		this.$ = {};
		this.p = {};
		this.v = {};
	}
	
	
	View.prototype = Object.create(APP.EventDispatcher.prototype);
	View.prototype.constructor = View;
	
	
	View.prototype.init = function() {
		this.initElt();
		this.bindEvents();
	};
	
	
	View.prototype.initElt = function() {
		
	};
	
	
	View.prototype.bindEvents = function() {
		
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

