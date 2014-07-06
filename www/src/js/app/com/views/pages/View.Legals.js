

APP.Views = APP.Views || {};


APP.Views.Legals = (function(window){
	
	
	function Legals() {
		APP.View.call(this);
	}
	
	
	Legals.prototype = Object.create(APP.View.prototype);
	Legals.prototype.constructor = Legals;
	
	
	Legals.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.$.page.find('.email').dcSpamless();
	};
	
	
	return new Legals();
	
	
})(window);

