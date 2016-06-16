

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
		this.$footerLgLink	= this.$footer.find( '.footer-lang-link' );
		this.$footerLink	= this.$footer.find( '.footer-link' );
	};
	
	
	Footer.prototype.bindEvents = function() {
		STF.AbstractView.prototype.bindEvents.call( this );
		
		this.$footerLink.on( 'click', $.proxy( this.changeUrl, this ) );
	};
	
	
	Footer.prototype.updateMenuLinks = function( pageId ) {
		var $linkToInactivate	= this.$footerLink.filter( '.active' );
		var $linkToActivate		= this.$footerLink.filter( '[ data-link-id="' + pageId + '" ]' );
		
		if ( $linkToInactivate.length > 0 )
			removeClass( $linkToInactivate[0], 'active' );
		if ( $linkToActivate.length )
			addClass( $linkToActivate[0], 'active' );
	};
		
	
	return new Footer();
	
	
} ) ( window );

