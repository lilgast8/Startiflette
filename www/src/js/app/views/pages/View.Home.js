

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
		this.p.resizeWindow = $.proxy(_resize, this);
		GTS.Main.$.window.on('resize', this.p.resizeWindow);
	};
	
	
	Home.prototype.unbindEvents = function() {
		GTS.Main.$.window.off('resize', this.p.resizeWindow);
		
		this.p = {};
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		console.log('resize');
	};
	
	
	return new Home();
	
	
})(window);

