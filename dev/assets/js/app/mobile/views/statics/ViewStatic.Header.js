

APP.Views = APP.Views || {};
APP.Views.Static = APP.Views.Static || {};


APP.Views.Static.Header = (function(window) {
	
	
	function Header() {
		APP.View.call(this);
	}
	
	
	Header.prototype = Object.create(APP.View.prototype);
	Header.prototype.constructor = Header;
	
	
	Header.prototype.initEl = function() {
		this.$.header = $(document.getElementById('header'));
		this.$.menu = $(document.getElementById('menu'));
		this.$.menuLink = this.$.menu.find('.menu-link');
	};
	
	
	Header.prototype.bindEvents = function() {
		this.p.clickMenuLink = $.proxy(this.changePage, this);
		this.$.menuLink.on('click', this.p.clickMenuLink);
	};
	
	
	return new Header();
	
	
})(window);

