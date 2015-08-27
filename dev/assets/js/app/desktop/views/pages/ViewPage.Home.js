

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.Home = (function(window) {
	
	
	function Home() {
		APP.ViewPage.call(this);
		
		this.name = 'home';
	}
	
	
	Home.prototype = Object.create(APP.ViewPage.prototype);
	Home.prototype.constructor = Home;
	
	
	Home.prototype.initEl = function() {
		this.$.page = $(document.getElementById('page-content'));
	};
	
	
	Home.prototype.bindEvents = function() {
		
	};
	
	
	Home.prototype.unbindEvents = function() {
		
	};
	
	
	Home.prototype.resize = function() {
		
	};
	
	
	return new Home();
	
	
})(window);

