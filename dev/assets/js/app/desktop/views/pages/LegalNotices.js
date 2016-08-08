

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.LegalNotices = ( function( window ) {
	'use strict';
	
	
	function LegalNotices() {
		STF.AbstractPageView.call( this );
	}
	
	
	LegalNotices.prototype				= Object.create( STF.AbstractPageView.prototype );
	LegalNotices.prototype.constructor	= LegalNotices;
	
	
	LegalNotices.prototype.initDOM = function() {
		STF.AbstractPageView.prototype.initDOM.call( this );
		
		this.$email	= this.$page.find( '.email' );
		
		// STF_gl_encryptMailto( this.$.email, 'contact', 'domain', 'com', true );
	};
	
	
	LegalNotices.prototype.bindEvents = function() {
		STF.AbstractPageView.prototype.bindEvents.call( this );
	};
	
	
	LegalNotices.prototype.unbindEvents = function() {
		STF.AbstractPageView.prototype.unbindEvents.call( this );
	};
	
	
	LegalNotices.prototype.resize = function() {
		
	};
	
	
	return LegalNotices;
	
	
} ) ( window );

