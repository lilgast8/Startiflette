

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.About = (function(window) {
	
	
	function About() {
		APP.ViewPage.call(this);
		
		this.name = 'about';
	}
	
	
	About.prototype = Object.create(APP.ViewPage.prototype);
	About.prototype.constructor = About;
	
	
	About.prototype.initEl = function() {
		this.$.page = $(document.getElementById('page-content'));
	};
	
	
	About.prototype.bindEvents = function() {
		this.p.resizeWindow = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.p.resizeWindow);
	};
	
	
	About.prototype.unbindEvents = function() {
		APP.Main.$.window.off('resize', this.p.resizeWindow);
		
		this.p = {};
	};
	
	
	var _resize = function() {
		APP.Main.resize();
	};
	
	
	return new About();
	
	
})(window);

