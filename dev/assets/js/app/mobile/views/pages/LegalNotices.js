

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.LegalNotices = ( function( window ) {


class LegalNotices extends STF.AbstractPageView {
	
	
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
	
	
}


return LegalNotices;


} ) ( window );

