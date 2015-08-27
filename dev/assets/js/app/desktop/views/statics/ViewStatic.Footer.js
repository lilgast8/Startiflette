

APP.Views = APP.Views || {};
APP.Views.Static = APP.Views.Static || {};


APP.Views.Static.Footer = (function(window) {
	
	
	function Footer() {
		APP.View.call(this);
	}
	
	
	Footer.prototype = Object.create(APP.View.prototype);
	Footer.prototype.constructor = Footer;
	
	
	Footer.prototype.initEl = function() {
		this.$.footer = $(document.getElementById('footer'));
		this.$.footerLgLink = this.$.footer.find('.footer-lg-link');
		this.$.footerLink = this.$.footer.find('.footer-link');
	};
	
	
	Footer.prototype.bindEvents = function() {
		this.p.clickFooterLink = $.proxy(this.changePage, this);
		this.$.footerLink.on('click', this.p.clickFooterLink);
	};
	
	
	return new Footer();
	
	
})(window);

