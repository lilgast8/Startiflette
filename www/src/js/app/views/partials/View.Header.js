

APP.Views = APP.Views || {};


APP.Views.Header = (function(window){
	
	
	function Header() {
		APP.View.call(this);
	}
	
	
	Header.prototype = Object.create(APP.View.prototype);
	Header.prototype.constructor = Header;
	
	
	Header.prototype.initElt = function() {
		this.$.header = $(document.getElementById('header'));
		this.$.menu = $(document.getElementById('menu'));
		this.$.menuLink = this.$.menu.find('.menu-link');
	};
	
	
	Header.prototype.bindEvents = function() {
		this.p.clickChangePage = $.proxy(this.clickChangePage, this);
		this.$.menuLink.on('click', this.p.clickChangePage);
	};
	
	
	return new Header();
	
	
})(window);

