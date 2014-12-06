

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.Example = (function(window){
	
	
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
		this.p.resizeWindow = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.p.resizeWindow);
	};
	
	
	Example.prototype.unbindEvents = function() {
		APP.Main.$.window.off('resize', this.p.resizeWindow);
		
		this.p = {};
	};
	
	
	var _resize = function() {
		APP.Main.resize();
	};
	
	
	return new Example();
	
	
})(window);

