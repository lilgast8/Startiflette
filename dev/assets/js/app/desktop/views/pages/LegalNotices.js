

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.LegalNotices = ( function( window ) {
	'use strict';
	
	
	function LegalNotices() {
		STF.AbstractView.call( this );
	}
	
	
	LegalNotices.prototype				= Object.create( STF.AbstractView.prototype );
	LegalNotices.prototype.constructor	= LegalNotices;
	
	
	LegalNotices.prototype.initDOM = function() {
		STF.AbstractView.prototype.initDOM.call( this );
		
		this.$email	= this.$page.find( '.email' );
		
		// encryptMailto( this.$.email, 'contact', 'domain', 'com', true );
	};
	
	
	LegalNotices.prototype.bindEvents = function() {
		STF.AbstractView.prototype.bindEvents.call( this );
	};
	
	
	LegalNotices.prototype.unbindEvents = function() {
		STF.AbstractView.prototype.unbindEvents.call( this );
	};
	
	
	LegalNotices.prototype.resize = function() {
		
	};
	
	
	return LegalNotices;
	
	
} ) ( window );

