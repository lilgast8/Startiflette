

APP.Views = APP.Views || {};


APP.Views.About = (function(window){
	
	
	function About() {
		APP.View.call(this);
	}
	
	
	About.prototype = Object.create(APP.View.prototype);
	About.prototype.constructor = About;
	
	
	About.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
	};
	
	
	About.prototype.bindEvents = function() {
		
	};
	
	
	About.prototype.unbindEvents = function() {
		
	};
	
	
	return new About();
	
	
})(window);

