

STF.Views			= STF.Views || {};
STF.Views.Statics	= STF.Views.Statics || {};


STF.Views.Statics.Footer = ( function( window ) {
	'use strict';
	
	
	function Footer() {
		STF.AbstractView.call( this );
	}
	
	
	Footer.prototype				= Object.create( STF.AbstractView.prototype );
	Footer.prototype.constructor	= Footer;
	
	
	Footer.prototype.initDOM = function() {
		this.$footer		= $( document.getElementById( 'footer' ) );
		this.$footerLgLink	= this.$footer.find( '.footer-lg-link' );
		this.$footerLink	= this.$footer.find( '.footer-link' );
	};
	
	
	Footer.prototype.bindEvents = function() {
		this.$footerLink.on( 'click', $.proxy( this.changeUrl, this ) );
	};
	
	
	return new Footer();
	
	
} ) ( window );

