

APP.Views = APP.Views || {};


APP.Views.Footer = (function(window){
	
	
	function Footer() {
		APP.View.call(this);
	}
	
	
	Footer.prototype = Object.create(APP.View.prototype);
	Footer.prototype.constructor = Footer;
	
	
	Footer.prototype.initElt = function() {
		this.$.footer = $(document.getElementById('footer'));
	};
	
	
	Footer.prototype.bindEvents = function() {
		
	};
	
	
	return new Footer();
	
	
})(window);

