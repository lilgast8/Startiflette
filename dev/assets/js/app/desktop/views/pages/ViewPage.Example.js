

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.Example = (function(window) {
	
	
	function Example() {
		APP.ViewPage.call(this);
		
		this.name = 'example';
	}
	
	
	Example.prototype = Object.create(APP.ViewPage.prototype);
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

