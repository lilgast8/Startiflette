

APP.Views = APP.Views || {};


APP.Views.Header = (function(window){
	
	
	function Header() {
		APP.View.call(this);
	}
	
	
	Header.prototype = Object.create(APP.View.prototype);
	Header.prototype.constructor = Header;
	
	
	Header.prototype.initElt = function() {
		this.$.header = $(document.getElementById('header'));
	};
	
	
	Header.prototype.bindEvents = function() {
		
	};
	
	
	return new Header();
	
	
})(window);

