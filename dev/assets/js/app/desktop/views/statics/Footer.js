

STF.Views			= STF.Views || {};
STF.Views.Statics	= STF.Views.Statics || {};


STF.Views.Statics.FooterView = ( function( window ) {
	
	
	function FooterView() {
		STF.AbstractView.call( this );
	}
	
	
	FooterView.prototype				= Object.create( STF.AbstractView.prototype );
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

