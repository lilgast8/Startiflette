

APP.Views = APP.Views || {};


APP.Views.Home = (function(window){
	
	
	function Home() {
		APP.View.call(this);
	}
	
	
	Home.prototype = Object.create(APP.View.prototype);
	Home.prototype.constructor = Home;
	
	
	Home.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
	};
	
	
	Home.prototype.bindEvents = function() {
		
	};
	
	
	Home.prototype.unbindEvents = function() {
		
	};
	
	
	return new Home();
	
	
})(window);

