

STF.Views = STF.Views || {};
STF.Views.Page = STF.Views.Page || {};


STF.Views.Page.Home = (function(window) {
	
	
	function Home() {
		STF.ViewPage.call(this);
		
		this.name = 'home';
	}
	
	
	Home.prototype = Object.create(STF.ViewPage.prototype);
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

