

MJP.Views = MJP.Views || {};
MJP.Views.Static = MJP.Views.Static || {};


MJP.Views.Static.Example = (function(window){
	
	
	function Example() {
		MJP.ViewStatic.call(this);
	}
	
	
	Example.prototype = Object.create(MJP.ViewStatic.prototype);
	Example.prototype.constructor = Example;
	
	
	Example.prototype.initElt = function() {
		
	};
	
	
	Example.prototype.bindEvents = function() {
		
	};
	
	
	Example.prototype.unbindEvents = function() {
		
	};
	
	
	return new Example();
	
	
})(window);

