

APP.Views = APP.Views || {};
APP.Views.Static = APP.Views.Static || {};


APP.Views.Static.MainLoader = (function(window) {
	
	
	function MainLoader() {
		APP.View.call(this);
	}
	
	
	MainLoader.prototype = Object.create(APP.View.prototype);
	MainLoader.prototype.constructor = MainLoader;
	
	
	MainLoader.prototype.initEl = function() {
		this.$.loader = $(document.getElementById('loader'));
	};
	
	
	MainLoader.prototype.bindEvents = function() {
		
	};
	
	
	MainLoader.prototype.unbindEvents = function() {
		
	};
	
	
	MainLoader.prototype.resize = function() {
		
	};
	
	
	MainLoader.prototype.hidePreloader = function() {
		// hide preloader if need
		// play intro if need and at the end of it dispatch APP.RoutesManager.currentView.E.SHOWN
		
		
		// if don't need to hide preloader just dispath APP.RoutesManager.currentView.E.SHOWN
		APP.RoutesManager.currentView.dispatch(APP.RoutesManager.currentView.E.SHOWN); // dispatch event to enable page change
	};
	
	
	MainLoader.prototype.hide = function() {
		this.tw.hideLoader = TweenLite.to(this.$.loader, 0.8, {opacity:0, display:'none', ease:Quart.easeOut});
		
		// if(APP.RoutesManager.prevView == null) // if need a different behavior in the first load.
	};
	
	
	MainLoader.prototype.show = function() {
		this.tw.showLoader = TweenLite.to(this.$.loader, 0.8, {opacity:1, display:'block', ease:Quart.easeOut});
	};
	
	
	return new MainLoader();
	
	
})(window);

