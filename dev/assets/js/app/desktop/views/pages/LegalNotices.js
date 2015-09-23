

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.LegalNotices = ( function( window ) {
	
	
	function LegalNotices() {
		STF.AbstractView.call( this );
	}
	
	
	LegalNotices.prototype				= Object.create( STF.AbstractView.prototype );
	LegalNotices.prototype.constructor	= LegalNotices;
	
	
	LegalNotices.prototype.initDOM = function() {
		this.$page	= $( document.getElementById( 'page-content' ) );
		this.$email	= this.$page.find( '.email' );
		
		// this.encryptMailto( this.$.email, 'contact', 'domain', 'com', true );
	};
	
	
	LegalNotices.prototype.bindEvents = function() {
		
	};
	
	
	LegalNotices.prototype.unbindEvents = function() {
		
	};
	
	
	LegalNotices.prototype.resize = function() {
		
	};
	
	
	return LegalNotices;
	
	
} ) ( window );

