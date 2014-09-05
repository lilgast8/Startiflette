

MJP.Views = MJP.Views || {};
MJP.Views.Page = MJP.Views.Page || {};


MJP.Views.Page.Example = (function(window){
	
	
	function Example() {
		MJP.ViewPage.call(this);
	}
	
	
	Example.prototype = Object.create(MJP.ViewPage.prototype);
	Example.prototype.constructor = Example;
	
	
	Example.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
	};
	
	
	Example.prototype.bindEvents = function() {
		this.p.resizeWindow = $.proxy(_resize, this);
		MJP.Main.$.window.on('resize', this.p.resizeWindow);
	};
	
	
	Example.prototype.unbindEvents = function() {
		MJP.Main.$.window.off('resize', this.p.resizeWindow);
		
		this.p = {};
	};
	
	
	var _resize = function() {
		MJP.Main.resize();
	};
	
	
	return new Example();
	
	
})(window);

