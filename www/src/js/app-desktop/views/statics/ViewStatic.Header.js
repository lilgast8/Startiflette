

APP.Views = APP.Views || {};
APP.Views.Static = APP.Views.Static || {};


APP.Views.Static.Header = (function(window){
	
	
	function Header() {
		APP.ViewStatic.call(this);
	}
	
	
	Header.prototype = Object.create(APP.ViewStatic.prototype);
	Header.prototype.constructor = Header;
	
	
	Header.prototype.initEl = function() {
		this.$.header = $(document.getElementById('header'));
		this.$.menu = $(document.getElementById('menu'));
		this.$.menuLink = this.$.menu.find('.menu-link');
	};
	
	
	Header.prototype.bindEvents = function() {
		this.p.clickChangePage = $.proxy(this.changePage, this);
		this.$.menuLink.on('click', this.p.clickChangePage);
	};
	
	
	return new Header();
	
	
})(window);

