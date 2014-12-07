

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.About = (function(window){
	
	
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
		
	};
	
	
	About.prototype.unbindEvents = function() {
		
	};
	
	
	About.prototype.resize = function() {
		
	};
	
	
	return new About();
	
	
})(window);

