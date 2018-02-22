

STF.Views			= STF.Views || {};
STF.Views.Statics	= STF.Views.Statics || {};


STF.Views.Statics.Footer = ( function( window ) {


class Footer extends STF.AbstractView {
	
	
	constructor() {
		super();
	}
	
	
	initDOM() {
		this.$footer		= $( document.getElementById( 'footer' ) );
		this.$footerLgLink	= this.$footer.find( '.footer-lang-link' );
		this.$footerLink	= this.$footer.find( '.footer-link' );
	}
	
	
	bindEvents() {
		super.bindEvents();
		
		this.$footerLink.on( 'click', $.proxy( this.changeUrl, this ) );
	}
	
	
}


return new Footer();


} ) ( window );

