

STF.Views.Pages.LegalNotices = class LegalNotices extends STF.Abstracts.AbstractPageView {
	
	
	constructor() {
		super();
	}
	
	
	initDOM() {
		super.initDOM();
		
		this.$email	= this.$page.find( '.email' );
		
		// STF_gl_encryptMailto( this.$.email, 'contact', 'domain', 'com', true );
	}
	
	
	bindEvents() {
		super.bindEvents();
	}
	
	
	unbindEvents() {
		super.unbindEvents();
	}
	
	
	resize() {
		
	}
	
	
};

