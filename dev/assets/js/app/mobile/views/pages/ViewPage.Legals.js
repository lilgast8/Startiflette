

STF.Views = STF.Views || {};
STF.Views.Page = STF.Views.Page || {};


STF.Views.Page.Legals = (function(window) {
	
	
	function Legals() {
		STF.ViewPage.call(this);
		
		this.name = 'legals';
	}
	
	
	Legals.prototype = Object.create(STF.ViewPage.prototype);
	Legals.prototype.constructor = Legals;
	
	
	Legals.prototype.initEl = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.$.email = this.$.page.find('.email');
		
		this.encryptMailto(this.$.email, 'contact', 'domain', 'com', true);
	};
	
	
	return new Legals();
	
	
})(window);

