

APP.Views = APP.Views || {};
APP.Views.Static = APP.Views.Static || {};


APP.Views.Static.Example = (function(window) {
	
	
	function Example() {
		APP.ViewStatic.call(this);
	}
	
	
	Example.prototype = Object.create(APP.ViewStatic.prototype);
	Example.prototype.constructor = Example;
	
	
	Example.prototype.initEl = function() {
		
	};
	
	
	Example.prototype.bindEvents = function() {
		
	};
	
	
	Example.prototype.unbindEvents = function() {
		
	};
	
	
	return new Example();
	
	
})(window);

