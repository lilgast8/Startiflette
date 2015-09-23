

STF.Views = STF.Views || {};
STF.Views.Page = STF.Views.Page || {};


STF.Views.Page.About = (function(window) {
	
	
	function About() {
		STF.ViewPage.call(this);
		
		this.name = 'about';
	}
	
	
	About.prototype = Object.create(STF.ViewPage.prototype);
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

