

APP.ViewPartial = (function(window) {
	
	
	function ViewPartial() {
		APP.View.call(this);
	}
	
	
	ViewPartial.prototype = Object.create(APP.View.prototype);
	ViewPartial.prototype.constructor = ViewPartial;
	
	
	ViewPartial.prototype.initEl = function() {
		
	};
	
	
	ViewPartial.prototype.bindEvents = function() {
		
	};
	
	
	ViewPartial.prototype.unbindEvents = function() {
		
	};
	
	
	ViewPartial.prototype.killTweens = function() {
		
	};
	
	
	ViewPartial.prototype.destroy = function() {
		this.unbindEvents();
		
		this.killTweens();
		
		this.$ = {};
		this.v = {};
	};
	
	
	return ViewPartial;
	
	
})(window);

