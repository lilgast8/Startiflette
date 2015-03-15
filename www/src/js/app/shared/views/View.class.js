

APP.View = (function(window) {
	
	
	function View() {
		APP.EventDispatcher.call(this);
		
		this.$	= {};
		this.p	= {};
		this.v	= {};
		this.tw	= {};
		this.tl	= {};
	}
	
	
	View.prototype = Object.create(APP.EventDispatcher.prototype);
	View.prototype.constructor = View;
	
	
	View.prototype.init = function() {
		this.initEl();
		this.bindEvents();
	};
	
	
	View.prototype.initEl = function() {
		
	};
	
	
	View.prototype.bindEvents = function() {
		
	};
	
	
	View.prototype.unbindEvents = function() {
		
	};
	
	
	View.prototype.destroyGSAP = function() {
		/* tween */
		for(var tween in this.tw) {
			var tw = this.tw[tween];
			
			tw.kill();
		}
		
		/* timeline */
		for(var timeline in this.tl) {
			var tl = this.tl[timeline];
			
			tl.stop();
			tl.clear();
			tl.kill();
		}
		
		this.tl = {};
		this.tw = {};
	};
	
	
	View.prototype.killTween = function(twName) {
		this.tw[twName].kill();
		
		this.tw[twName] = null;
	};
	
	
	View.prototype.killTimeline = function(tlName) {
		this.tl[tlName].stop();
		this.tl[tlName].clear();
		this.tl[tlName].kill();
		
		this.tl[tlName] = null;
	};
	
	
	View.prototype.destroy = function() {
		this.unbindEvents();
		
		this.destroyGSAP();
		
		this.$ = {};
		this.p = {};
		this.v = {};
	};
	
	
	View.prototype.resize = function() {
		
	};
	
	
	View.prototype.changePage = function(e) {
		e.preventDefault();
		
		var url = e.currentTarget.href;
		
		if(APP.Config.HAS_PUSHSTATE) // if pushstate supported
			APP.RoutesManager.goToPage(url);
		else // if pushstate not supported
			window.location = url;
	};
	
	
	View.prototype.encryptMailto = function($email, address, domain, end, replaceContent) {
		for ( var i = 0; i < $email.length; i++)
			initMailto($email[i], address, domain, end, replaceContent);
	};
	
	
	return View;
	
	
})(window);

