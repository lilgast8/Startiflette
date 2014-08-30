

APP.Views = APP.Views || {};
APP.Views.Static = APP.Views.Static || {};


APP.Views.Static.Footer = (function(window){
	
	
	function Footer() {
		APP.ViewStatic.call(this);
	}
	
	
	Footer.prototype = Object.create(APP.ViewStatic.prototype);
	Footer.prototype.constructor = Footer;
	
	
	Footer.prototype.initElt = function() {
		this.$.footer = $(document.getElementById('footer'));
	};
	
	
	Footer.prototype.bindEvents = function() {
		
	};
	
	
	return new Footer();
	
	
})(window);

