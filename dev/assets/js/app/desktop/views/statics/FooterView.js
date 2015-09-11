

APP.Views			= APP.Views || {};
APP.Views.Statics	= APP.Views.Statics || {};


APP.Views.Statics.FooterView = ( function( window ) {
	
	
	function FooterView() {
		APP.AbstractView.call( this );
	}
	
	
	FooterView.prototype				= Object.create( APP.AbstractView.prototype );
	FooterView.prototype.constructor	= FooterView;
	
	
	FooterView.prototype.initDOM = function() {
		this.$footer		= $( document.getElementById( 'footer' ) );
		this.$footerLgLink	= this.$footer.find( '.footer-lg-link' );
		this.$footerLink	= this.$footer.find( '.footer-link' );
	};
	
	
	FooterView.prototype.bindEvents = function() {
		this.$footerLink.on( 'click', $.proxy( this.changePage, this ) );
	};
	
	
	return new FooterView();
	
	
} ) ( window );

