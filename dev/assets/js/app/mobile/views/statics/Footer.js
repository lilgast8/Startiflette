

STF.Views.Statics.Footer = new class Footer extends STF.Abstracts.AbstractView {
	
	
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
	
	
}();

