

STF.Views = STF.Views || {};
STF.Views.Page = STF.Views.Page || {};


STF.Views.Page.Example = (function(window) {
	
	
	function Example() {
		STF.ViewPage.call(this);
		
		this.name = 'example';
	}
	
	
	Example.prototype = Object.create(STF.ViewPage.prototype);
	Example.prototype.constructor = Example;
	
	
	Example.prototype.initEl = function() {
		this.$.page = $(document.getElementById('page-content'));
	};
	
	
	Example.prototype.bindEvents = function() {
		
	};
	
	
	Example.prototype.unbindEvents = function() {
		
	};
	
	
	Example.prototype.resize = function() {
		
	};
	
	
	return new Example();
	
	
})(window);

