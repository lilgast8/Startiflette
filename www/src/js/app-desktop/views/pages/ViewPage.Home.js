

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.Home = (function(window){
	
	
	function Home() {
		APP.ViewPage.call(this);
		
		this.name = 'home';
	}
	
	
	Home.prototype = Object.create(APP.ViewPage.prototype);
	Home.prototype.constructor = Home;
	
	
	Home.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
	};
	
	
	Home.prototype.bindEvents = function() {
		this.p.resizeWindow = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.p.resizeWindow);
	};
	
	
	Home.prototype.unbindEvents = function() {
		APP.Main.$.window.off('resize', this.p.resizeWindow);
		
		this.p = {};
	};
	
	
	var _resize = function() {
		APP.Main.resize();
	};
	
	
	return new Home();
	
	
})(window);

