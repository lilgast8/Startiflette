

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.Legals = (function(window){
	
	
	function Legals() {
		APP.ViewPage.call(this);
		
		this.name = 'legals';
	}
	
	
	Legals.prototype = Object.create(APP.ViewPage.prototype);
	Legals.prototype.constructor = Legals;
	
	
	Legals.prototype.initEl = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.$.email = this.$.page.find('.email');
		
		encryptMailto.call(this);
	};
	
	
	var encryptMailto = function() {
		for(var i=0; i<this.$.email.length; i++) {
			
			initMailto(this.$.email[i], 'CONTACT', 'DOMAIN', 'COM');
		}
		
	};
	
	
	return new Legals();
	
	
})(window);

