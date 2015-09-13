

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.LegalNoticesView = ( function( window ) {
	
	
	function LegalNoticesView() {
		APP.AbstractView.call( this );
	}
	
	
	LegalNoticesView.prototype				= Object.create( APP.AbstractView.prototype );
	LegalNoticesView.prototype.constructor	= LegalNoticesView;
	
	
	LegalNoticesView.prototype.initDOM = function() {
		this.$page	= $( document.getElementById( 'page-content' ) );
		this.$email	= this.$page.find( '.email' );
		
		// this.encryptMailto( this.$.email, 'contact', 'domain', 'com', true );
	};
	
	
	LegalNoticesView.prototype.bindEvents = function() {
		
	};
	
	
	LegalNoticesView.prototype.unbindEvents = function() {
		
	};
	
	
	LegalNoticesView.prototype.resize = function() {
		
	};
	
	
	return LegalNoticesView;
	
	
} ) ( window );

