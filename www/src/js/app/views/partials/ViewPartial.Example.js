

MJP.Views = MJP.Views || {};
MJP.Views.Partial = MJP.Views.Partial || {};


MJP.Views.Partial.Example = (function(window){
	
	
	function Example() {
		MJP.ViewPartial.call(this);
	}
	
	
	Example.prototype = Object.create(MJP.ViewPartial.prototype);
	Example.prototype.constructor = Example;
	
	
	Example.prototype.initElt = function() {
		
	};
	
	
	Example.prototype.bindEvents = function() {
		
	};
	
	
	Example.prototype.unbindEvents = function() {
		
	};
	
	
	Example.prototype.killTweens = function() {
		
	};
	
	
	Example.prototype.destroy = function() {
		this.unbindEvents();
		
		this.killTweens();
		
		this.$ = {};
		this.v = {};
	};
	
	
	return Example;
	
	
})(window);

