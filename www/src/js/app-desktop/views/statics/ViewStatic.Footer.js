

APP.Views = APP.Views || {};
APP.Views.Static = APP.Views.Static || {};


APP.Views.Static.Footer = (function(window){
	
	
	function Footer() {
		APP.ViewStatic.call(this);
	}
	
	
	Footer.prototype = Object.create(APP.ViewStatic.prototype);
	Footer.prototype.constructor = Footer;
	
	
	Footer.prototype.initEl = function() {
		this.$.footer = $(document.getElementById('footer'));
		this.$.footerLgLink = this.$.footer.find('.footer-lg-link');
		this.$.footerLink = this.$.footer.find('.footer-link');
	};
	
	
	Footer.prototype.bindEvents = function() {
		this.p.clickChangePage = $.proxy(this.changePage, this);
		this.$.footerLink.on('click', this.p.clickChangePage);
	};
	
	
	return new Footer();
	
	
})(window);

