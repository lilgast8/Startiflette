

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.Legals = (function(window){
	
	
	function Legals() {
		APP.ViewPage.call(this);
	}
	
	
	Legals.prototype = Object.create(APP.ViewPage.prototype);
	Legals.prototype.constructor = Legals;
	
	
	Legals.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.$.page.find('.email').dcSpamless();
	};
	
	
	return new Legals();
	
	
})(window);

