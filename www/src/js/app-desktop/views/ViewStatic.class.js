

APP.ViewStatic = (function(window) {
	
	
	function ViewStatic() {
		APP.View.call(this);
	}
	
	
	ViewStatic.prototype = Object.create(APP.View.prototype);
	ViewStatic.prototype.constructor = ViewStatic;
	
	
	ViewStatic.prototype.initElt = function() {
		
	};
	
	
	ViewStatic.prototype.bindEvents = function() {
		
	};
	
	
	ViewStatic.prototype.unbindEvents = function() {
		
	};
	
	
	return ViewStatic;
	
	
})(window);

