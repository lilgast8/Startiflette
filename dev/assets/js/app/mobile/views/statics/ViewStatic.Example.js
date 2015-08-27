

APP.Views = APP.Views || {};
APP.Views.Static = APP.Views.Static || {};


APP.Views.Static.Example = (function(window) {
	
	
	function Example() {
		APP.View.call(this);
	}
	
	
	Example.prototype = Object.create(APP.View.prototype);
	Example.prototype.constructor = Example;
	
	
	Example.prototype.initEl = function() {
		
	};
	
	
	Example.prototype.bindEvents = function() {
		
	};
	
	
	Example.prototype.unbindEvents = function() {
		
	};
	
	
	Example.prototype.resize = function() {
		
	};
	
	
	return new Example();
	
	
})(window);

